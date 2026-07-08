document.addEventListener('DOMContentLoaded', () => {
    // 每個景點的詳細資料
    const travelData = [
        { sub: "Chapter0", main: "漁生｜\n南方澳的港邊記憶", url: "/chapter-1", desc: "提到宜蘭，腦海中浮現的總是「好山好水」，而在這片被自然環抱的土地上，「海」幾乎成了宜蘭最鮮明、也最容易被忽略的代名詞。相較於常被書寫的田園風景與山林意象，宜蘭的海並非只是觀光明信片上的藍色背景，而是一個長年承載勞動、產業、家庭與記憶的生活現場。", img: "image/IMG_0699.jpg" },
        { sub: "Chapter1", main: "漁民篇｜\n與海共生的一輩子", url: "/chapter-2", desc: "走進長野的深山，與雪猴共享溫泉時光。這裡融合了古老的寺院與壯麗的高山地勢。", img: "image/IMG_1134.jpg" },
        { sub: "Chapter2", main: "職人篇｜\n撐起港口的無名英雄", url: "/chapter-3", desc: "撒哈拉的金色沙丘在夕陽下閃耀。騎著駱駝深入沙漠腹地，仰望最純淨的星空。", img: "image/DSC00335.JPG" },
        { sub: "Chapter3", main: "食物篇｜\n從港口到餐桌", url: "/chapter-4", desc: "優勝美地的巨大花崗岩與瀑布是自然的傑作。在這裡，您能感受到大自然最原始的震撼。", img: "image/IMG_1235拷貝.JPG" }
    ];

    const bgBox = document.getElementById('bg-box');
    const mTitle = document.getElementById('m-title');
    const sTitle = document.getElementById('s-title');
    const descText = document.getElementById('desc');
    const chapterBtn = document.getElementById('chapter-link');
    const sNum = document.getElementById('slide-num');

    // 1. 初始化背景層
    travelData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = `bg-slide ${index === 0 ? 'active' : ''}`;
        div.style.backgroundImage = `url(${item.img})`;
        bgBox.appendChild(div);
    });

    // 2. 初始化 Swiper
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        spaceBetween: 30,
        loop: true,
        grabCursor: true,
        navigation: { nextEl: "#next", prevEl: "#prev" },
        on: {
            slideChange: function () {
                const idx = this.realIndex;

                // A. 背景圖「消散」效果轉場
                const bgs = document.querySelectorAll('.bg-slide');
                bgs.forEach(bg => bg.classList.remove('active'));
                bgs[idx].classList.add('active');

                // B. 左側資訊淡入動畫
                const textElements = [mTitle, sTitle, descText, chapterBtn, sNum];
                textElements.forEach(el => el.classList.add('fade-out'));

                setTimeout(() => {
                    mTitle.innerText = travelData[idx].main;
                    sTitle.innerText = travelData[idx].sub;
                    descText.innerText = travelData[idx].desc;
                    chapterBtn.href = travelData[idx].url; // 更新按鈕連結
                    sNum.innerText = `0${idx + 1}`;

                    textElements.forEach(el => {
                        el.classList.remove('fade-out');
                        el.classList.add('fade-in');
                    });
                }, 400);
            }
        }
    });
});

// --- 頁面切換邏輯 ---
function switchTo(pageId) {
    // 1. 隱藏所有頁面
    document.querySelectorAll('.full-page').forEach(section => {
        section.classList.remove('active');
    });

    // 2. 顯示點擊的頁面
    const target = document.getElementById('section-' + pageId);
    if (target) {
        target.classList.add('active');
    }

    // 3. 如果離開地圖頁，自動停止聲音
    if (pageId !== 'map') {
        stopAllAudio();
    }
}
