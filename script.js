/* =========================================================
   BS 360 NEWS - NEW HOMEPAGE JAVASCRIPT
   Card Style Layout + See More + Auto Scroll
   Existing HTML / Images / Article Links unchanged
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
       GET ALL ORIGINAL NEWS
    ===================================================== */

    const source = $("#legacyNewsSource");

    if (!source) return;

    const allArticles = $$(".news-item.post", source);

    const newsData = allArticles.map((article, index) => {

        const image = $("img", article);
        const title = $(".news-content p", article);

        return {
            index: index,

            category:
                (article.dataset.category || "")
                    .toLowerCase()
                    .trim(),

            url:
                article.dataset.url ||
                "#",

            image:
                image ? image.getAttribute("src") : "",

            alt:
                image
                    ? image.getAttribute("alt") || ""
                    : "",

            title:
                title
                    ? title.textContent.trim()
                    : ""
        };

    });


    /* =====================================================
       CATEGORY CHECK
    ===================================================== */

    function isMovie(item) {

        return [
            "cinema",
            "movies",
            "movie",
            "entertainment"
        ].includes(item.category);

    }


    function isSports(item) {

        return item.category === "sports";

    }


    function isBusiness(item) {

        return item.category === "business";

    }


    function isAPTS(item) {

        return [
            "ap",
            "ts",
            "apts",
            "ap&ts",
            "telangana"
        ].includes(item.category);

    }


    function isBigBoss(item) {

        return item.category === "bigboss10";

    }


    /* =====================================================
       CATEGORY LABEL
    ===================================================== */

    function categoryLabel(category) {

        const labels = {

            "ap": "AP",
            "ts": "TS",
            "apts": "AP & TS",
            "ap&ts": "AP & TS",

            "cinema": "MOVIES",
            "movies": "MOVIES",
            "movie": "MOVIES",
            "entertainment": "ENTERTAINMENT",

            "sports": "SPORTS",

            "business": "BUSINESS",

            "bigboss10": "BIGG BOSS",

            "lifestyle": "LIFESTYLE",

            "agriculture": "AGRICULTURE",

            "automobiles": "AUTOMOBILES",

            "human-interest": "NEWS",

            "politics": "POLITICS",

            "news": "TOP NEWS"

        };

        return labels[category] || "NEWS";

    }


    /* =====================================================
       CARD CREATOR
    ===================================================== */

    function createCard(item, featured = false) {

        const card = document.createElement("article");

        card.className =
            featured
                ? "new-news-card featured-news-card"
                : "new-news-card";


        card.innerHTML = `

            <a
                href="${item.url}"
                class="news-card-link"
            >

                <div class="news-card-image">

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.alt || item.title)}"
                        loading="lazy"
                    >

                    <span class="news-card-category">
                        ${categoryLabel(item.category)}
                    </span>

                </div>


                <div class="news-card-body">

                    <h3>
                        ${escapeHTML(item.title)}
                    </h3>

                    ${
                        featured
                        ? `
                        <span class="card-read-more">
                            Read More →
                        </span>
                        `
                        : ""
                    }

                </div>

            </a>

        `;

        return card;

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(text) {

        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       LATEST NEWS
    ===================================================== */

    function buildLatestNews() {

        const hero = $("#topStory");
        const sidebar = $("#latestSidebar");

        if (!hero || !sidebar) return;

        hero.innerHTML = "";
        sidebar.innerHTML = "";

        const latest =
            newsData.filter(item => !isBigBoss(item));

        if (!latest.length) return;


        /* FIRST LARGE STORY */

        hero.className =
            "hero-wrap new-latest-hero";

        hero.appendChild(
            createCard(latest[0], true)
        );


        /* SIDE STORIES */

        latest.slice(1, 7).forEach(item => {

            const row = document.createElement("a");

            row.href = item.url;
            row.className = "latest-side-item";

            row.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.alt || item.title)}"
                    loading="lazy"
                >

                <div>

                    <span>
                        ${categoryLabel(item.category)}
                    </span>

                    <strong>
                        ${escapeHTML(item.title)}
                    </strong>

                </div>

            `;

            sidebar.appendChild(row);

        });


        /* AUTO CHANGE HERO */

        let heroIndex = 0;

        const heroStories =
            latest.slice(0, Math.min(10, latest.length));


        if (heroStories.length > 1) {

            setInterval(() => {

                heroIndex++;

                if (heroIndex >= heroStories.length) {
                    heroIndex = 0;
                }

                const next =
                    createCard(
                        heroStories[heroIndex],
                        true
                    );

                next.classList.add("hero-fade");

                hero.innerHTML = "";
                hero.appendChild(next);

            }, 5000);

        }

    }


    /* =====================================================
       BIGG BOSS
    ===================================================== */

    function buildBigBoss() {

        const track = $("#bigbossTrack");

        if (!track) return;

        track.innerHTML = "";

        const items =
            newsData.filter(isBigBoss);

        items.forEach(item => {

            track.appendChild(
                createCard(item, false)
            );

        });


        setupHorizontalSlider(
            ".bigboss-slider",
            ".bigboss-track",
            ".bigboss-prev",
            ".bigboss-next"
        );


        /* AUTO SCROLL */

        autoSlider(
            ".bigboss-slider",
            ".bigboss-track",
            7000
        );

    }


    /* =====================================================
       AP & TS
    ===================================================== */

    function buildAPTS() {

        const track = $("#sliderTrack");

        if (!track) return;

        track.innerHTML = "";

        const items =
            newsData.filter(isAPTS);

        items.forEach((item, index) => {

            track.appendChild(
                createCard(
                    item,
                    index === 0
                )
            );

        });


        setupHorizontalSlider(
            ".news-slider",
            ".slider-track",
            ".sliderPrev",
            ".sliderNext"
        );

    }


    /* =====================================================
       MOVIES
    ===================================================== */

    function buildMovies() {

        const grid = $("#cinemaGrid");

        if (!grid) return;

        grid.innerHTML = "";

        const items =
            newsData.filter(isMovie);


        items.forEach((item, index) => {

            grid.appendChild(
                createCard(
                    item,
                    index === 0
                )
            );

        });

    }


    /* =====================================================
       SPORTS
    ===================================================== */

    function buildSports() {

        const grid = $("#sportsGrid");

        if (!grid) return;

        grid.innerHTML = "";

        const items =
            newsData.filter(isSports);


        items.forEach((item, index) => {

            grid.appendChild(
                createCard(
                    item,
                    index === 0
                )
            );

        });

    }


    /* =====================================================
       BUSINESS
       If business section is added later,
       this function can directly use it.
    ===================================================== */

    function buildBusiness() {

        const grid =
            $("#businessGrid");

        if (!grid) return;

        grid.innerHTML = "";

        const items =
            newsData.filter(isBusiness);

        items.forEach((item, index) => {

            grid.appendChild(
                createCard(
                    item,
                    index === 0
                )
            );

        });

    }


    /* =====================================================
       MOST READ
    ===================================================== */

    function buildMostRead() {

        const container =
            $("#mostReadList");

        if (!container) return;

        container.innerHTML = "";


        const items =
            newsData
                .filter(item => !isBigBoss(item))
                .slice(0, 8);


        items.forEach((item, index) => {

            const row =
                document.createElement("a");

            row.href = item.url;

            row.className =
                "most-read-item";


            row.innerHTML = `

                <div class="most-read-number">
                    ${index + 1}
                </div>

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.alt || item.title)}"
                    loading="lazy"
                >

                <div class="most-read-content">

                    <span>
                        ${categoryLabel(item.category)}
                    </span>

                    <strong>
                        ${escapeHTML(item.title)}
                    </strong>

                </div>

            `;

            container.appendChild(row);

        });

    }


    /* =====================================================
       HORIZONTAL SLIDER
    ===================================================== */

    function setupHorizontalSlider(
        sliderSelector,
        trackSelector,
        prevSelector,
        nextSelector
    ) {

        const slider =
            $(sliderSelector);

        const track =
            $(trackSelector);

        const prev =
            $(prevSelector);

        const next =
            $(nextSelector);


        if (!slider || !track) return;


        if (prev) {

            prev.onclick = function () {

                slider.scrollBy({
                    left: -slider.clientWidth * 0.85,
                    behavior: "smooth"
                });

            };

        }


        if (next) {

            next.onclick = function () {

                slider.scrollBy({
                    left: slider.clientWidth * 0.85,
                    behavior: "smooth"
                });

            };

        }

    }


    /* =====================================================
       AUTO SLIDER
    ===================================================== */

    function autoSlider(
        sliderSelector,
        trackSelector,
        interval = 5000
    ) {

        const slider =
            $(sliderSelector);

        const track =
            $(trackSelector);

        if (!slider || !track) return;


        let timer;


        function start() {

            timer =
                setInterval(() => {

                    const maxScroll =
                        track.scrollWidth -
                        slider.clientWidth;


                    if (slider.scrollLeft >= maxScroll - 10) {

                        slider.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });

                    } else {

                        slider.scrollBy({
                            left:
                                slider.clientWidth * 0.85,
                            behavior: "smooth"
                        });

                    }

                }, interval);

        }


        function stop() {

            clearInterval(timer);

        }


        slider.addEventListener(
            "mouseenter",
            stop
        );

        slider.addEventListener(
            "mouseleave",
            start
        );

        slider.addEventListener(
            "touchstart",
            stop,
            { passive: true }
        );

        slider.addEventListener(
            "touchend",
            start,
            { passive: true }
        );


        start();

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch = function () {

        const box =
            $("#searchBox");

        if (!box) return;

        box.classList.toggle("active");

        if (box.classList.contains("active")) {

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

        if (!input) return;

        const query =
            input.value
                .trim()
                .toLowerCase();


        if (!query) return;


        const results =
            newsData.filter(item =>
                item.title
                    .toLowerCase()
                    .includes(query)
            );


        if (!results.length) {

            alert(
                "వార్తలు కనుగొనబడలేదు."
            );

            return;

        }


        const latestSection =
            $("#latestSection");

        if (latestSection) {

            latestSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }


        const hero =
            $("#topStory");

        if (hero) {

            hero.innerHTML = "";

            hero.appendChild(
                createCard(
                    results[0],
                    true
                )
            );

        }

    };


    /* ENTER KEY SEARCH */

    const searchInput =
        $("#searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    searchNews();
                }

            }
        );

    }


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    window.toggleMobileNav = function () {

        const nav =
            $("#navLinks");

        if (!nav) return;

        nav.classList.toggle(
            "mobile-nav-open"
        );

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

        if (!button) return;


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            button.innerHTML =
                "☀️ Light";

            localStorage.setItem(
                "bs360-theme",
                "dark"
            );

        } else {

            button.innerHTML =
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
            $("#themeButton");

        if (button) {
            button.innerHTML =
                "☀️ Light";
        }

    }


    /* =====================================================
       SEE MORE LINKS
       Keep existing HTML links.
    ===================================================== */

    $$(".view-all").forEach(link => {

        link.innerHTML =
            "See More →";

    });


    /* =====================================================
       BUILD ALL SECTIONS
    ===================================================== */

    buildLatestNews();

    buildBigBoss();

    buildAPTS();

    buildMovies();

    buildSports();

    buildBusiness();

    buildMostRead();


    /* =====================================================
       HIDE ORIGINAL SOURCE
    ===================================================== */

    source.style.display = "none";


    /* =====================================================
       REMOVE EMPTY SECTIONS
    ===================================================== */

    function hideEmptySection(
        gridSelector,
        sectionSelector
    ) {

        const grid =
            $(gridSelector);

        const section =
            $(sectionSelector);

        if (
            grid &&
            section &&
            !grid.children.length
        ) {

            section.style.display =
                "none";

        }

    }


    hideEmptySection(
        "#cinemaGrid",
        "#cinemaSection"
    );

    hideEmptySection(
        "#sportsGrid",
        "#sportsSection"
    );


});
