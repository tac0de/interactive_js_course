// 모던 ES6 스타일로 전체 리팩토링한 코드
const allElements = document.querySelectorAll(
  ".contents > section:not(.sticky)"
);
let setHeights = [];

const getHeights = () => {
  setHeights = Array.from(allElements)
    .reverse()
    .reduce((acc, curr) => [...acc, curr.offsetTop + curr.clientHeight], []);
};

const SHARE_INFO = {
  url: "https://www.joongang.co.kr/events/reserve/plus_report_2025",
  text: "더중앙플러스 지식 리포트",
  desc: "더중앙플러스와 함께하는 지식 성장, 데이터로 알기 쉽게 살펴봐요.",
  img: "https://img.joongang.co.kr/pubimg/event/2025/plusReport/sns_facebook@2x.min.png",
  kakaoImg:
    "https://img.joongang.co.kr/pubimg/event/2025/plusReport/sns_kakao@2x.min.png",
  imgWidth: 610,
  imgHeight: 319,
};

const UTM = {
  kakao:
    "?utm_source=kakao&utm_medium=share&utm_campaign=plus_report_2024&utm_term=&utm_content=report_2501",
  facebook:
    "?utm_source=facebook&utm_medium=share&utm_campaign=plus_report_2024&utm_term=&utm_content=report_2501",
  twitter:
    "?utm_source=twitter&utm_medium=share&utm_campaign=plus_report_2024&utm_term=&utm_content=report_2501",
  copy: "?utm_source=urlcopy&utm_medium=share&utm_campaign=plus_report_2024&utm_term=&utm_content=report_2501",
};

const throttling = (callback, timing = 100) => {
  let timer;
  return (...args) => {
    if (!timer) {
      timer = setTimeout(() => {
        callback(...args);
        timer = null;
      }, timing);
    }
  };
};

let isInApp = /joongangilbo/.test(navigator.userAgent.toLowerCase());
document.body.dataset.app = isInApp;

let prevScroll = document.documentElement.scrollTop || 0;

const setScrollDirection = () => {
  const scrollTop = document.documentElement.scrollTop;
  document.body.dataset.scroll =
    prevScroll >= scrollTop || scrollTop <= 0 ? "up" : "down";
  prevScroll = scrollTop;
};

const nativeShare = (platform) => {
  const url = `${SHARE_INFO.url}${UTM[platform]}`;
  location.href = `joongangilbo://article/share?url=${encodeURIComponent(
    url
  )}&title=${encodeURIComponent(SHARE_INFO.text)}&img=${encodeURIComponent(
    SHARE_INFO.img
  )}`;
};

const openToast = (msg = "") => {
  const toast = document.querySelector(".layer_toast");
  if (!toast || typeof msg !== "string" || !msg) return;

  toast.classList.add("show");
  toast.textContent = msg;

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
};

const share = (platform) => {
  const url = `${SHARE_INFO.url}${UTM[platform]}`;

  if (platform !== "copy" && isInApp) return nativeShare(platform);

  if (platform === "kakao") {
    if (window.Kakao && window.Kakao.Auth === undefined) {
      Kakao.init("62547e7c5e294f7836425fb3a755e4a1");
    }
    Kakao.Link?.sendDefault({
      objectType: "feed",
      content: {
        title: SHARE_INFO.text,
        description: "",
        imageUrl: SHARE_INFO.kakaoImg,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      fail: () => alert("지원하지 않는 기기입니다."),
    });
  }

  if (platform === "facebook") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      "Share_Facebook",
      "width=550,height=500"
    );
  }

  if (platform === "twitter") {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        SHARE_INFO.text
      )}&url=${encodeURIComponent(url)}`,
      "twitter",
      "width=550,height=500"
    );
  }

  if (platform === "copy") {
    const dummy = document.createElement("input");

    dummy.value = url;
    document.body.appendChild(dummy);
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    openToast("URL이 복사되었습니다.");
  }
};

const toggleElements = new Set();

const removeToggleClass = () => {
  toggleElements.forEach((el) => el.classList.remove("active"));
};

const switchingButton = () => {
  const scrollY = window.scrollY;
  for (let i = setHeights.length - 1; i >= 0; i--) {
    const current = allElements[setHeights.length - i - 1];
    if (setHeights[i] - window.innerHeight / 2 + 60 > scrollY) {
      document.body.dataset.element = current.getAttribute("class");
      break;
    }
  }
};

const switchingNav = () => {
  const scrollY = window.scrollY;
  const navBar = document.querySelector(".contents > .tab");
  if (!navBar) return;

  navBar.classList.toggle("active", navBar.offsetTop - 60 <= scrollY);
};

const triggerAnimations = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;

  document.querySelectorAll("[data-animate]").forEach((el) => {
    const elementTop = el.getBoundingClientRect().top + scrollY;
    el.classList.toggle("animated", scrollY + windowHeight >= elementTop + 100);
  });
};

const bindScrollEvent = () => {
  setScrollDirection();
  removeToggleClass();
  switchingNav();
  switchingButton();
  triggerAnimations();
};

const bindResizeEvent = () => {
  getHeights();
};

const bindToggle = (id) => {
  const targetEl = document.getElementById(id);
  if (!targetEl) return;

  toggleElements.add(targetEl);
  targetEl.addEventListener("click", () => {
    targetEl.classList.toggle("active");
  });
};

const setTabs = () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabList = document.querySelector('[role="tablist"]');
  if (!tabs.length || !tabList) return;

  let tabFocus = 0;

  const KEY = { LEFT: 37, RIGHT: 39 };

  const onChangeTab = (e) => {
    const target = e.target;
    const grand = target.closest('[role="tablist"]').parentElement;

    grand.querySelectorAll('[aria-selected="true"]').forEach((t) => {
      t.setAttribute("aria-selected", "false");
      t.classList.remove("active");
    });

    target.setAttribute("aria-selected", "true");
    target.classList.add("active");

    grand.querySelectorAll('[role="tabpanel"]').forEach((p) => {
      p.hidden = true;
      p.tabIndex = -1;
      p.classList.remove("show");
    });

    const panel = grand.querySelector(
      `#${target.getAttribute("aria-controls")}`
    );
    if (panel) {
      panel.hidden = false;
      panel.tabIndex = 0;
      panel.classList.add("show");
    }
  };

  const kbdNavigation = (e) => {
    const key = e.keyCode;
    if (![KEY.LEFT, KEY.RIGHT].includes(key)) return;

    tabs[tabFocus].tabIndex = -1;
    tabFocus =
      key === KEY.RIGHT
        ? (tabFocus + 1) % tabs.length
        : (tabFocus - 1 + tabs.length) % tabs.length;
    tabs[tabFocus].tabIndex = 0;
    tabs[tabFocus].focus();
  };

  tabs.forEach((tab) => tab.addEventListener("click", onChangeTab));
  tabList.addEventListener("keydown", kbdNavigation);
};

const setAnimate = () => {
  const windowHeight = window.innerHeight;
  document.querySelectorAll("[data-animate]").forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;
    if (windowHeight >= elementTop + 100) {
      el.classList.add("animated");
    }
  });
};

const init = () => {
  getHeights();
  switchingNav();
  bindToggle("jsToggle");
  setTabs();
  setAnimate();
  window.addEventListener("scroll", throttling(bindScrollEvent, 50));
  window.addEventListener("resize", throttling(bindResizeEvent, 20));
};

document.addEventListener("DOMContentLoaded", init);

window.share = share;
