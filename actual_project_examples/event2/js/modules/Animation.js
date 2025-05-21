export const Animation = (() => {
    const selectElements = (selectors) => document.querySelectorAll(selectors);

    const addAnimation = (elements, className) => {
        elements.forEach((el) => el.classList.add(className));
    };

    const init = () => {
        const petals = selectElements('.keyvisual_wrap .petal');
        const clouds = selectElements('.keyvisual_wrap .cloud');
        const isMobile = window.matchMedia('(max-width: 985px)').matches;

        petals.forEach((petal) => {
            const randomDelay = Math.random() * (isMobile ? 3.3 : 3.4);
            const randomX1 = isMobile ? 20 + Math.random() * 280 : 50 + Math.random() * 560;
            const randomY1 = isMobile ? 15 + Math.random() * 170 : 30 + Math.random() * 470;
            const randomX2 = randomX1 + Math.random() * (isMobile ? 80 : 130);
            const randomY2 = randomY1 + Math.random() * (isMobile ? 100 : 150);
            const randomRotate1 = Math.random() * 35;
            const randomRotate2 = randomRotate1 + Math.random() * (isMobile ? -90 : -120);

            petal.style.left = `${isMobile ? '24%' : '25%'}`;
            petal.style.top = `${1.2 + Math.random() * 4}%`;
            petal.style.animationDelay = `${randomDelay}s`;
            petal.style.animationDuration = `${isMobile ? 2.71 : 2.78 + Math.random() * 3}s`;
            petal.style.setProperty('--rand-x1', `${randomX1}px`);
            petal.style.setProperty('--rand-y1', `${randomY1}px`);
            petal.style.setProperty('--rand-x2', `${randomX2}px`);
            petal.style.setProperty('--rand-y2', `${randomY2}px`);
            petal.style.setProperty('--rand-rotate1', `${randomRotate1}deg`);
            petal.style.setProperty('--rand-rotate2', `${randomRotate2}deg`);

            petal.classList.add('play_petals');
        });

        setTimeout(() => {
            addAnimation(clouds, 'play_clouds');
        }, 100);
    };

    return { init };
})();
