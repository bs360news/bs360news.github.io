/* =========================================================
   BS 360 NEWS – FULL JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   BASIC HELPERS
========================================================= */

function $(selector, parent = document) {
    return parent.querySelector(selector);
}

function $$(selector, parent = document) {
    return Array.from(parent.querySelectorAll(selector));
}

function escapeHTML(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   GET SOURCE POSTS
========================================================= */

function sourcePosts() {

    let posts = [];

    const legacy = $("#legacyNewsSource");

    if (legacy) {
        posts = $$(".post[data-url]", legacy);
    }

    if (!posts.length) {
        posts = $$(".news-list .news-item.post[data-url]");
    }

    if (!posts.length) {
        posts = $$(".news-item.post[data-url]");
    }

    if (!posts.length) {
        posts = $$(".post[data-url]");
    }

    return posts;
}


/* =========================================================
   UNIQUE POSTS
========================================================= */

function uniquePosts(posts) {

    const seen = new Set();

    return posts.filter(function(post) {

        const url = (
            post.dataset.url ||
            post.getAttribute("href") ||
            ""
        ).trim();

        const title = titleOf(post)
            .trim()
            .toLowerCase();

        const key = url + "|" + title;

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);

        return true;
    });
}


/* =========================================================
   TITLE
========================================================= */

function titleOf(post) {

    if (!post) return "";

    const heading =
        $("h1", post) ||
        $("h2", post) ||
        $("h3", post) ||
        $("h4", post) ||
        $("p", post);

    return heading
        ? heading.textContent.trim()
        : "";
}


/* =========================================================
   IMAGE
========================================================= */

function imageOf(post) {

    if (!post) return "";

    const image = $("img", post);

    if (!image) return "";

    return (
        image.getAttribute("src") ||
        image.dataset.src ||
        ""
    );
}


/* =========================================================
   ALT
========================================================= */

function altOf(post) {

    const image = $("img", post);

    if (!image) return titleOf(post);

    return (
        image.getAttribute("alt") ||
        titleOf(post)
    );
}


/* =========================================================
   CATEGORIES
========================================================= */

function catsOf(post) {

    if (!post) return "";

    return (
        post.dataset.category ||
        post.dataset.categories ||
        post.getAttribute("data-category") ||
        ""
    ).toLowerCase();
}


/* =========================================================
   CATEGORY CHECK
========================================================= */

function hasCat(post, names) {

    const value = catsOf(post);

    return names.some(function(name) {
        return value.includes(name.toLowerCase());
    });
}


/* =========================================================
   BIGG BOSS
========================================================= */

function isBigBoss(post) {

    const value = (
        catsOf(post) +
        " " +
        titleOf(post)
    ).toLowerCase();

    return (
        value.includes("bigboss") ||
        value.includes("big boss") ||
        value.includes("బిగ్‌బాస్") ||
        value.includes("బిగ్ బాస్")
    );
}


/* =========================================================
   SPORTS
========================================================= */

function isSports(post) {

    return hasCat(post, [
        "sports",
        "sport",
        "cricket",
        "football",
        "tennis",
        "hockey"
    ]);
}


/* =========================================================
   CINEMA
========================================================= */

function isMovies(post) {

    return hasCat(post, [
        "movies",
        "movie",
        "cinema",
        "film",
        "tollywood",
        "bollywood"
    ]);
}


/* =========================================================
   BUSINESS
========================================================= */

function isBusiness(post) {

    return hasCat(post, [
        "business",
        "finance",
        "market",
        "stock",
        "economy"
    ]);
}


/* =========================================================
   AP NEWS
========================================================= */

function isAPNews(post) {

    const value = (
        catsOf(post) +
        " " +
        titleOf(post)
    ).toLowerCase();

    return (
        value.includes("andhra-pradesh") ||
        value.includes("andhrapradesh") ||
        value.includes("andhra pradesh") ||
        value.includes("andhra") ||
        value.includes("ap-news") ||
        value.includes("ap news") ||
        value.includes("ఆంధ్రప్రదేశ్") ||
        value.includes("ఆంధ్ర ప్రదేశ్") ||
        value.includes("ఆంధ్ర")
    );
}


/* =========================================================
   TS NEWS
========================================================= */

function isTSNews(post) {

    const value = (
        catsOf(post) +
        " " +
        titleOf(post)
    ).toLowerCase();

    return (
        value.includes("telangana") ||
        value.includes("telangana-news") ||
        value.includes("telangana news") ||
        value.includes("ts-news") ||
        value.includes("ts news") ||
        value.includes("తెలంగాణ")
    );
}


/* =========================================================
   NORMAL POSTS
========================================================= */

function normalPosts() {

    return uniquePosts(
        sourcePosts().filter(function(post) {
            return !isBigBoss(post);
        })
    );
}


/* =========================================================
   CATEGORY LABEL
========================================================= */

function labelOf(post) {

    if (isBigBoss(post)) {
        return "BIGG BOSS 10";
    }

    if (isSports(post)) {
        return "SPORTS";
    }

    if (isMovies(post)) {
        return "CINEMA";
    }

    if (hasCat(post, [
        "technology",
        "tech"
    ])) {
        return "TECHNOLOGY";
    }

    if (isBusiness(post)) {
        return "BUSINESS";
    }

    if (hasCat(post, [
        "jobs",
        "job",
        "employment"
    ])) {
        return "JOBS";
    }

    if (hasCat(post, [
        "world",
        "international"
    ])) {
        return "WORLD";
    }

    /* AP / TS BEFORE INDIA */
    if (isAPNews(post)) {
        return "ANDHRA PRADESH";
    }

    if (isTSNews(post)) {
        return "TELANGANA";
    }

    if (hasCat(post, [
        "india",
        "national"
    ])) {
        return "INDIA";
    }

    return "LATEST";
}


/* =========================================================
   FEATURED LABEL
   AP / TS ONLY
========================================================= */

function featuredLabelOf(post) {

    if (isAPNews(post)) {
        return "AP News";
    }

    if (isTSNews(post)) {
        return "TS News";
    }

    return "";
}


/* =========================================================
   FEATURED POSTS
   ONLY AP + TS
========================================================= */

function getFeaturedPosts() {

    return normalPosts()
        .filter(function(post) {

            return (
                isAPNews(post) ||
                isTSNews(post)
            );

        })
        .slice(0, 15);
}


/* =========================================================
   CREATE NORMAL CARD
========================================================= */

function createCard(
    post,
    type = "latest",
    customLabel = null
) {

    const article = document.createElement("article");

    article.className = "portal-card";

    if (type) {
        article.classList.add(
            "portal-card-" + type
        );
    }

    const image = imageOf(post);
    const title = titleOf(post);

    const url =
        post.dataset.url ||
        "#";

    const category =
        customLabel ||
        labelOf(post);

    article.innerHTML = `

        <div class="portal-card-image">

            <img
                src="${escapeHTML(image)}"
                alt="${escapeHTML(
                    altOf(post) || title
                )}"
                loading="lazy"
            >

        </div>

        <div class="portal-card-content">

            <span class="portal-tag">
                ${escapeHTML(category)}
            </span>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <a
                href="${escapeHTML(url)}"
                class="read-more-btn"
            >
                Read More
            </a>

        </div>
    `;

    return article;
}


/* =========================================================
   BIGG BOSS CARD
========================================================= */

function createBigBossCard(post) {

    const article =
        createCard(
            post,
            "bigboss",
            "BIGG BOSS 10"
        );

    return article;
}


/* =========================================================
   HERO OVERLAY
========================================================= */

function createHeroOverlay(post) {

    const article =
        document.createElement("article");

    article.className =
        "hero-overlay-card";

    const image = imageOf(post);
    const title = titleOf(post);
    const url = post.dataset.url || "#";

    article.innerHTML = `

        <img
            src="${escapeHTML(image)}"
            alt="${escapeHTML(
                altOf(post) || title
            )}"
            loading="lazy"
        >

        <div class="hero-overlay-content">

            <span class="portal-tag">
                ${escapeHTML(labelOf(post))}
            </span>

            <h2>
                ${escapeHTML(title)}
            </h2>

            <a
                href="${escapeHTML(url)}"
                class="read-more-btn"
            >
                Read More
            </a>

        </div>
    `;

    return article;
}


/* =========================================================
   TOP STORY
========================================================= */

function renderTopStory() {

    const target =
        $("#topStory");

    if (!target) return;

    target.innerHTML = "";

    const posts =
        normalPosts();

    if (!posts.length) return;

    target.appendChild(
        createHeroOverlay(posts[0])
    );
}


/* =========================================================
   LATEST SIDEBAR
========================================================= */

function renderLatestSidebar() {

    const target =
        $("#latestSidebar");

    if (!target) return;

    target.innerHTML = "";

    normalPosts()
        .slice(1, 6)
        .forEach(function(post) {

            target.appendChild(
                createCard(
                    post,
                    "latest-sidebar"
                )
            );

        });
}


/* =========================================================
   BIGG BOSS
========================================================= */

function renderBigBoss() {

    const target =
        $("#bigBossList");

    if (!target) return;

    target.innerHTML = "";

    sourcePosts()
        .filter(isBigBoss)
        .slice(0, 10)
        .forEach(function(post) {

            target.appendChild(
                createBigBossCard(post)
            );

        });
}


/* =========================================================
   FEATURED NEWS
   AP + TS ONLY
========================================================= */

function renderSlider() {

    const track =
        $("#sliderTrack");

    if (!track) return;

    track.innerHTML = "";

    const posts =
        getFeaturedPosts();

    posts.forEach(function(post) {

        const label =
            featuredLabelOf(post);

        track.appendChild(
            createCard(
                post,
                "slider",
                label
            )
        );

    });

    setupHorizontalAutoScroll(track);
}


/* =========================================================
   LATEST NEWS
========================================================= */

function renderLatest() {

    const target =
        $("#latestList");

    if (!target) return;

    target.innerHTML = "";

    normalPosts()
        .slice(0, 20)
        .forEach(function(post) {

            target.appendChild(
                createCard(
                    post,
                    "latest"
                )
            );

        });
}


/* =========================================================
   MOVIES
========================================================= */

function renderMovies() {

    const target =
        $("#moviesList");

    if (!target) return;

    target.innerHTML = "";

    normalPosts()
        .filter(isMovies)
        .slice(0, 12)
        .forEach(function(post) {

            target.appendChild(
                createCard(
                    post,
                    "movies",
                    "CINEMA"
                )
            );

        });
}


/* =========================================================
   SPORTS
========================================================= */

function renderSports() {

    const target =
        $("#sportsList");

    if (!target) return;

    target.innerHTML = "";

    normalPosts()
        .filter(isSports)
        .slice(0, 12)
        .forEach(function(post) {

            target.appendChild(
                createCard(
                    post,
                    "sports",
                    "SPORTS"
                )
            );

        });
}


/* =========================================================
   GENERIC HORIZONTAL SCROLL
========================================================= */

function setupHorizontalAutoScroll(track) {

    if (!track) return;

    track.style.display = "flex";

    track.style.overflowX = "auto";

    track.style.scrollBehavior =
        "smooth";

    track.style.scrollbarWidth =
        "none";

    track.addEventListener(
        "wheel",
        function(event) {

            if (
                Math.abs(event.deltaY) >
                Math.abs(event.deltaX)
            ) {

                event.preventDefault();

                track.scrollLeft +=
                    event.deltaY;
            }

        },
        {
            passive: false
        }
    );
}


/* =========================================================
   MOST READ
   IMAGE FULL CARD + CONTENT OVER IMAGE
========================================================= */

function renderMostRead() {

    const target =
        $("#mostReadList");

    if (!target) return;

    target.innerHTML = "";

    normalPosts()
        .slice(0, 10)
        .forEach(function(post, index) {

            const item =
                document.createElement("article");

            item.className =
                "most-read-item";

            const image =
                imageOf(post);

            const title =
                titleOf(post);

            const url =
                post.dataset.url ||
                "#";

            item.innerHTML = `

                <div class="most-read-image">

                    <img
                        src="${escapeHTML(image)}"
                        alt="${escapeHTML(
                            altOf(post) || title
                        )}"
                        loading="lazy"
                    >

                </div>

                <div class="most-read-text">

                    <span class="portal-tag">
                        ${escapeHTML(
                            labelOf(post)
                        )}
                    </span>

                    <h3>
                        ${escapeHTML(title)}
                    </h3>

                </div>

                <div class="most-number">
                    ${String(index + 1).padStart(
                        2,
                        "0"
                    )}
                </div>
            `;

            item.addEventListener(
                "click",
                function(event) {

                    if (
                        event.target.closest("a")
                    ) {
                        return;
                    }

                    window.location.href =
                        url;
                }
            );

            target.appendChild(item);

        });
}


/* =========================================================
   SEARCH
========================================================= */

function setupSearch() {

    const input =
        $("#searchInput");

    const results =
        $("#searchResults");

    if (!input || !results) return;

    input.addEventListener(
        "input",
        function() {

            const query =
                input.value
                    .trim()
                    .toLowerCase();

            results.innerHTML = "";

            if (!query) {
                results.style.display =
                    "none";

                return;
            }

            const matches =
                normalPosts()
                    .filter(function(post) {

                        return titleOf(post)
                            .toLowerCase()
                            .includes(query);

                    })
                    .slice(0, 10);

            if (!matches.length) {

                results.innerHTML = `
                    <div class="search-empty">
                        News not found
                    </div>
                `;

                results.style.display =
                    "block";

                return;
            }

            matches.forEach(function(post) {

                const item =
                    document.createElement("div");

                item.className =
                    "search-result-item";

                item.innerHTML = `

                    <img
                        src="${escapeHTML(
                            imageOf(post)
                        )}"
                        alt="${escapeHTML(
                            titleOf(post)
                        )}"
                    >

                    <div>

                        <span>
                            ${escapeHTML(
                                labelOf(post)
                            )}
                        </span>

                        <h4>
                            ${escapeHTML(
                                titleOf(post)
                            )}
                        </h4>

                    </div>
                `;

                item.addEventListener(
                    "click",
                    function() {

                        window.location.href =
                            post.dataset.url ||
                            "#";

                    }
                );

                results.appendChild(item);

            });

            results.style.display =
                "block";
        }
    );

    document.addEventListener(
        "click",
        function(event) {

            if (
                !event.target.closest(
                    ".search-section"
                )
            ) {

                results.style.display =
                    "none";
            }

        }
    );
}


/* =========================================================
   CATEGORY FILTERS
========================================================= */

function setupCategoryFilters() {

    const buttons =
        $$(".category-filter");

    if (!buttons.length) return;

    buttons.forEach(function(button) {

        button.addEventListener(
            "click",
            function() {

                buttons.forEach(function(btn) {
                    btn.classList.remove(
                        "active"
                    );
                });

                button.classList.add(
                    "active"
                );

                const category =
                    (
                        button.dataset.category ||
                        ""
                    ).toLowerCase();

                $$(".news-item.post")
                    .forEach(function(post) {

                        if (
                            category === "all" ||
                            !category
                        ) {

                            post.style.display =
                                "";

                            return;
                        }

                        const value =
                            catsOf(post);

                        post.style.display =
                            value.includes(category)
                                ? ""
                                : "none";

                    });

            }
        );

    });
}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuButton =
        $("#menuToggle");

    const menu =
        $("#mobileMenu");

    if (!menuButton || !menu) {
        return;
    }

    menuButton.addEventListener(
        "click",
        function() {

            menu.classList.toggle(
                "active"
            );

            menuButton.classList.toggle(
                "active"
            );

        }
    );

    $$(".mobile-menu a").forEach(
        function(link) {

            link.addEventListener(
                "click",
                function() {

                    menu.classList.remove(
                        "active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                }
            );

        }
    );
}


/* =========================================================
   DARK MODE
========================================================= */

function setupDarkMode() {

    const button =
        $("#darkModeToggle");

    if (!button) return;

    const saved =
        localStorage.getItem(
            "bs360-dark-mode"
        );

    if (saved === "true") {

        document.body.classList.add(
            "dark-mode"
        );

    }

    button.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark-mode"
            );

            localStorage.setItem(
                "bs360-dark-mode",
                document.body.classList.contains(
                    "dark-mode"
                )
            );

        }
    );
}


/* =========================================================
   DATE / TIME
========================================================= */

function setupDateTime() {

    const target =
        $("#currentDateTime");

    if (!target) return;

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

        target.textContent =
            date + " | " + time;
    }

    updateTime();

    setInterval(
        updateTime,
        1000
    );
}


/* =========================================================
   SHARE
========================================================= */

function setupShareButtons() {

    $$(".share-btn").forEach(
        function(button) {

            button.addEventListener(
                "click",
                async function(event) {

                    event.preventDefault();

                    const url =
                        button.dataset.url ||
                        window.location.href;

                    const title =
                        button.dataset.title ||
                        document.title;

                    if (
                        navigator.share
                    ) {

                        try {

                            await navigator.share({
                                title: title,
                                text: title,
                                url: url
                            });

                        } catch (error) {

                            /* User cancelled */
                        }

                        return;
                    }

                    try {

                        await navigator.clipboard
                            .writeText(url);

                        alert(
                            "Link copied!"
                        );

                    } catch (error) {

                        window.prompt(
                            "Copy this link:",
                            url
                        );

                    }

                }
            );

        }
    );
}


/* =========================================================
   SLIDER ARROWS
========================================================= */

function setupSliderArrows() {

    const track =
        $("#sliderTrack");

    if (!track) return;

    const next =
        $("#sliderNext");

    const prev =
        $("#sliderPrev");

    if (next) {

        next.addEventListener(
            "click",
            function() {

                track.scrollBy({
                    left: 320,
                    behavior: "smooth"
                });

            }
        );

    }

    if (prev) {

        prev.addEventListener(
            "click",
            function() {

                track.scrollBy({
                    left: -320,
                    behavior: "smooth"
                });

            }
        );

    }
}


/* =========================================================
   CLOSE SEARCH ON ESCAPE
========================================================= */

function setupEscapeKey() {

    document.addEventListener(
        "keydown",
        function(event) {

            if (event.key !== "Escape") {
                return;
            }

            const results =
                $("#searchResults");

            if (results) {
                results.style.display =
                    "none";
            }

            const menu =
                $("#mobileMenu");

            if (menu) {
                menu.classList.remove(
                    "active"
                );
            }

        }
    );
}


/* =========================================================
   LAZY IMAGE ERROR
========================================================= */

function setupImageFallback() {

    document.addEventListener(
        "error",
        function(event) {

            const image =
                event.target;

            if (
                image.tagName !== "IMG"
            ) {
                return;
            }

            image.style.visibility =
                "hidden";

        },
        true
    );
}


/* =========================================================
   INITIALIZE ALL
========================================================= */

function initializeBS360() {

    renderTopStory();

    renderLatestSidebar();

    renderBigBoss();

    /*
       FEATURED NEWS
       AP + TS ONLY
    */
    renderSlider();

    renderLatest();

    renderMovies();

    renderSports();

    /*
       MOST READ
       2 COLUMNS + IMAGE OVERLAY
    */
    renderMostRead();

    setupSearch();

    setupCategoryFilters();

    setupMobileMenu();

    setupDarkMode();

    setupDateTime();

    setupShareButtons();

    setupSliderArrows();

    setupEscapeKey();

    setupImageFallback();
}


/* =========================================================
   DOM READY
========================================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeBS360
    );

} else {

    initializeBS360();

}
