/* =========================================================
   BS 360 NEWS - FINAL HOMEPAGE JAVASCRIPT
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
       READ LEGACY ARTICLES
    ===================================================== */

    const source = $("#legacyNewsSource");

    if (!source) {
        console.error("legacyNewsSource not found");
        return;
    }


    const articles = $$(".news-item.post", source)
        .map((item) => {

            const image = $("img", item);
            const titleElement = $(".news-content p", item);

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
                        ? image.getAttribute("alt")
                        : "",

                title:
                    titleElement
                        ? titleElement.textContent.trim()
                        : ""

            };

        })
        .filter(item =>
            item.title &&
            item.image
        );


    console.log(
        "BS360 Articles Loaded:",
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
       BIGBOSS ARTICLES EXCLUDED
    ===================================================== */

    const latestArticles = articles.filter(article =>
        article.category !== "bigboss10"
    );


    /* =====================================================
       LATEST TARGET
    ===================================================== */

    const latestTarget = $("#topStory");

    let latestIndex = 0;
    let latestTimer = null;


    /* =====================================================
       CREATE LATEST CARD
    ===================================================== */

    function createLatestCard(article) {

        return `

            <a
                href="${article.url}"
                class="latest-big-card"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="eager"
                >

                <div class="latest-big-content">

                    <span class="read-label">
                        LATEST NEWS
                    </span>

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>

        `;

    }


    /* =====================================================
       SHOW LATEST
    ===================================================== */

    function showLatest() {

        if (
            !latestTarget ||
            latestArticles.length === 0
        ) {
            return;
        }


        if (
            latestIndex >=
            latestArticles.length
        ) {
            latestIndex = 0;
        }


        latestTarget.innerHTML =
            createLatestCard(
                latestArticles[latestIndex]
            );


        latestIndex++;

    }


    /* =====================================================
       START LATEST TIMER
    ===================================================== */

    function startLatestTimer() {

        if (latestTimer) {

            clearInterval(
                latestTimer
            );

        }


        latestTimer =
            setInterval(
                showLatest,
                5000
            );

    }


    /* =====================================================
       FIRST LATEST NEWS
    ===================================================== */

    showLatest();

    startLatestTimer();


    /* =====================================================
       CATEGORY FEATURE
    ===================================================== */

    function createCategoryFeature(article) {

        return `

            <a
                href="${article.url}"
                class="category-feature"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt}"
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
                    alt="${article.alt}"
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
       RENDER CATEGORY
       
       1st article = BIG
       Remaining articles = SMALL CARDS
    ===================================================== */

    function renderCategory(target, data) {

        if (!target) {
            return;
        }


        target.innerHTML = "";


        if (!data.length) {
            return;
        }


        const wrapper =
            document.createElement("div");


        wrapper.className =
            "category-news-layout";


        /* BIG ARTICLE */

        wrapper.insertAdjacentHTML(
            "beforeend",
            createCategoryFeature(
                data[0]
            )
        );


        /* SMALL ARTICLES */

        data
            .slice(1)
            .forEach(article => {

                wrapper.insertAdjacentHTML(
                    "beforeend",
                    createCategoryCard(
                        article
                    )
                );

            });


        target.appendChild(
            wrapper
        );

    }


    /* =====================================================
       AP & TS
    ===================================================== */

    const apTsTarget =
        $("#sliderTrack");


    renderCategory(
        apTsTarget,
        apTsArticles
    );


    /* =====================================================
       SPORTS
    ===================================================== */

    const sportsTarget =
        $("#sportsGrid");


    renderCategory(
        sportsTarget,
        sportsArticles
    );


    /* =====================================================
       ENTERTAINMENT
    ===================================================== */

    const entertainmentTarget =
        $("#cinemaGrid");


    renderCategory(
        entertainmentTarget,
        entertainmentArticles
    );


    /* =====================================================
       BUSINESS
    ===================================================== */

    const businessTarget =
        $("#businessGrid");


    renderCategory(
        businessTarget,
        businessArticles
    );


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch = function () {

        const box =
            $("#searchBox");


        if (!box) {
            return;
        }


        box.classList.toggle(
            "show"
        );


        if (
            box.classList.contains(
                "show"
            )
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

            return;

        }


        alert(
            "ఈ వార్త ప్రస్తుతం అందుబాటులో లేదు."
        );

    };


    /* =====================================================
       THEME
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
       MOBILE MENU
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
       PAUSE LATEST TIMER
       WHEN TAB IS HIDDEN
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.hidden
            ) {

                if (latestTimer) {

                    clearInterval(
                        latestTimer
                    );

                    latestTimer = null;

                }

            } else {

                startLatestTimer();

            }

        }
    );


    /* =====================================================
       ESC KEY
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
