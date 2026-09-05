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


        if (
            /\bindia\b/i.test(value) ||
            value.includes("భారత్") ||
            value.includes("దేశం")
        ) {
            return "INDIA";
        }


        if (
            /\bandhra\b/i.test(value) ||
            /\bap\b/i.test(value)
        ) {
            return "ANDHRA PRADESH";
        }


        if (
            /\btelangana\b/i.test(value) ||
            /\bts\b/i.test(value)
        ) {
            return "TELANGANA";
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
    ===================================================== */

    function createCard(
        post,
        type = "latest"
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
       BIGG BOSS EXCLUDED
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


        normalPosts()
            .slice(0, 15)
            .forEach(
                function (post) {

                    track.appendChild(
                        createCard(
                            post,
                            "slider"
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
       BIGG BOSS EXCLUDED
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


        /* =================================================
           NORMAL WEBSITE SECTIONS
           BIGG BOSS AUTOMATICALLY EXCLUDED
        ================================================= */

        renderTopStory();

        renderLatestSidebar();

        renderSlider();

        renderLatest();

        renderMovies();

        renderSports();

        renderMostRead();


        /* =================================================
           BIGG BOSS 10 SPECIAL SECTION
        ================================================= */

        renderBigBoss();


        /* =================================================
           OTHER FUNCTIONS
        ================================================= */

        setupSearch();

        setupCategoryFilter();

        setupMobileMenu();

        setupDarkMode();

        setupDateTime();

        setupSliderButtons();


        console.log(
            "BS 360 NEWS: " +
            allPosts.length +
            " total articles loaded."
        );


        console.log(
            "BS 360 NEWS: " +
            allPosts.filter(isBigBoss).length +
            " Bigg Boss 10 articles found."
        );


        console.log(
            "BS 360 NEWS: " +
            normalPosts().length +
            " normal articles loaded."
        );

    }


    /* =====================================================
       START PORTAL
    ===================================================== */

    initializePortal();

});
