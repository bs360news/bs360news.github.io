/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   CATEGORY SAFE + SEPARATE SECTIONS VERSION
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
       SOURCE
    ===================================================== */

    const source = $("#legacyNewsSource");

    if (!source) {
        console.warn("BS360: legacyNewsSource not found");
        return;
    }


    /* =====================================================
       READ ALL ARTICLES
    ===================================================== */

    const allArticles = $$(".news-item.post", source)
        .map((item) => {

            const image = $("img", item);
            const title = $(".news-content p", item);

            return {
                category: String(item.dataset.category || "")
                    .trim()
                    .toLowerCase(),

                url: String(item.dataset.url || "").trim(),

                image: image
                    ? String(image.getAttribute("src") || "").trim()
                    : "",

                alt: image
                    ? String(image.getAttribute("alt") || "").trim()
                    : "",

                title: title
                    ? String(title.textContent || "").trim()
                    : ""
            };

        })
        .filter(item =>
            item.url &&
            item.title
        );


    /* =====================================================
       NORMALIZE CATEGORY
    ===================================================== */

    function normalizeCategory(category) {

        const value = String(category || "")
            .trim()
            .toLowerCase();

        if (
            value === "ap/ts" ||
            value === "ap-ts" ||
            value === "apts" ||
            value === "ap & ts" ||
            value === "ap&ts"
        ) {
            return "apts";
        }

        if (
            value === "sports" ||
            value === "sport"
        ) {
            return "sports";
        }

        if (
            value === "cinema" ||
            value === "entertainment" ||
            value === "movies" ||
            value === "movie"
        ) {
            return "cinema";
        }

        if (
            value === "business" ||
            value === "business-news"
        ) {
            return "business";
        }

        if (
            value === "bigboss10" ||
            value === "bigboss" ||
            value === "big boss"
        ) {
            return "bigboss10";
        }

        return value;
    }


    /* =====================================================
       CATEGORY ARTICLES
    ===================================================== */

    function getCategoryArticles(category) {

        const normalized = normalizeCategory(category);

        const seen = new Set();

        return allArticles.filter(article => {

            if (normalizeCategory(article.category) !== normalized) {
                return false;
            }

            const key = article.url
                .toLowerCase()
                .split("?")[0]
                .split("#")[0];

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;

        });

    }


    /* =====================================================
       SEPARATE CATEGORY DATA
    ===================================================== */

    const apTsArticles =
        getCategoryArticles("apts");

    const sportsArticles =
        getCategoryArticles("sports");

    const entertainmentArticles =
        getCategoryArticles("cinema");

    const businessArticles =
        getCategoryArticles("business");


    /* =====================================================
       NORMAL ARTICLES
       BIGG BOSS EXCLUDED
    ===================================================== */

    const normalArticles = allArticles.filter(article => {

        return normalizeCategory(article.category) !== "bigboss10";

    });


    /* =====================================================
       UNIQUE ARTICLES
    ===================================================== */

    function uniqueArticles(list) {

        const seen = new Set();

        return list.filter(article => {

            const key = String(article.url || "")
                .trim()
                .toLowerCase()
                .split("?")[0]
                .split("#")[0];

            if (!key || seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;

        });

    }


    /* =====================================================
       ARTICLE CARD HTML
    ===================================================== */

    function articleCard(article, className = "") {

        return `
            <a
                href="${article.url}"
                class="${className}"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt || article.title}"
                    loading="lazy"
                >

                <div class="card-content">

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>
        `;

    }


    /* =====================================================
       LATEST NEWS
       EXACTLY 6
       ALL CATEGORY NEWS
    ===================================================== */

    const latestTarget = $("#topStory");

    if (latestTarget) {

        const latestArticles =
            uniqueArticles(normalArticles).slice(0, 6);

        latestTarget.innerHTML = `
            <div class="latest-news-grid">

                ${latestArticles.map(article => {

                    return articleCard(
                        article,
                        "latest-news-card"
                    );

                }).join("")}

            </div>
        `;

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

                <img
                    src="${article.image}"
                    alt="${article.alt || article.title}"
                    loading="lazy"
                >

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

    function categorySmallCard(article) {

        return `
            <a
                href="${article.url}"
                class="category-small-card"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt || article.title}"
                    loading="lazy"
                >

                <div class="category-small-content">

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>
        `;

    }


    /* =====================================================
       RENDER CATEGORY
       1 BIG + 4 SMALL
       NO FALLBACK
    ===================================================== */

    function renderCategory(targetSelector, data) {

        const target = $(targetSelector);

        if (!target) {
            return;
        }

        const articles =
            uniqueArticles(data).slice(0, 5);

        if (!articles.length) {

            target.innerHTML = "";

            return;
        }

        const featured = articles[0];

        const smallArticles =
            articles.slice(1, 5);

        target.innerHTML = `

            <div class="category-layout">

                <div class="category-feature-wrap">

                    ${categoryFeature(featured)}

                </div>

                <div class="category-small-grid">

                    ${smallArticles.map(article => {

                        return categorySmallCard(article);

                    }).join("")}

                </div>

            </div>

        `;

    }


    /* =====================================================
       AP & TS
       SEPARATE ONLY
    ===================================================== */

    renderCategory(
        "#sliderTrack",
        apTsArticles
    );


    /* =====================================================
       SPORTS
       SEPARATE ONLY
    ===================================================== */

    renderCategory(
        "#sportsGrid",
        sportsArticles
    );


    /* =====================================================
       ENTERTAINMENT / CINEMA
       SEPARATE ONLY
    ===================================================== */

    renderCategory(
        "#cinemaGrid",
        entertainmentArticles
    );


    /* =====================================================
       BUSINESS
       SEPARATE ONLY
    ===================================================== */

    renderCategory(
        "#businessGrid",
        businessArticles
    );


    /* =====================================================
       TRENDING
       
       IMPORTANT:
       MANUAL HTML CARDS WILL NOT BE OVERWRITTEN
    ===================================================== */

    const trendingTarget = $("#trendingGrid");

    if (trendingTarget) {

        console.log(
            "BS360 TRENDING CARDS:",
            trendingTarget.children.length
        );

        /*
         * Trending cards are kept from homepage HTML.
         * JS will NOT mix Latest / Sports / Cinema /
         * Business / AP&TS articles into Trending.
         */

    }


    /* =====================================================
       MOST READ
       
       IMPORTANT:
       MANUAL HTML CARDS WILL NOT BE OVERWRITTEN
    ===================================================== */

    const mostReadTarget = $("#mostReadList");

    if (mostReadTarget) {

        console.log(
            "BS360 MOST READ CARDS:",
            mostReadTarget.children.length
        );

        /*
         * Most Read cards are kept from homepage HTML.
         * JS will NOT replace them with Latest articles.
         */

    }


    /* =====================================================
       BIGG BOSS 10
       SEPARATE
    ===================================================== */

    const bigBossArticles =
        getCategoryArticles("bigboss10");


    const bigBossTrack =
        $("#bigbossTrack");


    if (bigBossTrack && bigBossArticles.length) {

        bigBossTrack.innerHTML =
            bigBossArticles
                .slice(0, 10)
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="bigboss-card"
                        >

                            <img
                                src="${article.image}"
                                alt="${article.alt || article.title}"
                                loading="lazy"
                            >

                            <div class="bigboss-overlay">

                                <h3>
                                    ${article.title}
                                </h3>

                            </div>

                        </a>
                    `;

                })
                .join("");

    }


    /* =====================================================
       PHOTO GALLERY
       SEPARATE
    ===================================================== */

    const photoGallery =
        $("#photoGallery");


    if (photoGallery) {

        const galleryArticles =
            uniqueArticles(normalArticles)
                .filter(article => article.image)
                .slice(0, 8);


        photoGallery.innerHTML =
            galleryArticles
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="photo-card"
                        >

                            <img
                                src="${article.image}"
                                alt="${article.alt || article.title}"
                                loading="lazy"
                            >

                            <div class="photo-title">

                                ${article.title}

                            </div>

                        </a>
                    `;

                })
                .join("");

    }


    /* =====================================================
       VIDEO NEWS
       SEPARATE
    ===================================================== */

    const videoNews =
        $("#videoNews");


    if (videoNews) {

        const videoArticles =
            uniqueArticles(normalArticles)
                .slice(0, 6);


        videoNews.innerHTML =
            videoArticles
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="video-card"
                        >

                            <div class="video-image-wrap">

                                <img
                                    src="${article.image}"
                                    alt="${article.alt || article.title}"
                                    loading="lazy"
                                >

                                <span class="video-play">
                                    ▶
                                </span>

                            </div>

                            <h3>
                                ${article.title}
                            </h3>

                        </a>
                    `;

                })
                .join("");

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    const searchInput =
        $("#searchInput");

    const searchButton =
        $("#searchButton");

    const searchResults =
        $("#searchResults");


    function performSearch() {

        if (!searchInput || !searchResults) {
            return;
        }


        const query =
            String(searchInput.value || "")
                .trim()
                .toLowerCase();


        if (!query) {

            searchResults.innerHTML = "";

            return;
        }


        const results =
            uniqueArticles(allArticles)
                .filter(article => {

                    return (
                        article.title
                            .toLowerCase()
                            .includes(query)
                        ||
                        article.category
                            .toLowerCase()
                            .includes(query)
                    );

                })
                .slice(0, 20);


        if (!results.length) {

            searchResults.innerHTML = `
                <div class="search-no-result">
                    వార్తలు ఏవీ కనిపించలేదు
                </div>
            `;

            return;
        }


        searchResults.innerHTML =
            results
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="search-result-item"
                        >

                            <img
                                src="${article.image}"
                                alt="${article.alt || article.title}"
                                loading="lazy"
                            >

                            <div>

                                <h3>
                                    ${article.title}
                                </h3>

                            </div>

                        </a>
                    `;

                })
                .join("");

    }


    if (searchButton) {

        searchButton.addEventListener(
            "click",
            performSearch
        );

    }


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    performSearch();

                }

            }
        );

    }


    /* =====================================================
       THEME
    ===================================================== */

    const themeButton =
        $("#themeButton");


    function applyTheme(theme) {

        if (theme === "dark") {

            document.body.classList.add("dark-mode");

            if (themeButton) {
                themeButton.textContent = "☀️ Light";
            }

        } else {

            document.body.classList.remove("dark-mode");

            if (themeButton) {
                themeButton.textContent = "🌙 Dark";
            }

        }

    }


    const savedTheme =
        localStorage.getItem("bs360-theme");


    if (savedTheme) {

        applyTheme(savedTheme);

    } else {

        applyTheme("light");

    }


    if (themeButton) {

        themeButton.addEventListener(
            "click",
            function () {

                const dark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                const newTheme =
                    dark
                        ? "light"
                        : "dark";


                applyTheme(newTheme);


                localStorage.setItem(
                    "bs360-theme",
                    newTheme
                );

            }
        );

    }


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    const menuButton =
        $("#menuToggle");


    const mobileNav =
        $("#mobileNav");


    if (menuButton && mobileNav) {

        menuButton.addEventListener(
            "click",
            function () {

                mobileNav.classList.toggle(
                    "active"
                );

            }
        );


        $$(".mobile-nav-link", mobileNav)
            .forEach(link => {

                link.addEventListener(
                    "click",
                    function () {

                        mobileNav.classList.remove(
                            "active"
                        );

                    }
                );

            });

    }


    /* =====================================================
       ESC KEY
       CLOSE SEARCH / MOBILE NAV
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key !== "Escape") {
                return;
            }


            if (searchResults) {
                searchResults.innerHTML = "";
            }


            if (searchInput) {
                searchInput.value = "";
            }


            if (mobileNav) {

                mobileNav.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =====================================================
       DEBUG
    ===================================================== */

    console.log(
        "BS360 Homepage Loaded"
    );

    console.log(
        "Total Articles:",
        allArticles.length
    );

    console.log(
        "Latest:",
        uniqueArticles(normalArticles).slice(0, 6).length
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
        "Bigg Boss:",
        bigBossArticles.length
    );

});
