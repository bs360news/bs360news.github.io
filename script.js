/* =========================================================
   BS 360 NEWS - FINAL PORTAL JS
   Latest + Top Story + Bigg Boss + AP/TS + Movies + Sports
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       HELPERS
    ===================================================== */

    function $(selector, parent) {
        return (parent || document).querySelector(selector);
    }

    function $$(selector, parent) {
        return Array.from((parent || document).querySelectorAll(selector));
    }

    function cleanText(text) {
        return (text || "")
            .replace(/\s+/g, " ")
            .trim();
    }

    function articleUrl(post) {
        return post.dataset.url || post.getAttribute("data-url") || "#";
    }

    function postTitle(post) {
        const heading =
            post.querySelector("h1, h2, h3, h4, .title, .news-title");

        if (heading) {
            return cleanText(heading.textContent);
        }

        const img = post.querySelector("img");

        if (img && img.alt) {
            return cleanText(img.alt);
        }

        return "తాజా వార్త";
    }

    function postImage(post) {

        const img = post.querySelector("img");

        if (!img) {
            return "";
        }

        return (
            img.getAttribute("src") ||
            img.dataset.src ||
            img.getAttribute("data-src") ||
            ""
        );
    }

    function postSummary(post) {

        const text =
            post.querySelector(
                ".summary, .description, .news-summary, p"
            );

        return text ? cleanText(text.textContent) : "";
    }

    function category(post) {
        return (
            post.dataset.category ||
            post.getAttribute("data-category") ||
            ""
        ).toLowerCase().trim();
    }

    function labelOf(post) {

        const cat = category(post);

        if (
            cat === "bb" ||
            cat === "bigboss" ||
            cat === "big-boss" ||
            cat === "bigboss10"
        ) {
            return "📺 BIGG BOSS";
        }

        if (
            cat === "sports" ||
            cat === "sport" ||
            cat === "cricket"
        ) {
            return "🏏 SPORTS";
        }

        if (
            cat === "movies" ||
            cat === "movie" ||
            cat === "cinema"
        ) {
            return "🎬 MOVIES";
        }

        if (
            cat === "ap" ||
            cat === "andhra"
        ) {
            return "🟠 ANDHRA PRADESH";
        }

        if (
            cat === "ts" ||
            cat === "telangana"
        ) {
            return "🟢 TELANGANA";
        }

        if (
            cat === "business" ||
            cat === "business-news" ||
            cat === "stock" ||
            cat === "finance"
        ) {
            return "📈 BUSINESS";
        }

        return "📰 BREAKING NEWS";
    }


    /* =====================================================
       SOURCE POSTS
    ===================================================== */

    function sourcePosts() {

        const source = $("#legacyNewsSource");

        if (!source) {
            return [];
        }

        return $$(".post[data-url]", source);
    }


    /* =====================================================
       REMOVE DUPLICATES
    ===================================================== */

    function uniquePosts(posts) {

        const seen = new Set();
        const result = [];

        posts.forEach(function (post) {

            const url = articleUrl(post);

            if (!url || url === "#") {
                return;
            }

            if (seen.has(url)) {
                return;
            }

            seen.add(url);
            result.push(post);

        });

        return result;
    }


    /* =====================================================
       ALL POSTS
       DOM ORDER = LATEST FIRST
    ===================================================== */

    let allPosts = uniquePosts(sourcePosts());


    /* =====================================================
       CATEGORY HELPERS
    ===================================================== */

    function isBigBoss(post) {

        const cat = category(post);

        return (
            cat === "bb" ||
            cat === "bigboss" ||
            cat === "big-boss" ||
            cat === "bigboss10"
        );
    }


    function isSports(post) {

        const cat = category(post);

        return (
            cat === "sports" ||
            cat === "sport" ||
            cat === "cricket"
        );
    }


    function isMovies(post) {

        const cat = category(post);

        return (
            cat === "movies" ||
            cat === "movie" ||
            cat === "cinema"
        );
    }


    function isBusiness(post) {

        const cat = category(post);

        return (
            cat === "business" ||
            cat === "business-news" ||
            cat === "stock" ||
            cat === "finance"
        );
    }


    function isAPNews(post) {

        const cat = category(post);

        return (
            cat === "ap" ||
            cat === "andhra"
        );
    }


    function isTSNews(post) {

        const cat = category(post);

        return (
            cat === "ts" ||
            cat === "telangana"
        );
    }


    /* =====================================================
       NORMAL POSTS
       Big Boss మాత్రమే separate
    ===================================================== */

    function normalPosts() {

        return allPosts.filter(function (post) {
            return !isBigBoss(post);
        });

    }


    /* =====================================================
       TOP STORY
       
       IMPORTANT:
       అన్ని categories నుంచి latest posts వస్తాయి.
       AP / TS / Movies / Sports / Bigg Boss ఏదీ block కాదు.
    ===================================================== */

    function topStoryPosts() {

        return allPosts.filter(function (post) {

            return articleUrl(post) !== "#";

        });

    }


    /* =====================================================
       CREATE NORMAL CARD
    ===================================================== */

    function createCard(post, type) {

        const article = document.createElement("article");

        article.className =
            "portal-card news-card " +
            (type || "normal");

        article.dataset.url = articleUrl(post);

        article.style.cursor = "pointer";

        const image = postImage(post);
        const title = postTitle(post);
        const summary = postSummary(post);
        const label = labelOf(post);

        article.innerHTML = `
            ${
                image
                    ? `
                    <div class="card-image-wrap">
                        <img
                            src="${image}"
                            alt="${title.replace(/"/g, "&quot;")}"
                            loading="lazy"
                        >
                    </div>
                    `
                    : ""
            }

            <div class="card-content">

                <div class="card-label">
                    ${label}
                </div>

                <h3 class="card-title">
                    ${title}
                </h3>

                ${
                    summary
                        ? `
                        <p class="card-summary">
                            ${summary}
                        </p>
                        `
                        : ""
                }

            </div>
        `;

        article.addEventListener("click", function () {

            const url = articleUrl(post);

            if (url && url !== "#") {
                window.location.href = url;
            }

        });

        return article;
    }


    /* =====================================================
       CREATE TOP STORY HERO
    ===================================================== */

    function createHeroOverlay(post) {

        const article = document.createElement("article");

        article.className = "top-story-hero";

        article.dataset.url = articleUrl(post);

        article.style.cursor = "pointer";

        const image = postImage(post);
        const title = postTitle(post);
        const label = labelOf(post);

        article.innerHTML = `

            ${
                image
                    ? `
                    <img
                        class="top-story-image"
                        src="${image}"
                        alt="${title.replace(/"/g, "&quot;")}"
                        loading="eager"
                    >
                    `
                    : ""
            }

            <div class="top-story-overlay"></div>

            <div class="top-story-content">

                <div class="top-story-label">
                    ${label}
                </div>

                <h2 class="top-story-title">
                    ${title}
                </h2>

                <div class="top-story-read">
                    చదవండి →
                </div>

            </div>
        `;

        article.addEventListener("click", function () {

            const url = articleUrl(post);

            if (url && url !== "#") {
                window.location.href = url;
            }

        });

        return article;
    }


    /* =====================================================
       TOP STORY RENDER
       
       Latest posts rotate every 5 seconds.
       కొత్త post DOM top లో ఉంటే వెంటనే Top Storyలో వస్తుంది.
    ===================================================== */

    let topStoryTimer = null;

    function renderTopStory() {

        const target = $("#topStory");

        if (!target) {
            return;
        }

        const posts = topStoryPosts();

        if (!posts.length) {
            target.innerHTML = "";
            return;
        }

        if (topStoryTimer) {
            clearInterval(topStoryTimer);
            topStoryTimer = null;
        }

        let heroIndex = 0;

        function showHero(index) {

            const post = posts[index];

            if (!post) {
                return;
            }

            const hero = createHeroOverlay(post);

            hero.classList.add("hero-enter");

            target.innerHTML = "";

            target.appendChild(hero);

        }

        showHero(heroIndex);

        if (posts.length > 1) {

            topStoryTimer = setInterval(function () {

                heroIndex++;

                if (heroIndex >= posts.length) {
                    heroIndex = 0;
                }

                showHero(heroIndex);

            }, 5000);

        }

    }


    /* =====================================================
       LATEST NEWS
       
       Top Story posts ను remove చేయము.
       Same latest post Latest Newsలో కూడా ఉంటుంది.
    ===================================================== */

    function renderLatest(posts) {

        const target = $("#latestGrid");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        const latestPosts = posts || allPosts;

        latestPosts
            .slice(0, 18)
            .forEach(function (post) {

                target.appendChild(
                    createCard(post, "latest")
                );

            });

        setupHorizontalAutoScroll(
            target,
            300,
            3200
        );

    }


    /* =====================================================
       LATEST SIDEBAR
    ===================================================== */

    function renderLatestSidebar() {

        const target = $("#latestSidebar");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        normalPosts()
            .slice(0, 12)
            .forEach(function (post, index) {

                const item = document.createElement("div");

                item.className = "latest-sidebar-item";

                item.innerHTML = `

                    <span class="sidebar-number">
                        ${index + 1}
                    </span>

                    <div class="sidebar-text">
                        ${postTitle(post)}
                    </div>

                `;

                item.style.cursor = "pointer";

                item.addEventListener(
                    "click",
                    function () {

                        const url = articleUrl(post);

                        if (url && url !== "#") {
                            window.location.href = url;
                        }

                    }
                );

                target.appendChild(item);

            });

    }


    /* =====================================================
       BIGG BOSS
    ===================================================== */

    function renderBigBoss() {

        const target =
            $("#bigbossGrid") ||
            $("#bigBossGrid");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        allPosts
            .filter(isBigBoss)
            .slice(0, 12)
            .forEach(function (post) {

                target.appendChild(
                    createCard(post, "bigboss")
                );

            });

    }


    /* =====================================================
       AP + TS SLIDER
    ===================================================== */

    function renderSlider() {

        const target =
            $("#apTsGrid") ||
            $("#apTsSlider") ||
            $("#apTsNews");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        allPosts
            .filter(function (post) {

                return (
                    isAPNews(post) ||
                    isTSNews(post)
                );

            })
            .slice(0, 20)
            .forEach(function (post) {

                target.appendChild(
                    createCard(post, "ap-ts")
                );

            });

        setupHorizontalAutoScroll(
            target,
            280,
            3500
        );

    }


    /* =====================================================
       MOVIES
    ===================================================== */

    function renderMovies() {

        const target =
            $("#moviesGrid") ||
            $("#moviesSlider") ||
            $("#moviesNews");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        allPosts
            .filter(isMovies)
            .slice(0, 12)
            .forEach(function (post) {

                target.appendChild(
                    createCard(post, "movies")
                );

            });

        setupHorizontalAutoScroll(
            target,
            280,
            3500
        );

    }


    /* =====================================================
       SPORTS
    ===================================================== */

    function renderSports() {

        const target =
            $("#sportsGrid") ||
            $("#sportsSlider") ||
            $("#sportsNews");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        allPosts
            .filter(isSports)
            .slice(0, 12)
            .forEach(function (post) {

                target.appendChild(
                    createCard(post, "sports")
                );

            });

        setupHorizontalAutoScroll(
            target,
            280,
            3500
        );

    }


    /* =====================================================
       BUSINESS
    ===================================================== */

    function renderBusiness() {

        const target =
            $("#businessGrid") ||
            $("#businessSlider") ||
            $("#businessNews");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        allPosts
            .filter(isBusiness)
            .slice(0, 12)
            .forEach(function (post) {

                target.appendChild(
                    createCard(post, "business")
                );

            });

        setupHorizontalAutoScroll(
            target,
            280,
            3500
        );

    }


    /* =====================================================
       MOST READ
    ===================================================== */

    function renderMostRead() {

        const target = $("#mostReadGrid");

        if (!target) {
            return;
        }

        target.innerHTML = "";

        normalPosts()
            .slice(0, 10)
            .forEach(function (post, index) {

                const item =
                    document.createElement("article");

                item.className = "most-read-item";

                item.innerHTML = `

                    <span class="most-read-number">
                        ${index + 1}
                    </span>

                    <div class="most-read-title">
                        ${postTitle(post)}
                    </div>

                `;

                item.style.cursor = "pointer";

                item.addEventListener(
                    "click",
                    function () {

                        const url = articleUrl(post);

                        if (url && url !== "#") {
                            window.location.href = url;
                        }

                    }
                );

                target.appendChild(item);

            });

    }


    /* =====================================================
       HORIZONTAL AUTO SCROLL
    ===================================================== */

    function setupHorizontalAutoScroll(
        container,
        amount,
        delay
    ) {

        if (!container) {
            return;
        }

        if (container.dataset.autoScrollReady === "true") {
            return;
        }

        container.dataset.autoScrollReady = "true";

        if (container.scrollWidth <= container.clientWidth) {
            return;
        }

        setInterval(function () {

            const maxScroll =
                container.scrollWidth -
                container.clientWidth;

            if (maxScroll <= 0) {
                return;
            }

            let next =
                container.scrollLeft + amount;

            if (next >= maxScroll) {
                next = 0;
            }

            container.scrollTo({
                left: next,
                behavior: "smooth"
            });

        }, delay);

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    function filterPosts(filter) {

        const target = $("#latestGrid");

        if (!target) {
            return;
        }

        const value =
            (filter || "all")
                .toLowerCase()
                .trim();

        let posts = allPosts;

        if (value !== "all") {

            posts = allPosts.filter(function (post) {

                const cat = category(post);

                if (value === "ap") {
                    return isAPNews(post);
                }

                if (value === "ts") {
                    return isTSNews(post);
                }

                if (
                    value === "movies" ||
                    value === "movie"
                ) {
                    return isMovies(post);
                }

                if (value === "sports") {
                    return isSports(post);
                }

                if (
                    value === "bigboss" ||
                    value === "bb"
                ) {
                    return isBigBoss(post);
                }

                if (value === "business") {
                    return isBusiness(post);
                }

                return cat === value;

            });

        }

        renderLatest(posts);

    }


    /* =====================================================
       FILTER BUTTONS
    ===================================================== */

    function setupFilters() {

        const buttons = $$(
            "[data-filter], [data-category-filter]"
        );

        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const filter =
                        button.dataset.filter ||
                        button.dataset.categoryFilter ||
                        "all";

                    filterPosts(filter);

                }
            );

        });

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    function setupSearch() {

        const input =
            $("#searchInput") ||
            $("#search");

        const button =
            $("#searchBtn") ||
            $("#searchButton");

        if (!input) {
            return;
        }

        function doSearch() {

            const query =
                cleanText(input.value)
                    .toLowerCase();

            if (!query) {

                renderLatest();

                return;
            }

            const results =
                allPosts.filter(function (post) {

                    const title =
                        postTitle(post)
                            .toLowerCase();

                    const summary =
                        postSummary(post)
                            .toLowerCase();

                    return (
                        title.includes(query) ||
                        summary.includes(query)
                    );

                });

            renderLatest(results);

        }

        if (button) {

            button.addEventListener(
                "click",
                function () {
                    doSearch();
                }
            );

        }

        input.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {
                    doSearch();
                }

            }
        );

    }


    /* =====================================================
       NAV / MOBILE MENU
    ===================================================== */

    function setupMobileMenu() {

        const menuButton =
            $("#menuBtn") ||
            $("#mobileMenuBtn") ||
            $(".menu-btn");

        const nav =
            $("#mainNav") ||
            $(".main-nav") ||
            $("nav");

        if (!menuButton || !nav) {
            return;
        }

        menuButton.addEventListener(
            "click",
            function () {

                nav.classList.toggle("active");

            }
        );

    }


    /* =====================================================
       NEWS SOURCE AUTO REFRESH
       
       If new article is added to legacyNewsSource
       dynamically, portal refreshes.
    ===================================================== */

    function refreshPosts() {

        const newPosts =
            uniquePosts(sourcePosts());

        if (!newPosts.length) {
            return;
        }

        allPosts = newPosts;

        renderTopStory();
        renderLatestSidebar();
        renderBigBoss();
        renderSlider();
        renderLatest();
        renderMovies();
        renderSports();
        renderBusiness();
        renderMostRead();

    }


    /* =====================================================
       WATCH LEGACY SOURCE
    ===================================================== */

    function observeNewsSource() {

        const source =
            $("#legacyNewsSource");

        if (!source) {
            return;
        }

        const observer =
            new MutationObserver(
                function () {

                    clearTimeout(
                        observer._timer
                    );

                    observer._timer =
                        setTimeout(
                            refreshPosts,
                            300
                        );

                }
            );

        observer.observe(source, {
            childList: true,
            subtree: true
        });

    }


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    function setupScrollTop() {

        const button =
            $("#scrollTop") ||
            $("#backToTop");

        if (!button) {
            return;
        }

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 400) {

                    button.classList.add("show");

                } else {

                    button.classList.remove("show");

                }

            }
        );

        button.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       INITIALIZE PORTAL
    ===================================================== */

    function initializePortal() {

        allPosts =
            uniquePosts(sourcePosts());

        renderTopStory();

        renderLatestSidebar();

        renderBigBoss();

        renderSlider();

        renderLatest();

        renderMovies();

        renderSports();

        renderBusiness();

        renderMostRead();

        setupFilters();

        setupSearch();

        setupMobileMenu();

        setupScrollTop();

        observeNewsSource();

    }


    /* =====================================================
       START
    ===================================================== */

    initializePortal();


    /* =====================================================
       GLOBAL ACCESS
    ===================================================== */

    window.BS360 = {

        refresh: refreshPosts,

        latest: function () {
            return allPosts;
        },

        topStory: function () {
            return topStoryPosts();
        },

        filter: filterPosts

    };

});
