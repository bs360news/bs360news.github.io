/* =========================================================
   BS 360 NEWS — FINAL NEWS PORTAL JAVASCRIPT
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
            ".post-title",
            ".article-title",
            ".news-title",
            ".title",
            ".news-content h2",
            ".news-content h3"
        ];

        for (const selector of selectors) {

            const el = post.querySelector(selector);

            if (el && el.textContent.trim()) {
                return el.textContent.trim();
            }

        }

        const firstParagraph =
            post.querySelector(".news-content p");

        if (
            firstParagraph &&
            firstParagraph.textContent.trim()
        ) {

            return firstParagraph.textContent
                .trim()
                .replace(/\s+/g, " ")
                .slice(0, 150);

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
       CATEGORIES
       ===================================================== */

    function catsOf(post) {

        const value =
            post.dataset.category ||
            post.getAttribute("data-category") ||
            "";

        return value
            .toLowerCase()
            .replace(/,/g, " ")
            .replace(/\//g, " ")
            .split(/\s+/)
            .map(x => x.trim())
            .filter(Boolean);

    }

    /* =====================================================
       CATEGORY CHECK
       ===================================================== */

    function hasCat(post, categories) {

        const cats = catsOf(post);

        return categories.some(function (category) {

            return cats.includes(
                String(category).toLowerCase()
            );

        });

    }

    /* =====================================================
       SPORTS CHECK
       ===================================================== */

    function isSports(post) {

        const cats = catsOf(post);

        return (
            cats.includes("sports") ||
            cats.includes("sport") ||
            cats.includes("sportsnews") ||
            cats.includes("sports-news") ||
            cats.includes("sports_news") ||
            cats.includes("newssports") ||
            cats.includes("news-sports") ||
            cats.includes("news_sports")
        );

    }

    /* =====================================================
       MOVIES CHECK
       ===================================================== */

    function isMovies(post) {

        const cats = catsOf(post);

        return (
            cats.includes("movies") ||
            cats.includes("movie") ||
            cats.includes("cinema") ||
            cats.includes("film")
        );

    }

    /* =====================================================
       ARTICLE URL
       ===================================================== */

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
       IMAGE ERROR
       ===================================================== */

    function protectImage(img) {

        img.addEventListener(
            "error",
            function () {

                if (img.src.includes("dp.png.png")) {
                    return;
                }

                img.src = "dp.png.png";

            },
            {
                once: true
            }
        );

    }

    /* =====================================================
       NORMAL CARD
       ===================================================== */

    function createCard(post, type) {

        const card =
            document.createElement("article");

        card.className =
            "portal-card " +
            (type || "");

        const img =
            document.createElement("img");

        img.src = imageOf(post);
        img.alt = altOf(post);
        img.loading = "lazy";

        protectImage(img);

        const body =
            document.createElement("div");

        body.className =
            "portal-card-body";

        const tag =
            document.createElement("div");

        tag.className =
            "portal-card-tag";

        if (isMovies(post)) {

            tag.textContent =
                "🎬 సినిమా";

        } else if (isSports(post)) {

            tag.textContent =
                "🏏 స్పోర్ట్స్";

        } else {

            tag.textContent =
                "📰 తాజా వార్తలు";

        }

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
            function () {

                openPost(post);

            }
        );

        card.style.cursor =
            "pointer";

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

        img.src =
            imageOf(post);

        img.alt =
            altOf(post);

        img.loading =
            "lazy";

        protectImage(img);

        const title =
            document.createElement("h3");

        title.textContent =
            titleOf(post);

        card.appendChild(img);
        card.appendChild(title);

        card.addEventListener(
            "click",
            function () {

                openPost(post);

            }
        );

        card.style.cursor =
            "pointer";

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

        img.src =
            imageOf(post);

        img.alt =
            altOf(post);

        protectImage(img);

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
            function () {

                openPost(post);

            }
        );

        wrapper.style.cursor =
            "pointer";

        return wrapper;

    }

    /* =====================================================
       FILL CAROUSEL
       ===================================================== */

    function fill(container, list, type) {

        if (!container) {
            return null;
        }

        container.innerHTML = "";

        if (!list.length) {

            const empty =
                document.createElement("div");

            empty.textContent =
                "వార్తలు త్వరలో అందుబాటులో ఉంటాయి.";

            empty.style.padding =
                "20px";

            empty.style.color =
                "#777";

            container.appendChild(empty);

            return null;

        }

        const track =
            document.createElement("div");

        track.className =
            "horizontal-track";

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

        if (element.children.length < 2) {
            return;
        }

        const timer =
            setInterval(function () {

                const maxScroll =
                    element.scrollWidth -
                    element.clientWidth;

                if (maxScroll <= 5) {
                    return;
                }

                if (
                    element.scrollLeft >=
                    maxScroll - 10
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

        if (element.children.length < 2) {
            return;
        }

        if (sidebarTimer) {
            clearInterval(sidebarTimer);
        }

        sidebarTimer =
            setInterval(function () {

                const maxScroll =
                    element.scrollHeight -
                    element.clientHeight;

                if (maxScroll <= 5) {
                    return;
                }

                if (
                    element.scrollTop >=
                    maxScroll - 8
                ) {

                    element.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                } else {

                    element.scrollBy({
                        top: 80,
                        behavior: "smooth"
                    });

                }

            }, 2200);

    }

    /* =====================================================
       HERO RENDER
       ===================================================== */

    function renderHero() {

        const hero =
            $("topStory");

        if (
            !hero ||
            !posts.length
        ) {
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

        if (posts.length < 2) {
            return;
        }

        heroTimer =
            setInterval(function () {

                heroIndex++;

                if (
                    heroIndex >=
                    posts.length
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

        list
            .slice(0, 6)
            .forEach(function (post, index) {

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

                protectImage(img);

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

                card.style.cursor =
                    "pointer";

                container.appendChild(card);

            });

    }

    /* =====================================================
       DATE + TIME
       ===================================================== */

    function updateDateTime() {

        const now =
            new Date();

        const date =
            now.toLocaleDateString(
                "te-IN",
                {
                    day: "2-digit",
                    month: "2-digit",
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

        const dateElements =
            document.querySelectorAll(
                "[data-current-date]"
            );

        dateElements.forEach(function (el) {

            el.textContent =
                "📅 " + date;

        });

        const timeElements =
            document.querySelectorAll(
                "[data-current-time]"
            );

        timeElements.forEach(function (el) {

            el.textContent =
                "⏰ " + time;

        });

        /* Existing text fallback */

        document.querySelectorAll(
            ".date-display"
        ).forEach(function (el) {

            el.textContent =
                "📅 " + date;

        });

        document.querySelectorAll(
            ".time-display"
        ).forEach(function (el) {

            el.textContent =
                "⏰ " + time;

        });

    }

    /* =====================================================
       BUILD ALL SECTIONS
       ===================================================== */

    function build() {

        posts =
            sourcePosts();

        if (!posts.length) {

            console.warn(
                "BS 360 NEWS: Articles not found."
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
            264,
            3200
        );

        /* =================================================
           SIDEBAR
           ================================================= */

        const sidebar =
            $("latestSidebar");

        if (sidebar) {

            sidebar.innerHTML = "";

            latest.forEach(function (post) {

                sidebar.appendChild(
                    createSidebarCard(post)
                );

            });

            setupSidebarScroller(
                sidebar
            );

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

        const featuredContainer =
            $("newsSlider");

        if (featuredContainer) {

            featuredContainer.innerHTML = "";

            const track =
                document.createElement("div");

            track.className =
                "slider-track";

            featured.forEach(function (post) {

                track.appendChild(
                    createCard(
                        post,
                        "featured-card"
                    )
                );

            });

            featuredContainer.appendChild(
                track
            );

            setupHorizontalScroller(
                track,
                264,
                3000
            );

        }

        /* =================================================
           MOVIES
           ================================================= */

        const movies =
            posts.filter(function (post) {

                return isMovies(post);

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

        /* =================================================
           SPORTS
           ================================================= */

        const sports =
            posts.filter(function (post) {

                return isSports(post);

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

        const slider =
            document.querySelector(
                "#newsSlider .slider-track"
            );

        if (prev && slider) {

            prev.onclick =
                function () {

                    slider.scrollBy({
                        left: -280,
                        behavior: "smooth"
                    });

                };

        }

        if (next && slider) {

            next.onclick =
                function () {

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

    /* =====================================================
       SEARCH GENERATED NEWS
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

            const generatedCards =
                document.querySelectorAll(
                    ".portal-card"
                );

            generatedCards.forEach(
                function (card) {

                    const text =
                        card.textContent
                            .toLowerCase();

                    if (!query) {

                        card.style.display =
                            "";

                    } else {

                        card.style.display =
                            text.includes(query)
                                ? ""
                                : "none";

                    }

                }
            );

            const source =
                $("legacyNewsSource");

            if (source) {

                source.querySelectorAll(
                    ".post"
                ).forEach(function (post) {

                    post.style.display =
                        "none";

                });

            }

        };

    /* =====================================================
       SEARCH ENTER KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                document.activeElement?.id ===
                "searchInput"
            ) {

                window.searchNews();

            }

        }
    );

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

            const normalized =
                String(category || "")
                    .toLowerCase()
                    .trim();

            let target =
                null;

            if (
                normalized === "movies" ||
                normalized === "movie" ||
                normalized === "cinema"
            ) {

                target =
                    $("cinemaSection");

            } else if (
                normalized === "sports" ||
                normalized === "sport"
            ) {

                target =
                    $("sportsSection");

            } else {

                target =
                    $("latestSection");

            }

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        };

    /* =====================================================
       START DATE / TIME
       ===================================================== */

    updateDateTime();

    setInterval(
        updateDateTime,
        1000
    );

    /* =====================================================
       START PORTAL
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
