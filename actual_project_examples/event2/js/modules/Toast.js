// export const Toast = (() => {
//   const showToast = (message) => {
//     const toastElement = document.getElementById("toast");
//     if (!toastElement) return;
//     toastElement.textContent = message;
//     toastElement.classList.add("show");
//     toastElement.setAttribute("aria-live", "assertive");

//     setTimeout(() => {
//       toastElement.classList.remove("show");
//       toastElement.removeAttribute("aria-live");
//     }, 3000);
//   };
//   return { showToast };
// })();

/*
| 항목      | 기존 코드                            | 리팩토링 후                                |
| ------- | -------------------------------- | ------------------------------------- |
| DOM 접근  | `document.getElementById()` 매 호출 | 최초 1회만 조회하여 캐싱                        |
| 로직 결합   | 메시지 표시와 제거가 하나의 함수에 혼합           | `updateContent()` / `hideToast()`로 분리 |
| 재사용/확장성 | 하드코딩된 시간 3000ms                  | `TOAST_DURATION` 상수화                  |
| 에러 내성   | 엘리먼트 없을 시 silent fail 없음         | 초기화 시점에서 존재 확인 후 안전 처리                |
*/

export const Toast = (() => {
    const toastElement = document.getElementById('toast');
    if (!toastElement) return { showToast: () => {} };

    const TOAST_DURATION = 3000;

    const updateContent = (msg) => {
        toastElement.textContent = msg;
        toastElement.classList.add('show');
        toastElement.setAttribute('aria-live', 'assertive');
    };

    const hideToast = () => {
        toastElement.classList.remove('show');
        toastElement.removeAttribute('aria-live');
    };

    const showToast = (message) => {
        updateContent(message);
        setTimeout(hideToast, TOAST_DURATION);
    };

    return { showToast };
})();
