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
