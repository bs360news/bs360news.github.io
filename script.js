/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   CATEGORY SEPARATION SAFE VERSION
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


    function normalizeUrl(url) {

        return String(url || "")
            .trim()
            .replace(/^\.?\//, "")
            .split("?")[0]
            .split("#")[0]
            .toLowerCase();

    }


    function cleanText(text) {

        return String(text || "")
            .replace(/\s+/g, " ")
            .trim();

    }


    /* =====================================================
       LEGACY ARTICLES
    ===================================================== */

    const source = $("#legacyNewsSource");

    if (!source) {
        console.warn("legacyNewsSource not found");
        return;
    }


    const allArticles = $$(".news-item.post", source)
        .map(article => {

            const image = $("img", article);
            const titleElement = $(".news-content p", article);

            return {

                element: article,

                category: cleanText(
                    article.dataset.category
                ).toLowerCase(),

                url: normalizeUrl(
                    article.dataset.url
                ),

                title: cleanText(
                    titleElement
                        ? titleElement.textContent
                        : ""
                ),

                image: image
                    ? image.getAttribute("src")
                    : "",

                alt: image
                    ? image.getAttribute("alt")
                    : ""

            };

        })
        .filter(article =>
            article.url &&
            article.title
        );


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    function getCategoryArticles(category) {

        const wanted = String(category)
            .toLowerCase()
            .trim();

        return allArticles.filter(article =>
            article.category === wanted
        );

    }


    /* =====================================================
       CARD CREATOR
    ===================================================== */

    function createCard(article, className = "news-card") {

        const link = document.createElement("a");

        link.href = article.url;
        link.className = className;

        const img = document.createElement("img");

        img.src = article.image;
        img.alt = article.alt || article.title;
        img.loading = "lazy";


        const title = document.createElement("h3");

        title.textContent = article.title;


        link.appendChild(img);
        link.appendChild(title);

        return link;

    }


    /* =====================================================
       LATEST NEWS
       
       IMPORTANT:
       Latest gets articles from ALL categories.
       It does NOT change category sections.
    ===================================================== */

    function buildLatestNews() {

        const sidebar = $("#latestSidebar");
        const hero = $("#topStory");

        if (!sidebar || !hero) return;


        sidebar.innerHTML = "";
        hero.innerHTML = "";


        const latest = allArticles.slice(0, 6);


        if (!latest.length) return;


        /* =================================================
           LEFT SIDE
        ================================================= */

        latest.slice(1, 5).forEach(article => {

            const item = document.createElement("a");

            item.href = article.url;
            item.className = "latest-side-item";


            const img = document.createElement("img");

            img.src = article.image;
            img.alt = article.alt || article.title;
            img.loading = "lazy";


            const text = document.createElement("span");

            text.textContent = article.title;


            item.appendChild(img);
            item.appendChild(text);

            sidebar.appendChild(item);

        });


        /* =================================================
           MAIN HERO
        ================================================= */

        const mainArticle = latest[0];

        const heroLink = document.createElement("a");

        heroLink.href = mainArticle.url;
        heroLink.className = "hero-card";


        const heroImage = document.createElement("img");

        heroImage.src = mainArticle.image;
        heroImage.alt =
            mainArticle.alt || mainArticle.title;

        heroImage.loading = "eager";


        const heroTitle = document.createElement("h1");

        heroTitle.textContent =
            mainArticle.title;


        heroLink.appendChild(heroImage);
        heroLink.appendChild(heroTitle);

        hero.appendChild(heroLink);

    }


    /* =====================================================
       CATEGORY CAROUSEL
    ===================================================== */

    function buildCategoryGrid(
        containerId,
        category,
        limit = 6
    ) {

        const container = document.getElementById(
            containerId
        );

        if (!container) return;


        container.innerHTML = "";


        const articles =
            getCategoryArticles(category)
                .slice(0, limit);


        articles.forEach(article => {

            container.appendChild(
                createCard(
                    article,
                    "news-card"
                )
            );

        });

    }


    /* =====================================================
       AP & TS
    ===================================================== */

    buildCategoryGrid(
        "sliderTrack",
        "ap/ts",
        6
    );


    /* =====================================================
       SPORTS
    ===================================================== */

    buildCategoryGrid(
        "sportsGrid",
        "sports",
        6
    );


    /* =====================================================
       ENTERTAINMENT
    ===================================================== */

    buildCategoryGrid(
        "cinemaGrid",
        "cinema",
        6
    );


    /* =====================================================
       BUSINESS
    ===================================================== */

    buildCategoryGrid(
        "businessGrid",
        "business",
        6
    );


    /* =====================================================
       AFTER MOST READ
    ===================================================== */

    function buildAfterCategory(
        containerId,
        category,
        limit = 6
    ) {

        const container =
            document.getElementById(containerId);

        if (!container) return;


        container.innerHTML = "";


        const articles =
            getCategoryArticles(category)
                .slice(0, limit);


        articles.forEach(article => {

            const card =
                createCard(
                    article,
                    "after-news-card"
                );

            container.appendChild(card);

        });

    }


    /* =====================================================
       AFTER AP & TS
    ===================================================== */

    buildAfterCategory(
        "afterApTsGrid",
        "ap/ts",
        6
    );


    /* =====================================================
       AFTER SPORTS
    ===================================================== */

    buildAfterCategory(
        "afterSportsGrid",
        "sports",
        6
    );


    /* =====================================================
       AFTER ENTERTAINMENT
    ===================================================== */

    buildAfterCategory(
        "afterEntertainmentGrid",
        "cinema",
        6
    );


    /* =====================================================
       AFTER BUSINESS
    ===================================================== */

    buildAfterCategory(
        "afterBusinessGrid",
        "business",
        6
    );


    /* =====================================================
       MOST READ
       
       VERY IMPORTANT:
       DO NOT TOUCH THIS.
       
       Whatever cards are manually inside
       #mostReadList will remain there.
       
       Legacy articles will NOT be copied here.
    ===================================================== */

    const mostRead =
        $("#mostReadList");

    if (mostRead) {

        /* Keep manually added cards */

        mostRead.innerHTML =
            mostRead.innerHTML.trim();

    }


    /* =====================================================
       TRENDING
       
       VERY IMPORTANT:
       DO NOT AUTO-FILL FROM LEGACY ARTICLES.
       
       Whatever cards are manually inside
       #trendingGrid remain there.
    ===================================================== */

    const trending =
        $("#trendingGrid");

    if (trending) {

        trending.innerHTML =
            trending.innerHTML.trim();

    }


    /* =====================================================
       TRENDING DESKTOP - 6 COLUMNS
    ===================================================== */

    const trendingStyle =
        document.createElement("style");

    trendingStyle.textContent = `

        .trending-grid{
            display:grid !important;
            grid-template-columns:
                repeat(6,minmax(0,1fr)) !important;
            gap:14px !important;
            width:100% !important;
        }


        .trending-grid .trending-card{
            min-width:0 !important;
            width:100% !important;
        }


        .trending-grid .trending-card img{
            width:100% !important;
            aspect-ratio:16 / 9 !important;
            height:auto !important;
            object-fit:cover !important;
            display:block !important;
        }


        .trending-grid .trending-card h3{
            margin:8px 0 0 !important;
            line-height:1.4 !important;
        }


        @media(max-width:1000px){

            .trending-grid{
                grid-template-columns:
                    repeat(3,minmax(0,1fr)) !important;
            }

        }


        @media(max-width:600px){

            .trending-grid{
                grid-template-columns:
                    repeat(3,minmax(0,1fr)) !important;
                gap:10px !important;
            }

            .trending-grid .trending-card h3{
                font-size:13px !important;
                line-height:1.35 !important;
            }

        }

    `;

    document.head.appendChild(
        trendingStyle
    );


    /* =====================================================
       CAROUSEL BUTTONS
    ===================================================== */

    function setupCarousel(
        trackId,
        prevId,
        nextId
    ) {

        const track =
            document.getElementById(trackId);

        const prev =
            document.getElementById(prevId);

        const next =
            document.getElementById(nextId);


        if (!track) return;


        if (prev) {

            prev.addEventListener(
                "click",
                function () {

                    track.scrollBy({
                        left: -320,
                        behavior: "smooth"
                    });

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function () {

                    track.scrollBy({
                        left: 320,
                        behavior: "smooth"
                    });

                }
            );

        }

    }


    setupCarousel(
        "sliderTrack",
        "sliderPrev",
        "sliderNext"
    );


    /* =====================================================
       AUTO SCROLL - AP & TS
    ===================================================== */

    function autoScroll(
        elementId,
        speed = 5000
    ) {

        const element =
            document.getElementById(elementId);

        if (!element) return;


        if (element.children.length < 2)
            return;


        let timer;


        function start() {

            timer = setInterval(
                function () {

                    const maxScroll =
                        element.scrollWidth -
                        element.clientWidth;


                    if (
                        element.scrollLeft >=
                        maxScroll - 5
                    ) {

                        element.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });

                    } else {

                        element.scrollBy({
                            left: 300,
                            behavior: "smooth"
                        });

                    }

                },
                speed
            );

        }


        function stop() {

            clearInterval(timer);

        }


        element.addEventListener(
            "mouseenter",
            stop
        );

        element.addEventListener(
            "mouseleave",
            start
        );

        start();

    }


    autoScroll(
        "sliderTrack",
        5000
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch = function () {

        const box =
            document.getElementById(
                "searchBox"
            );

        if (!box) return;

        box.classList.toggle("active");

    };


    window.searchNews = function () {

        const input =
            document.getElementById(
                "searchInput"
            );

        if (!input) return;


        const query =
            cleanText(
                input.value
            ).toLowerCase();


        if (!query) return;


        const results =
            allArticles.filter(article =>
                article.title
                    .toLowerCase()
                    .includes(query)
            );


        if (!results.length) {

            alert(
                "వార్తలు కనిపించలేదు."
            );

            return;

        }


        const first =
            results[0];

        window.location.href =
            first.url;

    };


    /* =====================================================
       ENTER KEY SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    window.searchNews();

                }

            }
        );

    }


    /* =====================================================
       THEME
    ===================================================== */

    window.toggleTheme = function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const button =
            document.getElementById(
                "themeButton"
            );


        if (!button) return;


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            button.textContent =
                "☀️ Light";

            localStorage.setItem(
                "bs360-theme",
                "dark"
            );

        } else {

            button.textContent =
                "🌙 Dark";

            localStorage.setItem(
                "bs360-theme",
                "light"
            );

        }

    };


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "bs360-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );


        const button =
            document.getElementById(
                "themeButton"
            );


        if (button) {

            button.textContent =
                "☀️ Light";

        }

    }


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    window.toggleMobileNav = function () {

        const nav =
            document.getElementById(
                "navLinks"
            );

        if (!nav) return;

        nav.classList.toggle(
            "mobile-open"
        );

    };


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "BS 360 NEWS loaded"
    );

    console.log(
        "Total articles:",
        allArticles.length
    );

    console.log(
        "AP/TS:",
        getCategoryArticles("ap/ts").length
    );

    console.log(
        "Sports:",
        getCategoryArticles("sports").length
    );

    console.log(
        "Entertainment:",
        getCategoryArticles("cinema").length
    );

    console.log(
        "Business:",
        getCategoryArticles("business").length
    );

});
