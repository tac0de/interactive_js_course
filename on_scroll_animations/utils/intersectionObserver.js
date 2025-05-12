export function initIntersectionObserver({
  isIntersecting = false,
  threshold = 0.3,
  intersectionRatioThreshold = 0.4,
  rootMargin = '0px'
} = {}) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const target = entry.target;

      if (isIntersecting) {
        if (entry.isIntersecting) {
          target.classList.add("visible");
        } else {
          target.classList.remove("visible");
        }
      } else {
        // 기존 코드 1: intersectionRatio 값으로 visible 처리
        if (entry.intersectionRatio > intersectionRatioThreshold && !target.classList.contains("visible")) {
          target.classList.add("visible");
        } else if (entry.intersectionRatio <= 0.1 && target.classList.contains("visible")) {
          target.classList.remove("visible");
        }
      }
    });
  }, {
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
    rootMargin
  });

  document.querySelectorAll(".lesson").forEach(section => {
    observer.observe(section);
  });
}