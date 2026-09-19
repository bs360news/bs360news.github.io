/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   SEPARATE ARTICLE SOURCES VERSION

   Latest      -> #latestNewsSource
   Trending    -> #trendingSource
   Most Read   -> #mostReadSource
   AP & TS     -> #aptsSource
   Sports      -> #sportsSource
   Entertainment -> #entertainmentSource
   Business    -> #businessSource
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
       NORMALIZE URL
    ===================================================== */

    function normalizeUrl(url) {

        return String(url || "")
            .trim()
            .replace(/^\.?\//, "")
            .split("?")[0]
            .split("#")[0]
            .toLowerCase();

    }


    /* =====================================================
       READ ARTICLES FROM ONE SEPARATE SOURCE
    ===================================================== */

    function readSource(sourceId) {

        const source = document.getElementById(sourceId);

        if (!source) {

            console.warn(
                "BS360 SOURCE NOT FOUND:",
                sourceId
            );

            return [];

        }


        const articles = $$(
            ".news-item.post",
            source
        );


        const seen = new Set();


        return articles
            .map(function (item) {

                const image = $("img", item);

                const title = $(".news-content p", item);

                const url =
                    item.getAttribute("data-url") || "";


                return {

                    url: String(url).trim(),

                    image: image
                        ? String(
                            image.getAttribute("src") || ""
                          ).trim()
                        : "",

                    alt: image
                        ? String(
                            image.getAttribute("alt") || ""
                          ).trim()
                        : "",

                    title: title
                        ? String(
                            title.textContent || ""
                          ).trim()
                        : ""

                };

            })

            .filter(function (article) {

                return (
                    article.url &&
                    article.title
                );

            })

            .filter(function (article) {

                const key =
                    normalizeUrl(article.url);


                if (seen.has(key)) {
                    return false;
                }


                seen.add(key);

                return true;

            });

    }


    /* =====================================================
       SEPARATE SOURCES
    ===================================================== */

    const latestArticles =
        readSource("latestNewsSource");


    const trendingArticles =
        readSource("trendingSource");


    const mostReadArticles =
        readSource("mostReadSource");


    const apTsArticles =
        readSource("aptsSource");


    const sportsArticles =
        readSource("sportsSource");


    const entertainmentArticles =
        readSource("entertainmentSource");


    const businessArticles =
        readSource("businessSource");


    /* =====================================================
       CARD HELPERS
    ===================================================== */

    function imageHTML(article) {

        return `
            <img
                src="${article.image}"
                alt="${article.alt || article.title}"
                loading="lazy"
            >
        `;

    }


    /* =====================================================
       LATEST NEWS
    ===================================================== */

    function renderLatestNews() {

        const target =
            document.getElementById("topStory");


        if (!target) {
            return;
        }


        const articles =
            latestArticles.slice(0, 6);


        if (!articles.length) {

            target.innerHTML = "";

            return;

        }


        target.innerHTML = `

            <div class="latest-news-grid">

                ${articles.map(function (article) {

                    return `

                        <a
                            href="${article.url}"
                            class="latest-news-card"
                        >

                            ${imageHTML(article)}

                            <div class="card-content">

                                <h3>
                                    ${article.title}
                                </h3>

                            </div>

                        </a>

                    `;

                }).join("")}

            </div>

        `;

    }


    /* =====================================================
       LATEST SIDEBAR
    ===================================================== */

    function renderLatestSidebar() {

        const target =
            document.getElementById("latestSidebar");


        if (!target) {
            return;
        }


        const articles =
            latestArticles.slice(0, 5);


        target.innerHTML =
            articles.map(function (article) {

                return `

                    <a
                        href="${article.url}"
                        class="sidebar-item"
                    >

                        ${imageHTML(article)}

                        <span>
                            ${article.title}
                        </span>

                    </a>

                `;

            }).join("");

    }


    /* =====================================================
       TRENDING
       SEPARATE SOURCE ONLY
    ===================================================== */

    function renderTrending() {

        const target =
            document.getElementById("trendingGrid");


        if (!target) {
            return;
        }


        const articles =
            trendingArticles.slice(0, 12);


        if (!articles.length) {

            target.innerHTML = "";

            return;

        }


        target.innerHTML =
            articles.map(function (article) {

                return `

                    <a
                        href="${article.url}"
                        class="trending-card"
                    >

                        ${imageHTML(article)}

                        <h3>
                            ${article.title}
                        </h3>

                    </a>

                `;

            }).join("");

    }


    /* =====================================================
       MOST READ
       SEPARATE SOURCE ONLY
    ===================================================== */

    function renderMostRead() {

        const target =
            document.getElementById("mostReadList");


        if (!target) {
            return;
        }


        const articles =
            mostReadArticles.slice(0, 6);


        if (!articles.length) {

            target.innerHTML = "";

            return;

        }


        target.innerHTML =
            articles.map(function (article) {

                return `

                    <a
                        href="${article.url}"
                        class="trending-card"
                    >

                        ${imageHTML(article)}

                        <h3>
                            ${article.title}
                        </h3>

                    </a>

                `;

            }).join("");

    }


    /* =====================================================
       CATEGORY FEATURE CARD
    ===================================================== */

    function categoryFeature(article) {

        return `

            <a
                href="${article.url}"
                class="category-feature"
            >

                ${imageHTML(article)}

                <div class="category-feature-content">

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>

        `;

    }


    /* =====================================================
       CATEGORY SMALL CARD
    ===================================================== */

    function categorySmall(article) {

        return `

            <a
                href="${article.url}"
                class="category-small-card"
            >

                ${imageHTML(article)}

                <div class="category-small-content">

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>

        `;

    }


    /* =====================================================
       RENDER MAIN CATEGORY
       1 BIG + UP TO 4 SMALL
    ===================================================== */

    function renderCategory(targetId, articles) {

        const target =
            document.getElementById(targetId);


        if (!target) {
            return;
        }


        const list =
            articles.slice(0, 5);


        if (!list.length) {

            target.innerHTML = "";

            return;

        }


        const big =
            list[0];


        const small =
            list.slice(1, 5);


        target.innerHTML = `

            <div class="category-layout">

                <div class="category-feature-wrap">

                    ${categoryFeature(big)}

                </div>

                <div class="category-small-grid">

                    ${small.map(function (article) {

                        return categorySmall(article);

                    }).join("")}

                </div>

            </div>

        `;

    }


    /* =====================================================
       AP & TS
       ONLY APTS SOURCE
    ===================================================== */

    function renderApTs() {

        renderCategory(
            "sliderTrack",
            apTsArticles
        );

    }


    /* =====================================================
       SPORTS
       ONLY SPORTS SOURCE
    ===================================================== */

    function renderSports() {

        renderCategory(
            "sportsGrid",
            sportsArticles
        );

    }


    /* =====================================================
       ENTERTAINMENT
       ONLY ENTERTAINMENT SOURCE
    ===================================================== */

    function renderEntertainment() {

        renderCategory(
            "cinemaGrid",
            entertainmentArticles
        );

    }


    /* =====================================================
       BUSINESS
       ONLY BUSINESS SOURCE
    ===================================================== */

    function renderBusiness() {

        renderCategory(
            "businessGrid",
            businessArticles
        );

    }


    /* =====================================================
       AFTER MOST READ
       
       These also use ONLY their respective category source.
    ===================================================== */

    function renderAfterGrid(
        targetId,
        articles
    ) {

        const target =
            document.getElementById(targetId);


        if (!target) {
            return;
        }


        const list =
            articles.slice(0, 9);


        if (!list.length) {

            target.innerHTML = "";

            return;

        }


        target.innerHTML =
            list.map(function (article) {

                return `

                    <a
                        href="${article.url}"
                        class="news-card"
                    >

                        ${imageHTML(article)}

                        <div class="news-card-content">

                            <h3>
                                ${article.title}
                            </h3>

                        </div>

                    </a>

                `;

            }).join("");

    }


    /* =====================================================
       RENDER AFTER CATEGORY SECTIONS
    ===================================================== */

    function renderAfterCategories() {

        renderAfterGrid(
            "afterApTsGrid",
            apTsArticles
        );


        renderAfterGrid(
            "afterSportsGrid",
            sportsArticles
        );


        renderAfterGrid(
            "afterEntertainmentGrid",
            entertainmentArticles
        );


        renderAfterGrid(
            "afterBusinessGrid",
            businessArticles
        );

    }


    /* =====================================================
       RENDER EVERYTHING
    ===================================================== */

    renderLatestNews();

    renderLatestSidebar();

    renderApTs();

    renderSports();

    renderMostRead();

    renderEntertainment();

    renderBusiness();

    renderTrending();

    renderAfterCategories();


    /* =====================================================
       SEARCH
       
       SEARCHES ALL SEPARATE SOURCES
       WITHOUT MIXING SECTION DISPLAY
    ===================================================== */

    const searchInput =
        document.getElementById("searchInput");


    const searchBox =
        document.getElementById("searchBox");


    function getAllSearchArticles() {

        return [

            ...latestArticles,

            ...trendingArticles,

            ...mostReadArticles,

            ...apTsArticles,

            ...sportsArticles,

            ...entertainmentArticles,

            ...businessArticles

        ];

    }


    function searchNews() {

        if (!searchInput) {
            return;
        }


        const query =
            String(searchInput.value || "")
                .trim()
                .toLowerCase();


        if (!query) {
            return;
        }


        const all =
            getAllSearchArticles();


        const seen =
            new Set();


        const results =
            all.filter(function (article) {

                const key =
                    normalizeUrl(article.url);


                if (seen.has(key)) {
                    return false;
                }


                if (
                    !article.title
                        .toLowerCase()
                        .includes(query)
                ) {

                    return false;

                }


                seen.add(key);

                return true;

            });


        /*
         * Search results page / popup
         * existing website behavior can use this.
         */

        const oldResults =
            document.getElementById(
                "searchResults"
            );


        if (oldResults) {

            oldResults.innerHTML =
                results.map(function (article) {

                    return `

                        <a
                            href="${article.url}"
                            class="search-result-item"
                        >

                            ${imageHTML(article)}

                            <div>

                                <h3>
                                    ${article.title}
                                </h3>

                            </div>

                        </a>

                    `;

                }).join("");

        }


        if (
            !oldResults &&
            results.length === 1
        ) {

            window.location.href =
                results[0].url;

        }

    }


    window.searchNews =
        searchNews;


    /* =====================================================
       SEARCH TOGGLE
    ===================================================== */

    window.toggleSearch =
        function () {

            if (!searchBox) {
                return;
            }


            searchBox.classList.toggle(
                "active"
            );


            if (
                searchBox.classList.contains(
                    "active"
                ) &&
                searchInput
            ) {

                searchInput.focus();

            }

        };


    /* =====================================================
       ENTER KEY SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchNews();

                }

            }
        );

    }


    /* =====================================================
       THEME
    ===================================================== */

    const themeButton =
        document.getElementById(
            "themeButton"
        );


    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add(
                "dark-mode"
            );


            if (themeButton) {

                themeButton.textContent =
                    "☀️ Light";

            }

        } else {

            document.body.classList.remove(
                "dark-mode"
            );


            if (themeButton) {

                themeButton.textContent =
                    "🌙 Dark";

            }

        }

    }


    window.toggleTheme =
        function () {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            const newTheme =
                isDark
                    ? "light"
                    : "dark";


            applyTheme(newTheme);


            localStorage.setItem(
                "bs360-theme",
                newTheme
            );

        };


    const savedTheme =
        localStorage.getItem(
            "bs360-theme"
        );


    applyTheme(
        savedTheme || "light"
    );


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    window.toggleMobileNav =
        function () {

            if (!navLinks) {
                return;
            }


            navLinks.classList.toggle(
                "mobile-active"
            );

        };


    /* =====================================================
       CAROUSEL BUTTONS
    ===================================================== */

    const newsSlider =
        document.getElementById(
            "newsSlider"
        );


    const sliderPrev =
        document.getElementById(
            "sliderPrev"
        );


    const sliderNext =
        document.getElementById(
            "sliderNext"
        );


    if (newsSlider && sliderPrev) {

        sliderPrev.addEventListener(
            "click",
            function () {

                newsSlider.scrollBy({

                    left: -320,

                    behavior: "smooth"

                });

            }
        );

    }


    if (newsSlider && sliderNext) {

        sliderNext.addEventListener(
            "click",
            function () {

                newsSlider.scrollBy({

                    left: 320,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            if (searchBox) {

                searchBox.classList.remove(
                    "active"
                );

            }


            if (navLinks) {

                navLinks.classList.remove(
                    "mobile-active"
                );

            }

        }
    );


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "===================================="
    );

    console.log(
        "BS360 SEPARATE SOURCE SYSTEM"
    );

    console.log(
        "Latest:",
        latestArticles.length
    );

    console.log(
        "Trending:",
        trendingArticles.length
    );

    console.log(
        "Most Read:",
        mostReadArticles.length
    );

    console.log(
        "AP & TS:",
        apTsArticles.length
    );

    console.log(
        "Sports:",
        sportsArticles.length
    );

    console.log(
        "Entertainment:",
        entertainmentArticles.length
    );

    console.log(
        "Business:",
        businessArticles.length
    );

    console.log(
        "===================================="
    );

});
