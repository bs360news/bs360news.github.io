/* =========================================================
   BS 360 NEWS - MAIN SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BASIC HELPERS
       ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    const escapeHTML = (text = "") => {
        const div = document.createElement("div");
        div.textContent = text;
        return div.innerHTML;
    };


    /* =====================================================
       LEGACY SOURCE
       Existing articles are kept here and only rendered
       into different homepage sections.
       ===================================================== */

    const source = $("#legacyNewsSource");

    if (!source) {
        console.warn("legacyNewsSource not found");
        return;
    }

    const allSourceArticles = $$(".news-item.post", source);


    /* =====================================================
       GET ARTICLE DATA
       ===================================================== */

    function getArticleData(article) {

        const img = $("img", article);
        const titleElement =
            $(".news-content p", article) ||
            $(".news-content h3", article) ||
            $("p", article) ||
            $("h3", article);

        const title =
            titleElement?.textContent?.trim() ||
            img?.alt?.trim() ||
            "Latest News";

        const image =
            img?.getAttribute("src") ||
            "";

        const url =
            article.getAttribute("data-url") ||
            $("a", article)?.getAttribute("href") ||
            "#";

        const category =
            (
                article.getAttribute("data-category") ||
                ""
            ).toLowerCase().trim();

        return {
            element: article,
            title,
            image,
            url,
            category
        };
    }


    let articles = allSourceArticles.map(getArticleData);


    /* =====================================================
       REMOVE DUPLICATES
       ===================================================== */

    const uniqueMap = new Map();

    articles.forEach(article => {

        const key =
            article.url !== "#"
                ? article.url
                : article.title;

        if (!uniqueMap.has(key)) {
            uniqueMap.set(key, article);
        }

    });

    articles = [...uniqueMap.values()];


    /* =====================================================
       CATEGORY FUNCTIONS
       ===================================================== */

    function isBigBoss(article) {

        const text =
            `${article.category} ${article.title}`.toLowerCase();

        return (
            text.includes("bigboss") ||
            text.includes("big boss")
        );
    }


    function isSports(article) {

        const text =
            `${article.category} ${article.title}`.toLowerCase();

        return (
            text.includes("sports") ||
            text.includes("sport") ||
            text.includes("cricket")
        );
    }


    function isMovies(article) {

        const text =
            `${article.category} ${article.title}`.toLowerCase();

        return (
            text.includes("movies") ||
            text.includes("movie") ||
            text.includes("cinema") ||
            text.includes("entertainment")
        );
    }


    function isBusiness(article) {

        const text =
            `${article.category} ${article.title}`.toLowerCase();

        return (
            text.includes("business") ||
            text.includes("stock") ||
            text.includes("finance") ||
            text.includes("economy") ||
            text.includes("gold") ||
            text.includes("market")
        );
    }


    function isAPTS(article) {

        const text =
            `${article.category} ${article.title}`.toLowerCase();

        return (
            text.includes("ap") ||
            text.includes("ts") ||
            text.includes("andhra") ||
            text.includes("telangana") ||
            text.includes("politics") ||
            text.includes("political")
        );
    }


    /* =====================================================
       SPECIAL: POLITICAL / AP TS TITLES
       ===================================================== */

    function isAPTSByTitle(article) {

        const title = article.title.toLowerCase();

        const keywords = [
            "చంద్రబాబు",
            "పవన్",
            "కేటీఆర్",
            "హరీశ్",
            "రేవంత్",
            "కొండా సురేఖ",
            "తెలంగాణ",
            "ఆంధ్రప్రదేశ్",
            "అసెంబ్లీ",
            "బీఆర్‌ఎస్",
            "కాంగ్రెస్",
            "జనసేన",
            "తిరుమల",
            "లడ్డు",
            "కలెక్టర్ల"
        ];

        return keywords.some(word =>
            title.includes(word.toLowerCase())
        );
    }


    /* =====================================================
       FINAL AP TS CHECK
       ===================================================== */

    function belongsToAPTS(article) {

        return (
            isAPTS(article) ||
            isAPTSByTitle(article)
        );
    }


    /* =====================================================
       LATEST NEWS
       IMPORTANT:
       BigBoss / Sports / Movies / AP-TS / Business
       WILL NOT COME HERE.
       ===================================================== */

    function isLatestNews(article) {

        return (
            !isBigBoss(article) &&
            !isSports(article) &&
            !isMovies(article) &&
            !belongsToAPTS(article) &&
            !isBusiness(article)
        );
    }


    /* =====================================================
       CREATE CARD
       ===================================================== */

    function createCard(article, className = "") {

        const card = document.createElement("a");

        card.href = article.url || "#";
        card.className =
            `news-card ${className}`.trim();

        card.innerHTML = `
            <img
                src="${escapeHTML(article.image)}"
                alt="${escapeHTML(article.title)}"
                loading="lazy"
            >

            <div class="news-card-content">
                <h3>
                    ${escapeHTML(article.title)}
                </h3>
            </div>
        `;

        return card;
    }


    /* =====================================================
       CREATE HORIZONTAL CARD
       ===================================================== */

    function createHorizontalCard(article) {

        const card = document.createElement("a");

        card.href = article.url || "#";
        card.className = "slider-card";

        card.innerHTML = `
            <img
                src="${escapeHTML(article.image)}"
                alt="${escapeHTML(article.title)}"
                loading="lazy"
            >

            <div class="slider-card-content">
                <h3>
                    ${escapeHTML(article.title)}
                </h3>
            </div>
        `;

        return card;
    }


    /* =====================================================
       LATEST NEWS
       1 HERO + 9 SMALL ARTICLES
       ===================================================== */

    function renderLatestNews() {

        const section =
            $("#latestNewsSection") ||
            $(".top-story-section");

        if (!section) {
            console.warn("Latest News section not found");
            return;
        }

        const latest =
            articles
                .filter(isLatestNews)
                .slice(0, 10);

        if (!latest.length) return;


        /* Existing elements */

        const sidebar =
            $("#latestSidebar");

        const hero =
            $("#topStory");


        /* -----------------------------------------------
           HERO
           ----------------------------------------------- */

        if (hero && latest[0]) {

            hero.innerHTML = `
                <a href="${escapeHTML(latest[0].url)}"
                   class="top-story-link">

                    <img
                        src="${escapeHTML(latest[0].image)}"
                        alt="${escapeHTML(latest[0].title)}"
                    >

                    <div class="top-story-content">
                        <h2>
                            ${escapeHTML(latest[0].title)}
                        </h2>
                    </div>

                </a>
            `;
        }


        /* -----------------------------------------------
           9 SMALL NEWS
           ----------------------------------------------- */

        if (sidebar) {

            sidebar.innerHTML = "";

            latest.slice(1, 10).forEach(article => {

                const item =
                    document.createElement("a");

                item.href =
                    article.url || "#";

                item.className =
                    "latest-sidebar-item";

                item.innerHTML = `
                    <img
                        src="${escapeHTML(article.image)}"
                        alt="${escapeHTML(article.title)}"
                        loading="lazy"
                    >

                    <div>
                        <h3>
                            ${escapeHTML(article.title)}
                        </h3>
                    </div>
                `;

                sidebar.appendChild(item);
            });
        }
    }


    /* =====================================================
       GENERIC HORIZONTAL SECTION
       ===================================================== */

    function renderHorizontalSection({
        sectionSelector,
        trackSelector,
        articlesList,
        title
    }) {

        const section =
            $(sectionSelector);

        if (!section) return;

        const track =
            $(trackSelector, section) ||
            $(trackSelector);

        if (!track) return;


        track.innerHTML = "";


        articlesList
            .slice(0, 10)
            .forEach(article => {

                track.appendChild(
                    createHorizontalCard(article)
                );

            });


        /* -----------------------------------------------
           Title only if empty
           ----------------------------------------------- */

        const heading =
            $("h2", section);

        if (
            heading &&
            title &&
            !heading.textContent.trim()
        ) {
            heading.textContent = title;
        }
    }


    /* =====================================================
       BIGG BOSS
       ===================================================== */

    function renderBigBoss() {

        const list =
            articles.filter(isBigBoss);

        const section =
            $("#bigboss10Section");

        if (!section) return;

        const track =
            $("#bigbossTrack", section);

        if (!track) return;

        track.innerHTML = "";

        list
            .slice(0, 10)
            .forEach(article => {

                track.appendChild(
                    createHorizontalCard(article)
                );

            });
    }


    /* =====================================================
       AP & TS
       ===================================================== */

    function renderAPTS() {

        const list =
            articles.filter(belongsToAPTS);

        const section =
            $("#newsSlider")?.closest(".slider-section") ||
            $(".slider-section");

        if (!section) return;

        const track =
            $("#newsSlider") ||
            $("#sliderTrack");

        if (!track) return;

        track.innerHTML = "";

        list
            .slice(0, 10)
            .forEach(article => {

                track.appendChild(
                    createHorizontalCard(article)
                );

            });
    }


    /* =====================================================
       CREATE BUSINESS SECTION
       ===================================================== */

    function createBusinessSection() {

        const business =
            articles.filter(isBusiness);

        if (!business.length) return;


        /* -----------------------------------------------
           If Business already exists, use it.
           ----------------------------------------------- */

        let section =
            $(".business-section");


        /* -----------------------------------------------
           Create Business section
           ----------------------------------------------- */

        if (!section) {

            section =
                document.createElement("section");

            section.className =
                "slider-section business-section";

            section.innerHTML = `
                <div class="section-header">
                    <div>
                        <h2>💼 Business</h2>
                        <p>బిజినెస్ తాజా వార్తలు</p>
                    </div>

                    <a
                        href="business.html"
                        class="section-more"
                    >
                        READ MORE →
                    </a>
                </div>

                <div class="business-slider-wrap">

                    <button
                        class="slider-btn business-prev"
                        type="button"
                        aria-label="Previous"
                    >
                        ‹
                    </button>

                    <div
                        class="business-slider"
                        id="businessSlider"
                    ></div>

                    <button
                        class="slider-btn business-next"
                        type="button"
                        aria-label="Next"
                    >
                        ›
                    </button>

                </div>
            `;


            /* Put Business after AP & TS */

            const apSection =
                $("#newsSlider")?.closest(".slider-section") ||
                $(".slider-section");

            if (apSection) {

                apSection.insertAdjacentElement(
                    "afterend",
                    section
                );

            } else {

                const movieSection =
                    $("#cinemaSection");

                if (movieSection) {
                    movieSection.insertAdjacentElement(
                        "beforebegin",
                        section
                    );
                }
            }
        }


        const slider =
            $("#businessSlider", section);

        if (!slider) return;

        slider.innerHTML = "";

        business
            .slice(0, 10)
            .forEach(article => {

                slider.appendChild(
                    createHorizontalCard(article)
                );

            });


        setupSlider(
            slider,
            $(".business-prev", section),
            $(".business-next", section)
        );
    }


    /* =====================================================
       MOVIES
       ===================================================== */

    function renderMovies() {

        const list =
            articles.filter(isMovies);

        const section =
            $("#cinemaSection");

        if (!section) return;

        const grid =
            $("#cinemaGrid", section);

        if (!grid) return;

        grid.innerHTML = "";

        list
            .slice(0, 10)
            .forEach(article => {

                grid.appendChild(
                    createHorizontalCard(article)
                );

            });
    }


    /* =====================================================
       SPORTS
       ===================================================== */

    function renderSports() {

        const list =
            articles.filter(isSports);

        const section =
            $("#sportsSection");

        if (!section) return;

        const grid =
            $("#sportsGrid", section);

        if (!grid) return;

        grid.innerHTML = "";

        list
            .slice(0, 10)
            .forEach(article => {

                grid.appendChild(
                    createHorizontalCard(article)
                );

            });
    }


    /* =====================================================
       ALL NEWS
       ===================================================== */

    function renderAllNews() {

        const existing =
            $("#allNewsSection");

        if (existing) {

            const container =
                $("#allNewsGrid", existing) ||
                $(".all-news-grid", existing);

            if (container) {

                container.innerHTML = "";

                articles.forEach(article => {

                    container.appendChild(
                        createCard(article)
                    );

                });
            }

            return;
        }


        /* -----------------------------------------------
           Create All News if HTML does not have it
           ----------------------------------------------- */

        const section =
            document.createElement("section");

        section.id =
            "allNewsSection";

        section.className =
            "all-news-section";

        section.innerHTML = `
            <div class="section-header">
                <div>
                    <h2>📰 ALL NEWS</h2>
                    <p>అన్ని తాజా వార్తలు</p>
                </div>
            </div>

            <div
                id="allNewsGrid"
                class="all-news-grid"
            ></div>
        `;


        const sportsSection =
            $("#sportsSection");

        if (sportsSection) {

            sportsSection.insertAdjacentElement(
                "afterend",
                section
            );

        } else {

            source.insertAdjacentElement(
                "beforebegin",
                section
            );
        }


        const grid =
            $("#allNewsGrid", section);

        articles.forEach(article => {

            grid.appendChild(
                createCard(article)
            );

        });
    }


    /* =====================================================
       REMOVE MOST READ
       ===================================================== */

    function removeMostRead() {

        $$(".most-read-section")
            .forEach(section => {

                section.remove();

            });

        $$("[id*='mostRead']")
            .forEach(element => {

                if (
                    element.id === "mostReadList" ||
                    element.id === "mostReadSection"
                ) {
                    const parent =
                        element.closest(
                            ".most-read-section"
                        );

                    if (parent) {
                        parent.remove();
                    }
                }

            });
    }


    /* =====================================================
       REMOVE OLD TOP STORY DUPLICATES
       ===================================================== */

    function cleanOldSections() {

        /*
         * Do NOT remove Latest News.
         * Only remove old extra TOP STORY sections.
         */

        const sections =
            $$("section");

        sections.forEach(section => {

            const text =
                section.textContent
                    .toLowerCase()
                    .trim();

            const hasLatest =
                text.includes("latest news");

            const hasTopStory =
                text.includes("top story");

            if (
                hasTopStory &&
                !hasLatest
            ) {
                section.remove();
            }

        });
    }


    /* =====================================================
       SLIDER
       ===================================================== */

    function setupSlider(
        track,
        prevButton,
        nextButton
    ) {

        if (!track) return;


        const amount = () => {

            const first =
                track.children[0];

            if (!first) return 300;

            return first.offsetWidth + 16;
        };


        if (prevButton) {

            prevButton.onclick = () => {

                track.scrollBy({
                    left: -amount(),
                    behavior: "smooth"
                });

            };
        }


        if (nextButton) {

            nextButton.onclick = () => {

                track.scrollBy({
                    left: amount(),
                    behavior: "smooth"
                });

            };
        }
    }


    /* =====================================================
       EXISTING SLIDERS
       ===================================================== */

    function setupExistingSliders() {

        const sliders = [

            {
                track: $("#bigbossTrack"),
                prev: document.querySelector(
                    "#bigboss10Section .prev"
                ),
                next: document.querySelector(
                    "#bigboss10Section .next"
                )
            },

            {
                track: $("#sliderTrack"),
                prev: document.querySelector(
                    ".slider-section .prev"
                ),
                next: document.querySelector(
                    ".slider-section .next"
                )
            }

        ];


        sliders.forEach(item => {

            if (!item.track) return;

            setupSlider(
                item.track,
                item.prev,
                item.next
            );

        });
    }


    /* =====================================================
       BIGG BOSS AUTO SCROLL
       ===================================================== */

    function startBigBossAutoScroll() {

        const track =
            $("#bigbossTrack");

        if (!track) return;

        let timer;

        function start() {

            clearInterval(timer);

            timer =
                setInterval(() => {

                    if (
                        track.scrollWidth <=
                        track.clientWidth
                    ) {
                        return;
                    }


                    const maxScroll =
                        track.scrollWidth -
                        track.clientWidth;


                    if (
                        track.scrollLeft >=
                        maxScroll - 10
                    ) {

                        track.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });

                    } else {

                        const first =
                            track.children[0];

                        const amount =
                            first
                                ? first.offsetWidth + 16
                                : 280;

                        track.scrollBy({
                            left: amount,
                            behavior: "smooth"
                        });

                    }

                }, 5000);
        }


        track.addEventListener(
            "mouseenter",
            () => clearInterval(timer)
        );

        track.addEventListener(
            "mouseleave",
            start
        );

        track.addEventListener(
            "touchstart",
            () => clearInterval(timer),
            { passive: true }
        );

        track.addEventListener(
            "touchend",
            start,
            { passive: true }
        );

        start();
    }


    /* =====================================================
       DATE & TIME
       ===================================================== */

    function setupDateTime() {

        let dateTime =
            $("#currentDateTime");

        if (!dateTime) {

            const header =
                $("header");

            if (!header) return;

            dateTime =
                document.createElement("div");

            dateTime.id =
                "currentDateTime";

            dateTime.className =
                "current-date-time";

            header.appendChild(dateTime);
        }


        function update() {

            const now =
                new Date();

            const date =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

            const time =
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                    }
                );

            dateTime.textContent =
                `${date} | ${time}`;
        }


        update();

        setInterval(
            update,
            1000
        );
    }


    /* =====================================================
       SEARCH
       ===================================================== */

    function setupSearch() {

        const input =
            $("#searchInput") ||
            $('input[placeholder*="వార్తలు"]');

        const button =
            $("#searchBtn") ||
            $(".search-btn") ||
            $('button[type="submit"]');


        if (!input) return;


        function search() {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                articles.forEach(article => {

                    article.element.style.display =
                        "";

                });

                return;
            }


            articles.forEach(article => {

                const match =
                    article.title
                        .toLowerCase()
                        .includes(query);

                article.element.style.display =
                    match ? "" : "none";

            });


            const firstMatch =
                articles.find(article =>
                    article.title
                        .toLowerCase()
                        .includes(query)
                );


            if (firstMatch) {

                firstMatch.element.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });

            }
        }


        if (button) {

            button.addEventListener(
                "click",
                search
            );

        }


        input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter"
                ) {
                    search();
                }

            }
        );
    }


    /* =====================================================
       DARK MODE
       ===================================================== */

    function setupDarkMode() {

        const button =
            $("#themeToggle") ||
            $('button[aria-label*="Dark"]') ||
            document.querySelector(
                ".theme-toggle"
            );

        if (!button) return;


        const saved =
            localStorage.getItem(
                "bs360-theme"
            );


        if (saved === "dark") {

            document.body.classList.add(
                "dark-mode"
            );

        }


        button.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-mode"
                );


                const dark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "bs360-theme",
                    dark ? "dark" : "light"
                );

            }
        );
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function setupMobileMenu() {

        const toggle =
            $("#menuToggle") ||
            $(".menu-toggle");

        const nav =
            $("#mainNav") ||
            $("nav");

        if (!toggle || !nav) return;


        toggle.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "mobile-open"
                );

            }
        );


        $$("a", nav).forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    nav.classList.remove(
                        "mobile-open"
                    );

                }
            );

        });
    }


    /* =====================================================
       TOP HEADLINES
       ===================================================== */

    function setupHeadlines() {

        const container =
            $("#headlineTrack") ||
            $(".headline-track") ||
            $(".top-headlines");

        if (!container) return;


        const latest =
            articles
                .slice(0, 10);


        if (
            container.children.length
        ) {
            return;
        }


        latest.forEach(article => {

            const link =
                document.createElement("a");

            link.href =
                article.url || "#";

            link.textContent =
                article.title;

            container.appendChild(
                link
            );

        });
    }


    /* =====================================================
       LANGUAGE SELECTOR
       ===================================================== */

    function setupLanguageSelector() {

        const selectors =
            $$("[data-language]");

        selectors.forEach(item => {

            item.addEventListener(
                "click",
                () => {

                    const language =
                        item.dataset.language;

                    if (!language) return;

                    localStorage.setItem(
                        "bs360-language",
                        language
                    );

                }
            );

        });
    }


    /* =====================================================
       READ MORE LINKS
       ===================================================== */

    function setupReadMoreLinks() {

        const map = [

            {
                section: "#bigboss10Section",
                url: "bigboss10.html"
            },

            {
                section: ".slider-section",
                url: "AP&TS.html"
            },

            {
                section: ".business-section",
                url: "business.html"
            },

            {
                section: "#cinemaSection",
                url: "movies.html"
            },

            {
                section: "#sportsSection",
                url: "sports.html"
            }

        ];


        map.forEach(item => {

            const section =
                $(item.section);

            if (!section) return;


            const links =
                $$("a", section);


            const readMore =
                links.find(link =>
                    link.textContent
                        .toUpperCase()
                        .includes("READ MORE")
                );


            if (
                readMore &&
                !readMore.getAttribute("href")
            ) {
                readMore.href =
                    item.url;
            }

        });
    }


    /* =====================================================
       INITIAL RENDER
       ===================================================== */

    cleanOldSections();

    removeMostRead();

    renderLatestNews();

    renderBigBoss();

    renderAPTS();

    createBusinessSection();

    renderMovies();

    renderSports();

    renderAllNews();

    setupExistingSliders();

    startBigBossAutoScroll();

    setupDateTime();

    setupSearch();

    setupDarkMode();

    setupMobileMenu();

    setupHeadlines();

    setupLanguageSelector();

    setupReadMoreLinks();


    /* =====================================================
       FINISH
       ===================================================== */

    console.log(
        "BS 360 NEWS loaded successfully."
    );

    console.log(
        "Total articles:",
        articles.length
    );

});
