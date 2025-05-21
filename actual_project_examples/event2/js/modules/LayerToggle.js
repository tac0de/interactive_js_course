export const layerToggle = (() => {
    const init = () => {
        const layerTerms = document.querySelector('.layer_terms');
        const agreeBoxes = layerTerms?.querySelectorAll('.agree_box') || [];
        const toggleButtons = layerTerms?.querySelectorAll('.btn_toggle') || [];

        agreeBoxes.forEach(box => box.classList.add('hide'));

        if (agreeBoxes.length > 0) {
            agreeBoxes[0].classList.remove('hide');
            if (toggleButtons.length > 0) {
                toggleButtons[0].textContent = '내용접기';
            }
        }

        toggleButtons.forEach((button) => {
            button.addEventListener('click', function () {
                const agreeBox = this.parentElement.nextElementSibling;
                agreeBox.classList.toggle('hide');
                this.textContent = agreeBox.classList.contains('hide') ? '내용보기' : '내용접기';
            });
        });
    };

    return { init };
})();