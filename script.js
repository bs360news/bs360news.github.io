/* =========================================================
   BS 360 NEWS — CLEAN NEWS PORTAL JAVASCRIPT
   ========================================================= */

(function () {

    "use strict";

    let posts = [];
    let heroIndex = 0;
    let heroTimer = null;
    let sidebarTimer = null;
    const horizontalTimers = [];

    const $ = id => document.getElementById(id);

    /* =====================================================
       SOURCE ARTICLES
       ===================================================== */

    function sourcePosts() {

        return Array.from(
            document.querySelectorAll(
                "#legacyNewsSource .post[data-url]"
            )
        );

    }

    /* =====================================================
       TITLE
       ===================================================== */

    function titleOf(post) {

        const selectors = [
            ".news-content p",
            ".post-title",
            ".article-title",
            ".title",
            "h2",
            "h3"
        ];

        for (const selector of selectors) {

            const el = post.querySelector(selector);

            if (el && el.textContent.trim()) {
                return el.textContent.trim();
            }

        }

        return (
            post.dataset.title ||
            "BS 360 NEWS"
        ).trim();

    }

    /* =====================================================
       IMAGE
       ===================================================== */

    function imageOf(post) {

        const img = post.querySelector("img");

        if (!img) {
            return "dp.png.png";
        }

        return (
            img.getAttribute("src") ||
            img.dataset.src ||
            img.getAttribute("data-src") ||
            "dp.png.png"
        );

    }

    /* =====================================================
       ALT
       ===================================================== */

    function altOf(post) {

        const img = post.querySelector("img");

        return (
            img?.getAttribute("alt") ||
            titleOf(post)
        );

    }

    /* =====================================================
       CATEGORY
       ===================================================== */

    function catsOf(post) {

        const value =
            post.dataset.category ||
            post.getAttribute("data-category") ||
            "";

        return value
            .toLowerCase()
            .replace(/[,_|/]+/g, " ")
            .split(/\s+/)
            .filter(Boolean);

    }

    function hasCat(post, categories) {

        const cats = catsOf(post);

        return categories.some(category => {

            const wanted =
                category.toLowerCase().trim();

            return cats.includes(wanted);

        });

    }

    /* =====================================================
       URL
       ===================================================== */

    function articleUrl(post) {

        return (
            post.dataset.url ||
            post.getAttribute("data-url") ||
            post.querySelector("a")?.getAttribute("href") ||
            "#"
        );

    }

    function openPost(post) {

        const url = articleUrl(post);

        if (url && url !== "#") {
            window.location.href = url;
        }

    }

    /* =====================================================
       CATEGORY LABEL
       ===================================================== */

    function categoryLabel(post) {

        if (
            hasCat(post, [
                "movies",
                "movie",
                "cinema"
            ])
        ) {
            return "🎬 సినిమా";
        }

        if (
            hasCat(post, [
                "sports",
                "sports news",
                "news sports"
            ])
        ) {
            return "🏏 స్పోర్ట్స్";
        }

        if (
            hasCat(post, [
                "andhra",
                "andhra pradesh",
                "ap"
            ])
        ) {
            return "🏛️ ఆంధ్రప్రదేశ్";
        }

        if (
            hasCat(post, [
                "telangana",
                "ts"
            ])
        ) {
            return "🏛️ తెలంగాణ";
        }

        return "📰 తాజా వార్తలు";

    }

    /* =====================================================
       NORMAL CARD
       ===================================================== */

    function createCard(post, type) {

        const card =
            document.createElement("article");

        card.className =
            "portal-card " + (type || "");

        const img =
            document.createElement("img");

        img.src = imageOf(post);
        img.alt = altOf(post);
        img.loading = "lazy";

        img.onerror = function () {
            this.src = "dp.png.png";
        };

        const body =
            document.createElement("div");

        body.className =
            "portal-card-body";

        const tag =
            document.createElement("div");

        tag.className =
            "portal-card-tag";

        tag.textContent =
            categoryLabel(post);

        const title =
            document.createElement("h3");

        title.textContent =
            titleOf(post);

        const meta =
            document.createElement("div");

        meta.className =
            "portal-card-meta";

        meta.textContent =
            "BS 360 NEWS";

        body.appendChild(tag);
        body.appendChild(title);
        body.appendChild(meta);

        card.appendChild(img);
        card.appendChild(body);

        card.addEventListener(
            "click",
            () => openPost(post)
        );

        return card;

    }

    /* =====================================================
       SIDEBAR CARD
       ===================================================== */

    function createSidebarCard(post) {

        const card =
            document.createElement("article");

        card.className =
            "sidebar-card";

        const img =
            document.createElement("img");

        img.src = imageOf(post);
        img.alt = altOf(post);
        img.loading = "lazy";

        img.onerror = function () {
            this.src = "dp.png.png";
        };

        const title =
            document.createElement("h3");

        title.textContent =
            titleOf(post);

        card.appendChild(img);
        card.appendChild(title);

        card.addEventListener(
            "click",
            () => openPost(post)
        );

        return card;

    }

    /* =====================================================
       HERO
       ===================================================== */

    function createHero(post) {

        const wrapper =
            document.createElement("article");

        wrapper.className =
            "hero-card";

        const img =
            document.createElement("img");

        img.src = imageOf(post);
        img.alt = altOf(post);

        img.onerror = function () {
            this.src = "dp.png.png";
        };

        const overlay =
            document.createElement("div");

        overlay.className =
            "hero-overlay";

        const label =
            document.createElement("div");

        label.className =
            "hero-label";

        label.textContent =
            "🔥 TOP STORY";

        const title =
            document.createElement("h1");

        title.textContent =
            titleOf(post);

        const read =
            document.createElement("span");

        read.className =
            "hero-read";

        read.textContent =
            "చదవండి →";

        overlay.appendChild(label);
        overlay.appendChild(title);
        overlay.appendChild(read);

        wrapper.appendChild(img);
        wrapper.appendChild(overlay);

        wrapper.addEventListener(
            "click",
            () => openPost(post)
        );

        return wrapper;

    }

    /* =====================================================
       CAROUSEL
       ===================================================== */

    function fill(container, list, type) {

        if (!container) {
            return null;
        }

        container.innerHTML = "";

        if (!list.length) {
            return null;
        }

        const track =
            document.createElement("div");

        track.className =
            "horizontal-track";

        list.forEach(post => {

            track.appendChild(
                createCard(post, type)
            );

        });

        container.appendChild(track);

        return track;

    }

    /* =====================================================
       AUTO HORIZONTAL SCROLL
       ===================================================== */

    function setupHorizontalScroller(
        element,
        step = 270,
        interval = 3500
    ) {

        if (!element) {
            return;
        }

        if (
            element.scrollWidth <=
            element.clientWidth
        ) {
            return;
        }

        const timer =
            setInterval(function () {

                const max =
                    element.scrollWidth -
                    element.clientWidth;

                if (element.scrollLeft >= max - 10) {

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

        if (sidebarTimer) {
            clearInterval(sidebarTimer);
        }

        sidebarTimer =
            setInterval(function () {

                const max =
                    element.scrollHeight -
                    element.clientHeight;

                if (max <= 0) {
                    return;
                }

                if (
                    element.scrollTop >=
                    max - 5
                ) {

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

            }, 2300);

    }

    /* =====================================================
       HERO
       ===================================================== */

    function renderHero() {

        const hero =
            $("topStory");

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

    function startHero() {

        if (heroTimer) {
            clearInterval(heroTimer);
        }

        heroTimer =
            setInterval(function () {

                if (!posts.length) {
                    return;
                }

                heroIndex++;

                if (
                    heroIndex >=
                    Math.min(posts.length, 10)
                ) {
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
            (post, index) => {

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

                img.src =
                    imageOf(post);

                img.alt =
                    altOf(post);

                img.loading =
                    "lazy";

                img.onerror = function () {
                    this.src = "dp.png.png";
                };

                const title =
                    document.createElement("h3");

                title.textContent =
                    titleOf(post);

                card.appendChild(number);
                card.appendChild(img);
                card.appendChild(title);

                card.addEventListener(
                    "click",
                    () => openPost(post)
                );

                container.appendChild(card);

            }
        );

    }

    /* =====================================================
       BUILD PORTAL
       ===================================================== */

    function build() {

        posts = sourcePosts();

        console.log(
            "BS 360 NEWS articles:",
            posts.length
        );

        if (!posts.length) {

            console.warn(
                "BS 360 NEWS: legacy articles not found."
            );

            return;

        }

        /* =================================================
           LATEST
           ================================================= */

        const latest =
            posts.slice(0, 20);

        const latestTrack =
            fill(
                $("latestGrid"),
                latest,
                "latest-card"
            );

        setupHorizontalScroller(
            latestTrack,
            270,
            3200
        );

        /* =================================================
           SIDEBAR
           ================================================= */

        const sidebar =
            $("latestSidebar");

        if (sidebar) {

            sidebar.innerHTML = "";

            latest.forEach(post => {

                sidebar.appendChild(
                    createSidebarCard(post)
                );

            });

            const list =
                sidebar;

            setupSidebarScroller(list);

        }

        /* =================================================
           HERO
           ================================================= */

        heroIndex = 0;

        renderHero();

        startHero();

        /* =================================================
           FEATURED
           ================================================= */

        const featured =
            posts.slice(0, 12);

        const slider =
            $("newsSlider");

        if (slider) {

            slider.innerHTML = "";

            const track =
                document.createElement("div");

            track.className =
                "slider-track";

            featured.forEach(post => {

                track.appendChild(
                    createCard(
                        post,
                        "featured-card"
                    )
                );

            });

            slider.appendChild(track);

            setupHorizontalScroller(
                track,
                270,
                3000
            );

        }

        /* =================================================
           MOVIES
           ================================================= */

        const movies =
            posts.filter(post =>
                hasCat(
                    post,
                    [
                        "movies",
                        "movie",
                        "cinema"
                    ]
                )
            );

        const movieTrack =
            fill(
                $("cinemaGrid"),
                movies,
                "movie-card"
            );

        setupHorizontalScroller(
            movieTrack,
            270,
            3300
        );

        /* =================================================
           SPORTS
           ================================================= */

        const sports =
            posts.filter(post =>
                hasCat(
                    post,
                    [
                        "sports",
                        "sports news",
                        "news sports"
                    ]
                )
            );

        console.log(
            "BS 360 NEWS sports articles:",
            sports.length
        );

        const sportsTrack =
            fill(
                $("sportsGrid"),
                sports,
                "sports-card"
            );

        setupHorizontalScroller(
            sportsTrack,
            270,
            3300
        );

        /* =================================================
           MOST READ
           ================================================= */

        buildMostRead(
            posts.slice().reverse()
        );

        /* =================================================
           FEATURED ARROWS
           ================================================= */

        const prev =
            $("sliderPrev");

        const next =
            $("sliderNext");

        const featuredTrack =
            document.querySelector(
                "#newsSlider .slider-track"
            );

        if (prev && featuredTrack) {

            prev.onclick = function () {

                featuredTrack.scrollBy({
                    left: -285,
                    behavior: "smooth"
                });

            };

        }

        if (next && featuredTrack) {

            next.onclick = function () {

                featuredTrack.scrollBy({
                    left: 285,
                    behavior: "smooth"
                });

            };

        }

        /* =================================================
           CLOCK
           ================================================= */

        updateDateTime();

        setInterval(
            updateDateTime,
            1000
        );

    }

    /* =====================================================
       DATE + TIME
       ===================================================== */

    function updateDateTime() {

        const now =
            new Date();

        const dateText =
            now.toLocaleDateString(
                "en-IN",
                {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        const timeText =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );

        document.querySelectorAll(
            "body *"
        ).forEach(function (el) {

            if (
                el.children.length === 0 &&
                el.textContent.includes(
                    "📅 Loading..."
                )
            ) {

                el.textContent =
                    "📅 " +
                    dateText +
                    "  ⏰ " +
                    timeText;

            }

        });

    }

    /* =====================================================
       SEARCH OPEN
       ===================================================== */

    window.toggleSearch =
        function () {

            const box =
                $("searchBox");

            if (!box) {
                return;
            }

            box.classList.toggle(
                "open"
            );

            box.classList.toggle(
                "active"
            );

            const input =
                $("searchInput");

            if (
                input &&
                (
                    box.classList.contains("open") ||
                    box.classList.contains("active")
                )
            ) {

                input.focus();

            }

        };

    /* =====================================================
       SEARCH
       ===================================================== */

    window.searchNews =
        function () {

            const input =
                $("searchInput");

            if (!input) {
                return;
            }

            const query =
                input.value
                    .trim()
                    .toLowerCase();

            const cards =
                document.querySelectorAll(
                    ".portal-card, .sidebar-card, .most-read-card"
                );

            if (!query) {

                cards.forEach(card => {
                    card.style.display = "";
                });

                return;
            }

            cards.forEach(card => {

                const text =
                    card.textContent.toLowerCase();

                card.style.display =
                    text.includes(query)
                        ? ""
                        : "none";

            });

        };

    /* =====================================================
       MOBILE NAV
       ===================================================== */

    window.toggleMobileNav =
        function () {

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

    window.toggleTheme =
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );

        };

    /* =====================================================
       CATEGORY NAVIGATION
       ===================================================== */

    window.filterPosts =
        function (category) {

            const value =
                String(category || "")
                    .toLowerCase()
                    .trim();

            let target = null;

            if (value === "movies") {
                target = $("cinemaSection");
            }

            else if (value === "sports") {
                target = $("sportsSection");
            }

            else {
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
