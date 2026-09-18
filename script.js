/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   FIXED CATEGORY + EXACT ARTICLE COUNTS
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

        const used = new Set();

        return articles.filter(article => {

            const normalized =
                normalizeCategory(article.category);

            if (normalized !== category) {
                return false;
            }

            /*
             * Same URL duplicate కాకుండా
             */
            if (used.has(article.url)) {
                return false;
            }

            used.add(article.url);

            return true;

        });

    }


    /* =====================================================
       CATEGORY DATA
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
       NON BIGBOSS ARTICLES
    ===================================================== */

    const normalArticles =
        articles.filter(article =>
            normalizeCategory(article.category) !== "bigboss10"
        );


    /* =====================================================
       UNIQUE ARTICLES
    ===================================================== */

    function uniqueArticles(data) {

        const usedUrls = new Set();

        return data.filter(article => {

            if (usedUrls.has(article.url)) {
                return false;
            }

            usedUrls.add(article.url);

            return true;

        });

    }


    /* =====================================================
       LATEST NEWS
       EXACTLY 6
    ===================================================== */

    const latestTarget =
        $("#topStory");


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


    function renderLatestNews() {

        if (!latestTarget) {
            return;
        }

        const latestArticles =
            uniqueArticles(normalArticles)
                .slice(0, 6);


        if (!latestArticles.length) {

            latestTarget.innerHTML = `
                <p class="latest-empty">
                    తాజా వార్తలు అందుబాటులో లేవు
                </p>
            `;

            return;
        }


        latestTarget.innerHTML = `
            <div class="latest-news-grid">

                ${latestArticles
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
       EXACTLY 5
       1 BIG + 4 SMALL
       
       NO FALLBACK
    ===================================================== */

    function renderCategory(target, data) {

        if (!target) {
            return;
        }


        const categoryArticles =
            uniqueArticles(data)
                .slice(0, 5);


        target.innerHTML = "";


        if (!categoryArticles.length) {

            target.innerHTML = `
                <p class="category-empty">
                    వార్తలు అందుబాటులో లేవు
                </p>
            `;

            return;
        }


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
                categoryArticles[0]
            )
        );


        /* =================================================
           4 SMALL ARTICLES
        ================================================= */

        categoryArticles
            .slice(1, 5)
            .forEach(article => {

                wrapper.insertAdjacentHTML(
                    "beforeend",
                    createCategoryCard(article)
                );

            });


        target.appendChild(wrapper);
    }


    /* =====================================================
       AP & TS
       5 ARTICLES
    ===================================================== */

    renderCategory(
        $("#sliderTrack"),
        apTsArticles
    );


    /* =====================================================
       SPORTS
       5 ARTICLES
    ===================================================== */

    renderCategory(
        $("#sportsGrid"),
        sportsArticles
    );


    /* =====================================================
       ENTERTAINMENT
       5 ARTICLES
    ===================================================== */

    renderCategory(
        $("#cinemaGrid"),
        entertainmentArticles
    );


    /* =====================================================
       BUSINESS
       5 ARTICLES
    ===================================================== */

    renderCategory(
        $("#businessGrid"),
        businessArticles
    );


    /* =====================================================
       AFTER MOST READ
       
       Existing structure preserved
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
        data
    ) {

        if (!target) {
            return;
        }


        const finalData =
            uniqueArticles(data)
                .slice(0, 9);


        target.innerHTML =
            finalData
                .map(createThreeColumnCard)
                .join("");
    }


    renderThreeColumnGrid(
        $("#afterApTsGrid"),
        apTsArticles
    );


    renderThreeColumnGrid(
        $("#afterSportsGrid"),
        sportsArticles
    );


    renderThreeColumnGrid(
        $("#afterEntertainmentGrid"),
        entertainmentArticles
    );


    renderThreeColumnGrid(
        $("#afterBusinessGrid"),
        businessArticles
    );


    /* =====================================================
       TRENDING NEWS
       EXACTLY 12
    ===================================================== */

    const trendingTarget =
        $("#trendingGrid");


    if (trendingTarget) {

        const trendingArticles =
            uniqueArticles(normalArticles)
                .slice(0, 12);


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
       EXACTLY 6
       CURRENT DESIGN PRESERVED
    ===================================================== */

    const mostReadTarget =
        $("#mostReadList");


    if (mostReadTarget) {

        const mostReadArticles =
            uniqueArticles(normalArticles)
                .slice(0, 6);


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
       EXISTING FUNCTION
    ===================================================== */

    const photoTarget =
        $("#photoGallery");


    if (photoTarget) {

        const photoArticles =
            uniqueArticles(normalArticles)
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
       EXISTING FUNCTION
    ===================================================== */

    const videoTarget =
        $("#videoNewsGrid");


    if (videoTarget) {

        const videoArticles =
            uniqueArticles(normalArticles)
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
