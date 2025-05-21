export const ScrollAnimation = (() => {
    const throttle = (callback, delay) => {
        let lastCall = 0;
        let timeoutId;
        return (...args) => {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                callback(...args);
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastCall = Date.now();
                    callback(...args);
                }, delay - (now - lastCall));
            }
        };
    };

    const triggerAnimations = (scrollY) => {
        const animatedElements = document.querySelectorAll('[data-animate]');
        animatedElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top + window.scrollY;
            const windowHeight = window.innerHeight;
            if (scrollY + windowHeight >= elementTop + 100) {
                element.classList.add('animated');
            } else {
                element.classList.remove('animated');
            }
        });
    };

    const handleScroll = throttle(() => {
        const scrollY = window.scrollY;
        triggerAnimations(scrollY);
    }, 100);

    const init = () => {
        window.addEventListener('scroll', handleScroll);
        handleScroll(); // 초기 상태 평가
    };

    return { init };
})();