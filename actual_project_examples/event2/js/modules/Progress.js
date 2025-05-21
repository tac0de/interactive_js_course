// 📁 src/modules/Progress.js
export const Progress = (() => {
    const START_TIME = 5000;
    const TIME_INTERVAL = 3000;

    const showProgressBar = (comingSoonElement, progressWrapperElements) => {
        if (comingSoonElement) comingSoonElement.classList.add("hidden");
        progressWrapperElements.forEach(el => el.classList.remove("hidden"));
    };

    const setupMobileScroll = () => {
        if (window.innerWidth > 768) return;
        const containers = document.querySelectorAll(".progress_container");

        containers.forEach(container => {
            const wrappers = container.querySelectorAll(".progress_wrapper");
            wrappers.forEach(wrapper => {
                const items = wrapper.querySelectorAll(".progress_item");
                if (items.length > 0) wrapper.style.paddingRight = '25px';
            });

            let isDown = false, startX, scrollLeft;
            container.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });
            container.addEventListener('mouseleave', () => isDown = false);
            container.addEventListener('mouseup', () => isDown = false);
            container.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            });
        });
    };

    const init = () => {
        const wrappers = document.querySelectorAll(".progress_container");

        wrappers.forEach((wrapper, i) => {
            const comingSoon = wrapper.querySelector(".coming_soon");
            const items = wrapper.querySelectorAll(".progress_item");

            if (comingSoon) comingSoon.classList.remove("hidden");
            items.forEach(item => item.classList.add("hidden"));

            setTimeout(() => showProgressBar(comingSoon, items), START_TIME + i * TIME_INTERVAL);
        });

        setupMobileScroll();
        window.addEventListener('resize', setupMobileScroll);
    };

    return { init };
})();
