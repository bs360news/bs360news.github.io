/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   CLEAN DESKTOP + MOBILE SAFE VERSION
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
       CATEGORY FILTERS
    ===================================================== */

    const apTsArticles = articles.filter(article =>
        article.category === "ap" ||
        article.category === "ts"
    );

    const sportsArticles = articles.filter(article =>
        article.category === "sports"
    );

    const entertainmentArticles = articles.filter(article =>
        article.category === "cinema" ||
        article.category === "movies"
    );

    const businessArticles = articles.filter(article =>
        article.category === "business"
    );


    /* =====================================================
       LATEST NEWS
       BIGBOSS EXCLUDED
       ===================================================== */

    const latestArticles = articles.filter(article =>
        article.category !== "bigboss10"
    );

    const latestTarget = $("#topStory");


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

                <h3>${article.title}</h3>
            </a>
        `;
    }


    /* =====================================================
       RENDER LATEST
       
       DESKTOP:
       CSS decides number of columns

       MOBILE:
       Existing mobile CSS remains unchanged
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

        /*
           Keep 7 latest articles for desktop.
           Mobile layout is controlled by CSS.
        */

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

                    <h3>${article.title}</h3>

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

                    <h3>${article.title}</h3>

                </div>

            </a>
        `;
    }


    /* =====================================================
       CATEGORY RENDER
       
       1 BIG
       2 | 3
       4 | 5

       If only 4 articles exist,
       it will show only 4.
       No fake articles.
    ===================================================== */

    function renderCategory(target, data) {

        if (!target) {
            return;
        }

        target.innerHTML = "";

        if (!data.length) {
            return;
        }

        const categoryArticles =
            data.slice(0, 5);

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "category-news-layout";


        /* BIG ARTICLE */

        wrapper.insertAdjacentHTML(
            "beforeend",
            createCategoryFeature(
                categoryArticles[0]
            )
        );


        /* SMALL ARTICLES */

        categoryArticles
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
       AP & TS
    ===================================================== */

    renderCategory(
        $("#sliderTrack"),
        apTsArticles
    );


    /* =====================================================
       SPORTS
    ===================================================== */

    renderCategory(
        $("#sportsGrid"),
        sportsArticles
    );


    /* =====================================================
       ENTERTAINMENT
    ===================================================== */

    renderCategory(
        $("#cinemaGrid"),
        entertainmentArticles
    );


    /* =====================================================
       BUSINESS
    ===================================================== */

    renderCategory(
        $("#businessGrid"),
        businessArticles
    );


    /* =====================================================
       AFTER MOST READ
       3 COLUMN SECTION
       
       ONLY IF HTML CONTAINERS EXIST
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

                <h3>${article.title}</h3>

            </a>
        `;
    }


    function renderThreeColumnGrid(target, data) {

        if (!target) {
            return;
        }

        target.innerHTML = "";

        if (!data.length) {
            return;
        }

        const nineArticles =
            data.slice(0, 9);

        target.innerHTML =
            nineArticles
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
       TRENDING
       10 ARTICLES
       ONLY IF HTML EXISTS
    ===================================================== */

    const trendingTarget =
        $("#trendingGrid");

    if (trendingTarget) {

        const trendingArticles =
            articles
                .filter(article =>
                    article.category !== "bigboss10"
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
       10 ARTICLES
       ONLY IF HTML EXISTS
    ===================================================== */

    const mostReadTarget =
        $("#mostReadList");

    if (mostReadTarget) {

        const mostReadArticles =
            articles
                .filter(article =>
                    article.category !== "bigboss10"
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
       ONLY IF HTML EXISTS
    ===================================================== */

    const photoTarget =
        $("#photoGallery");

    if (photoTarget) {

        const photoArticles =
            articles
                .filter(article =>
                    article.category !== "bigboss10"
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
       ONLY IF HTML EXISTS
    ===================================================== */

    const videoTarget =
        $("#videoNewsGrid");

    if (videoTarget) {

        const videoArticles =
            articles
                .filter(article =>
                    article.category !== "bigboss10"
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
       SEARCH ENTER KEY
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
