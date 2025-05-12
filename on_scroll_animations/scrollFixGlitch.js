// afterRefactor.js (수정 후 코드)
import { initIntersectionObserver } from './utils/intersectionObserver.js;
import { initRunButton } from './utils/runButton.js;

document.addEventListener("DOMContentLoaded", () => {
  initIntersectionObserver({
    isIntersecting: true,
    threshold: 0.3
  });

  initRunButton();             // 버튼 클릭 이벤트 초기화
});