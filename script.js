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
       LATEST
       
       BIGBOSS EXCLUDED
    ===================================================== */

    const latestArticles = articles.filter(article =>
        article.category !== "bigboss10"
    );


    /* =====================================================
       LATEST NEWS
       
       ONE BIG BOX
       EVERY 5 SECONDS NEXT ARTICLE
    ===================================================== */

    const latestTarget = $("#topStory");

    let latestIndex = 0;
    let latestTimer = null;


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


    function showLatest() {

        if (
            !latestTarget ||
            latestArticles.length === 0
        ) {


/* =====================================================
   LATEST NEWS - 6 CARDS
===================================================== */

function createLatestCard(article){

    return `
        <a
            href="${article.url}"
            class="latest-news-card"
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


function showLatest(){

    if(
        !latestTarget ||
        latestArticles.length === 0
    ){
        return;
    }

    const latestSix =
        latestArticles.slice(0, 6);

    latestTarget.innerHTML = `
        <div class="latest-news-grid">

            ${latestSix.map(article =>
                createLatestCard(article)
            ).join("")}

        </div>
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
       
       IMPORTANT:
       
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


        /*
           IMPORTANT:
           Only 5 articles.
        */

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
       SEARCH
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


    const savedTheme =
        localStorage.getItem(
            "bs360-theme"
        );


    if (savedTheme === "dark") {

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
       PAUSE LATEST WHEN TAB HIDDEN
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

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
                search.classList.contains("show")
            ) {

                search.classList.remove(
                    "show"
                );

            }

        }
    );

});
