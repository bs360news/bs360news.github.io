/* =========================================================
   BS 360 NEWS
   PROFESSIONAL NEWS PORTAL
   FINAL RENDERING + AUTO SCROLL JAVASCRIPT

   BIGG BOSS 10 SPECIAL SECTION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));


    /* =====================================================
       FIND ALL ORIGINAL ARTICLES
       ORIGINAL ARTICLES ARE NEVER DELETED
    ===================================================== */

    function sourcePosts() {

        let posts =
            $$("#legacyNewsSource .post[data-url]");

        if (!posts.length) {
            posts =
                $$(".news-list .post[data-url]");
        }

        if (!posts.length) {
            posts =
                $$(".news-item.post[data-url]");
        }

        if (!posts.length) {
            posts =
                $$(".post[data-url]");
        }

        return posts;
    }


    let allPosts =
        sourcePosts();


    /* =====================================================
       REMOVE TRUE DUPLICATES ONLY
    ===================================================== */

    function uniquePosts(posts) {

        const seen = new Set();

        return posts.filter(function (post) {

            const url =
                (post.getAttribute("data-url") || "")
                    .trim();

            const titleElement =
                $(".post-title", post) ||
                $(".article-title", post) ||
                $("h1", post) ||
                $("h2", post) ||
                $("h3", post) ||
                $("p", post);

            const title =
                titleElement
                    ? titleElement.textContent.trim()
                    : "";

            const key =
                url + "|" + title;

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;

        });

    }


    allPosts =
        uniquePosts(allPosts);


    /* =====================================================
       BIGG BOSS 10 CHECK
    ===================================================== */

    function isBigBoss(post) {

        const value =
            catsOf(post);

        return (
            /\bbiggboss10\b/i.test(value) ||
            /\bbigboss10\b/i.test(value) ||
            /\bbigg-boss-10\b/i.test(value) ||
            /\bbigg_boss_10\b/i.test(value) ||
            value.includes("బిగ్ బాస్ 10") ||
            value.includes("బిగ్‌బాస్ 10") ||
            value.includes("bigg boss 10")
        );

    }


    /* =====================================================
       NON BIGG BOSS POSTS
       Used for all normal sections
    ===================================================== */

    function normalPosts() {

        return allPosts.filter(function (post) {

            return !isBigBoss(post);

        });

    }


    /* =====================================================
       ARTICLE TITLE
    ===================================================== */

    function titleOf(post) {

        const element =
            $(".post-title", post) ||
            $(".article-title", post) ||
            $("h1", post) ||
            $("h2", post) ||
            $("h3", post) ||
            $("p", post) ||
            $("a", post);

        if (!element) {
            return "BS 360 NEWS";
        }

        return element.textContent
            .replace(/\s+/g, " ")
            .trim();

    }


    /* =====================================================
       ARTICLE IMAGE
    ===================================================== */

    function imageOf(post) {

        const image =
            $("img", post);

        if (!image) {
            return "dp.png.png";
        }

        return (
            image.getAttribute("src") ||
            image.getAttribute("data-src") ||
            image.getAttribute("data-lazy-src") ||
            "dp.png.png"
        );

    }


    /* =====================================================
       IMAGE ALT
    ===================================================== */

    function altOf(post) {

        const image =
            $("img", post);

        if (!image) {
            return titleOf(post);
        }

        return (
            image.getAttribute("alt") ||
            titleOf(post)
        );

    }


    /* =====================================================
       ARTICLE CATEGORY DATA
    ===================================================== */

    function catsOf(post) {

        const dataCategory =
            post.getAttribute("data-category") || "";

        const dataCategories =
            post.getAttribute("data-categories") || "";

        const category =
            post.getAttribute("category") || "";

        return (
            dataCategory +
            " " +
            dataCategories +
            " " +
            category
        ).toLowerCase();

    }


    /* =====================================================
       CATEGORY MATCH
    ===================================================== */

    function hasCat(post, category) {

        const value =
            catsOf(post);

        return value
            .split(/[\s,|]+/)
            .includes(
                String(category).toLowerCase()
            );

    }


    /* =====================================================
       SPORTS MATCH
    ===================================================== */

    function isSports(post) {

        const value =
            catsOf(post);

        return (
            /\bsports\b/i.test(value) ||
            /\bsport\b/i.test(value) ||
            value.includes("క్రీడ")
        );

    }


    /* =====================================================
       MOVIES MATCH
    ===================================================== */

    function isMovies(post) {

        const value =
            catsOf(post);

        return (
            /\bmovies\b/i.test(value) ||
            /\bmovie\b/i.test(value) ||
            /\bcinema\b/i.test(value) ||
            value.includes("సినిమా")
        );

    }


    /* =====================================================
       BUSINESS MATCH
    ===================================================== */

    function isBusiness(post) {

        const value =
            catsOf(post);

        return (
            /\bbusiness\b/i.test(value) ||
            value.includes("బిజినెస్") ||
            value.includes("gold") ||
            value.includes("finance")
        );

    }


    /* =====================================================
       AP NEWS MATCH
       ADDED
    ===================================================== */

    function isAPNews(post) {

        const value =
            catsOf(post);

        return (
            /\bandhra-pradesh\b/i.test(value) ||
            /\bandhrapradesh\b/i.test(value) ||
            /\bandhra\s+pradesh\b/i.test(value) ||
            /\bandhra\b/i.test(value) ||
            /\bap-news\b/i.test(value) ||
            /\bap_news\b/i.test(value) ||
            /\bapnews\b/i.test(value) ||
            /\bap\b/i.test(value) ||
            value.includes("ఆంధ్రప్రదేశ్") ||
            value.includes("ఆంధ్ర ప్రదేశ్")
        );

    }


    /* =====================================================
       TS NEWS MATCH
       ADDED
    ===================================================== */

    function isTSNews(post) {

        const value =
            catsOf(post);

        return (
            /\btelangana\b/i.test(value) ||
            /\btelangana-news\b/i.test(value) ||
            /\btelangana_news\b/i.test(value) ||
            /\bts-news\b/i.test(value) ||
            /\bts_news\b/i.test(value) ||
            /\btsnews\b/i.test(value) ||
            /\bts\b/i.test(value) ||
            value.includes("తెలంగాణ")
        );

    }


    /* =====================================================
       FEATURED LABEL
       ADDED
    ===================================================== */

    function featuredLabelOf(post) {

        if (isAPNews(post)) {
            return "AP News";
        }

        if (isTSNews(post)) {
            return "TS News";
        }

        return "";

    }


    /* =====================================================
       CATEGORY LABEL
    ===================================================== */

    function labelOf(post) {

        const value =
            catsOf(post);


        if (isBigBoss(post)) {
            return "BIGG BOSS 10";
        }


        if (isSports(post)) {
            return "SPORTS";
        }


        if (isMovies(post)) {
            return "CINEMA";
        }


        if (
            /\btechnology\b/i.test(value) ||
            /\btech\b/i.test(value) ||
            value.includes("టెక్")
        ) {
            return "TECHNOLOGY";
        }


        if (isBusiness(post)) {
            return "BUSINESS";
        }


        if (
            /\bjobs\b/i.test(value) ||
            /\beducation\b/i.test(value) ||
            value.includes("జాబ్స్") ||
            value.includes("ఎడ్యుకేషన్")
        ) {
            return "JOBS";
        }


        if (
            /\bworld\b/i.test(value) ||
            value.includes("ప్రపంచ")
        ) {
            return "WORLD";
        }


        /*
           AP / TS BEFORE INDIA
        */

        if (isAPNews(post)) {
            return "ANDHRA PRADESH";
        }


        if (isTSNews(post)) {
            return "TELANGANA";
        }


        if (
            /\bindia\b/i.test(value) ||
            value.includes("భారత్") ||
            value.includes("దేశం")
        ) {
            return "INDIA";
        }


        return "LATEST";

    }


    /* =====================================================
       ARTICLE URL
    ===================================================== */

    function articleUrl(post) {

        return (
            post.getAttribute("data-url") ||
            post.querySelector("a")?.getAttribute("href") ||
            "#"
        );

    }


    /* =====================================================
       OPEN ARTICLE
    ===================================================== */

    function openPost(post) {

        const url =
            articleUrl(post);

        if (
            url &&
            url !== "#" &&
            url !== "javascript:void(0)"
        ) {

            window.location.href =
                url;

        }

    }


    /* =====================================================
       ESCAPE HTML
    ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       CREATE NORMAL PORTAL CARD
       CUSTOM LABEL ADDED
    ===================================================== */

    function createCard(
        post,
        type = "latest",
        customLabel = null
    ) {

        const card =
            document.createElement("article");

        card.className =
            "portal-card " +
            type +
            "-card";


        const image =
            escapeHTML(
                imageOf(post)
            );


        const title =
            escapeHTML(
                titleOf(post)
            );


        const category =
            escapeHTML(
                customLabel ||
                labelOf(post)
            );


        const alt =
            escapeHTML(
                altOf(post)
            );


        card.innerHTML = `

            <div class="portal-card-media">

                <img
                    src="${image}"
                    alt="${alt}"
                    loading="lazy"
                    onerror="this.onerror=null;this.src='dp.png.png';"
                >

            </div>


            <div class="portal-card-body">

                <span class="portal-tag">
                    ${category}
                </span>

                <h3>
                    ${title}
                </h3>

                <span class="portal-read">
                    పూర్తి వార్త చదవండి →
                </span>

            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                openPost(post);

            }
        );


        return card;

    }


    /* =====================================================
       BIGG BOSS CARD
       IMAGE + TITLE OVERLAY
    ===================================================== */

    function createBigBossCard(post) {

        const card =
            document.createElement("article");


        card.className =
            "bigboss-card";


        card.setAttribute(
            "tabindex",
            "0"
        );


        const image =
            escapeHTML(
                imageOf(post)
            );


        const title =
            escapeHTML(
                titleOf(post)
            );


        const alt =
            escapeHTML(
                altOf(post)
            );


        card.innerHTML = `

            <img
                src="${image}"
                alt="${alt}"
                loading="lazy"
                onerror="this.onerror=null;this.src='dp.png.png';"
            >

            <div class="bigboss-overlay">

                <span class="bigboss-tag">
                    📺 BIGG BOSS 10
                </span>

                <h3>
                    ${title}
                </h3>

            </div>

        `;


        card.addEventListener(
            "click",
            function () {

                openPost(post);

            }
        );


        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openPost(post);

                }

            }
        );


        return card;

    }


    /* =====================================================
       CREATE HERO
       TITLE DIRECTLY ON IMAGE
    ===================================================== */

    function createHeroOverlay(post) {

        const wrapper =
            document.createElement("article");


        wrapper.className =
            "portal-card hero-card hero-overlay-card";


        wrapper.innerHTML = `

            <div class="hero-media">

                <img
                    src="${escapeHTML(imageOf(post))}"
                    alt="${escapeHTML(altOf(post))}"
                    loading="eager"
                    onerror="this.onerror=null;this.src='dp.png.png';"
                >

                <div class="hero-shade"></div>

                <div class="hero-overlay">

                    <span class="hero-tag">
                        ${escapeHTML(labelOf(post))}
                    </span>

                    <h3>
                        ${escapeHTML(titleOf(post))}
                    </h3>

                    <span class="hero-read">
                        పూర్తి వార్త చదవండి →
                    </span>

                </div>

            </div>

        `;


        wrapper.addEventListener(
            "click",
            function () {

                openPost(post);

            }
        );


        return wrapper;

    }


    /* =====================================================
       TOP STORY
       BIGG BOSS EXCLUDED
    ===================================================== */

    function renderTopStory() {

        const target =
            $("#topStory");


        if (!target) {
            return;
        }


        const posts =
            normalPosts();


        if (!posts.length) {
            return;
        }


        let heroIndex = 0;


        function showHero(index) {

            const post =
                posts[index];


            if (!post) {
                return;
            }


            const hero =
                createHeroOverlay(post);


            hero.classList.add(
                "hero-enter"
            );


            target.innerHTML =
                "";


            target.appendChild(
                hero
            );

        }


        showHero(heroIndex);


        setInterval(
            function () {

                heroIndex++;


                if (
                    heroIndex >=
                    posts.length
                ) {

                    heroIndex = 0;

                }


                showHero(
                    heroIndex
                );

            },
            5000
        );

    }


    /* =====================================================
       LATEST SIDEBAR
       BIGG BOSS EXCLUDED
    ===================================================== */

    function renderLatestSidebar() {

        const target =
            $("#latestSidebar");


        if (!target) {
            return;
        }


        target.innerHTML =
            "";


        const posts =
            normalPosts()
                .slice(0, 12);


        posts.forEach(
            function (post) {

                const item =
                    document.createElement("article");


                item.className =
                    "sidebar-card";


                item.innerHTML = `

                    <div class="sidebar-thumb">

                        <img
                            src="${escapeHTML(imageOf(post))}"
                            alt="${escapeHTML(altOf(post))}"
                            loading="lazy"
                            onerror="this.onerror=null;this.src='dp.png.png';"
                        >

                    </div>

                    <div class="sidebar-content">

                        <span class="portal-tag">
                            ${escapeHTML(labelOf(post))}
                        </span>

                        <h3>
                            ${escapeHTML(titleOf(post))}
                        </h3>

                    </div>

                `;


                item.addEventListener(
                    "click",
                    function () {

                        openPost(post);

                    }
                );


                target.appendChild(
                    item
                );

            }
        );


        startSidebarAutoScroll(
            target
        );

    }


    /* =====================================================
       SIDEBAR AUTO SCROLL
    ===================================================== */

    function startSidebarAutoScroll(
        element
    ) {

        if (!element) {
            return;
        }


        if (
            element.dataset
                .sidebarScrollStarted ===
            "true"
        ) {
            return;
        }


        element.dataset
            .sidebarScrollStarted =
            "true";


        let paused =
            false;


        element.addEventListener(
            "mouseenter",
            function () {

                paused = true;

            }
        );


        element.addEventListener(
            "mouseleave",
            function () {

                paused = false;

            }
        );


        element.addEventListener(
            "touchstart",
            function () {

                paused = true;

            },
            {
                passive: true
            }
        );


        element.addEventListener(
            "touchend",
            function () {

                setTimeout(
                    function () {

                        paused = false;

                    },
                    1500
                );

            },
            {
                passive: true
            }
        );


        setInterval(
            function () {

                if (paused) {
                    return;
                }


                const maxScroll =
                    element.scrollHeight -
                    element.clientHeight;


                if (maxScroll <= 10) {
                    return;
                }


                const nextPosition =
                    element.scrollTop +
                    90;


                if (
                    nextPosition >=
                    maxScroll
                ) {

                    element.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                } else {

                    element.scrollTo({
                        top: nextPosition,
                        behavior: "smooth"
                    });

                }

            },
            2600
        );

    }


    /* =====================================================
       BIGG BOSS 10
       10 CARDS
       AUTO SCROLL EVERY 5 SECONDS
    ===================================================== */

    function renderBigBoss() {

        const track =
            $("#bigbossTrack");


        const slider =
            $("#bigbossSlider");


        if (
            !track ||
            !slider
        ) {

            return;

        }


        track.innerHTML =
            "";


        const posts =
            allPosts
                .filter(isBigBoss)
                .slice(0, 10);


        if (!posts.length) {

            console.warn(
                "BS 360 NEWS: Bigg Boss 10 articles not found."
            );

            return;

        }


        posts.forEach(
            function (post) {

                track.appendChild(
                    createBigBossCard(
                        post
                    )
                );

            }
        );


        setupBigBossAutoScroll(
            slider,
            132,
            5000
        );


        setupBigBossButtons(
            slider
        );

    }


    /* =====================================================
       BIGG BOSS AUTO SCROLL
       EVERY 5 SECONDS
    ===================================================== */

    function setupBigBossAutoScroll(
        container,
        distance = 132,
        interval = 5000
    ) {

        if (!container) {
            return;
        }


        if (
            container.dataset
                .bigbossAutoScrollStarted ===
            "true"
        ) {

            return;

        }


        container.dataset
            .bigbossAutoScrollStarted =
            "true";


        let paused =
            false;


        /* =================================================
           MOUSE PAUSE
        ================================================= */

        container.addEventListener(
            "mouseenter",
            function () {

                paused = true;

            }
        );


        container.addEventListener(
            "mouseleave",
            function () {

                paused = false;

            }
        );


        /* =================================================
           TOUCH PAUSE
        ================================================= */

        container.addEventListener(
            "touchstart",
            function () {

                paused = true;

            },
            {
                passive: true
            }
        );


        container.addEventListener(
            "touchend",
            function () {

                setTimeout(
                    function () {

                        paused = false;

                    },
                    1500
                );

            },
            {
                passive: true
            }
        );


        /* =================================================
           AUTO SCROLL
        ================================================= */

        setInterval(
            function () {

                if (paused) {
                    return;
                }


                const maxScroll =
                    container.scrollWidth -
                    container.clientWidth;


                if (maxScroll <= 5) {
                    return;
                }


                if (
                    container.scrollLeft >=
                    maxScroll - 10
                ) {

                    container.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });

                    return;

                }


                container.scrollBy({
                    left: distance,
                    behavior: "smooth"
                });

            },
            interval
        );

    }


    /* =====================================================
       BIGG BOSS PREVIOUS / NEXT BUTTONS
    ===================================================== */

    function setupBigBossButtons(
        slider
    ) {

        const previous =
            $(".bigboss-prev");


        const next =
            $(".bigboss-next");


        if (previous) {

            previous.addEventListener(
                "click",
                function () {

                    slider.scrollBy({
                        left: -264,
                        behavior: "smooth"
                    });

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function () {

                    const maxScroll =
                        slider.scrollWidth -
                        slider.clientWidth;


                    if (
                        slider.scrollLeft >=
                        maxScroll - 10
                    ) {

                        slider.scrollTo({
                            left: 0,
                            behavior: "smooth"
                        });

                    } else {

                        slider.scrollBy({
                            left: 264,
                            behavior: "smooth"
                        });

                    }

                }
            );

        }

    }


    /* =====================================================
       FEATURED NEWS
       AP + TS NEWS ONLY
    ===================================================== */

    function renderSlider() {

        const track =
            $("#sliderTrack");


        const container =
            $("#newsSlider");


        if (!track) {
            return;
        }


        track.innerHTML =
            "";


        /*
           IMPORTANT:

           Featured News లో
           AP + TS NEWS మాత్రమే.

           Cinema / Sports / Business /
           India / Bigg Boss ఇక్కడ రావు.
        */

        const featuredPosts =
            normalPosts()
                .filter(function (post) {

                    return (
                        isAPNews(post) ||
                        isTSNews(post)
                    );

                })
                .slice(0, 15);


        featuredPosts.forEach(
            function (post) {

                const featuredLabel =
                    featuredLabelOf(post);


                track.appendChild(
                    createCard(
                        post,
                        "slider",
                        featuredLabel
                    )
                );

            }
        );


        setupHorizontalAutoScroll(
            container,
            280,
            3000
        );

    }


    /* =====================================================
       LATEST NEWS
       BIGG BOSS EXCLUDED
    ===================================================== */

    function renderLatest(
        posts
    ) {

        const target =
            $("#latestGrid");


        if (!target) {
            return;
        }


        target.innerHTML =
            "";


        const normal =
            posts ||
            normalPosts();


        normal
            .filter(function (post) {

                return !isBigBoss(post);

            })
            .slice(0, 18)
            .forEach(
                function (post) {

                    target.appendChild(
                        createCard(
                            post,
                            "latest"
                        )
                    );

                }
            );


        setupHorizontalAutoScroll(
            target,
            300,
            3200
        );

    }


    /* =====================================================
       MOVIES
       BIGG BOSS EXCLUDED
    ===================================================== */

    function renderMovies() {

        const target =
            $("#cinemaGrid");


        if (!target) {
            return;
        }


        target.innerHTML =
            "";


        const movies =
            normalPosts()
                .filter(isMovies);


        movies
            .slice(0, 12)
            .forEach(
                function (post) {

                    target.appendChild(
                        createCard(
                            post,
                            "category"
                        )
                    );

                }
            );


        setupHorizontalAutoScroll(
            target,
            300,
            3400
        );

    }


    /* =====================================================
       SPORTS
       BIGG BOSS EXCLUDED
    ===================================================== */

    function renderSports() {

        const target =
            $("#sportsGrid");


        if (!target) {
            return;
        }


        target.innerHTML =
            "";


        const sports =
            normalPosts()
                .filter(isSports);


        sports
            .slice(0, 12)
            .forEach(
                function (post) {

                    target.appendChild(
                        createCard(
                            post,
                            "sports"
                        )
                    );

                }
            );


        setupHorizontalAutoScroll(
            target,
            300,
            3500
        );

    }


    /* =====================================================
       UNIVERSAL HORIZONTAL AUTO SCROLL
    ===================================================== */

    function setupHorizontalAutoScroll(
        container,
        distance = 280,
        interval = 3000
    ) {

        if (!container) {
            return;
        }


        if (
            container.dataset
                .autoScrollStarted ===
            "true"
        ) {

            return;

        }


        container.dataset
            .autoScrollStarted =
            "true";


        container.style.display =
            "flex";


        container.style.flexWrap =
            "nowrap";


        container.style.overflowX =
            "auto";


        container.style.overflowY =
            "hidden";


        container.style.scrollBehavior =
            "smooth";


        container.style.webkitOverflowScrolling =
            "touch";


        let paused =
            false;


        container.addEventListener(
            "mouseenter",
            function () {

                paused = true;

            }
        );


        container.addEventListener(
            "mouseleave",
            function () {

                paused = false;

            }
        );


        container.addEventListener(
            "touchstart",
            function () {

                paused = true;

            },
            {
                passive: true
            }
        );


        container.addEventListener(
            "touchend",
            function () {

                setTimeout(
                    function () {

                        paused = false;

                    },
                    1500
                );

            },
            {
                passive: true
            }
        );


        setInterval(
            function () {

                if (paused) {
                    return;
                }


                const maxScroll =
                    container.scrollWidth -
                    container.clientWidth;


                if (maxScroll <= 5) {
                    return;
                }


                if (
                    container.scrollLeft >=
                    maxScroll - 10
                ) {

                    container.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });

                    return;

                }


                container.scrollBy({
                    left: distance,
                    behavior: "smooth"
                });

            },
            interval
        );

    }


    /* =====================================================
       MOST READ
       2 COLUMNS + IMAGE OVERLAY
    ===================================================== */

    function renderMostRead() {

        const target =
            $("#mostReadList");


        if (!target) {
            return;
        }


        target.innerHTML =
            "";


        normalPosts()
            .slice(0, 10)
            .forEach(
                function (
                    post,
                    index
                ) {

                    const item =
                        document.createElement(
                            "article"
                        );


                    item.className =
                        "most-read-item";


                    /*
                       CSS కోసం classes:
                       .most-read-image
                       .most-read-text
                       .most-number

                       Image full card backgroundగా
                       overlay textగా CSSలో పనిచేస్తాయి.
                    */


                    item.innerHTML = `

                        <div class="most-number">
                            ${String(index + 1).padStart(2, "0")}
                        </div>

                        <div class="most-read-image">

                            <img
                                src="${escapeHTML(imageOf(post))}"
                                alt="${escapeHTML(altOf(post))}"
                                loading="lazy"
                                onerror="this.onerror=null;this.src='dp.png.png';"
                            >

                        </div>

                        <div class="most-read-text">

                            <span class="portal-tag">
                                ${escapeHTML(
                                    labelOf(post)
                                )}
                            </span>

                            <h3>
                                ${escapeHTML(
                                    titleOf(post)
                                )}
                            </h3>

                        </div>

                    `;


                    item.addEventListener(
                        "click",
                        function () {

                            openPost(post);

                        }
                    );


                    target.appendChild(
                        item
                    );

                }
            );

    }


    /* =====================================================
       SEARCH
       BIGG BOSS EXCLUDED
    ===================================================== */

    function performSearch() {

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

            renderLatest();

            return;

        }


        const matched =
            normalPosts()
                .filter(
                    function (post) {

                        const title =
                            titleOf(post)
                                .toLowerCase();


                        const category =
                            catsOf(post);


                        return (
                            title.includes(query) ||
                            category.includes(query)
                        );

                    }
                );


        renderSearchResults(
            matched
        );

    }


    /* =====================================================
       SEARCH RESULTS
    ===================================================== */

    function renderSearchResults(
        posts
    ) {

        const target =
            $("#latestGrid");


        if (!target) {
            return;
        }


        target.innerHTML =
            "";


        const filtered =
            posts.filter(
                function (post) {

                    return !isBigBoss(post);

                }
            );


        if (!filtered.length) {

            target.innerHTML = `

                <div class="no-results">

                    <h3>
                        వార్తలు కనిపించలేదు
                    </h3>

                    <p>
                        మరో keywordతో search చేయండి.
                    </p>

                </div>

            `;

        } else {

            filtered
                .slice(0, 30)
                .forEach(
                    function (post) {

                        target.appendChild(
                            createCard(
                                post,
                                "latest"
                            )
                        );

                    }
                );

        }


        setupHorizontalAutoScroll(
            target,
            300,
            3200
        );


        const section =
            $("#latestSection");


        if (section) {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    /* =====================================================
       SEARCH UI
    ===================================================== */

    function setupSearch() {

        const searchButton =
            $("#searchButton");


        const searchBox =
            $("#searchBox");


        const searchInput =
            $("#searchInput");


        const searchSubmit =
            $("#searchSubmit");


        if (
            !searchButton ||
            !searchBox
        ) {

            return;

        }


        searchButton.addEventListener(
            "click",
            function () {

                searchBox.classList.toggle(
                    "active"
                );


                searchBox.classList.toggle(
                    "open"
                );


                if (
                    searchBox.classList.contains(
                        "active"
                    ) &&
                    searchInput
                ) {

                    setTimeout(
                        function () {

                            searchInput.focus();

                        },
                        100
                    );

                }

            }
        );


        if (searchSubmit) {

            searchSubmit.addEventListener(
                "click",
                performSearch
            );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key ===
                        "Enter"
                    ) {

                        event.preventDefault();

                        performSearch();

                    }

                }
            );

        }

    }


    /* =====================================================
       GLOBAL SEARCH FUNCTION
    ===================================================== */

    window.searchNews =
        function () {

            performSearch();

        };


    /* =====================================================
       CATEGORY FILTER
       BIGG BOSS EXCLUDED FROM NORMAL FILTERS
    ===================================================== */

    window.filterPosts =
        function (category) {

            category =
                String(
                    category || ""
                )
                    .toLowerCase()
                    .trim();


            let filtered = [];


            if (
                category === "all" ||
                category === "news" ||
                category === ""
            ) {

                filtered =
                    normalPosts();

            }


            else if (
                category === "sports" ||
                category === "sport" ||
                category === "sports news" ||
                category === "news sports"
            ) {

                filtered =
                    normalPosts()
                        .filter(
                            isSports
                        );

            }


            else if (
                category === "movies" ||
                category === "movie" ||
                category === "cinema"
            ) {

                filtered =
                    normalPosts()
                        .filter(
                            isMovies
                        );

            }


            else if (
                category === "business" ||
                category === "gold"
            ) {

                filtered =
                    normalPosts()
                        .filter(
                            isBusiness
                        );

            }


            else if (
                category === "bigboss10" ||
                category === "bigg boss 10"
            ) {

                /*
                   Bigg Boss is NOT rendered
                   inside Latest News.

                   It belongs only to
                   Bigg Boss 10 section.
                */

                filtered = [];

            }


            else {

                filtered =
                    normalPosts()
                        .filter(
                            function (post) {

                                return catsOf(post)
                                    .includes(
                                        category
                                    );

                            }
                        );

            }


            const target =
                $("#latestGrid");


            if (!target) {
                return;
            }


            target.innerHTML =
                "";


            if (!filtered.length) {

                target.innerHTML = `

                    <div class="no-results">

                        <h3>
                            ఈ categoryలో వార్తలు లేవు
                        </h3>

                    </div>

                `;

            } else {

                filtered
                    .slice(0, 30)
                    .forEach(
                        function (post) {

                            target.appendChild(
                                createCard(
                                    post,
                                    "latest"
                                )
                            );

                        }
                    );

            }


            setupHorizontalAutoScroll(
                target,
                300,
                3200
            );


            const section =
                $("#latestSection");


            if (section) {

                setTimeout(
                    function () {

                        section.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    },
                    50
                );

            }

        };


    /* =====================================================
       DATA-FILTER BUTTONS
    ===================================================== */

    function setupCategoryFilter() {

        $$("[data-filter]")
            .forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();


                            const category =
                                button.getAttribute(
                                    "data-filter"
                                );


                            window.filterPosts(
                                category
                            );

                        }
                    );

                }
            );

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setupMobileMenu() {

        const toggle =
            $("#mobileMenuToggle");


        const nav =
            $(".nav-links");


        if (
            !toggle ||
            !nav
        ) {

            return;

        }


        toggle.addEventListener(
            "click",
            function () {

                nav.classList.toggle(
                    "mobile-open"
                );

            }
        );

    }


    /* =====================================================
       GLOBAL MOBILE MENU
    ===================================================== */

    window.toggleMobileNav =
        function () {

            const nav =
                $(".nav-links");


            if (!nav) {
                return;
            }


            nav.classList.toggle(
                "mobile-open"
            );

        };


    /* =====================================================
       SEARCH TOGGLE
    ===================================================== */

    window.toggleSearch =
        function () {

            const searchBox =
                $("#searchBox");


            if (!searchBox) {
                return;
            }


            searchBox.classList.toggle(
                "active"
            );


            searchBox.classList.toggle(
                "open"
            );


            const input =
                $("#searchInput");


            if (
                input &&
                searchBox.classList.contains(
                    "active"
                )
            ) {

                setTimeout(
                    function () {

                        input.focus();

                    },
                    100
                );

            }

        };


    /* =====================================================
       DARK MODE
    ===================================================== */

    function setupDarkMode() {

        const button =
            $("#themeButton");


        const saved =
            localStorage.getItem(
                "bs360-dark-mode"
            );


        if (
            saved === "true"
        ) {

            document.body.classList.add(
                "dark-mode"
            );

        }


        updateThemeButton();


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            toggleTheme
        );

    }


    /* =====================================================
       GLOBAL THEME TOGGLE
    ===================================================== */

    window.toggleTheme =
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const active =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "bs360-dark-mode",
                active
            );


            updateThemeButton();

        };


    function updateThemeButton() {

        const button =
            $("#themeButton");


        if (!button) {
            return;
        }


        const active =
            document.body.classList.contains(
                "dark-mode"
            );


        button.textContent =
            active
                ? "☀️"
                : "🌙";

    }


    /* =====================================================
       DATE + TIME
    ===================================================== */

    function setupDateTime() {

        const dateElement =
            $("#currentDate") ||
            $("#live-date");


        const timeElement =
            $("#currentTime") ||
            $("#live-clock");


        if (
            !dateElement &&
            !timeElement
        ) {

            return;

        }


        function updateTime() {

            const now =
                new Date();


            const date =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "short",
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


            if (dateElement) {

                dateElement.textContent =
                    date;

            }


            if (timeElement) {

                timeElement.textContent =
                    time;

            }

        }


        updateTime();


        setInterval(
            updateTime,
            1000
        );

    }


    /* =====================================================
       SHARE ARTICLE
    ===================================================== */

    window.shareArticle =
        function (
            title,
            url
        ) {

            const shareData = {
                title: title,
                text: title,
                url: url
            };


            if (
                navigator.share
            ) {

                navigator.share(
                    shareData
                ).catch(
                    function () {}
                );

                return;

            }


            if (
                navigator.clipboard
            ) {

                navigator.clipboard
                    .writeText(url)
                    .then(
                        function () {

                            alert(
                                "Article link copied!"
                            );

                        }
                    )
                    .catch(
                        function () {

                            alert(url);

                        }
                    );

                return;

            }


            alert(url);

        };


    /* =====================================================
       FEATURED SLIDER ARROWS
    ===================================================== */

    function setupSliderButtons() {

        const slider =
            $("#newsSlider");


        if (!slider) {
            return;
        }


        const previous =
            $("#sliderPrev");


        const next =
            $("#sliderNext");


        if (previous) {

            previous.addEventListener(
                "click",
                function () {

                    slider.scrollBy({
                        left: -300,
                        behavior: "smooth"
                    });

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                function () {

                    slider.scrollBy({
                        left: 300,
                        behavior: "smooth"
                    });

                }
            );

        }

    }


    /* =====================================================
       ORIGINAL ARTICLES
       NEVER DELETE
    ===================================================== */

    function prepareOriginalArticles() {

        allPosts.forEach(
            function (post) {

                post.setAttribute(
                    "data-rendered",
                    "true"
                );

            }
        );

    }


    /* =====================================================
       SAFETY FALLBACK
    ===================================================== */

    function checkPortal() {

        if (!allPosts.length) {

            console.warn(
                "BS 360 NEWS: No original articles found."
            );


            const source =
                $("#legacyNewsSource");


            if (source) {

                source.style.display =
                    "";

            }


            return false;

        }


        return true;

    }


    /* =====================================================
       INITIALIZE PORTAL
    ===================================================== */

    function initializePortal() {

        if (!checkPortal()) {
            return;
        }

        prepareOriginalArticles();

        /* TOP STORY */
        renderTopStory();

        /* LATEST SIDEBAR */
        renderLatestSidebar();

        /* BIGG BOSS 10 */
        renderBigBoss();

        /* FEATURED NEWS
           AP + TS ONLY */
        renderSlider();

        /* LATEST NEWS */
        renderLatest();

        /* MOVIES */
        renderMovies();

        /* SPORTS */
        renderSports();

        /* MOST READ
           2 COLUMNS + IMAGE OVERLAY */
        renderMostRead();

        /* SEARCH */
        setupSearch();

        /* CATEGORY FILTER */
        setupCategoryFilter();

        /* MOBILE MENU */
        setupMobileMenu();

        /* DARK MODE */
        setupDarkMode();

        /* DATE + TIME */
        setupDateTime();

        /* FEATURED ARROWS */
        setupSliderButtons();

    }


    /* =====================================================
       START WEBSITE
    ===================================================== */

    initializePortal();

});
/* =========================================================
   BS 360 NEWS
   PROFESSIONAL NEWS PORTAL
   FINAL HOMEPAGE JAVASCRIPT

   FINAL LAYOUT
   ---------------------------------------------------------
   ❌ TOP STORY REMOVED

   📰 LATEST NEWS
      Vertical auto-scroll
      2 cards visible
      Every 5 seconds
      Loops automatically

   🇮🇳 AP & TS NEWS
      AP + Telangana combined
      Horizontal auto-scroll

   🎬 MOVIES
      Horizontal auto-scroll

   🏏 SPORTS
      Horizontal auto-scroll

   💼 BUSINESS NEWS
      Horizontal auto-scroll

   📺 BIGG BOSS 10
      Existing slider

   🔥 MOST READ
      Existing section
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);


    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));


    /* =====================================================
       SOURCE ARTICLES
    ===================================================== */

    function getSourceArticles() {

        let source =
            $$("#legacyNewsSource .post[data-url]");

        if (!source.length) {
            source =
                $$(".news-list .post[data-url]");
        }

        if (!source.length) {
            source =
                $$(".news-item.post[data-url]");
        }

        if (!source.length) {
            source =
                $$(".post[data-url]");
        }


        const seen = new Set();


        return source.filter(article => {

            const url =
                article.dataset.url || "";


            const title =
                $("h1,h2,h3,h4,p", article)
                    ?.textContent
                    ?.trim() || "";


            const key =
                url + "|" + title;


            if (seen.has(key)) {
                return false;
            }


            seen.add(key);

            return true;

        });

    }


    /* =====================================================
       BIGG BOSS DETECTION
    ===================================================== */

    function isBiggBoss(article) {

        const category =
            (article.dataset.category || "")
                .toLowerCase();


        const text =
            article.textContent
                .toLowerCase();


        return (
            category.includes("bigboss") ||
            category.includes("bigg boss") ||
            text.includes("bigg boss 10")
        );

    }


    function normalPosts() {

        return getSourceArticles()
            .filter(article => !isBiggBoss(article));

    }


    function biggBossPosts() {

        return getSourceArticles()
            .filter(article => isBiggBoss(article));

    }


    /* =====================================================
       DATA HELPERS
    ===================================================== */

    function titleOf(article) {

        const el =
            $("h1,h2,h3,h4,p", article);


        return el
            ? el.textContent.trim()
            : "తాజా వార్త";

    }


    function imageOf(article) {

        const img =
            $("img", article);


        return img
            ? img.src
            : "";

    }


    function imageAltOf(article) {

        const img =
            $("img", article);


        return img
            ? img.alt || titleOf(article)
            : titleOf(article);

    }


    function categoryOf(article) {

        return (
            article.dataset.category || ""
        ).toLowerCase();

    }


    function urlOf(article) {

        return article.dataset.url || "#";

    }


    /* =====================================================
       CATEGORY MATCHING
    ===================================================== */

    function isSports(article) {

        const c =
            categoryOf(article);


        return (
            c.includes("sports") ||
            c.includes("sport") ||
            c.includes("cricket") ||
            c.includes("football") ||
            c.includes("tennis") ||
            c.includes("hockey")
        );

    }


    function isMovies(article) {

        const c =
            categoryOf(article);


        return (
            c.includes("movie") ||
            c.includes("movies") ||
            c.includes("cinema") ||
            c.includes("film") ||
            c.includes("tollywood") ||
            c.includes("bollywood")
        );

    }


    function isBusiness(article) {

        const c =
            categoryOf(article);


        return (
            c.includes("business") ||
            c.includes("finance") ||
            c.includes("stock") ||
            c.includes("market") ||
            c.includes("gold") ||
            c.includes("economy") ||
            c.includes("economic")
        );

    }


    function isAPNews(article) {

        const c =
            categoryOf(article);


        return (
            c.includes("andhra") ||
            c === "ap" ||
            c.includes("andhra pradesh") ||
            c.includes("andhrapradesh")
        );

    }


    function isTSNews(article) {

        const c =
            categoryOf(article);


        return (
            c.includes("telangana") ||
            c === "ts" ||
            c.includes("hyderabad")
        );

    }


    /* =====================================================
       LABEL
    ===================================================== */

    function labelOf(article) {

        const c =
            categoryOf(article);


        if (isBiggBoss(article)) {
            return "Bigg Boss 10";
        }


        if (isSports(article)) {
            return "Sports";
        }


        if (isMovies(article)) {
            return "Cinema";
        }


        if (isBusiness(article)) {
            return "Business";
        }


        if (
            c.includes("technology") ||
            c.includes("tech")
        ) {
            return "Technology";
        }


        if (
            c.includes("jobs") ||
            c.includes("job")
        ) {
            return "Jobs";
        }


        if (
            c.includes("world") ||
            c.includes("international")
        ) {
            return "World";
        }


        if (isAPNews(article)) {
            return "AP";
        }


        if (isTSNews(article)) {
            return "TS";
        }


        if (
            c.includes("india") ||
            c.includes("national")
        ) {
            return "India";
        }


        return "Latest";

    }


    /* =====================================================
       AP + TS LABEL
    ===================================================== */

    function featuredLabelOf(article) {

        if (isAPNews(article)) {
            return "AP News";
        }


        if (isTSNews(article)) {
            return "TS News";
        }


        return "AP & TS News";

    }


    /* =====================================================
       HTML SAFETY
    ===================================================== */

    function escapeHTML(str) {

        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

    }


    /* =====================================================
       COMMON PROFESSIONAL CARD
       Movies / Sports / AP-TS / Business
    ===================================================== */

    function createPortalCard(article) {

        const title =
            titleOf(article);


        const image =
            imageOf(article);


        const alt =
            imageAltOf(article);


        const url =
            urlOf(article);


        const label =
            labelOf(article);


        return `
            <article class="portal-card">

                <a
                    href="${escapeHTML(url)}"
                    class="portal-card-link"
                >

                    <div class="portal-image-wrap">

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(alt)}"
                            loading="lazy"
                        >

                    </div>


                    <div class="portal-card-content">

                        <span class="portal-tag">
                            ${escapeHTML(label)}
                        </span>


                        <h3>
                            ${escapeHTML(title)}
                        </h3>


                        <span class="portal-read">
                            పూర్తి వార్త చదవండి →
                        </span>

                    </div>

                </a>

            </article>
        `;

    }


    /* =====================================================
       BIGG BOSS CARD
    ===================================================== */

    function createBiggBossCard(article) {

        const title =
            titleOf(article);


        const image =
            imageOf(article);


        const alt =
            imageAltOf(article);


        const url =
            urlOf(article);


        return `
            <article class="bigboss-card">

                <a
                    href="${escapeHTML(url)}"
                >

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(alt)}"
                        loading="lazy"
                    >


                    <div class="bigboss-overlay">

                        <span class="portal-tag">
                            Bigg Boss 10
                        </span>


                        <h3>
                            ${escapeHTML(title)}
                        </h3>

                    </div>

                </a>

            </article>
        `;

    }


    /* =====================================================
       TOP STORY
       ❌ COMPLETELY DISABLED
    ===================================================== */

    function removeTopStory() {

        const topStory =
            $("#topStory");


        if (topStory) {

            topStory.innerHTML = "";

            topStory.style.display =
                "none";

        }


        /*
         * If the complete TOP STORY section
         * has a parent section, hide it.
         */

        if (topStory) {

            const section =
                topStory.closest(
                    "section"
                );


            if (section) {

                section.style.display =
                    "none";

            }

        }

    }


    /* =====================================================
       LATEST NEWS
       NEW CLEAN PROFESSIONAL DESIGN
       VERTICAL AUTO SCROLL
       2 CARDS VISIBLE
    ===================================================== */

    function createLatestCard(article) {

        const title =
            titleOf(article);


        const image =
            imageOf(article);


        const alt =
            imageAltOf(article);


        const url =
            urlOf(article);


        const label =
            labelOf(article);


        return `
            <article class="latest-news-card">

                <a
                    href="${escapeHTML(url)}"
                    class="latest-news-link"
                >

                    <div class="latest-news-image">

                        <img
                            src="${escapeHTML(image)}"
                            alt="${escapeHTML(alt)}"
                            loading="lazy"
                        >

                    </div>


                    <div class="latest-news-content">

                        <span class="latest-news-tag">
                            ${escapeHTML(label)}
                        </span>


                        <h3>
                            ${escapeHTML(title)}
                        </h3>


                        <span class="latest-news-read">
                            పూర్తి వార్త చదవండి →
                        </span>

                    </div>

                </a>

            </article>
        `;

    }


    function setupLatestVerticalAutoScroll(
        container
    ) {

        if (!container) {
            return;
        }


        let timer = null;


        function getStep() {

            const card =
                container.querySelector(
                    ".latest-news-card"
                );


            if (!card) {
                return 0;
            }


            const style =
                window.getComputedStyle(
                    container
                );


            const gap =
                parseFloat(
                    style.rowGap ||
                    style.gap ||
                    "16"
                );


            return (
                card.offsetHeight +
                gap
            );

        }


        function moveNext() {

            const step =
                getStep();


            if (!step) {
                return;
            }


            const maxScroll =
                container.scrollHeight -
                container.clientHeight;


            /*
             * If the container has no overflow,
             * do nothing.
             */

            if (maxScroll <= 5) {
                return;
            }


            const nextPosition =
                container.scrollTop +
                (step * 2);


            /*
             * Last position reached.
             * Return to beginning.
             */

            if (
                nextPosition >=
                maxScroll - 5
            ) {

                container.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            } else {

                container.scrollTo({
                    top: nextPosition,
                    behavior: "smooth"
                });

            }

        }


        function start() {

            clearInterval(timer);


            timer =
                setInterval(
                    moveNext,
                    5000
                );

        }


        function stop() {

            clearInterval(timer);

        }


        /*
         * Mouse / touch pause
         */

        container.addEventListener(
            "mouseenter",
            stop
        );


        container.addEventListener(
            "mouseleave",
            start
        );


        container.addEventListener(
            "touchstart",
            stop,
            {
                passive: true
            }
        );


        container.addEventListener(
            "touchend",
            start,
            {
                passive: true
            }
        );


        start();

    }


    function renderLatest() {

        const container =
            $("#latestGrid");


        if (!container) {
            return;
        }


        const posts =
            normalPosts()
                .slice(0, 18);


        container.innerHTML =
            posts
                .map(createLatestCard)
                .join("");


        /*
         * Vertical scrolling
         */

        container.style.display =
            "flex";


        container.style.flexDirection =
            "column";


        container.style.overflowY =
            "auto";


        container.style.overflowX =
            "hidden";


        container.style.scrollBehavior =
            "smooth";


        /*
         * 2 cards visible
         *
         * This is controlled mainly
         * through CSS.
         */

        setupLatestVerticalAutoScroll(
            container
        );

    }


    /* =====================================================
       HORIZONTAL AUTO SCROLL
       AP & TS / MOVIES / SPORTS / BUSINESS
    ===================================================== */

    function setupHorizontalAutoScroll(
        container,
        speed = 5000
    ) {

        if (!container) {
            return;
        }


        /*
         * Important:
         * This is ONLY for horizontal sections.
         */

        container.style.display =
            "flex";


        container.style.flexWrap =
            "nowrap";


        container.style.overflowX =
            "auto";


        container.style.overflowY =
            "hidden";


        container.style.scrollBehavior =
            "smooth";


        let timer = null;


        function getCard() {

            return (
                container.querySelector(
                    ".portal-card"
                ) ||
                container.firstElementChild
            );

        }


        function move() {

            const card =
                getCard();


            if (!card) {
                return;
            }


            const style =
                window.getComputedStyle(
                    container
                );


            const gap =
                parseFloat(
                    style.columnGap ||
                    style.gap ||
                    "18"
                );


            const amount =
                card.offsetWidth +
                gap;


            const max =
                container.scrollWidth -
                container.clientWidth;


            if (max <= 5) {
                return;
            }


            if (
                container.scrollLeft +
                container.clientWidth >=
                container.scrollWidth - 5
            ) {

                container.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

            } else {

                container.scrollBy({
                    left: amount,
                    behavior: "smooth"
                });

            }

        }


        function start() {

            clearInterval(timer);


            timer =
                setInterval(
                    move,
                    speed
                );

        }


        function stop() {

            clearInterval(timer);

        }


        container.addEventListener(
            "mouseenter",
            stop
        );


        container.addEventListener(
            "mouseleave",
            start
        );


        container.addEventListener(
            "touchstart",
            stop,
            {
                passive: true
            }
        );


        container.addEventListener(
            "touchend",
            start,
            {
                passive: true
            }
        );


        start();

    }


    /* =====================================================
       AP & TS NEWS
       COMBINED SECTION
    ===================================================== */

    function renderAPTS() {

        const track =
            $("#sliderTrack");


        if (!track) {
            return;
        }


        const posts =
            normalPosts()
                .filter(article =>
                    isAPNews(article) ||
                    isTSNews(article)
                )
                .slice(0, 15);


        track.innerHTML =
            posts
                .map(article => {

                    const title =
                        titleOf(article);


                    const image =
                        imageOf(article);


                    const alt =
                        imageAltOf(article);


                    const url =
                        urlOf(article);


                    return `
                        <article class="portal-card">

                            <a
                                href="${escapeHTML(url)}"
                                class="portal-card-link"
                            >

                                <div
                                    class="portal-image-wrap"
                                >

                                    <img
                                        src="${escapeHTML(image)}"
                                        alt="${escapeHTML(alt)}"
                                        loading="lazy"
                                    >

                                </div>


                                <div
                                    class="portal-card-content"
                                >

                                    <span
                                        class="portal-tag"
                                    >
                                        ${escapeHTML(
                                            featuredLabelOf(article)
                                        )}
                                    </span>


                                    <h3>
                                        ${escapeHTML(title)}
                                    </h3>


                                    <span
                                        class="portal-read"
                                    >
                                        పూర్తి వార్త చదవండి →
                                    </span>

                                </div>

                            </a>

                        </article>
                    `;

                })
                .join("");


        setupHorizontalAutoScroll(
            track,
            5000
        );

    }


    /* =====================================================
       MOVIES
    ===================================================== */

    function renderMovies() {

        const grid =
            $("#cinemaGrid");


        if (!grid) {
            return;
        }


        const posts =
            normalPosts()
                .filter(isMovies)
                .slice(0, 12);


        grid.innerHTML =
            posts
                .map(createPortalCard)
                .join("");


        setupHorizontalAutoScroll(
            grid,
            5000
        );

    }


    /* =====================================================
       SPORTS
    ===================================================== */

    function renderSports() {

        const grid =
            $("#sportsGrid");


        if (!grid) {
            return;
        }


        const posts =
            normalPosts()
                .filter(isSports)
                .slice(0, 12);


        grid.innerHTML =
            posts
                .map(createPortalCard)
                .join("");


        setupHorizontalAutoScroll(
            grid,
            5000
        );

    }


    /* =====================================================
       BUSINESS NEWS
       NEW SECTION
    ===================================================== */

    function renderBusiness() {

        const grid =
            $("#businessGrid");


        if (!grid) {
            return;
        }


        const posts =
            normalPosts()
                .filter(isBusiness)
                .slice(0, 12);


        grid.innerHTML =
            posts
                .map(createPortalCard)
                .join("");


        setupHorizontalAutoScroll(
            grid,
            5000
        );

    }


    /* =====================================================
       LATEST SIDEBAR
    ===================================================== */

    function renderLatestSidebar() {

        const container =
            $("#latestSidebar");


        if (!container) {
            return;
        }


        const posts =
            normalPosts()
                .slice(0, 12);


        container.innerHTML =
            posts
                .map(createPortalCard)
                .join("");


        setupVerticalAutoScroll(
            container
        );

    }


    /* =====================================================
       SIDEBAR VERTICAL AUTO SCROLL
    ===================================================== */

    function setupVerticalAutoScroll(
        container
    ) {

        if (!container) {
            return;
        }


        let direction = 1;


        setInterval(() => {

            if (
                container.scrollHeight <=
                container.clientHeight
            ) {
                return;
            }


            const max =
                container.scrollHeight -
                container.clientHeight;


            let next =
                container.scrollTop +
                (70 * direction);


            if (next >= max) {

                direction = -1;

                next = max;

            }


            if (next <= 0) {

                direction = 1;

                next = 0;

            }


            container.scrollTo({
                top: next,
                behavior: "smooth"
            });


        }, 3500);

    }


    /* =====================================================
       BIGG BOSS SECTION
    ===================================================== */

    function renderBigBoss() {

        const track =
            $("#bigbossTrack");


        if (!track) {
            return;
        }


        const posts =
            biggBossPosts()
                .slice(0, 10);


        track.innerHTML =
            posts
                .map(createBiggBossCard)
                .join("");


        setupBigBossScroll();

    }


    function setupBigBossScroll() {

        const track =
            $("#bigbossTrack");


        const slider =
            $("#bigbossSlider");


        if (!track || !slider) {
            return;
        }


        let timer;


        function scrollNext() {

            const card =
                track.querySelector(
                    ".bigboss-card"
                );


            if (!card) {
                return;
            }


            const gap = 14;


            const amount =
                card.offsetWidth +
                gap;


            if (
                track.scrollLeft +
                track.clientWidth >=
                track.scrollWidth - 5
            ) {

                track.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

            } else {

                track.scrollBy({
                    left: amount,
                    behavior: "smooth"
                });

            }

        }


        timer =
            setInterval(
                scrollNext,
                5000
            );


        const prev =
            $(".bigboss-prev");


        const next =
            $(".bigboss-next");


        if (prev) {

            prev.addEventListener(
                "click",
                () => {

                    track.scrollBy({
                        left: -300,
                        behavior: "smooth"
                    });

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                () => {

                    track.scrollBy({
                        left: 300,
                        behavior: "smooth"
                    });

                }
            );

        }


        slider.addEventListener(
            "mouseenter",
            () => {
                clearInterval(timer);
            }
        );


        slider.addEventListener(
            "mouseleave",
            () => {

                timer =
                    setInterval(
                        scrollNext,
                        5000
                    );

            }
        );

    }


    /* =====================================================
       MOST READ
       IMAGE + TEXT OVERLAY
    ===================================================== */

    function renderMostRead() {

        const container =
            $("#mostReadList");


        if (!container) {
            return;
        }


        const posts =
            normalPosts()
                .slice(0, 10);


        container.innerHTML =
            posts
                .map((article, index) => {

                    const title =
                        titleOf(article);


                    const image =
                        imageOf(article);


                    const alt =
                        imageAltOf(article);


                    const url =
                        urlOf(article);


                    return `
                        <article
                            class="most-read-item"
                        >

                            <a
                                href="${escapeHTML(url)}"
                                class="most-read-link"
                            >

                                <span
                                    class="most-number"
                                >
                                    ${index + 1}
                                </span>


                                <div
                                    class="most-read-image"
                                >

                                    <img
                                        src="${escapeHTML(image)}"
                                        alt="${escapeHTML(alt)}"
                                        loading="lazy"
                                    >

                                </div>


                                <div
                                    class="most-read-text"
                                >

                                    <span
                                        class="portal-tag"
                                    >
                                        ${escapeHTML(
                                            labelOf(article)
                                        )}
                                    </span>


                                    <h3>
                                        ${escapeHTML(title)}
                                    </h3>

                                </div>

                            </a>

                        </article>
                    `;

                })
                .join("");

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function setupSearch() {

        const input =
            $("#searchInput");


        const button =
            $("#searchButton") ||
            $("#searchSubmit");


        if (!input) {
            return;
        }


        function search() {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            $$(".news-item.post")
                .forEach(article => {

                    if (
                        isBiggBoss(article)
                    ) {

                        article.style.display =
                            query.includes("bigg boss")
                                ? ""
                                : "none";

                        return;

                    }


                    const text =
                        article.textContent
                            .toLowerCase();


                    article.style.display =
                        !query ||
                        text.includes(query)
                            ? ""
                            : "none";

                });

        }


        if (button) {

            button.addEventListener(
                "click",
                search
            );

        }


        input.addEventListener(
            "keydown",
            e => {

                if (e.key === "Enter") {
                    search();
                }

            }
        );

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    function setupCategoryFilter() {

        const links =
            $$(".category-filter");


        if (!links.length) {
            return;
        }


        links.forEach(link => {

            link.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();


                    const category =
                        this.dataset.category;


                    $$(".news-item.post")
                        .forEach(article => {

                            if (
                                isBiggBoss(article)
                            ) {

                                article.style.display =
                                    category === "bigboss"
                                        ? ""
                                        : "none";

                                return;

                            }


                            const articleCategory =
                                categoryOf(article);


                            article.style.display =
                                !category ||
                                articleCategory.includes(
                                    category
                                )
                                    ? ""
                                    : "none";

                        });

                }
            );

        });

    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setupMobileMenu() {

        const button =
            $("#mobileMenuToggle");


        const nav =
            $(".nav-links");


        if (!button || !nav) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       THEME
    ===================================================== */

    function setupTheme() {

        const button =
            $("#themeButton");


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-mode"
                );

            }
        );

    }


    /* =====================================================
       DATE + TIME
    ===================================================== */

    function setupDateTime() {

        const dateEl =
            $("#currentDate") ||
            $("#live-date");


        const timeEl =
            $("#currentTime") ||
            $("#live-clock");


        function update() {

            const now =
                new Date();


            if (dateEl) {

                dateEl.textContent =
                    now.toLocaleDateString(
                        "te-IN",
                        {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                        }
                    );

            }


            if (timeEl) {

                timeEl.textContent =
                    now.toLocaleTimeString(
                        "en-IN",
                        {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        }
                    );

            }

        }


        update();


        setInterval(
            update,
            1000
        );

    }


    /* =====================================================
       SHARE
    ===================================================== */

    window.shareArticle =
        function shareArticle(
            title,
            url
        ) {

            if (
                navigator.share
            ) {

                navigator.share({
                    title,
                    url
                });

            } else {

                navigator.clipboard
                    ?.writeText(url);

            }

        };


    /* =====================================================
       SLIDER ARROWS
       AP & TS
    ===================================================== */

    function setupSliderArrows() {

        const track =
            $("#sliderTrack");


        if (!track) {
            return;
        }


        const prev =
            $("#sliderPrev");


        const next =
            $("#sliderNext");


        if (prev) {

            prev.addEventListener(
                "click",
                () => {

                    track.scrollBy({
                        left: -350,
                        behavior: "smooth"
                    });

                }
            );

        }


        if (next) {

            next.addEventListener(
                "click",
                () => {

                    track.scrollBy({
                        left: 350,
                        behavior: "smooth"
                    });

                }
            );

        }

    }


    /* =====================================================
       ORIGINAL ARTICLE PREPARATION
    ===================================================== */

    function prepareOriginalArticles() {

        $$(".news-item.post")
            .forEach(article => {

                const url =
                    article.dataset.url;


                if (!url) {
                    return;
                }


                article.style.cursor =
                    "pointer";


                article.addEventListener(
                    "click",
                    function (e) {

                        if (
                            e.target.closest("a") ||
                            e.target.closest("button") ||
                            e.target.closest("input")
                        ) {

                            return;

                        }


                        window.location.href =
                            url;

                    }
                );

            });

    }


    /* =====================================================
       FALLBACK
    ===================================================== */

    function fallbackMessage(
        selector,
        message
    ) {

        const el =
            $(selector);


        if (
            el &&
            !el.innerHTML.trim()
        ) {

            el.innerHTML = `
                <div class="empty-message">
                    ${escapeHTML(message)}
                </div>
            `;

        }

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    function initializePortal() {

        /*
         * ❌ TOP STORY
         * Completely removed
         */

        removeTopStory();


        /*
         * 📰 LATEST NEWS
         * Vertical
         * 2 cards
         * 5 seconds
         */

        renderLatest();


        /*
         * 🇮🇳 AP & TS NEWS
         * Combined
         * Horizontal
         */

        renderAPTS();


        /*
         * 🎬 MOVIES
         */

        renderMovies();


        /*
         * 🏏 SPORTS
         */

        renderSports();


        /*
         * 💼 BUSINESS
         */

        renderBusiness();


        /*
         * 📺 BIGG BOSS
         */

        renderBigBoss();


        /*
         * 🔥 MOST READ
         */

        renderMostRead();


        /*
         * Sidebar
         */

        renderLatestSidebar();


        /*
         * Other functions
         */

        setupSearch();

        setupCategoryFilter();

        setupMobileMenu();

        setupTheme();

        setupDateTime();

        setupSliderArrows();

        prepareOriginalArticles();


        /*
         * Fallback
         */

        fallbackMessage(
            "#latestGrid",
            "తాజా వార్తలు లేవు"
        );


        fallbackMessage(
            "#sliderTrack",
            "AP & TS వార్తలు లేవు"
        );


        fallbackMessage(
            "#cinemaGrid",
            "సినిమా వార్తలు లేవు"
        );


        fallbackMessage(
            "#sportsGrid",
            "స్పోర్ట్స్ వార్తలు లేవు"
        );


        fallbackMessage(
            "#businessGrid",
            "బిజినెస్ వార్తలు లేవు"
        );


        fallbackMessage(
            "#mostReadList",
            "Most Read వార్తలు లేవు"
        );

    }


    /* =====================================================
       START
    ===================================================== */

    initializePortal();

});
