/* =========================================================
   BS 360 NEWS - CLEAN SCRIPT
   Part 1
   ========================================================= */

"use strict";

/* =========================================================
   GLOBAL VARIABLES
   ========================================================= */

let allPosts = [];
let currentPosts = [];
let bigBossPosts = [];
let apTsPosts = [];
let moviePosts = [];
let sportsPosts = [];
let businessPosts = [];
let mostReadPosts = [];

let currentFilter = "all";
let searchTimer = null;


/* =========================================================
   DOM READY
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    collectPosts();

    renderAllSections();

    setupSearch();

    setupCarousels();

    setupMobileMenu();

    setupTheme();

    setupKeyboardEvents();

});


/* =========================================================
   COLLECT ARTICLES
   ========================================================= */

function collectPosts() {

    const source = document.getElementById("legacyNewsSource");

    if (!source) {
        console.warn("legacyNewsSource not found");
        return;
    }

    const articles = source.querySelectorAll(
        ".post[data-url]"
    );

    allPosts = [];

    articles.forEach(function (article, index) {

        const titleElement =
            article.querySelector(
                ".news-content p, .news-content h2, .news-content h3, p, h2, h3"
            );

        const imageElement =
            article.querySelector("img");

        const title =
            titleElement
                ? titleElement.textContent.trim()
                : "";

        const image =
            imageElement
                ? imageElement.getAttribute("src")
                : "";

        const url =
            article.getAttribute("data-url") ||
            "";

        const category =
            article.getAttribute("data-category") ||
            "news";

        if (!title || !url) {
            return;
        }

        const post = {

            id: index + 1,

            title: title,

            image: image,

            url: url,

            category: category.toLowerCase(),

            originalElement: article

        };

        allPosts.push(post);

    });

    currentPosts = [...allPosts];

    categorizePosts();

}


/* =========================================================
   CATEGORIZE ARTICLES
   ========================================================= */

function categorizePosts() {

    bigBossPosts = allPosts.filter(function (post) {

        return (
            post.category.includes("bigboss") ||
            post.category.includes("big-boss") ||
            post.url.toLowerCase().includes("bb")
        );

    });


    sportsPosts = allPosts.filter(function (post) {

        return (
            post.category.includes("sport") ||
            post.category.includes("cricket")
        );

    });


    moviePosts = allPosts.filter(function (post) {

        return (
            post.category.includes("movie") ||
            post.category.includes("cinema") ||
            post.category.includes("film") ||
            post.category.includes("entertainment")
        );

    });


    businessPosts = allPosts.filter(function (post) {

        return (
            post.category.includes("business") ||
            post.category.includes("gold") ||
            post.category.includes("market") ||
            post.category.includes("finance")
        );

    });


    apTsPosts = allPosts.filter(function (post) {

        return (
            post.category.includes("ap") ||
            post.category.includes("andhra") ||
            post.category.includes("ts") ||
            post.category.includes("telangana")
        );

    });


    /*
       Latest News నుండి Bigg Boss articles
       separate గా ఉంచుతున్నాం.
    */

    currentPosts = allPosts.filter(function (post) {

        return !bigBossPosts.includes(post);

    });


    /*
       Most Read కోసం మొదటి కొన్ని articles.
       అవసరమైతే తర్వాత manual selection కూడా
       add చేయవచ్చు.
    */

    mostReadPosts =
        currentPosts.slice(0, 10);

}


/* =========================================================
   RENDER ALL SECTIONS
   ========================================================= */

function renderAllSections() {

    renderLatestNews();

    renderBigBoss();

    renderApTs();

    renderMovies();

    renderSports();

    renderMostRead();

}


/* =========================================================
   LATEST NEWS
   ========================================================= */

function renderLatestNews() {

    const hero =
        document.getElementById("topStory");

    const sidebar =
        document.getElementById("latestSidebar");

    if (!hero && !sidebar) {
        return;
    }


    const posts =
        currentPosts.slice(0, 10);


    /*
       HERO NEWS
    */

    if (hero && posts.length > 0) {

        const mainPost = posts[0];

        hero.innerHTML = createHeroCard(
            mainPost
        );

    }


    /*
       SIDEBAR NEWS
    */

    if (sidebar) {

        sidebar.innerHTML = "";

        posts
            .slice(1, 7)
            .forEach(function (post) {

                sidebar.insertAdjacentHTML(
                    "beforeend",
                    createSidebarCard(post)
                );

            });

    }

}


/* =========================================================
   HERO CARD
   ========================================================= */

function createHeroCard(post) {

    return `
        <a
            href="${escapeHtml(post.url)}"
            class="hero-card"
        >

            <div class="hero-image-wrap">

                <img
                    src="${escapeHtml(post.image)}"
                    alt="${escapeHtml(post.title)}"
                    loading="eager"
                >

            </div>

            <div class="hero-overlay">

                <span class="hero-category">
                    తాజా వార్తలు
                </span>

                <h1>
                    ${escapeHtml(post.title)}
                </h1>

                <span class="read-more">
                    చదవండి →
                </span>

            </div>

        </a>
    `;

}


/* =========================================================
   SIDEBAR CARD
   ========================================================= */

function createSidebarCard(post) {

    return `
        <a
            href="${escapeHtml(post.url)}"
            class="sidebar-news-card"
        >

            <div class="sidebar-thumb">

                <img
                    src="${escapeHtml(post.image)}"
                    alt="${escapeHtml(post.title)}"
                    loading="lazy"
                >

            </div>

            <div class="sidebar-news-content">

                <h3>
                    ${escapeHtml(post.title)}
                </h3>

            </div>

        </a>
    `;

}


/* =========================================================
   BIGG BOSS
   ========================================================= */

function renderBigBoss() {

    const track =
        document.getElementById("bigbossTrack");

    if (!track) {
        return;
    }

    track.innerHTML = "";


    bigBossPosts
        .slice(0, 10)
        .forEach(function (post) {

            track.insertAdjacentHTML(
                "beforeend",
                createBigBossCard(post)
            );

        });

}


/* =========================================================
   BIGG BOSS CARD
   ========================================================= */

function createBigBossCard(post) {

    return `
        <a
            href="${escapeHtml(post.url)}"
            class="bigboss-card"
        >

            <div class="bigboss-image">

                <img
                    src="${escapeHtml(post.image)}"
                    alt="${escapeHtml(post.title)}"
                    loading="lazy"
                >

            </div>

            <div class="bigboss-content">

                <h3>
                    ${escapeHtml(post.title)}
                </h3>

            </div>

        </a>
    `;

}


/* =========================================================
   AP + TS
   ========================================================= */

function renderApTs() {

    const track =
        document.getElementById("sliderTrack");

    if (!track) {
        return;
    }

    track.innerHTML = "";


    apTsPosts
        .slice(0, 12)
        .forEach(function (post) {

            track.insertAdjacentHTML(
                "beforeend",
                createSmallCard(post)
            );

        });

}


/* =========================================================
   MOVIES
   ========================================================= */

function renderMovies() {

    const grid =
        document.getElementById("cinemaGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";


    moviePosts
        .slice(0, 10)
        .forEach(function (post) {

            grid.insertAdjacentHTML(
                "beforeend",
                createSmallCard(post)
            );

        });

}


/* =========================================================
   SPORTS
   ========================================================= */

function renderSports() {

    const grid =
        document.getElementById("sportsGrid");

    if (!grid) {
        return;
    }

    grid.innerHTML = "";


    sportsPosts
        .slice(0, 10)
        .forEach(function (post) {

            grid.insertAdjacentHTML(
                "beforeend",
                createSmallCard(post)
            );

        });

}


/* =========================================================
   SMALL NEWS CARD
   ========================================================= */

function createSmallCard(post) {

    return `
        <a
            href="${escapeHtml(post.url)}"
            class="news-small-card"
        >

            <div class="news-small-image">

                <img
                    src="${escapeHtml(post.image)}"
                    alt="${escapeHtml(post.title)}"
                    loading="lazy"
                >

            </div>

            <div class="news-small-content">

                <h3>
                    ${escapeHtml(post.title)}
                </h3>

            </div>

        </a>
    `;

}


/* =========================================================
   MOST READ
   ========================================================= */

function renderMostRead() {

    const container =
        document.getElementById("mostReadList");

    if (!container) {
        return;
    }

    container.innerHTML = "";


    mostReadPosts
        .slice(0, 10)
        .forEach(function (post) {

            container.insertAdjacentHTML(
                "beforeend",
                createMostReadCard(post)
            );

        });

}


/* =========================================================
   MOST READ CARD
   ========================================================= */

function createMostReadCard(post) {

    return `
        <a
            href="${escapeHtml(post.url)}"
            class="most-read-card"
        >

            <div class="most-read-image">

                <img
                    src="${escapeHtml(post.image)}"
                    alt="${escapeHtml(post.title)}"
                    loading="lazy"
                >

            </div>

            <div class="most-read-overlay">

                <h3>
                    ${escapeHtml(post.title)}
                </h3>

            </div>

        </a>
    `;

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHtml(value) {

    if (!value) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   SEARCH SETUP
   ========================================================= */

function setupSearch() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }


    input.addEventListener(
        "input",
        function () {

            clearTimeout(searchTimer);

            searchTimer =
                setTimeout(function () {

                    searchNews();

                }, 250);

        }
    );


    input.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchNews();

            }

        }
    );

}


/* =========================================================
   TOGGLE SEARCH
   ========================================================= */

function toggleSearch() {

    const box =
        document.getElementById("searchBox");

    if (!box) {
        return;
    }

    box.classList.toggle("active");


    if (box.classList.contains("active")) {

        const input =
            document.getElementById("searchInput");

        if (input) {

            setTimeout(function () {

                input.focus();

            }, 100);

        }

    }

}


/* =========================================================
   SEARCH NEWS
   ========================================================= */

function searchNews() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }


    const query =
        input.value
            .trim()
            .toLowerCase();


    if (!query) {

        currentPosts =
            allPosts.filter(function (post) {

                return !bigBossPosts.includes(post);

            });

        renderLatestNews();

        return;

    }


    const results =
        allPosts.filter(function (post) {

            return (
                post.title
                    .toLowerCase()
                    .includes(query)
                ||
                post.category
                    .toLowerCase()
                    .includes(query)
            );

        });


    renderSearchResults(results);

}


/* =========================================================
   SEARCH RESULTS
   ========================================================= */

function renderSearchResults(results) {

    const container =
        document.getElementById("latestGrid");

    /*
       Current homepageలో latestGrid లేకపోతే
       console warning మాత్రమే.
    */

    if (!container) {

        console.warn(
            "latestGrid not found for search results"
        );

        return;

    }


    container.innerHTML = "";


    if (results.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                వార్తలు కనిపించలేదు.
            </div>
        `;

        return;

    }


    results.forEach(function (post) {

        container.insertAdjacentHTML(
            "beforeend",
            createSearchCard(post)
        );

    });

}


/* =========================================================
   SEARCH CARD
   ========================================================= */

function createSearchCard(post) {

    return `
        <a
            href="${escapeHtml(post.url)}"
            class="search-result-card"
        >

            <img
                src="${escapeHtml(post.image)}"
                alt="${escapeHtml(post.title)}"
                loading="lazy"
            >

            <div>

                <h3>
                    ${escapeHtml(post.title)}
                </h3>

                <span>
                    ${escapeHtml(post.category)}
                </span>

            </div>

        </a>
    `;

}


/* =========================================================
   FILTER POSTS
   ========================================================= */

function filterPosts(category) {

    currentFilter =
        category || "all";


    const normalized =
        currentFilter.toLowerCase();


    if (
        normalized === "all" ||
        normalized === "news"
    ) {

        currentPosts =
            allPosts.filter(function (post) {

                return !bigBossPosts.includes(post);

            });

    }

    else {

        currentPosts =
            allPosts.filter(function (post) {

                if (
                    bigBossPosts.includes(post)
                ) {
                    return false;
                }

                return matchesCategory(
                    post,
                    normalized
                );

            });

    }


    renderFilteredPosts(
        currentPosts
    );

}


/* =========================================================
   CATEGORY MATCH
   ========================================================= */

function matchesCategory(post, category) {

    const cat =
        post.category.toLowerCase();


    if (
        category === "movies" ||
        category === "movie" ||
        category === "cinema"
    ) {

        return (
            cat.includes("movie") ||
            cat.includes("cinema") ||
            cat.includes("film") ||
            cat.includes("entertainment")
        );

    }


    if (
        category === "sports" ||
        category === "sport"
    ) {

        return (
            cat.includes("sport") ||
            cat.includes("cricket")
        );

    }


    if (
        category === "gold" ||
        category === "business"
    ) {

        return (
            cat.includes("business") ||
            cat.includes("gold") ||
            cat.includes("market") ||
            cat.includes("finance")
        );

    }


    if (
        category === "ap"
    ) {

        return (
            cat.includes("ap") ||
            cat.includes("andhra")
        );

    }


    if (
        category === "ts"
    ) {

        return (
            cat.includes("ts") ||
            cat.includes("telangana")
        );

    }


    return cat.includes(category);

}


/* =========================================================
   RENDER FILTERED POSTS
   ========================================================= */

function renderFilteredPosts(posts) {

    const container =
        document.getElementById("latestGrid");


    if (!container) {

        /*
           latestGrid లేకపోతే homepage
           existing Latest News design ను
           update చేస్తాం.
        */

        if (posts.length > 0) {

            const hero =
                document.getElementById("topStory");

            const sidebar =
                document.getElementById(
                    "latestSidebar"
                );


            if (hero) {

                hero.innerHTML =
                    createHeroCard(posts[0]);

            }


            if (sidebar) {

                sidebar.innerHTML = "";

                posts
                    .slice(1, 7)
                    .forEach(function (post) {

                        sidebar.insertAdjacentHTML(
                            "beforeend",
                            createSidebarCard(post)
                        );

                    });

            }

        }

        return;

    }


    container.innerHTML = "";


    if (posts.length === 0) {

        container.innerHTML = `
            <div class="no-results">
                ఈ విభాగంలో వార్తలు లేవు.
            </div>
        `;

        return;

    }


    posts.forEach(function (post) {

        container.insertAdjacentHTML(
            "beforeend",
            createSearchCard(post)
        );

    });


    container.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}
/* =========================================================
   BS 360 NEWS - CLEAN SCRIPT
   Part 2
   ========================================================= */


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const nav =
        document.getElementById("navLinks");

    if (!nav) {
        return;
    }

    nav.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest("a");

            if (!link) {
                return;
            }

            nav.classList.remove("mobile-open");

        }
    );

}


/* =========================================================
   TOGGLE MOBILE NAV
   ========================================================= */

function toggleMobileNav() {

    const nav =
        document.getElementById("navLinks");

    if (!nav) {
        return;
    }

    nav.classList.toggle(
        "mobile-open"
    );

}


/* =========================================================
   THEME SETUP
   ========================================================= */

function setupTheme() {

    const savedTheme =
        localStorage.getItem(
            "bs360-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        updateThemeButton(true);

    }
    else {

        document.body.classList.remove(
            "dark-mode"
        );

        updateThemeButton(false);

    }

}


/* =========================================================
   TOGGLE THEME
   ========================================================= */

function toggleTheme() {

    const isDark =
        document.body.classList.toggle(
            "dark-mode"
        );


    localStorage.setItem(
        "bs360-theme",
        isDark ? "dark" : "light"
    );


    updateThemeButton(isDark);

}


/* =========================================================
   THEME BUTTON
   ========================================================= */

function updateThemeButton(isDark) {

    const button =
        document.getElementById(
            "themeButton"
        );

    if (!button) {
        return;
    }


    if (isDark) {

        button.innerHTML =
            "☀️ Light";

        button.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    }
    else {

        button.innerHTML =
            "🌙 Dark";

        button.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    }

}


/* =========================================================
   CAROUSEL SETUP
   ========================================================= */

function setupCarousels() {

    setupBigBossCarousel();

    setupApTsCarousel();

    setupHorizontalCarousel(
        "cinemaGrid"
    );

    setupHorizontalCarousel(
        "sportsGrid"
    );

}


/* =========================================================
   BIGG BOSS CAROUSEL
   ========================================================= */

function setupBigBossCarousel() {

    const slider =
        document.getElementById(
            "bigbossSlider"
        );

    const track =
        document.getElementById(
            "bigbossTrack"
        );

    const prev =
        document.querySelector(
            ".bigboss-prev"
        );

    const next =
        document.querySelector(
            ".bigboss-next"
        );


    if (!slider || !track) {
        return;
    }


    const getAmount = function () {

        const card =
            track.querySelector(
                ".bigboss-card"
            );

        if (!card) {
            return 280;
        }

        return (
            card.offsetWidth + 16
        );

    };


    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                slider.scrollBy({

                    left: -getAmount(),

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

                    left: getAmount(),

                    behavior: "smooth"

                });

            }
        );

    }


    /*
       Automatic Bigg Boss scrolling.
    */

    startAutoScroll(
        slider,
        5000
    );

}


/* =========================================================
   AP + TS CAROUSEL
   ========================================================= */

function setupApTsCarousel() {

    const slider =
        document.getElementById(
            "newsSlider"
        );

    const track =
        document.getElementById(
            "sliderTrack"
        );

    const prev =
        document.getElementById(
            "sliderPrev"
        );

    const next =
        document.getElementById(
            "sliderNext"
        );


    if (!slider || !track) {
        return;
    }


    const getAmount = function () {

        const card =
            track.querySelector(
                ".news-small-card"
            );

        if (!card) {
            return 300;
        }

        return (
            card.offsetWidth + 16
        );

    };


    if (prev) {

        prev.addEventListener(
            "click",
            function () {

                slider.scrollBy({

                    left: -getAmount(),

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

                    left: getAmount(),

                    behavior: "smooth"

                });

            }
        );

    }


    startAutoScroll(
        slider,
        4500
    );

}


/* =========================================================
   HORIZONTAL CAROUSEL
   ========================================================= */

function setupHorizontalCarousel(
    elementId
) {

    const container =
        document.getElementById(
            elementId
        );

    if (!container) {
        return;
    }


    let isDown = false;

    let startX = 0;

    let scrollLeft = 0;


    container.addEventListener(
        "mousedown",
        function (event) {

            isDown = true;

            startX =
                event.pageX -
                container.offsetLeft;

            scrollLeft =
                container.scrollLeft;

        }
    );


    container.addEventListener(
        "mouseleave",
        function () {

            isDown = false;

        }
    );


    container.addEventListener(
        "mouseup",
        function () {

            isDown = false;

        }
    );


    container.addEventListener(
        "mousemove",
        function (event) {

            if (!isDown) {
                return;
            }

            event.preventDefault();


            const x =
                event.pageX -
                container.offsetLeft;


            const walk =
                (x - startX) * 1.5;


            container.scrollLeft =
                scrollLeft - walk;

        }
    );

}


/* =========================================================
   AUTO SCROLL
   ========================================================= */

function startAutoScroll(
    element,
    interval
) {

    if (!element) {
        return;
    }


    let timer = null;


    function start() {

        stop();


        timer =
            setInterval(
                function () {

                    autoScrollElement(
                        element
                    );

                },
                interval
            );

    }


    function stop() {

        if (timer) {

            clearInterval(timer);

            timer = null;

        }

    }


    element.addEventListener(
        "mouseenter",
        stop
    );


    element.addEventListener(
        "mouseleave",
        start
    );


    element.addEventListener(
        "touchstart",
        stop,
        {
            passive: true
        }
    );


    element.addEventListener(
        "touchend",
        function () {

            setTimeout(
                start,
                2000
            );

        },
        {
            passive: true
        }
    );


    start();

}


/* =========================================================
   AUTO SCROLL ELEMENT
   ========================================================= */

function autoScrollElement(element) {

    const maxScroll =
        element.scrollWidth -
        element.clientWidth;


    if (maxScroll <= 0) {
        return;
    }


    const amount =
        Math.max(
            element.clientWidth * 0.8,
            250
        );


    if (
        element.scrollLeft >=
        maxScroll - 10
    ) {

        element.scrollTo({

            left: 0,

            behavior: "smooth"

        });

    }
    else {

        element.scrollBy({

            left: amount,

            behavior: "smooth"

        });

    }

}


/* =========================================================
   KEYBOARD EVENTS
   ========================================================= */

function setupKeyboardEvents() {

    document.addEventListener(
        "keydown",
        function (event) {

            /*
               ESC → close search
            */

            if (event.key === "Escape") {

                closeSearch();

                closeMobileMenu();

            }


            /*
               CTRL + K → search
            */

            if (
                (event.ctrlKey ||
                 event.metaKey) &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                openSearch();

            }

        }
    );

}


/* =========================================================
   OPEN SEARCH
   ========================================================= */

function openSearch() {

    const box =
        document.getElementById(
            "searchBox"
        );

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!box) {
        return;
    }


    box.classList.add(
        "active"
    );


    if (input) {

        setTimeout(
            function () {

                input.focus();

            },
            100
        );

    }

}


/* =========================================================
   CLOSE SEARCH
   ========================================================= */

function closeSearch() {

    const box =
        document.getElementById(
            "searchBox"
        );


    if (!box) {
        return;
    }


    box.classList.remove(
        "active"
    );

}


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const nav =
        document.getElementById(
            "navLinks"
        );


    if (!nav) {
        return;
    }


    nav.classList.remove(
        "mobile-open"
    );

}


/* =========================================================
   DATE + TIME
   ========================================================= */

function updateDateTime() {

    const dateElement =
        document.getElementById(
            "live-date"
        );

    const clockElement =
        document.getElementById(
            "live-clock"
        );


    if (!dateElement &&
        !clockElement) {

        return;

    }


    const now =
        new Date();


    const dateOptions = {

        day: "2-digit",

        month: "short",

        year: "numeric"

    };


    const timeOptions = {

        hour: "2-digit",

        minute: "2-digit",

        second: "2-digit",

        hour12: true

    };


    if (dateElement) {

        dateElement.textContent =
            "📅 " +
            now.toLocaleDateString(
                "en-IN",
                dateOptions
            );

    }


    if (clockElement) {

        clockElement.textContent =
            "⏰ " +
            now.toLocaleTimeString(
                "en-IN",
                timeOptions
            );

    }

}


/* =========================================================
   START CLOCK
   ========================================================= */

function startClock() {

    updateDateTime();


    setInterval(
        updateDateTime,
        1000
    );

}


/* =========================================================
   SHARE ARTICLE
   ========================================================= */

function shareArticle(
    title,
    url
) {

    const shareUrl =
        url ||
        window.location.href;


    const shareTitle =
        title ||
        document.title;


    /*
       Native share
    */

    if (
        navigator.share &&
        typeof navigator.share ===
        "function"
    ) {

        navigator.share({

            title: shareTitle,

            text: shareTitle,

            url: shareUrl

        })
        .catch(
            function () {}
        );

        return;

    }


    /*
       Clipboard fallback
    */

    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(shareUrl)
            .then(
                function () {

                    showToast(
                        "లింక్ కాపీ అయింది"
                    );

                }
            )
            .catch(
                function () {

                    fallbackCopy(
                        shareUrl
                    );

                }
            );

        return;

    }


    fallbackCopy(
        shareUrl
    );

}


/* =========================================================
   FALLBACK COPY
   ========================================================= */

function fallbackCopy(text) {

    const textarea =
        document.createElement(
            "textarea"
        );


    textarea.value = text;

    textarea.style.position =
        "fixed";

    textarea.style.left =
        "-9999px";


    document.body.appendChild(
        textarea
    );


    textarea.select();


    try {

        document.execCommand(
            "copy"
        );


        showToast(
            "లింక్ కాపీ అయింది"
        );

    }
    catch (error) {

        console.warn(
            "Copy failed",
            error
        );

    }


    document.body.removeChild(
        textarea
    );

}


/* =========================================================
   TOAST MESSAGE
   ========================================================= */

function showToast(message) {

    let toast =
        document.getElementById(
            "bs360Toast"
        );


    if (!toast) {

        toast =
            document.createElement(
                "div"
            );


        toast.id =
            "bs360Toast";


        toast.className =
            "bs360-toast";


        document.body.appendChild(
            toast
        );

    }


    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

        },
        2200
    );

}


/* =========================================================
   IMAGE ERROR HANDLING
   ========================================================= */

document.addEventListener(
    "error",
    function (event) {

        const image =
            event.target;


        if (
            image &&
            image.tagName === "IMG"
        ) {

            image.classList.add(
                "image-error"
            );

        }

    },
    true
);


/* =========================================================
   EXTERNAL LINK SAFETY
   ========================================================= */

function secureExternalLinks() {

    const links =
        document.querySelectorAll(
            "a[target='_blank']"
        );


    links.forEach(
        function (link) {

            const existing =
                link.getAttribute(
                    "rel"
                ) || "";


            if (
                !existing.includes(
                    "noopener"
                )
            ) {

                link.setAttribute(
                    "rel",
                    (
                        existing +
                        " noopener noreferrer"
                    ).trim()
                );

            }

        }
    );

}


/* =========================================================
   LAZY IMAGE OBSERVER
   ========================================================= */

function setupLazyImages() {

    const images =
        document.querySelectorAll(
            "img[loading='lazy']"
        );


    if (
        !("IntersectionObserver"
        in window)
    ) {

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            const image =
                                entry.target;


                            image.classList.add(
                                "loaded"
                            );


                            observer.unobserve(
                                image
                            );

                        }

                    }
                );

            },
            {
                rootMargin:
                    "150px"
            }
        );


    images.forEach(
        function (image) {

            observer.observe(
                image
            );

        }
    );

}


/* =========================================================
   INITIAL EXTRA SETUP
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        startClock();

        secureExternalLinks();

        setupLazyImages();

    }
);


/* =========================================================
   BACK TO TOP
   ========================================================= */

function setupBackToTop() {

    let button =
        document.getElementById(
            "backToTop"
        );


    if (!button) {

        button =
            document.createElement(
                "button"
            );


        button.id =
            "backToTop";


        button.className =
            "back-to-top";


        button.type =
            "button";


        button.setAttribute(
            "aria-label",
            "Back to top"
        );


        button.innerHTML =
            "↑";


        document.body.appendChild(
            button
        );

    }


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 500
            ) {

                button.classList.add(
                    "show"
                );

            }
            else {

                button.classList.remove(
                    "show"
                );

            }

        },
        {
            passive: true
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


document.addEventListener(
    "DOMContentLoaded",
    setupBackToTop
);


/* =========================================================
   PREVENT EMPTY LINKS
   ========================================================= */

function fixEmptyLinks() {

    const links =
        document.querySelectorAll(
            "a[href='#']"
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    /*
                       Navigation filter links
                       already have onclick.
                    */

                    if (
                        link.hasAttribute(
                            "onclick"
                        )
                    ) {

                        return;

                    }


                    event.preventDefault();

                }
            );

        }
    );

}


document.addEventListener(
    "DOMContentLoaded",
    fixEmptyLinks
);


/* =========================================================
   CONSOLE INFO
   ========================================================= */

console.log(
    "BS 360 NEWS clean script loaded successfully."
);
