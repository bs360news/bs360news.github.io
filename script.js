/* =========================================================
   BS 360 NEWS
   PROFESSIONAL NEWS PORTAL - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";


    /* =====================================================
       BASIC HELPERS
    ===================================================== */

    const $ = (selector, parent = document) => {
        return parent.querySelector(selector);
    };

    const $$ = (selector, parent = document) => {
        return Array.from(parent.querySelectorAll(selector));
    };


    /* =====================================================
       GET EXISTING ARTICLES
       Supports different existing HTML structures
    ===================================================== */

    function sourcePosts() {

        let posts = $$("#legacyNewsSource .post[data-url]");

        if (!posts.length) {
            posts = $$(".news-list .post[data-url]");
        }

        if (!posts.length) {
            posts = $$(".post[data-url]");
        }

        return posts;
    }


    let allPosts = sourcePosts();


    /* =====================================================
       REMOVE DUPLICATE ARTICLES
    ===================================================== */

    function uniquePosts(posts) {

        const seen = new Set();

        return posts.filter(function (post) {

            const url = post.getAttribute("data-url") || "";

            const titleElement =
                $(".post-title", post) ||
                $("h1", post) ||
                $("h2", post) ||
                $("h3", post) ||
                $("a", post);

            const title =
                titleElement ?
                titleElement.textContent.trim() :
                "";

            const key = url + "|" + title;

            if (seen.has(key)) {
                return false;
            }

            seen.add(key);

            return true;

        });
    }


    allPosts = uniquePosts(allPosts);


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
            $("a", post);

        if (!element) {
            return "BS 360 NEWS";
        }

        return element.textContent.trim();
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
            "dp.png.png"
        );
    }


    /* =====================================================
       IMAGE ALT
    ===================================================== */

    function altOf(post) {

        const image = $("img", post);

        if (!image) {
            return titleOf(post);
        }

        return (
            image.getAttribute("alt") ||
            titleOf(post)
        );
    }


    /* =====================================================
       ARTICLE CATEGORY
    ===================================================== */

    function catsOf(post) {

        const dataCategory =
            post.getAttribute("data-category") || "";

        const dataCategories =
            post.getAttribute("data-categories") || "";

        const text =
            post.textContent || "";

        return (
            dataCategory +
            " " +
            dataCategories +
            " " +
            text
        ).toLowerCase();
    }


    /* =====================================================
       CATEGORY CHECK
    ===================================================== */

    function hasCat(post, category) {

        const value = catsOf(post);

        return value.includes(category.toLowerCase());

    }


    /* =====================================================
       CATEGORY LABEL
    ===================================================== */

    function labelOf(post) {

        const value = catsOf(post);

        if (
            value.includes("sports") ||
            value.includes("sport") ||
            value.includes("క్రీడ")
        ) {
            return "SPORTS";
        }

        if (
            value.includes("movies") ||
            value.includes("movie") ||
            value.includes("cinema") ||
            value.includes("సినిమా")
        ) {
            return "CINEMA";
        }

        if (
            value.includes("technology") ||
            value.includes("tech") ||
            value.includes("టెక్")
        ) {
            return "TECHNOLOGY";
        }

        if (
            value.includes("business") ||
            value.includes("బిజినెస్")
        ) {
            return "BUSINESS";
        }

        if (
            value.includes("jobs") ||
            value.includes("education") ||
            value.includes("జాబ్స్") ||
            value.includes("ఎడ్యుకేషన్")
        ) {
            return "JOBS";
        }

        if (
            value.includes("world") ||
            value.includes("ప్రపంచ")
        ) {
            return "WORLD";
        }

        if (
            value.includes("india") ||
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

        const url = articleUrl(post);

        if (
            url &&
            url !== "#" &&
            url !== "javascript:void(0)"
        ) {
            window.location.href = url;
        }

    }


    /* =====================================================
       CREATE PORTAL CARD
    ===================================================== */

    function createCard(post, type = "latest") {

        const card =
            document.createElement("article");

        card.className =
            "portal-card " +
            type +
            "-card";

        const image =
            imageOf(post);

        const title =
            titleOf(post);

        const category =
            labelOf(post);

        card.innerHTML = `
            <img
                src="${image}"
                alt="${escapeHTML(altOf(post))}"
                loading="lazy"
            >

            <div class="portal-card-body">

                <span class="portal-tag">
                    ${escapeHTML(category)}
                </span>

                <h3>
                    ${escapeHTML(title)}
                </h3>

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
       HERO CARD
    ===================================================== */

    function createHero(post) {

        const wrapper =
            document.createElement("article");

        wrapper.className =
            "portal-card hero-card";

        wrapper.innerHTML = `

            <img
                src="${imageOf(post)}"
                alt="${escapeHTML(altOf(post))}"
            >

            <div class="portal-card-body">

                <span class="portal-tag">
                    ${escapeHTML(labelOf(post))}
                </span>

                <h3>
                    ${escapeHTML(titleOf(post))}
                </h3>

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
       HERO IMAGE + TITLE OVERLAY VERSION
    ===================================================== */

    function createHeroOverlay(post) {

        const wrapper =
            document.createElement("article");

        wrapper.className =
            "portal-card hero-card hero-overlay-card";

        wrapper.innerHTML = `

            <div class="hero-media">

                <img
                    src="${imageOf(post)}"
                    alt="${escapeHTML(altOf(post))}"
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
    ===================================================== */

    function renderTopStory() {

        const target =
            $("#topStory");

        if (!target || !allPosts.length) {
            return;
        }


        target.innerHTML = "";


        const heroPost =
            allPosts[0];


        target.appendChild(
            createHeroOverlay(heroPost)
        );


        let heroIndex = 0;


        setInterval(function () {

            if (!allPosts.length) {
                return;
            }

            heroIndex++;

            if (heroIndex >= allPosts.length) {
                heroIndex = 0;
            }

            const nextPost =
                allPosts[heroIndex];


            target.innerHTML = "";

            target.appendChild(
                createHeroOverlay(nextPost)
            );

        }, 5000);

    }


    /* =====================================================
       LATEST SIDEBAR
    ===================================================== */

    function renderLatestSidebar() {

        const target =
            $("#latestSidebar");

        if (!target) {
            return;
        }


        target.innerHTML = "";


        const posts =
            allPosts.slice(0, 8);


        posts.forEach(function (post) {

            const item =
                document.createElement("article");

            item.className =
                "sidebar-card portal-card";


            item.innerHTML = `

                <img
                    src="${imageOf(post)}"
                    alt="${escapeHTML(altOf(post))}"
                    loading="lazy"
                >

                <div class="portal-card-body">

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


            target.appendChild(item);

        });


        startSidebarAutoScroll(target);

    }


    /* =====================================================
       SIDEBAR AUTO SCROLL
    ===================================================== */

    function startSidebarAutoScroll(element) {

        if (!element) {
            return;
        }


        let paused = false;


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


        setInterval(function () {

            if (paused) {
                return;
            }


            if (
                element.scrollHeight <=
                element.clientHeight
            ) {
                return;
            }


            element.scrollBy({
                top: 85,
                behavior: "smooth"
            });


            if (
                element.scrollTop +
                element.clientHeight >=
                element.scrollHeight - 5
            ) {

                setTimeout(function () {

                    element.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }, 700);

            }

        }, 2600);

    }


    /* =====================================================
       FEATURED SLIDER
    ===================================================== */

    function renderSlider() {

        const track =
            $("#sliderTrack");

        if (!track) {
            return;
        }


        track.innerHTML = "";


        allPosts
            .slice(0, 12)
            .forEach(function (post) {

                const card =
                    createCard(
                        post,
                        "slider"
                    );

                track.appendChild(card);

            });


        setupHorizontalAutoScroll(
            $("#newsSlider"),
            245
        );

    }


    /* =====================================================
       HORIZONTAL AUTO SCROLL
    ===================================================== */

    function setupHorizontalAutoScroll(
        container,
        distance
    ) {

        if (!container) {
            return;
        }


        let paused = false;


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


        setInterval(function () {

            if (paused) {
                return;
            }


            const maxScroll =
                container.scrollWidth -
                container.clientWidth;


            if (maxScroll <= 0) {
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

            } else {

                container.scrollBy({
                    left: distance,
                    behavior: "smooth"
                });

            }

        }, 3200);

    }


    /* =====================================================
       LATEST NEWS GRID
    ===================================================== */

    function renderLatest() {

        const target =
            $("#latestGrid");

        if (!target) {
            return;
        }


        target.innerHTML = "";


        allPosts
            .slice(0, 12)
            .forEach(function (post) {

                target.appendChild(
                    createCard(
                        post,
                        "latest"
                    )
                );

            });

    }


    /* =====================================================
       MOVIES / CINEMA
    ===================================================== */

    function renderMovies() {

        const target =
            $("#cinemaGrid");

        if (!target) {
            return;
        }


        target.innerHTML = "";


        const movies =
            allPosts.filter(function (post) {

                const value =
                    catsOf(post);

                return (
                    value.includes("movies") ||
                    value.includes("movie") ||
                    value.includes("cinema") ||
                    value.includes("సినిమా")
                );

            });


        const posts =
            movies.length ?
            movies.slice(0, 8) :
            allPosts.slice(0, 8);


        posts.forEach(function (post) {

            target.appendChild(
                createCard(
                    post,
                    "category"
                )
            );

        });

    }


    /* =====================================================
       SPORTS
    ===================================================== */

    function renderSports() {

        const target =
            $("#sportsGrid");

        if (!target) {
            return;
        }


        target.innerHTML = "";


        const sports =
            allPosts.filter(function (post) {

                const value =
                    catsOf(post);

                return (
                    value.includes("sports") ||
                    value.includes("sport") ||
                    value.includes("క్రీడ")
                );

            });


        const posts =
            sports.length ?
            sports.slice(0, 8) :
            allPosts.slice(0, 8);


        posts.forEach(function (post) {

            const item =
                document.createElement("article");

            item.className =
                "portal-card sports-row";


            item.innerHTML = `

                <img
                    src="${imageOf(post)}"
                    alt="${escapeHTML(altOf(post))}"
                    loading="lazy"
                >

                <div class="portal-card-body">

                    <span class="portal-tag">
                        SPORTS
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


            target.appendChild(item);

        });

    }


    /* =====================================================
       MOST READ
    ===================================================== */

    function renderMostRead() {

        const target =
            $("#mostReadList");

        if (!target) {
            return;
        }


        target.innerHTML = "";


        allPosts
            .slice(0, 10)
            .forEach(function (post, index) {

                const item =
                    document.createElement("article");

                item.className =
                    "most-read-item";


                item.innerHTML = `

                    <strong>
                        ${index + 1}
                    </strong>

                    <span>
                        ${escapeHTML(titleOf(post))}
                    </span>

                `;


                item.addEventListener(
                    "click",
                    function () {
                        openPost(post);
                    }
                );


                target.appendChild(item);

            });

    }


    /* =====================================================
       SEARCH
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


        if (!searchButton || !searchBox) {
            return;
        }


        searchButton.addEventListener(
            "click",
            function () {

                searchBox.classList.toggle(
                    "active"
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
                function () {

                    performSearch();

                }
            );

        }


        if (searchInput) {

            searchInput.addEventListener(
                "keydown",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        performSearch();

                    }

                }
            );

        }

    }


    /* =====================================================
       PERFORM SEARCH
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

            showAllSections();

            return;

        }


        const matched =
            allPosts.filter(function (post) {

                const title =
                    titleOf(post)
                        .toLowerCase();

                const category =
                    catsOf(post);

                return (
                    title.includes(query) ||
                    category.includes(query)
                );

            });


        showSearchResults(matched);

    }


    /* =====================================================
       SEARCH RESULTS
    ===================================================== */

    function showSearchResults(posts) {

        const latestGrid =
            $("#latestGrid");

        if (!latestGrid) {
            return;
        }


        latestGrid.innerHTML = "";


        posts
            .slice(0, 30)
            .forEach(function (post) {

                latestGrid.appendChild(
                    createCard(
                        post,
                        "latest"
                    )
                );

            });


        const latestSection =
            $("#latestSection");


        if (latestSection) {

            latestSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    }


    /* =====================================================
       SHOW ALL
    ===================================================== */

    function showAllSections() {

        renderLatest();

    }


    /* =====================================================
       CATEGORY FILTER
    ===================================================== */

    function setupCategoryFilter() {

        $$("[data-filter]").forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const category =
                            button.getAttribute(
                                "data-filter"
                            );


                        filterPosts(
                            category
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       GLOBAL CATEGORY FILTER
    ===================================================== */

    window.filterPosts =
        function (category) {

            category =
                String(category)
                    .toLowerCase();


            if (
                category === "all" ||
                category === ""
            ) {

                renderLatest();

                return;

            }


            const filtered =
                allPosts.filter(
                    function (post) {

                        return catsOf(post)
                            .includes(category);

                    }
                );


            const latestGrid =
                $("#latestGrid");


            if (!latestGrid) {
                return;
            }


            latestGrid.innerHTML = "";


            filtered
                .slice(0, 30)
                .forEach(function (post) {

                    latestGrid.appendChild(
                        createCard(
                            post,
                            "latest"
                        )
                    );

                });


            const latestSection =
                $("#latestSection");


            if (latestSection) {

                latestSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        };


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    function setupMobileMenu() {

        const toggle =
            $("#mobileMenuToggle");

        const nav =
            $(".nav-links");


        if (!toggle || !nav) {
            return;
        }


        toggle.addEventListener(
            "click",
            function () {

                nav.classList.toggle(
                    "mobile-open"
                );


                if (
                    nav.classList.contains(
                        "mobile-open"
                    )
                ) {

                    nav.style.display =
                        "flex";

                } else {

                    nav.style.display =
                        "";

                }

            }
        );

    }


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


        if (saved === "true") {

            document.body.classList.add(
                "dark-mode"
            );

        }


        if (!button) {
            return;
        }


        button.addEventListener(
            "click",
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


                button.textContent =
                    active ?
                    "☀️" :
                    "🌙";

            }
        );

    }


    /* =====================================================
       DATE & TIME
    ===================================================== */

    function setupDateTime() {

        const dateElement =
            $("#currentDate");

        const timeElement =
            $("#currentTime");


        if (!dateElement && !timeElement) {
            return;
        }


        function updateTime() {

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
                        second: "2-digit"
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
       SHARE
    ===================================================== */

    window.shareArticle =
        function (title, url) {

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
                    .then(function () {

                        alert(
                            "Article link copied!"
                        );

                    });

                return;

            }


            alert(url);

        };


    /* =====================================================
       SLIDER ARROWS
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
                        left: -270,
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
                        left: 270,
                        behavior: "smooth"
                    });

                }
            );

        }

    }


    /* =====================================================
       ORIGINAL ARTICLE VISIBILITY
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
       INITIALIZE EVERYTHING
    ===================================================== */

    function initializePortal() {

        if (!allPosts.length) {

            console.warn(
                "BS 360 NEWS: No articles found."
            );

            return;

        }


        prepareOriginalArticles();


        renderTopStory();

        renderLatestSidebar();

        renderSlider();

        renderLatest();

        renderMovies();

        renderSports();

        renderMostRead();


        setupSearch();

        setupCategoryFilter();

        setupMobileMenu();

        setupDarkMode();

        setupDateTime();

        setupSliderButtons();

    }


    /* =====================================================
       START
    ===================================================== */

    initializePortal();


});
