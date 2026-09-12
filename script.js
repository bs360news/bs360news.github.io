/* =========================================================
   BS 360 NEWS - CLEAN HOMEPAGE SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    initializePortal();
});


/* =========================================================
   GET ALL ARTICLES
   ========================================================= */

function getPosts() {

    const source = document.querySelector("#legacyNewsSource");

    if (!source) return [];

    const articles = [...source.querySelectorAll(".post[data-url]")];

    return articles.map((article, index) => {

        const image = article.querySelector("img");
        const title = article.querySelector(".news-content p");

        return {
            index: index,
            category: (article.dataset.category || "").toLowerCase().trim(),
            url: article.dataset.url || "#",
            image: image ? image.getAttribute("src") : "",
            alt: image ? image.getAttribute("alt") : "",
            title: title ? title.textContent.trim() : ""
        };

    }).filter(post => post.title && post.url);

}


/* =========================================================
   REMOVE DUPLICATES
   ========================================================= */

function uniquePosts(posts) {

    const used = new Set();

    return posts.filter(post => {

        const key = post.url.toLowerCase();

        if (used.has(key)) return false;

        used.add(key);

        return true;

    });

}


/* =========================================================
   CATEGORY HELPERS
   ========================================================= */

function isBigBoss(post) {

    const category = post.category;

    return (
        category.includes("bigboss") ||
        category.includes("big_boss") ||
        category.includes("big-boss")
    );

}


function isSports(post) {

    const category = post.category;

    return (
        category === "sports" ||
        category === "sport" ||
        category === "cricket"
    );

}


function isMovies(post) {

    const category = post.category;

    return (
        category === "movies" ||
        category === "movie" ||
        category === "cinema" ||
        category === "entertainment"
    );

}


function isBusiness(post) {

    const category = post.category;

    return (
        category === "business" ||
        category === "finance" ||
        category === "stock" ||
        category === "economy"
    );

}


function isAPTS(post) {

    const category = post.category;

    return (
        category === "ap" ||
        category === "ts" ||
        category === "andhra" ||
        category === "andhrapradesh" ||
        category === "telangana"
    );

}


/* =========================================================
   NORMAL NEWS
   BIGG BOSS WILL NEVER ENTER NORMAL SECTIONS
   ========================================================= */

function normalNews(posts) {

    return posts.filter(post => !isBigBoss(post));

}


/* =========================================================
   CARD
   ========================================================= */

function createCard(post, className = "") {

    return `
        <a
            href="${escapeHTML(post.url)}"
            class="news-card ${className}"
        >

            <div class="news-card-image">

                <img
                    src="${escapeHTML(post.image)}"
                    alt="${escapeHTML(post.alt || post.title)}"
                    loading="lazy"
                >

            </div>

            <div class="news-card-content">

                <h3>
                    ${escapeHTML(post.title)}
                </h3>

            </div>

        </a>
    `;

}


/* =========================================================
   LATEST NEWS
   OLD TOP STORY STYLE
   ========================================================= */

function renderLatestNews(posts) {

    const sidebar = document.querySelector("#latestSidebar");
    const hero = document.querySelector("#topStory");

    if (!sidebar || !hero) return;

    const latest = normalNews(posts);

    if (!latest.length) {

        sidebar.innerHTML = "";
        hero.innerHTML = "";

        return;

    }


    /* MAIN LATEST STORY */

    const main = latest[0];

    hero.innerHTML = `

        <a
            href="${escapeHTML(main.url)}"
            class="latest-hero-card"
        >

            <img
                src="${escapeHTML(main.image)}"
                alt="${escapeHTML(main.alt || main.title)}"
            >

            <div class="latest-hero-overlay">

                <span class="latest-label">
                    LATEST NEWS
                </span>

                <h1>
                    ${escapeHTML(main.title)}
                </h1>

            </div>

        </a>

    `;


    /* SIDEBAR */

    const sidePosts = latest.slice(1, 8);

    sidebar.innerHTML = sidePosts.map((post, index) => {

        return `

            <a
                href="${escapeHTML(post.url)}"
                class="latest-sidebar-item"
            >

                <span class="latest-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>

                <div>

                    <h3>
                        ${escapeHTML(post.title)}
                    </h3>

                </div>

            </a>

        `;

    }).join("");

}


/* =========================================================
   BIGG BOSS 10
   ONLY BIGG BOSS ARTICLES
   ========================================================= */

function renderBigBoss(posts) {

    const track = document.querySelector("#bigbossTrack");

    if (!track) return;

    const bigboss = posts.filter(isBigBoss).slice(0, 10);

    track.innerHTML = bigboss.map(post => {

        return createCard(post, "bigboss-card");

    }).join("");


    setupBigBossSlider();

}


/* =========================================================
   BIGG BOSS SLIDER
   ========================================================= */

function setupBigBossSlider() {

    const slider = document.querySelector("#bigbossSlider");
    const track = document.querySelector("#bigbossTrack");

    const prev = document.querySelector(".bigboss-prev");
    const next = document.querySelector(".bigboss-next");

    if (!slider || !track) return;

    let position = 0;


    function move(direction) {

        const cards = track.querySelectorAll(".bigboss-card");

        if (!cards.length) return;

        const cardWidth =
            cards[0].getBoundingClientRect().width + 16;

        position += direction * cardWidth;

        const maxScroll =
            Math.max(0, track.scrollWidth - slider.clientWidth);

        position = Math.max(
            0,
            Math.min(position, maxScroll)
        );

        slider.scrollTo({
            left: position,
            behavior: "smooth"
        });

    }


    if (prev) {

        prev.onclick = () => move(-1);

    }


    if (next) {

        next.onclick = () => move(1);

    }


    /* AUTO SCROLL EVERY 5 SECONDS */

    clearInterval(window.bigBossTimer);

    window.bigBossTimer = setInterval(() => {

        const maxScroll =
            track.scrollWidth - slider.clientWidth;

        if (maxScroll <= 0) return;

        if (slider.scrollLeft >= maxScroll - 10) {

            slider.scrollTo({
                left: 0,
                behavior: "smooth"
            });

            position = 0;

        } else {

            move(1);

        }

    }, 5000);

}


/* =========================================================
   AP & TS
   ========================================================= */

function renderAPTS(posts) {

    const track = document.querySelector("#sliderTrack");

    if (!track) return;

    const news = posts
        .filter(isAPTS)
        .filter(post => !isBigBoss(post))
        .slice(0, 15);

    track.innerHTML = news.map(post => {

        return createCard(post, "category-card");

    }).join("");


    setupNormalSlider();

}


/* =========================================================
   NORMAL CAROUSEL
   ========================================================= */

function setupNormalSlider() {

    const slider = document.querySelector("#newsSlider");

    const track = document.querySelector("#sliderTrack");

    const prev = document.querySelector("#sliderPrev");

    const next = document.querySelector("#sliderNext");

    if (!slider || !track) return;


    function scroll(direction) {

        const card = track.querySelector(".news-card");

        if (!card) return;

        const amount =
            card.getBoundingClientRect().width + 16;

        slider.scrollBy({
            left: direction * amount,
            behavior: "smooth"
        });

    }


    if (prev) {

        prev.onclick = () => scroll(-1);

    }


    if (next) {

        next.onclick = () => scroll(1);

    }

}


/* =========================================================
   MOVIES
   ========================================================= */

function renderMovies(posts) {

    const grid = document.querySelector("#cinemaGrid");

    if (!grid) return;

    const movies = posts
        .filter(isMovies)
        .filter(post => !isBigBoss(post))
        .slice(0, 12);

    grid.innerHTML = movies.map(post => {

        return createCard(post, "category-card");

    }).join("");

}


/* =========================================================
   SPORTS
   ========================================================= */

function renderSports(posts) {

    const grid = document.querySelector("#sportsGrid");

    if (!grid) return;

    const sports = posts
        .filter(isSports)
        .filter(post => !isBigBoss(post))
        .slice(0, 12);

    grid.innerHTML = sports.map(post => {

        return createCard(post, "category-card");

    }).join("");

}


/* =========================================================
   BUSINESS
   ========================================================= */

function createBusinessSection(posts) {

    const businessPosts = posts
        .filter(isBusiness)
        .filter(post => !isBigBoss(post))
        .slice(0, 12);


    if (!businessPosts.length) return;


    const existing =
        document.querySelector("#businessSection");

    if (existing) {

        existing.remove();

    }


    const section =
        document.createElement("section");

    section.className = "category-section business-section";

    section.id = "businessSection";


    section.innerHTML = `

        <div class="section-title-row">

            <h2>
                💼 Business
            </h2>

            <a
                href="business.html"
                class="view-all"
            >
                READ MORE →
            </a>

        </div>

        <div
            class="horizontal-carousel"
            id="businessGrid"
        ></div>

    `;


    const movies =
        document.querySelector("#cinemaSection");


    if (movies) {

        movies.parentNode.insertBefore(
            section,
            movies
        );

    }


    const grid =
        section.querySelector("#businessGrid");


    grid.innerHTML =
        businessPosts.map(post => {

            return createCard(
                post,
                "category-card"
            );

        }).join("");

}


/* =========================================================
   ALL NEWS
   BIGG BOSS EXCLUDED
   ========================================================= */

function renderAllNews(posts) {

    const container =
        document.querySelector("#mostReadList");

    if (!container) return;


    const news = normalNews(posts).slice(0, 12);


    container.innerHTML =
        news.map(post => {

            return createCard(
                post,
                "all-news-card"
            );

        }).join("");

}


/* =========================================================
   SEARCH
   ========================================================= */

function toggleSearch() {

    const box =
        document.querySelector("#searchBox");

    if (!box) return;

    box.classList.toggle("show");


    if (box.classList.contains("show")) {

        const input =
            document.querySelector("#searchInput");

        if (input) {

            setTimeout(() => {
                input.focus();
            }, 100);

        }

    }

}


function searchNews() {

    const input =
        document.querySelector("#searchInput");

    if (!input) return;


    const keyword =
        input.value.trim().toLowerCase();


    if (!keyword) return;


    const posts =
        window.BS360_POSTS || [];


    const results =
        normalNews(posts).filter(post => {

            return (
                post.title.toLowerCase()
                    .includes(keyword) ||

                post.category.toLowerCase()
                    .includes(keyword)
            );

        });


    showSearchResults(results, keyword);

}


function showSearchResults(results, keyword) {

    const existing =
        document.querySelector("#searchResults");

    if (existing) {

        existing.remove();

    }


    const section =
        document.createElement("section");

    section.id = "searchResults";

    section.className = "search-results-section";


    section.innerHTML = `

        <div class="section-title-row">

            <h2>
                🔎 Search Results
            </h2>

            <span>
                "${escapeHTML(keyword)}"
            </span>

        </div>

        <div class="search-results-grid">

            ${
                results.length

                ? results.map(post =>
                    createCard(post, "category-card")
                  ).join("")

                : `
                    <div class="no-results">
                        వార్తలు కనిపించలేదు.
                    </div>
                  `
            }

        </div>

    `;


    const portal =
        document.querySelector(".portal-wrap");


    if (portal) {

        portal.prepend(section);

        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================================================
   ENTER KEY SEARCH
   ========================================================= */

function setupSearch() {

    const input =
        document.querySelector("#searchInput");

    if (!input) return;


    input.addEventListener("keydown", event => {

        if (event.key === "Enter") {

            searchNews();

        }

    });

}


/* =========================================================
   DARK MODE
   ========================================================= */

function toggleTheme() {

    document.body.classList.toggle("dark-mode");


    const enabled =
        document.body.classList.contains("dark-mode");


    localStorage.setItem(
        "bs360-dark-mode",
        enabled ? "1" : "0"
    );


    updateThemeButton();

}


function updateThemeButton() {

    const button =
        document.querySelector("#themeButton");

    if (!button) return;


    const dark =
        document.body.classList.contains("dark-mode");


    button.textContent =
        dark ? "☀️ Light" : "🌙 Dark";

}


function setupDarkMode() {

    const saved =
        localStorage.getItem("bs360-dark-mode");


    if (saved === "1") {

        document.body.classList.add("dark-mode");

    }


    updateThemeButton();

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function toggleMobileNav() {

    const nav =
        document.querySelector("#navLinks");

    if (!nav) return;

    nav.classList.toggle("mobile-open");

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
   ========================================================= */

function setupMobileNav() {

    const nav =
        document.querySelector("#navLinks");

    if (!nav) return;


    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("mobile-open");

        });

    });

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initializePortal() {

    const posts =
        uniquePosts(getPosts());


    /* Make posts available globally */

    window.BS360_POSTS = posts;


    /* Main sections */

    renderLatestNews(posts);

    renderBigBoss(posts);

    renderAPTS(posts);

    createBusinessSection(posts);

    renderMovies(posts);

    renderSports(posts);

    renderAllNews(posts);


    /* Controls */

    setupSearch();

    setupDarkMode();

    setupMobileNav();

}


/* =========================================================
   GLOBAL FUNCTIONS
   ========================================================= */

window.toggleSearch = toggleSearch;

window.searchNews = searchNews;

window.toggleTheme = toggleTheme;

window.toggleMobileNav = toggleMobileNav;
