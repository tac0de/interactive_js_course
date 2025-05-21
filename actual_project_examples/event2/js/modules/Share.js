import { Toast } from "./Toast.js";

export const Share = (() => {
  let utms = {};

  const getShareData = () => {
    const currentUrl = window.location.href.split(/[?#]/)[0];
    const shareTitle = document.title;
    const shareDescription =
      document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content") || "";
    const shareImage =
      document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content") || "";
    const shareImageKakao =
      document
        .querySelector('meta[property="og:image:kakao"]')
        ?.getAttribute("content") || "";

    return {
      currentUrl,
      shareTitle,
      shareDescription,
      shareImage,
      shareImageKakao,
      utms,
    };
  };

  const copyUrl = () => {
    const { currentUrl } = getShareData();
    navigator.clipboard
      .writeText(currentUrl + (utms.copyUrl || ""))
      .then(() => Toast.showToast("URL이 복사되었습니다."))
      .catch(() =>
        Toast.showToast(
          "URL 복사에 실패했습니다. 브라우저 주소창에서 직접 복사해주세요."
        )
      );
  };

  const shareToSns = (platform) => {
    const { currentUrl, shareTitle, shareDescription } = getShareData();
    const encodedText = encodeURIComponent(
      `${shareTitle}\n${shareDescription}`
    );
    let shareUrl = "";

    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          currentUrl + (utms.facebook || "")
        )}&text=${encodedText}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          currentUrl + (utms.twitter || "")
        )}&text=${encodedText}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, `Share_${platform}`, "width=550,height=500");
    }
  };

  const shareToKakao = () => {
    const {
      currentUrl,
      shareTitle,
      shareDescription,
      shareImage,
      shareImageKakao,
    } = getShareData();

    if (/joongangilbo/.test(navigator.userAgent.toLowerCase())) {
      location.href = `joongangilbo://article/share?url=${encodeURIComponent(
        currentUrl + (utms.kakao || "")
      )}&title=${encodeURIComponent(
        shareTitle + "\n" + shareDescription
      )}&img=${encodeURIComponent(shareImage)}`;
      return;
    }

    if (window.Kakao && !window.Kakao.Auth) {
      Kakao.init("62547e7c5e294f7836425fb3a755e4a1");
    }

    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: shareTitle,
        description: shareDescription,
        imageUrl: shareImageKakao,
        link: {
          mobileWebUrl: currentUrl + (utms.kakao || ""),
          webUrl: currentUrl + (utms.kakao || ""),
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: currentUrl + (utms.kakao || ""),
            webUrl: currentUrl + (utms.kakao || ""),
          },
        },
      ],
      fail: () => alert("지원하지 않는 기기입니다."),
    });
  };

  const init = (customUtms = {}) => {
    utms = { ...utms, ...customUtms };

    const handlers = [
      { selector: ".btn_url", handler: copyUrl },
      { selector: ".btn_facebook", handler: () => shareToSns("facebook") },
      { selector: ".btn_twitter", handler: () => shareToSns("twitter") },
      { selector: ".btn_kakao", handler: shareToKakao },
    ];

    handlers.forEach(({ selector, handler }) => {
      const button = document.querySelector(selector);
      if (button) button.addEventListener("click", handler);
    });
  };

  return { init };
})();
