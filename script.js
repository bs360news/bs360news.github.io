/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   CATEGORY SAFE + FALLBACK VERSION
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
        console.error("BS360: #legacyNewsSource not found");
        return;
    }


    /* =====================================================
       READ ALL ARTICLES
    ===================================================== */

    const articles = $$(".news-item.post", source)
        .map(item => {

            const image = $("img", item);
            const title = $(".news-content p", item);

            return {
                category:
                    (item.dataset.category || "")
                        .trim()
                        .toLowerCase(),

                url:
                    item.dataset.url || "#",

                image:
                    image
                        ? image.getAttribute("src")
                        : "",

                alt:
                    image
                        ? (
                            image.getAttribute("alt") ||
                            ""
                        )
                        : "",

                title:
                    title
                        ? title.textContent.trim()
                        : ""
            };

        })
        .filter(article =>
            article.title &&
            article.image
        );


    console.log(
        "BS360 ARTICLES LOADED:",
        articles.length
    );


    /* =====================================================
       CATEGORY NORMALIZER
    ===================================================== */

    function normalizeCategory(category) {

        const value =
            (category || "")
                .trim()
                .toLowerCase()
                .replace(/\s+/g, "");

        if (
            value === "ap" ||
            value === "ts" ||
            value === "apts" ||
            value === "ap/ts" ||
            value === "ap-ts" ||
            value === "ap&ts" ||
            value === "apandts"
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
            value === "movies" ||
            value === "movie" ||
            value === "entertainment"
        ) {
            return "cinema";
        }

        if (
            value === "business" ||
            value === "businessnews"
        ) {
            return "business";
        }

        if (
            value === "bigboss10" ||
            value === "bigboss"
        ) {
            return "bigboss10";
        }

        return value;
    }


    /* =====================================================
       GET CATEGORY ARTICLES
    ===================================================== */

    function getCategoryArticles(category) {

        return articles.filter(article =>
            normalizeCategory(article.category) === category
        );

    }


    /* =====================================================
       CATEGORY FILTERS
    ===================================================== */

    let apTsArticles =
        getCategoryArticles("apts");

    let sportsArticles =
        getCategoryArticles("sports");

    let entertainmentArticles =
        getCategoryArticles("cinema");

    let businessArticles =
        getCategoryArticles("business");


    /* =====================================================
       FALLBACK ARTICLE
       
       If category has ZERO articles,
       take ONE article from another category.
    ===================================================== */

    function getFallbackArticle(
        categoryArticles,
        usedArticles = []
    ) {

        if (categoryArticles.length > 0) {
            return categoryArticles;
        }

        const usedUrls =
            usedArticles.map(article => article.url);

        const fallback =
            articles.find(article => {

                const normalized =
                    normalizeCategory(
                        article.category
                    );

                return (
                    normalized !== "bigboss10" &&
                    !usedUrls.includes(article.url)
                );

            });

        if (fallback) {

            console.log(
                "BS360 FALLBACK ARTICLE USED:",
                fallback.title
            );

            return [fallback];
        }

        return [];
    }


    /* =====================================================
       LATEST NEWS
       BIGBOSS EXCLUDED
    ===================================================== */

    const latestArticles =
        articles.filter(article =>
            normalizeCategory(
                article.category
            ) !== "bigboss10"
        );


    const latestTarget =
        $("#topStory");


    /* =====================================================
       LATEST CARD
    ===================================================== */

    function createLatestCard(article) {

        return `
            <a
                href="${article.url}"
                class="latest-news-card"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt || article.title}"
                    loading="lazy"
                >

                <h3>
                    ${article.title}
                </h3>

            </a>
        `;
    }


    /* =====================================================
       RENDER LATEST NEWS
    ===================================================== */

    function renderLatestNews() {

        if (!latestTarget) {
            console.error(
                "BS360: #topStory not found"
            );
            return;
        }

        if (!latestArticles.length) {

            latestTarget.innerHTML = `
                <p class="latest-empty">
                    తాజా వార్తలు అందుబాటులో లేవు
                </p>
            `;

            return;
        }

        const latestSeven =
            latestArticles.slice(0, 7);

        latestTarget.innerHTML = `
            <div class="latest-news-grid">
                ${latestSeven
                    .map(createLatestCard)
                    .join("")}
            </div>
        `;
    }


    renderLatestNews();


    /* =====================================================
       CATEGORY BIG CARD
    ===================================================== */

    function createCategoryFeature(article) {

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

    function createCategoryCard(article) {

        return `
            <a
                href="${article.url}"
                class="category-card"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt || article.title}"
                    loading="lazy"
                >

                <div class="category-card-content">

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>
        `;
    }


    /* =====================================================
       CATEGORY RENDER
       
       NORMAL:
       1 BIG + SMALL ARTICLES

       EMPTY:
       1 FALLBACK ARTICLE
    ===================================================== */

    function renderCategory(
        target,
        data,
        fallbackPool
    ) {

        if (!target) {
            return;
        }

        target.innerHTML = "";

        let categoryArticles =
            [...data];


        /* =================================================
           FALLBACK
        ================================================= */

        if (!categoryArticles.length) {

            const fallback =
                getFallbackArticle(
                    [],
                    fallbackPool || []
                );

            if (fallback.length) {
                categoryArticles =
                    fallback;
            }
        }


        if (!categoryArticles.length) {
            return;
        }


        const categoryArticlesLimited =
            categoryArticles.slice(0, 5);


        const wrapper =
            document.createElement("div");

        wrapper.className =
            "category-news-layout";


        /* =================================================
           BIG ARTICLE
        ================================================= */

        wrapper.insertAdjacentHTML(
            "beforeend",
            createCategoryFeature(
                categoryArticlesLimited[0]
            )
        );


        /* =================================================
           SMALL ARTICLES
        ================================================= */

        categoryArticlesLimited
            .slice(1)
            .forEach(article => {

                wrapper.insertAdjacentHTML(
                    "beforeend",
                    createCategoryCard(article)
                );

            });


        target.appendChild(wrapper);
    }


    /* =====================================================
       USED FALLBACK TRACKER
    ===================================================== */

    const fallbackUsed = [];


    /* =====================================================
       AP & TS
    ===================================================== */

    if (!apTsArticles.length) {

        apTsArticles =
            getFallbackArticle(
                [],
                fallbackUsed
            );

        fallbackUsed.push(
            ...apTsArticles
        );
    }


    renderCategory(
        $("#sliderTrack"),
        apTsArticles,
        fallbackUsed
    );


    /* =====================================================
       SPORTS
    ===================================================== */

    if (!sportsArticles.length) {

        sportsArticles =
            getFallbackArticle(
                [],
                fallbackUsed
            );

        fallbackUsed.push(
            ...sportsArticles
        );
    }


    renderCategory(
        $("#sportsGrid"),
        sportsArticles,
        fallbackUsed
    );


    /* =====================================================
       ENTERTAINMENT
    ===================================================== */

    if (!entertainmentArticles.length) {

        entertainmentArticles =
            getFallbackArticle(
                [],
                fallbackUsed
            );

        fallbackUsed.push(
            ...entertainmentArticles
        );
    }


    renderCategory(
        $("#cinemaGrid"),
        entertainmentArticles,
        fallbackUsed
    );


    /* =====================================================
       BUSINESS
    ===================================================== */

    if (!businessArticles.length) {

        businessArticles =
            getFallbackArticle(
                [],
                fallbackUsed
            );

        fallbackUsed.push(
            ...businessArticles
        );
    }


    renderCategory(
        $("#businessGrid"),
        businessArticles,
        fallbackUsed
    );


    /* =====================================================
       AFTER MOST READ
       3 COLUMN SECTION
    ===================================================== */

    function createThreeColumnCard(article) {

        return `
            <a
                href="${article.url}"
                class="three-column-news-card"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt || article.title}"
                    loading="lazy"
                >

                <h3>
                    ${article.title}
                </h3>

            </a>
        `;
    }


    function renderThreeColumnGrid(
        target,
        data,
        fallbackPool
    ) {

        if (!target) {
            return;
        }

        target.innerHTML = "";

        let finalData =
            [...data];


        /* =================================================
           FALLBACK
        ================================================= */

        if (!finalData.length) {

            finalData =
                getFallbackArticle(
                    [],
                    fallbackPool || []
                );
        }


        if (!finalData.length) {
            return;
        }


        const nineArticles =
            finalData.slice(0, 9);


        target.innerHTML =
            nineArticles
                .map(createThreeColumnCard)
                .join("");
    }


    /* =====================================================
       AFTER AP & TS
    ===================================================== */

    renderThreeColumnGrid(
        $("#afterApTsGrid"),
        apTsArticles,
        fallbackUsed
    );


    /* =====================================================
       AFTER SPORTS
    ===================================================== */

    renderThreeColumnGrid(
        $("#afterSportsGrid"),
        sportsArticles,
        fallbackUsed
    );


    /* =====================================================
       AFTER ENTERTAINMENT
    ===================================================== */

    renderThreeColumnGrid(
        $("#afterEntertainmentGrid"),
        entertainmentArticles,
        fallbackUsed
    );


    /* =====================================================
       AFTER BUSINESS
    ===================================================== */

    renderThreeColumnGrid(
        $("#afterBusinessGrid"),
        businessArticles,
        fallbackUsed
    );


    /* =====================================================
       TRENDING
    ===================================================== */

    const trendingTarget =
        $("#trendingGrid");


    if (trendingTarget) {

        const trendingArticles =
            articles
                .filter(article =>
                    normalizeCategory(
                        article.category
                    ) !== "bigboss10"
                )
                .slice(0, 10);


        trendingTarget.innerHTML =
            trendingArticles
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="trending-card"
                        >

                            <img
                                src="${article.image}"
                                alt="${article.alt || article.title}"
                                loading="lazy"
                            >

                            <h3>
                                ${article.title}
                            </h3>

                        </a>
                    `;

                })
                .join("");
    }


    /* =====================================================
       MOST READ
    ===================================================== */

    const mostReadTarget =
        $("#mostReadList");


    if (mostReadTarget) {

        const mostReadArticles =
            articles
                .filter(article =>
                    normalizeCategory(
                        article.category
                    ) !== "bigboss10"
                )
                .slice(0, 10);


        mostReadTarget.innerHTML =
            mostReadArticles
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="most-read-item"
                        >

                            <div class="most-read-text">

                                <h3>
                                    ${article.title}
                                </h3>

                            </div>

                            <img
                                src="${article.image}"
                                alt="${article.alt || article.title}"
                                loading="lazy"
                            >

                        </a>
                    `;

                })
                .join("");
    }


    /* =====================================================
       PHOTO GALLERY
    ===================================================== */

    const photoTarget =
        $("#photoGallery");


    if (photoTarget) {

        const photoArticles =
            articles
                .filter(article =>
                    normalizeCategory(
                        article.category
                    ) !== "bigboss10"
                )
                .slice(0, 8);


        photoTarget.innerHTML =
            photoArticles
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="photo-gallery-card"
                        >

                            <img
                                src="${article.image}"
                                alt="${article.alt || article.title}"
                                loading="lazy"
                            >

                            <h3>
                                ${article.title}
                            </h3>

                        </a>
                    `;

                })
                .join("");
    }


    /* =====================================================
       VIDEO NEWS
    ===================================================== */

    const videoTarget =
        $("#videoNewsGrid");


    if (videoTarget) {

        const videoArticles =
            articles
                .filter(article =>
                    normalizeCategory(
                        article.category
                    ) !== "bigboss10"
                )
                .slice(0, 6);


        videoTarget.innerHTML =
            videoArticles
                .map(article => {

                    return `
                        <a
                            href="${article.url}"
                            class="video-news-card"
                        >

                            <div class="video-thumbnail">

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
       SEARCH OPEN / CLOSE
    ===================================================== */

    window.toggleSearch = function () {

        const box =
            $("#searchBox");

        if (!box) {
            return;
        }

        box.classList.toggle("show");


        if (
            box.classList.contains("show")
        ) {

            const input =
                $("#searchInput");


            if (input) {

                setTimeout(
                    () => input.focus(),
                    100
                );

            }
        }
    };


    /* =====================================================
       SEARCH NEWS
    ===================================================== */

    window.searchNews = function () {

        const input =
            $("#searchInput");


        if (!input) {
            return;
        }


        const query =
            input.value
                .trim()
                .toLowerCase();


        if (!query) {
            return;
        }


        const result =
            articles.find(article =>
                article.title
                    .toLowerCase()
                    .includes(query)
            );


        if (result) {

            window.location.href =
                result.url;

        } else {

            alert(
                "ఈ వార్త ప్రస్తుతం అందుబాటులో లేదు."
            );
        }
    };


    /* =====================================================
       SEARCH ENTER
    ===================================================== */

    const searchInput =
        $("#searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    window.searchNews();
                }

            }
        );
    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    window.toggleTheme = function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const button =
            $("#themeButton");


        if (!button) {
            return;
        }


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


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );


        const button =
            $("#themeButton");


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
            $("#navLinks");


        if (!nav) {
            return;
        }


        nav.classList.toggle(
            "mobile-open"
        );
    };


    /* =====================================================
       ESC KEY - CLOSE SEARCH
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            const search =
                $("#searchBox");


            if (
                search &&
                search.classList.contains(
                    "show"
                )
            ) {

                search.classList.remove(
                    "show"
                );
            }

        }
    );


});
