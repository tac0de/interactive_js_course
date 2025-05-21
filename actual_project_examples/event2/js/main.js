import { Share } from './modules/Share.js';
import { RankingTable } from './modules/RankingTable.js';
import { Progress } from './modules/Progress.js';
import { StickyNavigation } from './modules/StickyNavigation.js';
import { Animation } from './modules/Animation.js';
import { Accordion } from './modules/Accordion.js';
import { Tabs } from './modules/Tabs.js';
import { FixedButton } from './modules/FixedButton.js';
import { ScrollAnimation } from './modules/ScrollAnimation.js';
import { layerToggle } from './modules/LayerToggle.js';

document.addEventListener('DOMContentLoaded', () => {
    Share.init({
        kakao: '?utm_source=kakao&utm_medium=share&utm_campaign=example',
        facebook: '?utm_source=facebook&utm_medium=share&utm_campaign=example',
        twitter: '?utm_source=twitter&utm_medium=share&utm_campaign=example',
        copyUrl: '?utm_source=urlcopy&utm_medium=share&utm_campaign=example'
    });

    RankingTable.init({
        tableSelector: '#rankingTable',
        regionSelector: '#liveRegion',
        buttonSelector: '.btn_ranking'
    });

    const sampleData = [
        { name: '서울대', score: 180 },
        { name: '연세대', score: 150 },
        { name: '고려대', score: 140 },
        { name: '서강대', score: 130 },
        { name: '한양대', score: 120 },
        { name: '성균관대', score: 110 },
        { name: '중앙대', score: 100 },
        { name: '경희대', score: 90 },
        { name: '건국대', score: 80 },
        { name: '홍익대', score: 70 },
        { name: '이화여대', score: 60 },
        { name: '숭실대', score: 50 },
        { name: '세종대', score: 40 },
        { name: '광운대', score: 30 },
        { name: '국민대', score: 20 }
    ];

    RankingTable.update(sampleData);
    Progress.init();
    StickyNavigation.init({
        navSelector: '.event_nav',
        sectionSelector: '.event2_wrap'
    });
    Animation.init();
    Accordion('#accordion').init();
    Tabs('.tab_wrap').init();
    FixedButton.init();
    ScrollAnimation.init();
    layerToggle.init();
});