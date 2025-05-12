import { initIntersectionObserver } from './utils/intersectionObserver.js;
import { initRunButton } from './utils/runButton.js;

document.addEventListener("DOMContentLoaded", () => {
   initIntersectionObserver({
    isIntersecting: false,      // intersectionRatio 방식
    intersectionRatioThreshold: 0.4, // 기준값
    threshold: 0.3,            // 예시로 0.3로 설정
  });

  initRunButton();             // 버튼 클릭 이벤트 초기화
});