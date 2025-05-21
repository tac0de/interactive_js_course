export const FixedButton = (() => {
    const init = (options = {}) => {
        const defaults = {
            introButtonSelector: '.intro_wrap .btn_wrap',
            eventButtonSelector: '.event1_wrap .btn_wrap',
            fixedClass: 'fixed'
        };

        const settings = { ...defaults, ...options };
        const introButton = document.querySelector(settings.introButtonSelector);
        const eventButton = document.querySelector(settings.eventButtonSelector);

        if (!introButton || !eventButton) {
            console.error('버튼 요소를 찾을 수 없습니다.');
            return;
        }

        let introButtonOriginalPosition = introButton.getBoundingClientRect().top + window.scrollY;

        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const eventButtonPosition = eventButton.getBoundingClientRect().top + window.scrollY;

            if (scrollPosition < introButtonOriginalPosition) {
                introButton.classList.remove(settings.fixedClass);
                introButton.querySelector('button').setAttribute('data-evnt-act', 'click:메인구매버튼');
            } else if (scrollPosition < eventButtonPosition - window.innerHeight) {
                introButton.classList.add(settings.fixedClass);
                introButton.querySelector('button').setAttribute('data-evnt-act', 'click:플로팅구매버튼');
            } else {
                introButton.classList.remove(settings.fixedClass);
                introButton.querySelector('button').setAttribute('data-evnt-act', 'click:메인구매버튼');
            }
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', () => {
            const introButtonNewPosition = introButton.offsetTop;
            if (introButtonNewPosition > 0) {
                introButtonOriginalPosition = introButtonNewPosition;
            }
            handleScroll();
        });
    };

    return { init };
})();