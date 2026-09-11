/* =========================================================
   BS 360 NEWS
   FINAL HOMEPAGE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

"use strict";

/* =====================================================
   HELPERS
===================================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    Array.from(parent.querySelectorAll(selector));


/* =====================================================
   SOURCE POSTS
===================================================== */

function sourcePosts() {

    let posts = $$("#legacyNewsSource .post[data-url]");

    if (!posts.length) {
        posts = $$(".news-list .post[data-url]");
    }

    if (!posts.length) {
        posts = $$(".news-item.post[data-url]");
    }

    if (!posts.length) {
        posts = $$(".post[data-url]");
    }

    return posts;
}

let allPosts = sourcePosts();


/* =====================================================
   UNIQUE POSTS
===================================================== */

function uniquePosts(posts) {

    const seen = new Set();

    return posts.filter(function (post) {

        const url =
            (post.getAttribute("data-url") || "").trim();

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
   CATEGORY DATA
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
   BIGG BOSS
===================================================== */

function isBigBoss(post) {

    const value = catsOf(post);

    return (
        /\bbiggboss10\b/i.test(value) ||
        /\bbigboss10\b/i.test(value) ||
        /\bbigg-boss-10\b/i.test(value) ||
        /\bbigg_boss_10\b/i.test(value) ||
        value.includes("బిగ్ బాస్ 10") ||
        value.includes("బిగ్‌బాస్ 10")
    );

}


/* =====================================================
   NORMAL POSTS
===================================================== */

function normalPosts() {

    return allPosts.filter(function (post) {

        return !isBigBoss(post);

    });

}


/* =====================================================
   SPORTS
===================================================== */

function isSports(post) {

    const value = catsOf(post);

    return (
        /\bsports\b/i.test(value) ||
        /\bsport\b/i.test(value) ||
        value.includes("క్రీడ")
    );

}


/* =====================================================
   MOVIES
===================================================== */

function isMovies(post) {

    const value = catsOf(post);

    return (
        /\bmovies\b/i.test(value) ||
        /\bmovie\b/i.test(value) ||
        /\bcinema\b/i.test(value) ||
        value.includes("సినిమా")
    );

}


/* =====================================================
   BUSINESS
===================================================== */

function isBusiness(post) {

    const value = catsOf(post);

    return (
        /\bbusiness\b/i.test(value) ||
        value.includes("బిజినెస్") ||
        /\bgold\b/i.test(value) ||
        /\bfinance\b/i.test(value)
    );

}


/* =====================================================
   AP
===================================================== */

function isAPNews(post) {

    const value = catsOf(post);

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
   TS
===================================================== */

function isTSNews(post) {

    const value = catsOf(post);

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
   TITLE
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
   IMAGE
===================================================== */

function imageOf(post) {

    const image = $("img", post);

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
   ALT
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
   LABEL
===================================================== */

function labelOf(post) {

    const value = catsOf(post);

    if (isBigBoss(post)) {
        return "BIGG BOSS 10";
    }

    if (isSports(post)) {
        return "SPORTS";
    }

    if (isMovies(post)) {
        return "CINEMA";
    }

    if (isBusiness(post)) {
        return "BUSINESS";
    }

    if (
        /\btechnology\b/i.test(value) ||
        /\btech\b/i.test(value) ||
        value.includes("టెక్")
    ) {
        return "TECHNOLOGY";
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
   OPEN POST
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
   NORMAL CARD
===================================================== */

function createCard(
    post,
    type = "latest",
    customLabel = null
) {

    const card =
        document.createElement("article");

    card.className =
        "portal-card " + type + "-card";

    card.innerHTML = `

        <div class="portal-card-media">

            <img
                src="${escapeHTML(imageOf(post))}"
                alt="${escapeHTML(altOf(post))}"
                loading="lazy"
                onerror="this.onerror=null;this.src='dp.png.png';"
            >

        </div>

        <div class="portal-card-body">

            <span class="portal-tag">
                ${escapeHTML(customLabel || labelOf(post))}
            </span>

            <h3>
                ${escapeHTML(titleOf(post))}
            </h3>

        </div>

    `;

    card.addEventListener("click", function () {
        openPost(post);
    });

    return card;

}


/* =====================================================
   BIGG BOSS CARD
===================================================== */

function createBigBossCard(post) {

    const card =
        document.createElement("article");

    card.className = "bigboss-card";
    card.setAttribute("tabindex", "0");

    card.innerHTML = `

        <img
            src="${escapeHTML(imageOf(post))}"
            alt="${escapeHTML(altOf(post))}"
            loading="lazy"
            onerror="this.onerror=null;this.src='dp.png.png';"
        >

        <div class="bigboss-overlay">

            <span class="bigboss-tag">
                📺 BIGG BOSS 10
            </span>

            <h3>
                ${escapeHTML(titleOf(post))}
            </h3>

        </div>

    `;

    card.addEventListener("click", function () {
        openPost(post);
    });

    card.addEventListener("keydown", function (event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();
            openPost(post);

        }

    });

    return card;

}


/* =====================================================
   LATEST NEWS HERO
===================================================== */

function renderTopStory() {

    const target = $("#topStory");

    if (!target) {
        return;
    }

    const posts =
        normalPosts()
            .filter(function (post) {
                return articleUrl(post) !== "#";
            });

    if (!posts.length) {
        return;
    }

    let heroIndex = 0;

    function showHero(index) {

        const post = posts[index];

        if (!post) {
            return;
        }

        const hero =
            document.createElement("article");

        hero.className =
            "portal-card hero-card hero-overlay-card hero-enter";

        hero.innerHTML = `

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

        hero.addEventListener("click", function () {
            openPost(post);
        });

        target.innerHTML = "";
        target.appendChild(hero);

    }

    showHero(heroIndex);

    if (
        posts.length > 1 &&
        !target.dataset.heroStarted
    ) {

        target.dataset.heroStarted = "true";

        setInterval(function () {

            heroIndex++;

            if (heroIndex >= posts.length) {
                heroIndex = 0;
            }

            showHero(heroIndex);

        }, 5000);

    }

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

    const posts =
        normalPosts().slice(0, 12);

    posts.forEach(function (post) {

        const item =
            document.createElement("article");

        item.className = "sidebar-card";

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

        item.addEventListener("click", function () {
            openPost(post);
        });

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

    if (element.dataset.sidebarScrollStarted === "true") {
        return;
    }

    element.dataset.sidebarScrollStarted = "true";

    let paused = false;

    element.addEventListener("mouseenter", function () {
        paused = true;
    });

    element.addEventListener("mouseleave", function () {
        paused = false;
    });

    element.addEventListener(
        "touchstart",
        function () {
            paused = true;
        },
        { passive: true }
    );

    element.addEventListener(
        "touchend",
        function () {

            setTimeout(function () {
                paused = false;
            }, 1500);

        },
        { passive: true }
    );

    setInterval(function () {

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
            element.scrollTop + 90;

        if (nextPosition >= maxScroll) {

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

    }, 2600);

}


/* =====================================================
   BIGG BOSS 10
===================================================== */

function renderBigBoss() {

    const track = $("#bigbossTrack");
    const slider = $("#bigbossSlider");

    if (!track || !slider) {
        return;
    }

    track.innerHTML = "";

    const posts =
        allPosts
            .filter(isBigBoss)
            .slice(0, 10);

    posts.forEach(function (post) {

        track.appendChild(
            createBigBossCard(post)
        );

    });

    if (!posts.length) {
        return;
    }

    setupBigBossAutoScroll(
        slider,
        264,
        5000
    );

    setupBigBossButtons(slider);

}


/* =====================================================
   BIGG BOSS AUTO SCROLL
===================================================== */

function setupBigBossAutoScroll(
    container,
    distance = 264,
    interval = 5000
) {

    if (!container) {
        return;
    }

    if (container.dataset.bigbossAutoScrollStarted === "true") {
        return;
    }

    container.dataset.bigbossAutoScrollStarted = "true";

    let paused = false;

    container.addEventListener("mouseenter", function () {
        paused = true;
    });

    container.addEventListener("mouseleave", function () {
        paused = false;
    });

    container.addEventListener(
        "touchstart",
        function () {
            paused = true;
        },
        { passive: true }
    );

    container.addEventListener(
        "touchend",
        function () {

            setTimeout(function () {
                paused = false;
            }, 1500);

        },
        { passive: true }
    );

    setInterval(function () {

        if (paused) {
            return;
        }

        const maxScroll =
            container.scrollWidth -
            container.clientWidth;

        if (maxScroll <= 5) {
            return;
        }

        if (container.scrollLeft >= maxScroll - 10) {

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

    }, interval);

}


/* =====================================================
   BIGG BOSS BUTTONS
===================================================== */

function setupBigBossButtons(slider) {

    const previous = $(".bigboss-prev");
    const next = $(".bigboss-next");

    if (previous) {

        previous.addEventListener("click", function () {

            slider.scrollBy({
                left: -264,
                behavior: "smooth"
            });

        });

    }

    if (next) {

        next.addEventListener("click", function () {

            const maxScroll =
                slider.scrollWidth -
                slider.clientWidth;

            if (slider.scrollLeft >= maxScroll - 10) {

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

        });

    }

}


/* =====================================================
   AP + TS SLIDER
===================================================== */

function renderSlider() {

    const track = $("#sliderTrack");
    const container = $("#newsSlider");

    if (!track) {
        return;
    }

    track.innerHTML = "";

    const featuredPosts =
        normalPosts()
            .filter(function (post) {

                return (
                    isAPNews(post) ||
                    isTSNews(post)
                );

            })
            .slice(0, 15);

    featuredPosts.forEach(function (post) {

        const label =
            isAPNews(post)
                ? "AP News"
                : "TS News";

        track.appendChild(
            createCard(
                post,
                "slider",
                label
            )
        );

    });

    setupHorizontalAutoScroll(
        container,
        280,
        3000
    );

}


/* =====================================================
   MOVIES
===================================================== */

function renderMovies() {

    const target = $("#cinemaGrid");

    if (!target) {
        return;
    }

    target.innerHTML = "";

    const movies =
        normalPosts()
            .filter(isMovies)
            .slice(0, 12);

    movies.forEach(function (post) {

        target.appendChild(
            createCard(post, "category")
        );

    });

    setupHorizontalAutoScroll(
        target,
        300,
        3400
    );

}


/* =====================================================
   SPORTS
===================================================== */

function renderSports() {

    const target = $("#sportsGrid");

    if (!target) {
        return;
    }

    target.innerHTML = "";

    const sports =
        normalPosts()
            .filter(isSports)
            .slice(0, 12);

    sports.forEach(function (post) {

        target.appendChild(
            createCard(post, "sports")
        );

    });

    setupHorizontalAutoScroll(
        target,
        300,
        3500
    );

}


/* =====================================================
   HORIZONTAL AUTO SCROLL
===================================================== */

function setupHorizontalAutoScroll(
    container,
    distance = 280,
    interval = 3000
) {

    if (!container) {
        return;
    }

    if (container.dataset.autoScrollStarted === "true") {
        return;
    }

    container.dataset.autoScrollStarted = "true";

    container.style.display = "flex";
    container.style.flexWrap = "nowrap";
    container.style.overflowX = "auto";
    container.style.overflowY = "hidden";
    container.style.scrollBehavior = "smooth";
    container.style.webkitOverflowScrolling = "touch";

    let paused = false;

    container.addEventListener("mouseenter", function () {
        paused = true;
    });

    container.addEventListener("mouseleave", function () {
        paused = false;
    });

    container.addEventListener(
        "touchstart",
        function () {
            paused = true;
        },
        { passive: true }
    );

    container.addEventListener(
        "touchend",
        function () {

            setTimeout(function () {
                paused = false;
            }, 1500);

        },
        { passive: true }
    );

    setInterval(function () {

        if (paused) {
            return;
        }

        const maxScroll =
            container.scrollWidth -
            container.clientWidth;

        if (maxScroll <= 5) {
            return;
        }

        if (container.scrollLeft >= maxScroll - 10) {

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

    }, interval);

}


/* =====================================================
   MOST READ
   BIGG BOSS EXCLUDED
===================================================== */

function renderMostRead() {

    const target = $("#mostReadList");

    if (!target) {
        return;
    }

    target.innerHTML = "";

    const mostReadPosts =
        normalPosts().slice(0, 60);

    target.classList.add("most-read-grid");

    target.setAttribute(
        "data-most-read",
        "true"
    );

    target.style.display = "grid";
    target.style.width = "100%";
    target.style.gridTemplateColumns =
        "repeat(5, minmax(0, 1fr))";
    target.style.gap = "15px";

    function updateMostReadColumns() {

        if (window.innerWidth <= 768) {

            target.style.gridTemplateColumns =
                "repeat(3, minmax(0, 1fr))";

            target.style.gap = "9px";

        } else {

            target.style.gridTemplateColumns =
                "repeat(5, minmax(0, 1fr))";

            target.style.gap = "15px";

        }

    }

    updateMostReadColumns();

    if (!target.dataset.mostReadResizeStarted) {

        target.dataset.mostReadResizeStarted = "true";

        window.addEventListener(
            "resize",
            updateMostReadColumns
        );

    }

    mostReadPosts.forEach(function (post, index) {

        const item =
            document.createElement("article");

        item.className = "most-read-item";
        item.setAttribute("tabindex", "0");

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

        item.addEventListener("click", function () {
            openPost(post);
        });

        item.addEventListener("keydown", function (event) {

            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();
                openPost(post);

            }

        });

        target.appendChild(item);

    });

}


/* =====================================================
   SEARCH
===================================================== */

function performSearch() {

    const input = $("#searchInput");

    if (!input) {
        return;
    }

    const query =
        input.value.trim().toLowerCase();

    if (!query) {

        renderTopStory();
        renderLatestSidebar();

        return;

    }

    const matched =
        normalPosts()
            .filter(function (post) {

                return (
                    titleOf(post)
                        .toLowerCase()
                        .includes(query) ||
                    catsOf(post)
                        .includes(query)
                );

            });

    renderSearchResults(matched);

}


/* =====================================================
   SEARCH RESULTS
===================================================== */

function renderSearchResults(posts) {

    const target = $("#latestSidebar");

    const heroTarget = $("#topStory");

    if (!target || !heroTarget) {
        return;
    }

    target.innerHTML = "";
    heroTarget.innerHTML = "";

    if (!posts.length) {

        heroTarget.innerHTML = `

            <div class="no-results">

                <h3>
                    వార్తలు కనిపించలేదు
                </h3>

                <p>
                    మరో keywordతో search చేయండి.
                </p>

            </div>

        `;

        return;

    }

    const heroPost = posts[0];

    const hero =
        document.createElement("article");

    hero.className =
        "portal-card hero-card hero-overlay-card";

    hero.innerHTML = `

        <div class="hero-media">

            <img
                src="${escapeHTML(imageOf(heroPost))}"
                alt="${escapeHTML(altOf(heroPost))}"
                loading="eager"
                onerror="this.onerror=null;this.src='dp.png.png';"
            >

            <div class="hero-shade"></div>

            <div class="hero-overlay">

                <span class="hero-tag">
                    ${escapeHTML(labelOf(heroPost))}
                </span>

                <h3>
                    ${escapeHTML(titleOf(heroPost))}
                </h3>

                <span class="hero-read">
                    పూర్తి వార్త చదవండి →
                </span>

            </div>

        </div>

    `;

    hero.addEventListener("click", function () {
        openPost(heroPost);
    });

    heroTarget.appendChild(hero);

    posts.slice(1, 13).forEach(function (post) {

        const item =
            document.createElement("article");

        item.className = "sidebar-card";

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

        item.addEventListener("click", function () {
            openPost(post);
        });

        target.appendChild(item);

    });

    const section = $("#latestSection");

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

    const searchButton = $("#searchButton");
    const searchBox = $("#searchBox");
    const searchInput = $("#searchInput");
    const searchSubmit = $("#searchSubmit");

    if (searchButton && searchBox) {

        searchButton.addEventListener(
            "click",
            function () {

                searchBox.classList.toggle("active");
                searchBox.classList.toggle("open");

                if (
                    searchBox.classList.contains("active") &&
                    searchInput
                ) {

                    setTimeout(function () {
                        searchInput.focus();
                    }, 100);

                }

            }
        );

    }

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

                if (event.key === "Enter") {

                    event.preventDefault();
                    performSearch();

                }

            }
        );

    }

}


window.searchNews = function () {
    performSearch();
};


/* =====================================================
   CATEGORY FILTER
===================================================== */

window.filterPosts = function (category) {

    category =
        String(category || "")
            .toLowerCase()
            .trim();

    let filtered = [];

    if (
        category === "all" ||
        category === "news" ||
        category === ""
    ) {

        filtered = normalPosts();

    }

    else if (
        category === "sports" ||
        category === "sport"
    ) {

        filtered =
            normalPosts().filter(isSports);

    }

    else if (
        category === "movies" ||
        category === "movie" ||
        category === "cinema" ||
        category === "movies.html"
    ) {

        filtered =
            normalPosts().filter(isMovies);

    }

    else if (
        category === "business" ||
        category === "gold"
    ) {

        filtered =
            normalPosts().filter(isBusiness);

    }

    else if (
        category === "bigboss10" ||
        category === "bigg boss 10"
    ) {

        filtered =
            allPosts.filter(isBigBoss);

    }

    else if (category === "apts") {

        filtered =
            normalPosts().filter(function (post) {

                return (
                    isAPNews(post) ||
                    isTSNews(post)
                );

            });

    }

    else if (category === "ap") {

        filtered =
            normalPosts().filter(isAPNews);

    }

    else if (category === "ts") {

        filtered =
            normalPosts().filter(isTSNews);

    }

    else {

        filtered =
            normalPosts().filter(function (post) {

                return catsOf(post)
                    .split(/[\s,|]+/)
                    .includes(category);

            });

    }

    const heroTarget = $("#topStory");
    const sidebarTarget = $("#latestSidebar");

    if (!heroTarget || !sidebarTarget) {
        return;
    }

    heroTarget.innerHTML = "";
    sidebarTarget.innerHTML = "";

    if (!filtered.length) {

        heroTarget.innerHTML = `

            <div class="no-results">

                <h3>
                    ఈ categoryలో వార్తలు లేవు
                </h3>

            </div>

        `;

    } else {

        const heroPost = filtered[0];

        const hero =
            document.createElement("article");

        hero.className =
            "portal-card hero-card hero-overlay-card";

        hero.innerHTML = `

            <div class="hero-media">

                <img
                    src="${escapeHTML(imageOf(heroPost))}"
                    alt="${escapeHTML(altOf(heroPost))}"
                    loading="eager"
                    onerror="this.onerror=null;this.src='dp.png.png';"
                >

                <div class="hero-shade"></div>

                <div class="hero-overlay">

                    <span class="hero-tag">
                        ${escapeHTML(labelOf(heroPost))}
                    </span>

                    <h3>
                        ${escapeHTML(titleOf(heroPost))}
                    </h3>

                    <span class="hero-read">
                        పూర్తి వార్త చదవండి →
                    </span>

                </div>

            </div>

        `;

        hero.addEventListener("click", function () {
            openPost(heroPost);
        });

        heroTarget.appendChild(hero);

        filtered.slice(1, 13).forEach(function (post) {

            const item =
                document.createElement("article");

            item.className = "sidebar-card";

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

            item.addEventListener("click", function () {
                openPost(post);
            });

            sidebarTarget.appendChild(item);

        });

    }

    const section = $("#latestSection");

    if (section) {

        setTimeout(function () {

            section.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }, 50);

    }

};


/* =====================================================
   DATA FILTER
===================================================== */

function setupCategoryFilter() {

    $$("[data-filter]").forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                const category =
                    button.getAttribute("data-filter");

                window.filterPosts(category);

            }
        );

    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

function setupMobileMenu() {

    const toggle = $("#mobileMenuToggle");
    const nav = $(".nav-links");

    if (!toggle || !nav) {
        return;
    }

    toggle.addEventListener(
        "click",
        function () {

            nav.classList.toggle("mobile-open");

        }
    );

}


window.toggleMobileNav = function () {

    const nav = $(".nav-links");

    if (!nav) {
        return;
    }

    nav.classList.toggle("mobile-open");

};


/* =====================================================
   SEARCH TOGGLE
===================================================== */

window.toggleSearch = function () {

    const searchBox = $("#searchBox");

    if (!searchBox) {
        return;
    }

    searchBox.classList.toggle("active");
    searchBox.classList.toggle("open");

    const input = $("#searchInput");

    if (
        input &&
        searchBox.classList.contains("active")
    ) {

        setTimeout(function () {
            input.focus();
        }, 100);

    }

};


/* =====================================================
   DARK MODE
===================================================== */

function setupDarkMode() {

    const button = $("#themeButton");

    const saved =
        localStorage.getItem("bs360-dark-mode");

    if (saved === "true") {

        document.body.classList.add("dark-mode");

    }

    updateThemeButton();

    if (button) {

        button.addEventListener(
            "click",
            window.toggleTheme
        );

    }

}


window.toggleTheme = function () {

    document.body.classList.toggle("dark-mode");

    const active =
        document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "bs360-dark-mode",
        active
    );

    updateThemeButton();

};


function updateThemeButton() {

    const button = $("#themeButton");

    if (!button) {
        return;
    }

    const active =
        document.body.classList.contains("dark-mode");

    button.textContent =
        active
            ? "☀️ Dark"
            : "🌙 Dark";

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

    if (!dateElement && !timeElement) {
        return;
    }

    function updateTime() {

        const now = new Date();

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
            dateElement.textContent = date;
        }

        if (timeElement) {
            timeElement.textContent = time;
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

window.shareArticle = function (title, url) {

    const shareData = {
        title: title,
        text: title,
        url: url
    };

    if (navigator.share) {

        navigator.share(shareData)
            .catch(function () {});

        return;

    }

    if (navigator.clipboard) {

        navigator.clipboard
            .writeText(url)
            .then(function () {

                alert("Article link copied!");

            })
            .catch(function () {

                alert(url);

            });

        return;

    }

    alert(url);

};


/* =====================================================
   SLIDER BUTTONS
===================================================== */

function setupSliderButtons() {

    const slider = $("#newsSlider");

    if (!slider) {
        return;
    }

    const previous = $("#sliderPrev");
    const next = $("#sliderNext");

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
   PREPARE ORIGINAL ARTICLES
===================================================== */

function prepareOriginalArticles() {

    allPosts.forEach(function (post) {

        post.setAttribute(
            "data-rendered",
            "true"
        );

    });

}


/* =====================================================
   CHECK PORTAL
===================================================== */

function checkPortal() {

    if (!allPosts.length) {

        console.warn(
            "BS 360 NEWS: No original articles found."
        );

        const source = $("#legacyNewsSource");

        if (source) {
            source.style.display = "";
        }

        return false;

    }

    return true;

}


/* =====================================================
   INITIALIZE
===================================================== */

function initializePortal() {

    if (!checkPortal()) {
        return;
    }

    prepareOriginalArticles();

    /* LATEST NEWS */
    renderTopStory();
    renderLatestSidebar();

    /* BIGG BOSS 10 */
    renderBigBoss();

    /* AP + TS */
    renderSlider();

    /* MOVIES */
    renderMovies();

    /* SPORTS */
    renderSports();

    /* MOST READ */
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

    /* SLIDER BUTTONS */
    setupSliderButtons();

}


/* =====================================================
   START
===================================================== */

initializePortal();

});

/* ================================
   MAIN NAVIGATION
================================ */

document.addEventListener("DOMContentLoaded", function(){

    const navLinks = document.querySelectorAll(".main-nav a");

    if(!navLinks.length) return;

    const currentPage =
        window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    navLinks.forEach(function(link){

        const linkPage =
            link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if(
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ){
            link.classList.add("active");
        }

    });

});
