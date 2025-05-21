export const RankingTable = (() => {
    let allData = [];
    let previousData = [];
    let rankingHistory = {};
    let viewLimitIndex = 0;
    const VIEW_LIMITS = [10, 20];
    let currentViewLimit = VIEW_LIMITS[0];

    let table, tbody, liveRegion, viewMoreButton;

    function init(options = {}) {
        table = document.querySelector(options.tableSelector || '#rankingTable');
        liveRegion = document.querySelector(options.regionSelector || '#liveRegion');
        viewMoreButton = document.querySelector(options.buttonSelector || '.btn_ranking');

        if (table) tbody = table.querySelector('tbody');
        if (viewMoreButton) viewMoreButton.addEventListener('click', handleViewMoreClick);

        renderTable(allData, currentViewLimit);
    }

    function update(data) {
        allData = data;
        renderTable(data, currentViewLimit);
    }

    function renderTable(data, limit) {
        if (!tbody) return;
        const sorted = [...data].sort((a, b) => b.score - a.score);
        const rows = sorted.slice(3, limit);
        const fragment = document.createDocumentFragment();
        tbody.innerHTML = '';

        rows.forEach((item, i) => {
            const tr = document.createElement('tr');
            const rank = i + 4;
            const prevRank = rankingHistory[item.name];

            const tdRank = document.createElement('td');
            tdRank.textContent = rank;

            const tdName = document.createElement('td');
            tdName.textContent = item.name;

            let rankClass = 'rank_same';
            if (prevRank && prevRank > rank) rankClass = 'rank_up';
            else if (prevRank && prevRank < rank) rankClass = 'rank_down';
            else if (!prevRank) rankClass = 'rank_new';

            tr.classList.add(rankClass);
            tr.appendChild(tdRank);
            tr.appendChild(tdName);
            fragment.appendChild(tr);

            rankingHistory[item.name] = rank;
        });

        tbody.appendChild(fragment);
        previousData = sorted;
    }

    function handleViewMoreClick() {
        if (viewLimitIndex < VIEW_LIMITS.length - 1) {
            viewLimitIndex++;
            currentViewLimit = VIEW_LIMITS[viewLimitIndex];
            renderTable(allData, currentViewLimit);
        } else {
            currentViewLimit = VIEW_LIMITS[0];
            viewLimitIndex = 0;
            renderTable(allData, currentViewLimit);
        }
    }

    return { init, update };
})();