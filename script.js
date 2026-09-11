/* =========================================================
   BS 360 NEWS
   FINAL HOMEPAGE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

"use strict";

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
   CATEGORY
===================================================== */

function catsOf(post) {

    return (
        (post.getAttribute("data-category") || "") +
        " " +
        (post.getAttribute("data-categories") || "") +
        " " +
        (post.getAttribute("category") || "")
    ).toLowerCase();

}


/* =====================================================
   BIGG BOSS
===================================================== */

function isBigBoss(post) {

    const value = catsOf(post);

    return (
        value.includes("bigboss10") ||
        value.includes("bigg boss 10") ||
        value.includes("bigboss 10") ||
        value.includes("bigg-boss-10") ||
        value.includes("bigg_boss_10") ||
        value.includes("బిగ్ బాస్ 10") ||
        value.includes("బిగ్‌బాస్ 10")
    );

}


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
        value.includes("sports") ||
        value.includes("sport") ||
        value.includes("క్రీడ")
    );

}


/* =====================================================
   MOVIES
===================================================== */

function isMovies(post) {

    const value = catsOf(post);

    return (
        value.includes("movies") ||
        value.includes("movie") ||
        value.includes("cinema") ||
        value.includes("సినిమా")
    );

}


/* =====================================================
   BUSINESS
===================================================== */

function isBusiness(post) {

    const value = catsOf(post);

    return (
        value.includes("business") ||
        value.includes("బిజినెస్") ||
        value.includes("gold") ||
        value.includes("finance")
    );

}


/* =====================================================
   AP
===================================================== */

function isAPNews(post) {

    const value = catsOf(post);

    return (
        value.includes("ap") ||
        value.includes("andhra-pradesh") ||
        value.includes("andhrapradesh") ||
        value.includes("andhra pradesh") ||
        value.includes("ap-news") ||
        value.includes("ap_news") ||
        value.includes("apnews") ||
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
        value.includes("ts") ||
        value.includes("telangana") ||
        value.includes("telangana-news") ||
        value.includes("telangana_news") ||
        value.includes("ts-news") ||
        value.includes("ts_news") ||
        value.includes("tsnews") ||
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

    return element
        ? element.textContent.replace(/\s+/g, " ").trim()
        : "BS 360 NEWS";

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

    return image
        ? image.getAttribute("alt") || titleOf(post)
        : titleOf(post);

}


/* =====================================================
   LABEL
===================================================== */

function labelOf(post) {

    if (isBigBoss(post)) return "BIGG BOSS 10";
    if (isSports(post)) return "SPORTS";
    if (isMovies(post)) return "CINEMA";
    if (isBusiness(post)) return "BUSINESS";
    if (isAPNews(post)) return "ANDHRA PRADESH";
    if (isTSNews(post)) return "TELANGANA";

    return "LATEST";

}


/* =====================================================
   URL
===================================================== */

function articleUrl(post) {

    return (
        post.getAttribute("data-url") ||
        post.querySelector("a")?.getAttribute("href") ||
        "#"
    );

}


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
   ESCAPE
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
   CARD
===================================================== */

function createCard(post, type = "latest", customLabel = null) {

    const card = document.createElement("article");

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
   HERO
===================================================== */

function renderTopStory(posts = normalPosts()) {

    const target = $("#topStory");

    if (!target) return;

    posts = posts.filter(function (post) {
        return articleUrl(post) !== "#";
    });

    if (!posts.length) {
        target.innerHTML = "";
        return;
    }

    let heroIndex = 0;

    function showHero(index) {

        const post = posts[index];

        if (!post) return;

        const hero = document.createElement("article");

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

    if (posts.length > 1 && !target.dataset.heroStarted) {

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

function renderLatestSidebar(posts = normalPosts()) {

    const target = $("#latestSidebar");

    if (!target) return;

    target.innerHTML = "";

    posts.slice(0, 12).forEach(function (post) {

        const item = document.createElement("article");

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


function startSidebarAutoScroll(element) {

    if (!element) return;

    if (element.dataset.sidebarScrollStarted === "true") return;

    element.dataset.sidebarScrollStarted = "true";

    let paused = false;

    element.addEventListener("mouseenter", () => paused = true);
    element.addEventListener("mouseleave", () => paused = false);

    setInterval(function () {

        if (paused) return;

        const maxScroll =
            element.scrollHeight - element.clientHeight;

        if (maxScroll <= 10) return;

        const next =
            element.scrollTop + 90;

        element.scrollTo({
            top: next >= maxScroll ? 0 : next,
            behavior: "smooth"
        });

    }, 2600);

}


/* =====================================================
   BIGG BOSS
===================================================== */

function renderBigBoss() {

    const track = $("#bigbossTrack");
    const slider = $("#bigbossSlider");

    if (!track || !slider) return;

    track.innerHTML = "";

    const posts =
        allPosts
            .filter(isBigBoss)
            .slice(0, 10);

    posts.forEach(function (post) {

        const card = document.createElement("article");

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

        card.addEventListener("click", () => openPost(post));

        track.appendChild(card);

    });

    if (!posts.length) return;

    setupBigBossAutoScroll(slider);
    setupBigBossButtons(slider);

}


function setupBigBossAutoScroll(container) {

    if (container.dataset.bigbossAutoScrollStarted === "true") return;

    container.dataset.bigbossAutoScrollStarted = "true";

    let paused = false;

    container.addEventListener("mouseenter", () => paused = true);
    container.addEventListener("mouseleave", () => paused = false);

    setInterval(function () {

        if (paused) return;

        const max =
            container.scrollWidth -
            container.clientWidth;

        if (max <= 5) return;

        if (container.scrollLeft >= max - 10) {

            container.scrollTo({
                left: 0,
                behavior: "smooth"
            });

        } else {

            container.scrollBy({
                left: 264,
                behavior: "smooth"
            });

        }

    }, 5000);

}


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

            const max =
                slider.scrollWidth -
                slider.clientWidth;

            if (slider.scrollLeft >= max - 10) {

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
   AP + TS
===================================================== */

function renderSlider() {

    const track = $("#sliderTrack");
    const container = $("#newsSlider");

    if (!track) return;

    track.innerHTML = "";

    const posts =
        normalPosts()
            .filter(function (post) {

                return (
                    isAPNews(post) ||
                    isTSNews(post)
                );

            })
            .slice(0, 15);

    posts.forEach(function (post) {

        track.appendChild(
            createCard(
                post,
                "slider",
                isAPNews(post)
                    ? "AP News"
                    : "TS News"
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

    if (!target) return;

    target.innerHTML = "";

    normalPosts()
        .filter(isMovies)
        .slice(0, 12)
        .forEach(function (post) {

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

    if (!target) return;

    target.innerHTML = "";

    normalPosts()
        .filter(isSports)
        .slice(0, 12)
        .forEach(function (post) {

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
   HORIZONTAL SCROLL
===================================================== */

function setupHorizontalAutoScroll(
    container,
    distance = 280,
    interval = 3000
) {

    if (!container) return;

    if (container.dataset.autoScrollStarted === "true") return;

    container.dataset.autoScrollStarted = "true";

    container.style.display = "flex";
    container.style.flexWrap = "nowrap";
    container.style.overflowX = "auto";
    container.style.overflowY = "hidden";
    container.style.scrollBehavior = "smooth";

    let paused = false;

    container.addEventListener("mouseenter", () => paused = true);
    container.addEventListener("mouseleave", () => paused = false);

    setInterval(function () {

        if (paused) return;

        const max =
            container.scrollWidth -
            container.clientWidth;

        if (max <= 5) return;

        if (container.scrollLeft >= max - 10) {

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
===================================================== */

function renderMostRead() {

    const target = $("#mostReadList");

    if (!target) return;

    target.innerHTML = "";

    const posts =
        normalPosts().slice(0, 60);

    posts.forEach(function (post, index) {

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

        item.addEventListener("click", () => openPost(post));

        target.appendChild(item);

    });

}


/* =====================================================
   SEARCH
===================================================== */

function performSearch() {

    const input = $("#searchInput");

    if (!input) return;

    const query =
        input.value.trim().toLowerCase();

    if (!query) {

        renderTopStory();
        renderLatestSidebar();

        return;

    }

    const matched =
        normalPosts().filter(function (post) {

            return (
                titleOf(post)
                    .toLowerCase()
                    .includes(query) ||
                catsOf(post).includes(query)
            );

        });

    renderSearchResults(matched);

}


function renderSearchResults(posts) {

    const target = $("#latestSidebar");
    const heroTarget = $("#topStory");

    if (!target || !heroTarget) return;

    target.innerHTML = "";
    heroTarget.innerHTML = "";

    if (!posts.length) {

        heroTarget.innerHTML = `
            <div class="no-results">
                <h3>వార్తలు కనిపించలేదు</h3>
                <p>మరో keywordతో search చేయండి.</p>
            </div>
        `;

        return;

    }

    renderTopStory(posts);
    renderLatestSidebar(posts.slice(1));

}


function setupSearch() {

    const button = $("#searchButton");
    const box = $("#searchBox");
    const input = $("#searchInput");
    const submit = $("#searchSubmit");

    if (button && box) {

        button.addEventListener("click", function () {

            box.classList.toggle("active");
            box.classList.toggle("open");

            if (
                box.classList.contains("active") &&
                input
            ) {

                setTimeout(() => input.focus(), 100);

            }

        });

    }

    if (submit) {
        submit.addEventListener("click", performSearch);
    }

    if (input) {

        input.addEventListener("keydown", function (event) {

            if (event.key === "Enter") {

                event.preventDefault();
                performSearch();

            }

        });

    }

}


window.searchNews = function () {
    performSearch();
};


/* =====================================================
   FILTER
===================================================== */

window.filterPosts = function (category) {

    category =
        String(category || "")
            .toLowerCase()
            .trim();

    let filtered;

    if (
        category === "all" ||
        category === "news" ||
        category === ""
    ) {

        filtered = normalPosts();

    }

    else if (
        category === "sports" ||
        category === "sport" ||
        category === "sports.html"
    ) {

        filtered = normalPosts().filter(isSports);

    }

    else if (
        category === "movies" ||
        category === "movie" ||
        category === "cinema" ||
        category === "movies.html"
    ) {

        filtered = normalPosts().filter(isMovies);

    }

    else if (
        category === "business" ||
        category === "gold"
    ) {

        filtered = normalPosts().filter(isBusiness);

    }

    else if (
        category === "apts" ||
        category === "ap&ts" ||
        category === "ap&ts.html" ||
        category === "ap-ts" ||
        category === "ap-ts.html"
    ) {

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

    else if (
        category === "ts" ||
        category === "telangana"
    ) {

        filtered =
            normalPosts().filter(isTSNews);

    }

    else if (
        category === "bigboss10" ||
        category === "bigg boss 10"
    ) {

        filtered =
            allPosts.filter(isBigBoss);

    }

    else {

        filtered =
            normalPosts().filter(function (post) {

                return catsOf(post).includes(category);

            });

    }

    const hero = $("#topStory");
    const sidebar = $("#latestSidebar");

    if (!hero || !sidebar) return;

    if (!filtered.length) {

        hero.innerHTML = `
            <div class="no-results">
                <h3>ఈ categoryలో వార్తలు లేవు</h3>
            </div>
        `;

        sidebar.innerHTML = "";

        return;

    }

    renderTopStory(filtered);
    renderLatestSidebar(filtered.slice(1));

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
   MOBILE MENU
===================================================== */

function setupMobileMenu() {

    const toggle = $("#mobileMenuToggle");
    const nav = $(".nav-links");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {

        nav.classList.toggle("mobile-open");

    });

}


window.toggleMobileNav = function () {

    const nav = $(".nav-links");

    if (nav) {
        nav.classList.toggle("mobile-open");
    }

};


/* =====================================================
   SEARCH TOGGLE
===================================================== */

window.toggleSearch = function () {

    const box = $("#searchBox");

    if (!box) return;

    box.classList.toggle("active");
    box.classList.toggle("open");

    const input = $("#searchInput");

    if (
        input &&
        box.classList.contains("active")
    ) {

        setTimeout(() => input.focus(), 100);

    }

};


/* =====================================================
   DARK MODE
===================================================== */

function setupDarkMode() {

    const button = $("#themeButton");

    if (
        localStorage.getItem("bs360-dark-mode") === "true"
    ) {

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

    localStorage.setItem(
        "bs360-dark-mode",
        document.body.classList.contains("dark-mode")
    );

    updateThemeButton();

};


function updateThemeButton() {

    const button = $("#themeButton");

    if (!button) return;

    button.textContent =
        document.body.classList.contains("dark-mode")
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

    if (!dateElement && !timeElement) return;

    function updateTime() {

        const now = new Date();

        if (dateElement) {

            dateElement.textContent =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        weekday: "short",
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                    }
                );

        }

        if (timeElement) {

            timeElement.textContent =
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: true
                    }
                );

        }

    }

    updateTime();

    setInterval(updateTime, 1000);

}


/* =====================================================
   SHARE
===================================================== */

window.shareArticle = function (title, url) {

    const data = {
        title: title,
        text: title,
        url: url
    };

    if (navigator.share) {

        navigator.share(data).catch(() => {});

        return;

    }

    if (navigator.clipboard) {

        navigator.clipboard.writeText(url)
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

    if (!slider) return;

    const previous = $("#sliderPrev");
    const next = $("#sliderNext");

    if (previous) {

        previous.addEventListener("click", function () {

            slider.scrollBy({
                left: -300,
                behavior: "smooth"
            });

        });

    }

    if (next) {

        next.addEventListener("click", function () {

            slider.scrollBy({
                left: 300,
                behavior: "smooth"
            });

        });

    }

}


/* =====================================================
   PREPARE
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
   CHECK
===================================================== */

function checkPortal() {

    if (!allPosts.length) {

        console.warn(
            "BS 360 NEWS: No original articles found."
        );

        return false;

    }

    return true;

}


/* =====================================================
   INITIALIZE
===================================================== */

function initializePortal() {

    if (!checkPortal()) return;

    prepareOriginalArticles();

    renderTopStory();

    renderLatestSidebar();

    renderBigBoss();

    renderSlider();

    renderMovies();

    renderSports();

    renderMostRead();

    setupSearch();

    setupMobileMenu();

    setupDarkMode();

    setupDateTime();

    setupSliderButtons();

}


initializePortal();

});


/* =========================================================
   MAIN NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const navLinks =
        document.querySelectorAll(".main-nav a");

    if (!navLinks.length) return;

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    navLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href")
                .split("/")
                .pop()
                .toLowerCase();

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });

});
