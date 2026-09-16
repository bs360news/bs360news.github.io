/* =========================================================
   BS 360 NEWS - HOMEPAGE JS
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
       READ ARTICLES
    ===================================================== */

    const source = $("#legacyNewsSource");

    if (!source) {
        console.error("legacyNewsSource not found");
        return;
    }


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
                        ? image.getAttribute("alt")
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
        "BS360 ARTICLES:",
        articles.length
    );


    /* =====================================================
       CATEGORIES
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
       
       3 COLUMNS × 2 ROWS
       
       TOTAL 6 ARTICLES
    ===================================================== */

    const latestArticles = articles.filter(article =>
        article.category !== "bigboss10"
    );


    const latestTarget = $("#topStory");


    /* =====================================================
       CREATE LATEST CARD
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
                "Latest News target #topStory not found"
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
           FIRST 6 ARTICLES ONLY
        */

        const latestSix =
            latestArticles.slice(0, 6);


        latestTarget.innerHTML = `

            <div class="latest-news-grid">

                ${latestSix
                    .map(article =>
                        createLatestCard(article)
                    )
                    .join("")
                }

            </div>

        `;

    }


    /* =====================================================
       SHOW LATEST NEWS
    ===================================================== */

    renderLatestNews();


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
       RENDER CATEGORY
       
       ONLY FIRST 5 ARTICLES

       1 = BIG

       2  3
       4  5
    ===================================================== */

    function renderCategory(target, data) {

        if (!target) {
            return;
        }


        target.innerHTML = "";


        const fiveArticles =
            data.slice(0, 5);


        if (!fiveArticles.length) {
            return;
        }


        const wrapper =
            document.createElement("div");


        wrapper.className =
            "category-news-layout";


        /* BIG NEWS */

        wrapper.insertAdjacentHTML(
            "beforeend",
            createCategoryFeature(
                fiveArticles[0]
            )
        );


        /* SMALL NEWS */

        fiveArticles
            .slice(1, 5)
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
   AFTER MOST READ - 3 × 3 CATEGORY GRIDS
===================================================== */


/* =====================================================
   CREATE SIMPLE CARD
===================================================== */

function createThreeColumnCard(article) {

    return `
        <a
            href="${article.url}"
            class="three-column-news-card"
        >

            <img
                src="${article.image}"
                alt="${article.alt}"
                loading="lazy"
            >

            <h3>
                ${article.title}
            </h3>

        </a>
    `;
}


/* =====================================================
   RENDER 3 × 3 GRID
   MAXIMUM 9 ARTICLES
===================================================== */

function renderThreeColumnGrid(target, data) {

    if (!target) {
        return;
    }


    target.innerHTML = "";


    const nineArticles =
        data.slice(0, 9);


    if (!nineArticles.length) {
        return;
    }


    target.innerHTML =
        nineArticles
            .map(article =>
                createThreeColumnCard(article)
            )
            .join("");
}


/* =====================================================
   AP & TS
===================================================== */

renderThreeColumnGrid(
    $("#afterApTsGrid"),
    apTsArticles
);


/* =====================================================
   SPORTS
===================================================== */

renderThreeColumnGrid(
    $("#afterSportsGrid"),
    sportsArticles
);


/* =====================================================
   ENTERTAINMENT
===================================================== */

renderThreeColumnGrid(
    $("#afterEntertainmentGrid"),
    entertainmentArticles
);


/* =====================================================
   BUSINESS
===================================================== */

renderThreeColumnGrid(
    $("#afterBusinessGrid"),
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

        } else {

            alert(
                "ఈ వార్త ప్రస్తుతం అందుబాటులో లేదు."
            );

        }

    };


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
       ESC SEARCH
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
