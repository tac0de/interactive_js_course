// export const Accordion = (accordionSelector) => {
//     const accordion = document.querySelector(accordionSelector);
//     const accordionItems = accordion ? [...accordion.querySelectorAll('.accordion_item')] : [];

//     const toggleAccordion = (item, expand) => {
//         const button = item.querySelector('.accordion_button');
//         const content = item.querySelector('.accordion_collapse');
//         button.setAttribute('aria-expanded', expand);

//         if (expand) {
//             content.classList.add('open');
//         } else {
//             content.classList.remove('open');
//         }
//     };

//     const init = () =>
//         accordionItems.forEach((item) => {
//             const button = item.querySelector('.accordion_button');

//             button.addEventListener('click', () => {
//                 const isExpanded = button.getAttribute('aria-expanded') === 'true';
//                 toggleAccordion(item, !isExpanded);
//             });

//             button.addEventListener('keydown', (e) => {
//                 if (e.key === ' ' || e.key === 'Enter') {
//                     e.preventDefault();
//                     const isExpanded = button.getAttribute('aria-expanded') === 'true';
//                     toggleAccordion(item, !isExpanded);
//                 }
//             });
//         });

//     return { init };
// };

/*
| 항목    | 개선 전               | 개선 후                                 |
| ----- | ------------------ | ------------------------------------ |
| 조건 처리 | 무조건 DOM 탐색         | 선택자 유효성 체크 후 초기화 진행                  |
| 로직 구조 | 익명 함수 다수, 중복 로직 존재 | `toggleItem`, `handleToggle`로 명확히 분리 |
| 가독성   | 이벤트 내부 로직 중첩       | 명확한 함수 호출 체계 구성                      |
| 유지보수  | 매 항목마다 코드 반복       | 공통 함수 재사용 구조로 간결화                    |
*/

export const Accordion = (accordionSelector) => {
    const accordion = document.querySelector(accordionSelector);
    if (!accordion) return { init: () => {} };

    const toggleItem = (item, expand) => {
        const button = item.querySelector('.accordion_button');
        const content = item.querySelector('.accordion_collapse');
        button.setAttribute('aria-expanded', expand);
        content.classList.toggle('open', expand);
    };

    const handleToggle = (item) => {
        const button = item.querySelector('.accordion_button');
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        toggleItem(item, !isExpanded);
    };

    const init = () => {
        const items = accordion.querySelectorAll('.accordion_item');
        items.forEach((item) => {
            const button = item.querySelector('.accordion_button');
            button.addEventListener('click', () => handleToggle(item));
            button.addEventListener('keydown', (e) => {
                if ([' ', 'Enter'].includes(e.key)) {
                    e.preventDefault();
                    handleToggle(item);
                }
            });
        });
    };

    return { init };
};
