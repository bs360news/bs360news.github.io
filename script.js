/* =========================================================
   BS 360 NEWS - COMPLETE PORTAL JAVASCRIPT
   Hero + Latest + Featured + Movies + Sports + Most Read
   Auto Scroll + Search + Theme + Mobile Menu
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const source = document.querySelector("#legacyNewsSource");

    /*
      If legacyNewsSource is not present,
      use the original .news-list directly.
    */
    const sourcePosts = source
        ? [...source.querySelectorAll(".post[data-url]")]
        : [...document.querySelectorAll(".news-list .post[data-url]")];

    if (!sourcePosts.length) {
        console.warn("BS 360 NEWS: Articles not found.");
        return;
    }

    /* =====================================================
       BASIC ARTICLE DATA
    ===================================================== */

    function titleOf(post) {
        const p = post.querySelector(".news-content p");
        return p ? p.textContent.trim() : "BS 360 NEWS";
    }

    function imageOf(post) {
        const img = post.querySelector("img");
        return img ? img.getAttribute("src") : "dp.png.png";
    }

    function altOf(post) {
        const img = post.querySelector("img");
        return img
            ? (img.getAttribute("alt") || titleOf(post))
            : titleOf(post);
    }

    function urlOf(post) {
        return post.getAttribute("data-url") || "#";
    }

    function catsOf(post) {
        return (post.getAttribute("data-category") || "")
            .toLowerCase()
            .split(/[\s,]+/)
            .filter(Boolean);
    }

    function hasCategory(post, category) {

        const cats = catsOf(post);

        category = category.toLowerCase();

        if (category === "movies") {
            return cats.includes("movie") || cats.includes("movies");
        }

        if (category === "sports") {
            return cats.includes("sports");
        }

        if (category === "news") {
            return (
                cats.includes("news") ||
                cats.includes("national") ||
                cats.includes("india") ||
                cats.includes("politics") ||
                cats.includes("business") ||
                cats.includes("science") ||
                cats.includes("technology") ||
                cats.includes("human-interest") ||
                cats.includes("automobiles") ||
                cats.includes("telangana") ||
                cats.includes("andhra") ||
                cats.includes("ap") ||
                cats.includes("ts")
            );
        }

        return cats.includes(category);
    }


    /* =====================================================
       CARD CREATOR
    ===================================================== */

    function createCard(post, type = "normal") {

        const card = document.createElement("article");

        card.className = "portal-card";

        const image = document.createElement("img");

        image.src = imageOf(post);
        image.alt = altOf(post);
        image.loading = "lazy";

        const body = document.createElement("div");

        body.className = "portal-card-body";

        const tag = document.createElement("span");

        tag.className = "portal-card-tag";

        if (hasCategory(post, "sports")) {
            tag.textContent = "🏏 SPORTS";
        } else if (hasCategory(post, "movies")) {
            tag.textContent = "🎬 MOVIES";
        } else {
            tag.textContent = "📰 NEWS";
        }

        const title = document.createElement("h3");

        title.textContent = titleOf(post);

        const read = document.createElement("a");

        read.className = "read-more";

        read.href = urlOf(post);

        read.textContent = "చదవండి →";

        body.appendChild(tag);
        body.appendChild(title);
        body.appendChild(read);

        card.appendChild(image);
        card.appendChild(body);

        if (type === "slider") {
            card.classList.add("slider-card");
        }

        if (type === "sports") {
            card.classList.add("sports-card");
        }

        return card;
    }


    /* =====================================================
       HERO CREATOR
    ===================================================== */

    function createHero(post) {

        const card = document.createElement("article");

        card.className = "hero-card";

        const link = document.createElement("a");

        link.href = urlOf(post);

        link.className = "hero-link";

        const image = document.createElement("img");

        image.src = imageOf(post);

        image.alt = altOf(post);

        image.loading = "eager";

        const overlay = document.createElement("div");

        overlay.className = "hero-overlay";

        const tag = document.createElement("span");

        tag.className = "hero-tag";

        tag.textContent = "🔥 TOP STORY";

        const title = document.createElement("h1");

        title.textContent = titleOf(post);

        const read = document.createElement("span");

        read.className = "hero-read";

        read.textContent = "పూర్తి వార్త చదవండి →";

        overlay.appendChild(tag);
        overlay.appendChild(title);
        overlay.appendChild(read);

        link.appendChild(image);
        link.appendChild(overlay);

        card.appendChild(link);

        return card;
    }


    /* =====================================================
       HERO AUTO CHANGE
    ===================================================== */

    let heroTimer = null;
    let heroIndex = 0;
    let heroStories = [];

    function startHero(list) {

        const heroBox = document.querySelector("#topStory");

        if (!heroBox || !list.length) {
            return;
        }

        heroStories = list.slice(0, 8);

        heroIndex = 0;

        function showHero() {

            heroBox.innerHTML = "";

            heroBox.appendChild(
                createHero(heroStories[heroIndex])
            );

            heroIndex++;

            if (heroIndex >= heroStories.length) {
                heroIndex = 0;
            }
        }

        showHero();

        if (heroTimer) {
            clearInterval(heroTimer);
        }

        if (heroStories.length > 1) {

            heroTimer = setInterval(
                showHero,
                5000
            );

        }
    }


    /* =====================================================
       LATEST SIDEBAR
    ===================================================== */

    function buildLatestSidebar(list) {

        const sidebar = document.querySelector("#latestSidebar");

        if (!sidebar) {
            return;
        }

        sidebar.innerHTML = "";

        const heading = document.createElement("div");

        heading.className = "sidebar-heading";

        heading.innerHTML = "📰 తాజా వార్తలు";

        sidebar.appendChild(heading);

        const listBox = document.createElement("div");

        listBox.className = "sidebar-list";

        list.slice(0, 12).forEach(function (post, index) {

            const item = document.createElement("a");

            item.className = "sidebar-item";

            item.href = urlOf(post);

            const img = document.createElement("img");

            img.src = imageOf(post);

            img.alt = altOf(post);

            img.loading = "lazy";

            const content = document.createElement("div");

            content.className = "sidebar-content";

            const number = document.createElement("span");

            number.className = "sidebar-number";

            number.textContent = String(index + 1).padStart(2, "0");

            const title = document.createElement("h3");

            title.textContent = titleOf(post);

            content.appendChild(number);
            content.appendChild(title);

            item.appendChild(img);
            item.appendChild(content);

            listBox.appendChild(item);

        });

        sidebar.appendChild(listBox);

        setupSidebarScroller(listBox);
    }


    /* =====================================================
       VERTICAL SIDEBAR AUTO SCROLL
    ===================================================== */

    function setupSidebarScroller(box) {

        if (!box) {
            return;
        }

        let timer = null;

        function start() {

            if (timer) {
                clearInterval(timer);
            }

            timer = setInterval(function () {

                if (
                    box.scrollHeight <=
                    box.clientHeight
                ) {
                    return;
                }

                if (
                    box.scrollTop +
                    box.clientHeight >=
                    box.scrollHeight - 5
                ) {

                    box.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                } else {

                    box.scrollBy({
                        top: 105,
                        behavior: "smooth"
                    });

                }

            }, 2500);
        }

        function stop() {

            if (timer) {
                clearInterval(timer);
                timer = null;
            }

        }

        box.addEventListener("mouseenter", stop);

        box.addEventListener("mouseleave", start);

        box.addEventListener("touchstart", stop, {
            passive: true
        });

        box.addEventListener("touchend", start, {
            passive: true
        });

        start();
    }


    /* =====================================================
       HORIZONTAL AUTO SCROLLER
    ===================================================== */

    function setupHorizontalScroller(box) {

        if (!box) {
            return;
        }

        let timer = null;

        function start() {

            if (timer) {
                clearInterval(timer);
            }

            timer = setInterval(function () {

                if (
                    box.scrollWidth <=
                    box.clientWidth + 5
                ) {
                    return;
                }

                const maxScroll =
                    box.scrollWidth -
                    box.clientWidth;

                if (
                    box.scrollLeft >=
                    maxScroll - 10
                ) {

                    box.scrollTo({
                        left: 0,
                        behavior: "smooth"
                    });

                } else {

                    box.scrollBy({
                        left: 320,
                        behavior: "smooth"
                    });

                }

            }, 3000);
        }

        function stop() {

            if (timer) {
                clearInterval(timer);
                timer = null;
            }

        }

        box.addEventListener("mouseenter", stop);

        box.addEventListener("mouseleave", start);

        box.addEventListener("touchstart", stop, {
            passive: true
        });

        box.addEventListener("touchend", start, {
            passive: true
        });

        start();
    }


    /* =====================================================
       BUILD HORIZONTAL SECTION
    ===================================================== */

    function buildHorizontal(
        selector,
        list,
        type = "normal",
        limit = 20
    ) {

        const box = document.querySelector(selector);

        if (!box) {
            return;
        }

        box.innerHTML = "";

        list
            .slice(0, limit)
            .forEach(function (post) {

                box.appendChild(
                    createCard(post, type)
                );

            });

        setupHorizontalScroller(box);
    }


    /* =====================================================
       MOST READ
    ===================================================== */

    function buildMostRead(list) {

        const box =
            document.querySelector("#mostReadList");

        if (!box) {
            return;
        }

        box.innerHTML = "";

        list.slice(0, 9).forEach(function (post, index) {

            const item =
                document.createElement("a");

            item.className = "most-read-item";

            item.href = urlOf(post);

            const number =
                document.createElement("span");

            number.className = "most-read-number";

            number.textContent =
                String(index + 1).padStart(2, "0");

            const img =
                document.createElement("img");

            img.src = imageOf(post);

            img.alt = altOf(post);

            img.loading = "lazy";

            const title =
                document.createElement("h3");

            title.textContent = titleOf(post);

            item.appendChild(number);
            item.appendChild(img);
            item.appendChild(title);

            box.appendChild(item);

        });
    }


    /* =====================================================
       MAIN BUILD
    ===================================================== */

    function build(list) {

        if (!list.length) {
            return;
        }

        /* TOP STORY */

        startHero(list);

        /* LATEST LEFT SIDEBAR */

        buildLatestSidebar(
            list.slice(1)
        );


        /* FEATURED NEWS */

        buildHorizontal(
            "#sliderTrack",
            list,
            "slider",
            16
        );


        /* LATEST NEWS */

        buildHorizontal(
            "#latestGrid",
            list,
            "normal",
            20
        );


        /* MOVIES */

        const movies =
            list.filter(function (post) {

                return hasCategory(
                    post,
                    "movies"
                );

            });

        buildHorizontal(
            "#cinemaGrid",
            movies,
            "normal",
            20
        );


        /* SPORTS */

        const sports =
            list.filter(function (post) {

                return hasCategory(
                    post,
                    "sports"
                );

            });

        buildHorizontal(
            "#sportsGrid",
            sports,
            "sports",
            sports.length
        );


        /* MOST READ */

        buildMostRead(list);

    }


    /* =====================================================
       NAV CATEGORY FILTER
    ===================================================== */

    window.filterPosts = function (category) {

        category =
            String(category || "all")
            .toLowerCase();

        let filtered;

        if (category === "all") {

            filtered = sourcePosts;

        } else {

            filtered =
                sourcePosts.filter(function (post) {

                    return hasCategory(
                        post,
                        category
                    );

                });

        }

        if (!filtered.length) {

            console.warn(
                "No articles found for:",
                category
            );

            return;
        }

        build(filtered);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        closeMobileNav();

    };


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch = function () {

        const box =
            document.querySelector("#searchBox");

        if (!box) {
            return;
        }

        box.classList.toggle("open");

        const input =
            document.querySelector("#searchInput");

        if (
            box.classList.contains("open") &&
            input
        ) {

            setTimeout(function () {
                input.focus();
            }, 100);

        }

    };


    window.searchNews = function () {

        const input =
            document.querySelector("#searchInput");

        if (!input) {
            return;
        }

        const query =
            input.value.trim().toLowerCase();

        if (!query) {

            build(sourcePosts);

            return;
        }

        const results =
            sourcePosts.filter(function (post) {

                return titleOf(post)
                    .toLowerCase()
                    .includes(query);

            });

        build(results);

    };


    /* =====================================================
       SEARCH ENTER KEY
    ===================================================== */

    const searchInput =
        document.querySelector("#searchInput");

    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    searchNews();

                }

            }
        );

    }


    /* =====================================================
       DARK MODE
    ===================================================== */

    function setDarkMode(enabled) {

        document.body.classList.toggle(
            "dark-mode",
            enabled
        );

        const button =
            document.querySelector("#themeButton");

        if (button) {

            button.textContent =
                enabled
                    ? "☀️ Light"
                    : "🌙 Dark";

        }

        try {

            localStorage.setItem(
                "bs360-dark-mode",
                enabled ? "1" : "0"
            );

        } catch (e) {}

    }


    window.toggleTheme = function () {

        const enabled =
            !document.body.classList.contains(
                "dark-mode"
            );

        setDarkMode(enabled);

    };


    /* =====================================================
       LOAD SAVED THEME
    ===================================================== */

    try {

        const saved =
            localStorage.getItem(
                "bs360-dark-mode"
            );

        if (saved === "1") {
            setDarkMode(true);
        }

    } catch (e) {}


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    window.toggleMobileNav = function () {

        const nav =
            document.querySelector("#navLinks");

        if (!nav) {
            return;
        }

        nav.classList.toggle(
            "mobile-open"
        );

    };


    function closeMobileNav() {

        const nav =
            document.querySelector("#navLinks");

        if (nav) {

            nav.classList.remove(
                "mobile-open"
            );

        }

    }


    /* =====================================================
       LIVE DATE + TIME
    ===================================================== */

    function updateDateTime() {

        const now = new Date();

        const dateElement =
            document.querySelector("#live-date");

        const clockElement =
            document.querySelector("#live-clock");

        if (dateElement) {

            dateElement.textContent =
                "📅 " +
                now.toLocaleDateString(
                    "en-IN",
                    {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        timeZone: "Asia/Kolkata"
                    }
                );

        }

        if (clockElement) {

            clockElement.textContent =
                "⏰ " +
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true,
                        timeZone: "Asia/Kolkata"
                    }
                );

        }

    }

    updateDateTime();

    setInterval(
        updateDateTime,
        1000
    );


    /* =====================================================
       INITIAL LOAD
    ===================================================== */

    build(sourcePosts);


    /* =====================================================
       CLEAN OLD SOURCE LIST
       Keep articles available for JS but hidden visually.
    ===================================================== */

    const originalList =
        document.querySelector(".news-list");

    if (
        originalList &&
        !originalList.closest("#legacyNewsSource")
    ) {

        originalList.style.display = "none";

    }

});
