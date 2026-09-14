/* =========================================================
   BS 360 NEWS
   HOMEPAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));


    /* =====================================================
       SOURCE ARTICLES
    ===================================================== */

    const source = $$("#legacyNewsSource .news-item");

    const articles = source.map((item, index) => {

        const img = $("img", item);
        const titleElement = $(".news-content p", item);

        return {
            index: index,
            category: (item.dataset.category || "").toLowerCase(),
            url: item.dataset.url || "#",
            image: img ? img.getAttribute("src") : "",
            title: titleElement
                ? titleElement.textContent.trim()
                : "",
            alt: img
                ? img.getAttribute("alt") || ""
                : ""
        };

    });


    /* =====================================================
       ARTICLE OPEN
    ===================================================== */

    function openArticle(article) {

        if (!article || !article.url || article.url === "#") {
            return;
        }

        window.location.href = article.url;
    }


    /* =====================================================
       CATEGORY CHECK
    ===================================================== */

    function isMovie(article) {

        return [
            "cinema",
            "movies",
            "movie"
        ].includes(article.category);

    }

    function isSports(article) {

        return article.category === "sports";

    }

    function isBusiness(article) {

        return article.category === "business";

    }

    function isAPTS(article) {

        return [
            "ap",
            "ts",
            "andhra",
            "telangana"
        ].includes(article.category);

    }

    function isBigBoss(article) {

        return article.category === "bigboss10";

    }


    /* =====================================================
       LATEST NEWS
    ===================================================== */

    const latestArticles = articles
        .filter(article => !isBigBoss(article))
        .slice(0, 8);


    /* =====================================================
       LATEST SIDEBAR
    ===================================================== */

    const latestSidebar = $("#latestSidebar");

    if (latestSidebar) {

        latestSidebar.innerHTML = "";

        latestArticles.forEach(article => {

            const item = document.createElement("div");

            item.className = "sidebar-item";

            item.innerHTML = `
                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="lazy"
                >

                <div class="sidebar-item-title">
                    ${article.title}
                </div>
            `;

            item.addEventListener("click", function () {
                openArticle(article);
            });

            latestSidebar.appendChild(item);

        });

    }


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const topStory = $("#topStory");

    let heroArticles = articles
        .filter(article => !isBigBoss(article))
        .slice(0, 7);

    if (topStory && heroArticles.length) {

        topStory.innerHTML = "";

        const heroSlides = [];

        heroArticles.forEach((article, index) => {

            const slide = document.createElement("div");

            slide.className =
                "hero-slide" +
                (index === 0 ? " active" : "");

            slide.innerHTML = `
                <img
                    src="${article.image}"
                    alt="${article.alt}"
                >

                <div class="hero-content">

                    <span class="hero-category">
                        ${getCategoryName(article.category)}
                    </span>

                    <div class="hero-title">
                        ${article.title}
                    </div>

                    <span class="hero-read">
                        Read More →
                    </span>

                </div>
            `;

            slide.addEventListener("click", function () {
                openArticle(article);
            });

            topStory.appendChild(slide);

            heroSlides.push(slide);

        });


        const dots = document.createElement("div");

        dots.className = "hero-dots";

        heroSlides.forEach((slide, index) => {

            const dot = document.createElement("span");

            dot.className =
                "hero-dot" +
                (index === 0 ? " active" : "");

            dot.addEventListener("click", function (event) {

                event.stopPropagation();

                showHero(index);

            });

            dots.appendChild(dot);

        });

        topStory.appendChild(dots);


        let heroIndex = 0;

        function showHero(index) {

            heroSlides.forEach(slide =>
                slide.classList.remove("active")
            );

            $$(".hero-dot", dots).forEach(dot =>
                dot.classList.remove("active")
            );

            heroSlides[index].classList.add("active");

            $$(".hero-dot", dots)[index]
                .classList.add("active");

            heroIndex = index;

        }


        setInterval(function () {

            heroIndex++;

            if (heroIndex >= heroSlides.length) {
                heroIndex = 0;
            }

            showHero(heroIndex);

        }, 5000);

    }


    /* =====================================================
       BIGG BOSS
    ===================================================== */

    const bigBossArticles = articles
        .filter(isBigBoss)
        .slice(0, 12);

    const bigBossTrack = $("#bigbossTrack");

    if (bigBossTrack) {

        bigBossTrack.innerHTML = "";

        bigBossArticles.forEach(article => {

            const card = document.createElement("article");

            card.className = "bigboss-card";

            card.innerHTML = `
                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="lazy"
                >

                <div class="bigboss-card-title">
                    ${article.title}
                </div>
            `;

            card.addEventListener("click", function () {
                openArticle(article);
            });

            bigBossTrack.appendChild(card);

        });

    }


    /* =====================================================
       GENERIC CAROUSEL
    ===================================================== */

    function createCarousel(track, data, type) {

        if (!track || !data.length) {
            return;
        }

        track.innerHTML = "";

        data.forEach(article => {

            const card = document.createElement("article");

            if (type === "slider") {

                card.className = "slider-card";

                card.innerHTML = `
                    <img
                        src="${article.image}"
                        alt="${article.alt}"
                        loading="lazy"
                    >

                    <div class="slider-card-content">

                        <span class="card-category">
                            ${getCategoryName(article.category)}
                        </span>

                        <div class="slider-card-title">
                            ${article.title}
                        </div>

                    </div>
                `;

            }

            card.addEventListener("click", function () {
                openArticle(article);
            });

            track.appendChild(card);

        });

    }


    /* =====================================================
       AP & TS
    ===================================================== */

    const apTsArticles = articles
        .filter(isAPTS)
        .slice(0, 10);

    createCarousel(
        $("#sliderTrack"),
        apTsArticles,
        "slider"
    );


    /* =====================================================
       CAROUSEL CONTROLS
    ===================================================== */

    function setupCarousel(trackId, prevId, nextId) {

        const track = $("#" + trackId);

        const prev = $("#" + prevId);

        const next = $("#" + nextId);

        if (!track) {
            return;
        }

        let position = 0;

        function getVisibleCards() {

            if (window.innerWidth <= 600) {
                return 2;
            }

            if (window.innerWidth <= 900) {
                return 3;
            }

            return 4;

        }

        function update() {

            const cards = track.children;

            if (!cards.length) {
                return;
            }

            const visible = getVisibleCards();

            const maxPosition =
                Math.max(0, cards.length - visible);

            position =
                Math.max(
                    0,
                    Math.min(position, maxPosition)
                );

            const cardWidth =
                cards[0].getBoundingClientRect().width;

            track.style.transform =
                `translateX(-${position * (cardWidth + 10)}px)`;

        }

        if (prev) {

            prev.addEventListener("click", function () {

                position--;

                update();

            });

        }

        if (next) {

            next.addEventListener("click", function () {

                position++;

                const visible = getVisibleCards();

                const max =
                    Math.max(
                        0,
                        track.children.length - visible
                    );

                if (position > max) {
                    position = 0;
                }

                update();

            });

        }


        /* AUTO SCROLL */

        setInterval(function () {

            if (!track.children.length) {
                return;
            }

            position++;

            const visible = getVisibleCards();

            const max =
                Math.max(
                    0,
                    track.children.length - visible
                );

            if (position > max) {
                position = 0;
            }

            update();

        }, 5000);


        window.addEventListener("resize", update);

        setTimeout(update, 300);

    }


    setupCarousel(
        "bigbossTrack",
        "sliderPrev",
        "sliderNext"
    );


    setupCarousel(
        "sliderTrack",
        "sliderPrev",
        "sliderNext"
    );


    /* =====================================================
       CATEGORY CARD CREATOR
    ===================================================== */

    function createCategoryGrid(container, data) {

        if (!container) {
            return;
        }

        container.innerHTML = "";

        data.forEach(article => {

            const card = document.createElement("article");

            card.className = "category-card";

            card.innerHTML = `
                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="lazy"
                >

                <div class="category-card-content">

                    <span class="card-category">
                        ${getCategoryName(article.category)}
                    </span>

                    <div class="category-card-title">
                        ${article.title}
                    </div>

                </div>
            `;

            card.addEventListener("click", function () {
                openArticle(article);
            });

            container.appendChild(card);

        });

    }


    /* =====================================================
       MOVIES
    ===================================================== */

    const movieArticles = articles
        .filter(isMovie)
        .slice(0, 8);

    createCategoryGrid(
        $("#cinemaGrid"),
        movieArticles
    );


    /* =====================================================
       SPORTS
    ===================================================== */

    const sportsArticles = articles
        .filter(isSports)
        .slice(0, 8);

    createCategoryGrid(
        $("#sportsGrid"),
        sportsArticles
    );


    /* =====================================================
       MOST READ
    ===================================================== */

    const mostReadList = $("#mostReadList");

    const mostReadArticles = articles
        .filter(article => !isBigBoss(article))
        .slice(0, 8);

    if (mostReadList) {

        mostReadList.innerHTML = "";

        mostReadArticles.forEach((article, index) => {

            const item = document.createElement("article");

            item.className = "most-read-item";

            item.innerHTML = `

                <div class="most-read-number">
                    ${String(index + 1).padStart(2, "0")}
                </div>

                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="lazy"
                >

                <div class="most-read-title">
                    ${article.title}
                </div>

            `;

            item.addEventListener("click", function () {
                openArticle(article);
            });

            mostReadList.appendChild(item);

        });

    }


    /* =====================================================
       CATEGORY NAME
    ===================================================== */

    function getCategoryName(category) {

        const names = {

            "business": "BUSINESS",

            "bigboss10": "BIGG BOSS",

            "sports": "SPORTS",

            "cinema": "MOVIES",

            "movies": "MOVIES",

            "movie": "MOVIES",

            "ap": "AP NEWS",

            "ts": "TS NEWS",

            "andhra": "AP NEWS",

            "telangana": "TS NEWS",

            "agriculture": "AGRICULTURE",

            "automobiles": "AUTO",

            "politics": "POLITICS",

            "human-interest": "NEWS",

            "lifestyle": "LIFESTYLE",

            "news": "TOP NEWS"

        };

        return names[category] || "NEWS";

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch = function () {

        const box = $("#searchBox");

        if (!box) {
            return;
        }

        box.classList.toggle("active");

        if (box.classList.contains("active")) {

            const input = $("#searchInput");

            if (input) {
                setTimeout(() => input.focus(), 100);
            }

        }

    };


    window.searchNews = function () {

        const input = $("#searchInput");

        if (!input) {
            return;
        }

        const query =
            input.value.trim().toLowerCase();

        if (!query) {
            return;
        }

        const result =
            articles.find(article =>
                article.title.toLowerCase().includes(query)
            );

        if (result) {

            openArticle(result);

        } else {

            alert("వార్త దొరకలేదు.");

        }

    };


    /* =====================================================
       ENTER KEY SEARCH
    ===================================================== */

    const searchInput = $("#searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    window.searchNews();
                }

            }
        );

    }


    /* =====================================================
       THEME
    ===================================================== */

    window.toggleTheme = function () {

        document.body.classList.toggle("light-theme");

        const button = $("#themeButton");

        if (!button) {
            return;
        }

        if (
            document.body.classList.contains("light-theme")
        ) {

            button.innerHTML = "☀️ Light";

            localStorage.setItem(
                "bs360-theme",
                "light"
            );

        } else {

            button.innerHTML = "🌙 Dark";

            localStorage.setItem(
                "bs360-theme",
                "dark"
            );

        }

    };


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem("bs360-theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");

        const button = $("#themeButton");

        if (button) {
            button.innerHTML = "☀️ Light";
        }

    }


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    window.toggleMobileNav = function () {

        const nav = $("#navLinks");

        if (nav) {
            nav.classList.toggle("mobile-open");
        }

    };


    /* =====================================================
       PAUSE AUTO SLIDERS WHEN TAB HIDDEN
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {
                document.body.classList.add(
                    "page-hidden"
                );
            } else {
                document.body.classList.remove(
                    "page-hidden"
                );
            }

        }
    );

});
