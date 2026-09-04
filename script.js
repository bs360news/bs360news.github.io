/* =========================================================
   BS 360 NEWS — NEWS PORTAL JAVASCRIPT
   ========================================================= */

(function () {

    "use strict";

    let posts = [];
    let heroIndex = 0;
    let heroTimer = null;
    let sidebarTimer = null;
    const horizontalTimers = [];

    const $ = (id) => document.getElementById(id);

    /* =====================================================
       GET ORIGINAL ARTICLES
       ===================================================== */

    function sourcePosts() {
        return Array.from(
            document.querySelectorAll(
                "#legacyNewsSource .post[data-url]"
            )
        );
    }

    function titleOf(post) {
        const el = post.querySelector(
            ".post-title, h2, h3, .title, .article-title"
        );

        return (
            el?.textContent ||
            post.dataset.title ||
            post.textContent ||
            "BS 360 NEWS"
        ).trim();
    }

    function imageOf(post) {
        const img = post.querySelector("img");

        return (
            img?.getAttribute("src") ||
            img?.dataset.src ||
            "dp.png.png"
        );
    }

    function altOf(post) {
        const img = post.querySelector("img");

        return (
            img?.getAttribute("alt") ||
            titleOf(post)
        );
    }

    function catsOf(post) {

        const value =
            post.dataset.category ||
            post.getAttribute("data-category") ||
            "";

        return value
            .toLowerCase()
            .replace(/,/g, " ")
            .split(/\s+/)
            .filter(Boolean);
    }

    function hasCat(post, categories) {

        const cats = catsOf(post);

        return categories.some(
            category =>
                cats.includes(category.toLowerCase())
        );
    }

    function articleUrl(post) {

        return (
            post.dataset.url ||
            post.getAttribute("data-url") ||
            post.querySelector("a")?.getAttribute("href") ||
            "#"
        );
    }

    /* =====================================================
       OPEN ARTICLE
       ===================================================== */

    function openPost(post) {

        const url = articleUrl(post);

        if (url && url !== "#") {
            window.location.href = url;
        }
    }

    /* =====================================================
       CREATE NORMAL CARD
       ===================================================== */

    function createCard(post, type) {

        const card = document.createElement("article");

        card.className =
            "portal-card " +
            (type || "");

        const img = document.createElement("img");

        img.src = imageOf(post);
        img.alt = altOf(post);
        img.loading = "lazy";

        const body = document.createElement("div");

        body.className = "portal-card-body";

        const tag = document.createElement("div");

        tag.className = "portal-card-tag";

        if (hasCat(post, ["movies", "movie"])) {
            tag.textContent = "🎬 సినిమా";
        } else if (hasCat(post, ["sports"])) {
            tag.textContent = "🏏 స్పోర్ట్స్";
        } else {
            tag.textContent = "📰 తాజా వార్తలు";
        }

        const title = document.createElement("h3");

        title.textContent = titleOf(post);

        const meta = document.createElement("div");

        meta.className = "portal-card-meta";
        meta.textContent = "BS 360 NEWS";

        body.appendChild(tag);
        body.appendChild(title);
        body.appendChild(meta);

        card.appendChild(img);
        card.appendChild(body);

        card.addEventListener("click", function () {
            openPost(post);
        });

        card.style.cursor = "pointer";

        return card;
    }

    /* =====================================================
       SIDEBAR CARD
       ===================================================== */

    function createSidebarCard(post) {

        const card = document.createElement("article");

        card.className = "sidebar-card";

        const img = document.createElement("img");

        img.src = imageOf(post);
        img.alt = altOf(post);
        img.loading = "lazy";

        const title = document.createElement("h3");

        title.textContent = titleOf(post);

        card.appendChild(img);
        card.appendChild(title);

        card.addEventListener("click", function () {
            openPost(post);
        });

        card.style.cursor = "pointer";

        return card;
    }

    /* =====================================================
       HERO
       ===================================================== */

    function createHero(post) {

        const wrapper = document.createElement("article");

        wrapper.className = "hero-card";

        const img = document.createElement("img");

        img.src = imageOf(post);
        img.alt = altOf(post);

        const overlay = document.createElement("div");

        overlay.className = "hero-overlay";

        const label = document.createElement("div");

        label.className = "hero-label";
        label.textContent = "🔥 TOP STORY";

        const title = document.createElement("h1");

        title.textContent = titleOf(post);

        const read = document.createElement("span");

        read.className = "hero-read";
        read.textContent = "చదవండి →";

        overlay.appendChild(label);
        overlay.appendChild(title);
        overlay.appendChild(read);

        wrapper.appendChild(img);
        wrapper.appendChild(overlay);

        wrapper.addEventListener("click", function () {
            openPost(post);
        });

        wrapper.style.cursor = "pointer";

        return wrapper;
    }

    /* =====================================================
       FILL CAROUSEL
       ===================================================== */

    function fill(container, list, type) {

        if (!container) {
            return;
        }

        container.innerHTML = "";

        const track = document.createElement("div");

        track.className = "horizontal-track";

        list.forEach(function (post) {

            track.appendChild(
                createCard(post, type)
            );

        });

        container.appendChild(track);

        return track;
    }

    /* =====================================================
       HORIZONTAL AUTO SCROLL
       ===================================================== */

    function setupHorizontalScroller(
        element,
        step = 270,
        interval = 3500
    ) {

        if (!element) {
            return;
        }

        if (element.children.length === 0) {
            return;
        }

        const timer = setInterval(function () {

            if (
                element.scrollLeft +
                element.clientWidth >=
                element.scrollWidth - 10
            ) {

                element.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

            } else {

                element.scrollBy({
                    left: step,
                    behavior: "smooth"
                });

            }

        }, interval);

        horizontalTimers.push(timer);
    }

    /* =====================================================
       SIDEBAR AUTO SCROLL
       ===================================================== */

    function setupSidebarScroller(element) {

        if (!element) {
            return;
        }

        sidebarTimer = setInterval(function () {

            const maxScroll =
                element.scrollHeight -
                element.clientHeight;

            if (maxScroll <= 0) {
                return;
            }

            if (element.scrollTop >= maxScroll - 5) {

                element.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            } else {

                element.scrollBy({
                    top: 82,
                    behavior: "smooth"
                });

            }

        }, 2500);
    }

    /* =====================================================
       HERO RENDER
       ===================================================== */

    function renderHero() {

        const hero = $("topStory");

        if (!hero || !posts.length) {
            return;
        }

        hero.innerHTML = "";

        hero.appendChild(
            createHero(
                posts[heroIndex]
            )
        );
    }

    /* =====================================================
       HERO AUTO CHANGE
       ===================================================== */

    function startHero() {

        if (heroTimer) {
            clearInterval(heroTimer);
        }

        heroTimer = setInterval(function () {

            if (!posts.length) {
                return;
            }

            heroIndex++;

            if (heroIndex >= posts.length) {
                heroIndex = 0;
            }

            renderHero();

        }, 5000);
    }

    /* =====================================================
       MOST READ
       ===================================================== */

    function buildMostRead(list) {

        const container =
            $("mostReadList");

        if (!container) {
            return;
        }

        container.innerHTML = "";

        list.slice(0, 6).forEach(
            function (post, index) {

                const card =
                    document.createElement("article");

                card.className =
                    "most-read-card";

                const number =
                    document.createElement("div");

                number.className =
                    "most-number";

                number.textContent =
                    String(index + 1);

                const img =
                    document.createElement("img");

                img.src = imageOf(post);
                img.alt = altOf(post);
                img.loading = "lazy";

                const title =
                    document.createElement("h3");

                title.textContent =
                    titleOf(post);

                card.appendChild(number);
                card.appendChild(img);
                card.appendChild(title);

                card.addEventListener(
                    "click",
                    function () {
                        openPost(post);
                    }
                );

                card.style.cursor = "pointer";

                container.appendChild(card);
            }
        );
    }

    /* =====================================================
       BUILD ALL SECTIONS
       ===================================================== */

    function build() {

        posts = sourcePosts();

        if (!posts.length) {
            console.warn(
                "BS 360 NEWS: Articles not found."
            );
            return;
        }

        /* Latest */

        const latest =
            posts.slice(0, 20);

        const latestGrid =
            $("latestGrid");

        const latestTrack =
            fill(
                latestGrid,
                latest,
                "latest-card"
            );

        setupHorizontalScroller(
            latestTrack,
            264,
            3200
        );

        /* Sidebar */

        const sidebar =
            $("latestSidebar");

        if (sidebar) {

            sidebar.innerHTML = "";

            latest.forEach(
                function (post) {

                    sidebar.appendChild(
                        createSidebarCard(post)
                    );

                }
            );

            setupSidebarScroller(sidebar);
        }

        /* Hero */

        heroIndex = 0;

        renderHero();

        startHero();

        /* Featured */

        const featured =
            posts.slice(0, 12);

        const featuredContainer =
            $("newsSlider");

        if (featuredContainer) {

            featuredContainer.innerHTML = "";

            const track =
                document.createElement("div");

            track.className =
                "slider-track";

            featured.forEach(
                function (post) {

                    track.appendChild(
                        createCard(
                            post,
                            "featured-card"
                        )
                    );

                }
            );

            featuredContainer.appendChild(track);

            setupHorizontalScroller(
                track,
                264,
                3000
            );
        }

        /* Movies */

        const movies =
            posts.filter(function (post) {

                return hasCat(
                    post,
                    ["movies", "movie"]
                );

            });

        const movieTrack =
            fill(
                $("cinemaGrid"),
                movies,
                "movie-card"
            );

        setupHorizontalScroller(
            movieTrack,
            264,
            3300
        );

        /* Sports */

        const sports =
            posts.filter(function (post) {

                return hasCat(
                    post,
                    ["sports"]
                );

            });

        const sportsTrack =
            fill(
                $("sportsGrid"),
                sports,
                "sports-card"
            );

        setupHorizontalScroller(
            sportsTrack,
            264,
            3300
        );

        /* Most Read */

        buildMostRead(
            posts.slice().reverse()
        );

        /* Arrow buttons */

        const prev =
            $("sliderPrev");

        const next =
            $("sliderNext");

        const slider =
            $("newsSlider .slider-track");

        if (prev && slider) {

            prev.onclick = function () {

                slider.scrollBy({
                    left: -280,
                    behavior: "smooth"
                });

            };
        }

        if (next && slider) {

            next.onclick = function () {

                slider.scrollBy({
                    left: 280,
                    behavior: "smooth"
                });

            };
        }

    }

    /* =====================================================
       SEARCH
       ===================================================== */

    window.toggleSearch = function () {

        const box =
            $("searchBox");

        if (!box) {
            return;
        }

        box.classList.toggle("open");
        box.classList.toggle("active");

        if (
            box.classList.contains("open") ||
            box.classList.contains("active")
        ) {

            const input =
                $("searchInput");

            if (input) {
                input.focus();
            }
        }
    };

    window.searchNews = function () {

        const input =
            $("searchInput");

        if (!input) {
            return;
        }

        const query =
            input.value
                .trim()
                .toLowerCase();

        document.querySelectorAll(
            "#legacyNewsSource .post"
        ).forEach(function (post) {

            if (!query) {
                post.style.display = "";
                return;
            }

            const text =
                post.textContent
                    .toLowerCase();

            post.style.display =
                text.includes(query)
                    ? ""
                    : "none";

        });

    };

    /* =====================================================
       MOBILE NAV
       ===================================================== */

    window.toggleMobileNav = function () {

        const nav =
            $("navLinks");

        if (!nav) {
            return;
        }

        nav.classList.toggle(
            "mobile-open"
        );

    };

    /* =====================================================
       THEME
       ===================================================== */

    window.toggleTheme = function () {

        document.body.classList.toggle(
            "dark-mode"
        );

    };

    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    window.filterPosts = function (category) {

        const normalized =
            String(category || "")
                .toLowerCase()
                .trim();

        let target = null;

        if (normalized === "movies") {
            target = $("cinemaSection");
        }

        if (normalized === "sports") {
            target = $("sportsSection");
        }

        if (normalized === "all" ||
            normalized === "news") {

            target = $("latestSection");

        }

        if (target) {

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    };

    /* =====================================================
       START
       ===================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            build
        );

    } else {

        build();

    }

})();
