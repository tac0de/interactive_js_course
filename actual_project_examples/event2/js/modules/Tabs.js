export const Tabs = (tabSelector) => {
    const tabs = document.querySelector(tabSelector);
    const tabButtons = tabs ? [...tabs.querySelectorAll('[role="tab"]')] : [];
    const tabPanels = tabs ? [...tabs.querySelectorAll('[role="tabpanel"]')] : [];

    const activateTab = (tab) => {
        tabButtons.forEach((button) => {
            button.setAttribute('aria-selected', 'false');
            document.getElementById(button.getAttribute('aria-controls')).hidden = true;
        });

        tab.setAttribute('aria-selected', 'true');
        document.getElementById(tab.getAttribute('aria-controls')).hidden = false;
    };

    const focusNextTab = (currentTab) => {
        const currentIndex = tabButtons.indexOf(currentTab);
        const nextIndex = (currentIndex + 1) % tabButtons.length;
        tabButtons[nextIndex].focus();
    };

    const focusPreviousTab = (currentTab) => {
        const currentIndex = tabButtons.indexOf(currentTab);
        const prevIndex = (currentIndex - 1 + tabButtons.length) % tabButtons.length;
        tabButtons[prevIndex].focus();
    };

    const init = () => {
        tabButtons.forEach((button) => {
            button.addEventListener('click', () => activateTab(button));

            button.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') focusNextTab(button);
                else if (e.key === 'ArrowLeft') focusPreviousTab(button);
            });
        });
    };

    return { init };
};
