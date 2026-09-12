/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const source = document.getElementById("legacyNewsSource");

    if (!source) {
        console.error("legacyNewsSource not found");
        return;
    }


    /* =====================================================
       GET ALL ORIGINAL ARTICLES
       ===================================================== */

    const sourcePosts = Array.from(
        source.querySelectorAll(".news-item.post")
    );


    const posts = sourcePosts.map(function (article) {

        const image = article.querySelector("img");
        const titleElement = article.querySelector(".news-content p");

        return {
            element: article,

            category: (
                article.dataset.category || ""
            ).toLowerCase().trim(),

            url: article.dataset.url || "#",

            title: titleElement
                ? titleElement.textContent.trim()
                : "",

            image: image
                ? image.getAttribute("src")
                : "",

            alt: image
                ? image.getAttribute("alt") || ""
                : ""
        };

    });


    /* =====================================================
       CATEGORY HELPERS
       ===================================================== */

    function isBigBoss(post) {

        return (
            post.category.includes("bigboss") ||
            post.category.includes("big-boss")
        );

    }


    function isSports(post) {

        return (
            post.category.includes("sports") ||
            post.category.includes("cricket")
        );

    }


    function isMovies(post) {

        return (
            post.category.includes("movie") ||
            post.category.includes("movies") ||
            post.category.includes("cinema") ||
            post.category.includes("entertainment")
        );

    }


    function isBusiness(post) {

        return (
            post.category.includes("business") ||
            post.category.includes("stock") ||
            post.category.includes("finance") ||
            post.category.includes("economy") ||
            post.category.includes("gold")
        );

    }


    function isAPTS(post) {

        const category = post.category;

        if (
            category.includes("ap") ||
            category.includes("ts") ||
            category.includes("andhra") ||
            category.includes("telangana")
        ) {
            return true;
        }


        /* AP / Telangana political stories */

        if (
            category === "politics" ||
            category.includes("politics")
        ) {

            const text =
                post.title.toLowerCase();

            return (
                text.includes("పవన్") ||
                text.includes("చంద్రబాబు") ||
                text.includes("జనసేన") ||
                text.includes("ఆంధ్ర") ||
                text.includes("తెలంగాణ") ||
                text.includes("రేవంత్") ||
                text.includes("కేటీఆర్") ||
                text.includes("కెటిఆర్") ||
                text.includes("హరీశ్") ||
                text.includes("హరీష్") ||
                text.includes("కొండా సురేఖ")
            );

        }

        return false;

    }


    /* =====================================================
       LATEST EXCLUSION
       
       Latest Newsలో ఇవి రావు:
       Bigg Boss
       Sports
       Movies
       AP & TS
       
       Business / General / Agriculture /
       Automobiles / National / Lifestyle etc. వస్తాయి.
       ===================================================== */

    function isExcludedFromLatest(post) {

        return (
            isBigBoss(post) ||
            isSports(post) ||
            isMovies(post) ||
            isAPTS(post)
        );

    }


    /* =====================================================
       CATEGORY ARRAYS
       ===================================================== */

    const bigBossPosts =
        posts
            .filter(isBigBoss)
            .slice(0, 10);


    const sportsPosts =
        posts
            .filter(isSports)
            .slice(0, 10);


    const moviePosts =
        posts
            .filter(isMovies)
            .slice(0, 10);


    const businessPosts =
        posts
            .filter(isBusiness)
            .slice(0, 10);


    const apTsPosts =
        posts
            .filter(isAPTS)
            .slice(0, 10);


    /* =====================================================
       LATEST NEWS
       
       Source order same.
       First 10 eligible articles.
       ===================================================== */

    const latestPosts =
        posts
            .filter(function (post) {

                return !isExcludedFromLatest(post);

            })
            .slice(0, 10);


    /* =====================================================
       DATE + TIME
       ===================================================== */

    function createDateTime() {

        const headerActions =
            document.querySelector(".header-actions");

        if (!headerActions) {
            return;
        }


        let box =
            document.querySelector(".header-date-time");


        if (!box) {

            box =
                document.createElement("div");

            box.className =
                "header-date-time";

            box.innerHTML = `
                <div class="header-date"></div>
                <div class="header-time"></div>
            `;

            headerActions.insertBefore(
                box,
                headerActions.firstChild
            );

        }


        function updateDateTime() {

            const now = new Date();


            const dateText =
                now.toLocaleDateString(
                    "en-IN",
                    {
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


            const dateElement =
                box.querySelector(
                    ".header-date"
                );


            const timeElement =
                box.querySelector(
                    ".header-time"
                );


            if (dateElement) {
                dateElement.textContent =
                    dateText;
            }


            if (timeElement) {
                timeElement.textContent =
                    timeText;
            }

        }


        updateDateTime();

        setInterval(
            updateDateTime,
            1000
        );

    }


    createDateTime();


    /* =====================================================
       LATEST SIDEBAR CARD
       ===================================================== */

    function createLatestSideItem(post) {

        const a =
            document.createElement("a");

        a.className =
            "latest-side-item";

        a.href =
            post.url;


        a.innerHTML = `
            <img
                src="${escapeHTML(post.image)}"
                alt="${escapeHTML(post.alt || post.title)}"
                loading="lazy"
            >

            <div class="latest-side-title">
                ${escapeHTML(post.title)}
            </div>
        `;


        return a;

    }


    /* =====================================================
       LATEST NEWS
       
       1 Hero
       9 Sidebar
       TOTAL 10
       ===================================================== */

    function renderLatest() {

        const sidebar =
            document.getElementById(
                "latestSidebar"
            );


        const hero =
            document.getElementById(
                "topStory"
            );


        if (!sidebar || !hero) {
            return;
        }


        sidebar.innerHTML = "";

        hero.innerHTML = "";


        if (!latestPosts.length) {

            sidebar.innerHTML =
                `<div class="no-news">
                    వార్తలు లేవు
                </div>`;

            return;

        }


        /* First article = Hero */

        const heroPost =
            latestPosts[0];


        /* Remaining 9 = Sidebar */

        latestPosts
            .slice(1, 10)
            .forEach(function (post) {

                sidebar.appendChild(
                    createLatestSideItem(post)
                );

            });


        const heroLink =
            document.createElement("a");


        heroLink.className =
            "latest-hero";

        heroLink.href =
            heroPost.url;


        heroLink.innerHTML = `
            <img
                src="${escapeHTML(heroPost.image)}"
                alt="${escapeHTML(heroPost.alt || heroPost.title)}"
                loading="eager"
            >

            <div class="latest-hero-overlay">

                <h1 class="latest-hero-title">
                    ${escapeHTML(heroPost.title)}
                </h1>

            </div>
        `;


        hero.appendChild(heroLink);

    }


    renderLatest();


    /* =====================================================
       CREATE COMMON CARD
       ===================================================== */

    function createCard(
        post,
        className
    ) {

        const a =
            document.createElement("a");


        a.className =
            className;


        a.href =
            post.url;


        let contentClass =
            "category-content";


        if (
            className === "bigboss-card"
        ) {

            contentClass =
                "bigboss-content";

        } else if (
            className === "slider-card"
        ) {

            contentClass =
                "slider-content";

        }


        a.innerHTML = `
            <img
                src="${escapeHTML(post.image)}"
                alt="${escapeHTML(post.alt || post.title)}"
                loading="lazy"
            >

            <div class="${contentClass}">

                <h3>
                    ${escapeHTML(post.title)}
                </h3>

            </div>
        `;


        return a;

    }


    /* =====================================================
       BIGG BOSS
       ===================================================== */

    function renderBigBoss() {

        const track =
            document.getElementById(
                "bigbossTrack"
            );


        const section =
            document.getElementById(
                "bigboss10Section"
            );


        if (!track) {
            return;
        }


        track.innerHTML = "";


        if (!bigBossPosts.length) {

            if (section) {
                section.style.display =
                    "none";
            }

            return;

        }


        if (section) {
            section.style.display = "";
        }


        bigBossPosts.forEach(
            function (post) {

                track.appendChild(
                    createCard(
                        post,
                        "bigboss-card"
                    )
                );

            }
        );

    }


    renderBigBoss();


    /* =====================================================
       AP & TS
       ===================================================== */

    function renderAPTS() {

        const track =
            document.getElementById(
                "sliderTrack"
            );


        if (!track) {
            return;
        }


        track.innerHTML = "";


        apTsPosts.forEach(
            function (post) {

                track.appendChild(
                    createCard(
                        post,
                        "slider-card"
                    )
                );

            }
        );

    }


    renderAPTS();


    /* =====================================================
       MOVIES
       ===================================================== */

    function renderMovies() {

        const grid =
            document.getElementById(
                "cinemaGrid"
            );


        if (!grid) {
            return;
        }


        grid.innerHTML = "";


        moviePosts.forEach(
            function (post) {

                grid.appendChild(
                    createCard(
                        post,
                        "category-card"
                    )
                );

            }
        );

    }


    renderMovies();


    /* =====================================================
       SPORTS
       ===================================================== */

    function renderSports() {

        const grid =
            document.getElementById(
                "sportsGrid"
            );


        if (!grid) {
            return;
        }


        grid.innerHTML = "";


        sportsPosts.forEach(
            function (post) {

                grid.appendChild(
                    createCard(
                        post,
                        "category-card"
                    )
                );

            }
        );

    }


    renderSports();


    /* =====================================================
       BUSINESS
       
       Business section automatically created.
       ===================================================== */

    function createBusinessSection() {

        if (!businessPosts.length) {
            return;
        }


        const oldBusiness =
            document.querySelector(
                ".business-section"
            );


        if (oldBusiness) {
            oldBusiness.remove();
        }


        const section =
            document.createElement("section");


        section.className =
            "business-section";


        section.innerHTML = `

            <div class="section-title-row">

                <h2>
                    💼 Business
                </h2>

                <span>
                    బిజినెస్ వార్తలు
                </span>

                <a
                    href="business.html"
                    class="view-all"
                >
                    READ MORE →
                </a>

            </div>

            <div class="horizontal-carousel">
            </div>

        `;


        const carousel =
            section.querySelector(
                ".horizontal-carousel"
            );


        businessPosts.forEach(
            function (post) {

                carousel.appendChild(
                    createCard(
                        post,
                        "category-card"
                    )
                );

            }
        );


        /* Insert after AP & TS */

        const apSection =
            document.querySelector(
                ".slider-section"
            );


        if (
            apSection &&
            apSection.parentNode
        ) {

            apSection.parentNode.insertBefore(
                section,
                apSection.nextSibling
            );

            return;
        }


        /* Fallback: before ad */

        const ad =
            document.querySelector(
                ".ad-space"
            );


        if (
            ad &&
            ad.parentNode
        ) {

            ad.parentNode.insertBefore(
                section,
                ad
            );

            return;
        }


        const portal =
            document.querySelector(
                ".portal-wrap"
            );


        if (portal) {
            portal.appendChild(section);
        }

    }


    createBusinessSection();


    /* =====================================================
       ALL NEWS
       
       ALL original articles remain.
       ===================================================== */

    function createAllNewsSection() {

        const old =
            document.querySelector(
                ".all-news-section"
            );


        if (old) {
            old.remove();
        }


        const section =
            document.createElement("section");


        section.className =
            "all-news-section";


        section.innerHTML = `

            <div class="section-title-row">

                <h2>
                    📰 All News
                </h2>

                <span>
                    అన్ని వార్తలు
                </span>

            </div>

            <div class="all-news-grid"></div>

        `;


        const grid =
            section.querySelector(
                ".all-news-grid"
            );


        /* All original articles */

        posts.forEach(
            function (post) {

                const card =
                    document.createElement("a");


                card.className =
                    "all-news-card";


                card.href =
                    post.url;


                card.innerHTML = `
                    <img
                        src="${escapeHTML(post.image)}"
                        alt="${escapeHTML(post.alt || post.title)}"
                        loading="lazy"
                    >

                    <div class="all-news-card-content">

                        <p class="all-news-card-title">
                            ${escapeHTML(post.title)}
                        </p>

                    </div>
                `;


                grid.appendChild(card);

            }
        );


        /* Put All News after Sports */

        const sportsSection =
            document.getElementById(
                "sportsSection"
            );


        if (
            sportsSection &&
            sportsSection.parentNode
        ) {

            sportsSection.parentNode.insertBefore(
                section,
                sportsSection.nextSibling
            );

        }

    }


    createAllNewsSection();


    /* =====================================================
       REMOVE OLD MOST READ
       ===================================================== */

    const mostRead =
        document.querySelector(
            ".most-read-section"
        );


    if (mostRead) {
        mostRead.remove();
    }


    /* =====================================================
       CAROUSEL BUTTONS
       ===================================================== */

    function setupCarousel(
        sliderId,
        prevSelector,
        nextSelector
    ) {

        const slider =
            document.getElementById(
                sliderId
            );


        if (!slider) {
            return;
        }


        const section =
            slider.closest("section");


        if (!section) {
            return;
        }


        const prev =
            section.querySelector(
                prevSelector
            );


        const next =
            section.querySelector(
                nextSelector
            );


        const scrollAmount =
            430;


        if (prev) {

            prev.addEventListener(
                "click",
                function () {

                    slider.scrollBy({
                        left: -scrollAmount,
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
                        left: scrollAmount,
                        behavior: "smooth"
                    });

                }
            );

        }

    }


    setupCarousel(
        "bigbossSlider",
        ".bigboss-prev",
        ".bigboss-next"
    );


    setupCarousel(
        "newsSlider",
        ".prev",
        ".next"
    );


    /* =====================================================
       AUTO SCROLL BIGG BOSS
       ===================================================== */

    function autoScrollBigBoss() {

        const slider =
            document.getElementById(
                "bigbossSlider"
            );


        if (!slider) {
            return;
        }


        let direction = 1;


        setInterval(
            function () {

                if (
                    slider.scrollLeft +
                    slider.clientWidth >=
                    slider.scrollWidth - 10
                ) {

                    direction = -1;

                }


                if (
                    slider.scrollLeft <= 0
                ) {

                    direction = 1;

                }


                slider.scrollBy({
                    left:
                        direction * 215,
                    behavior:
                        "smooth"
                });

            },
            5000
        );

    }


    autoScrollBigBoss();


    /* =====================================================
       SEARCH OPEN / CLOSE
       ===================================================== */

    window.toggleSearch =
        function () {

            const box =
                document.getElementById(
                    "searchBox"
                );


            if (!box) {
                return;
            }


            box.classList.toggle(
                "show"
            );


            if (
                box.classList.contains(
                    "show"
                )
            ) {

                const input =
                    document.getElementById(
                        "searchInput"
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

        };


    /* =====================================================
       SEARCH
       ===================================================== */

    window.searchNews =
        function () {

            const input =
                document.getElementById(
                    "searchInput"
                );


            if (!input) {
                return;
            }


            const query =
                input.value
                    .trim()
                    .toLowerCase();


            if (!query) {
                return;
            }


            const results =
                posts.filter(
                    function (post) {

                        return (
                            post.title
                                .toLowerCase()
                                .includes(query)

                            ||

                            post.alt
                                .toLowerCase()
                                .includes(query)

                            ||

                            post.category
                                .toLowerCase()
                                .includes(query)
                        );

                    }
                );


            showSearchResults(
                results,
                query
            );

        };


    /* =====================================================
       SEARCH ENTER
       ===================================================== */

    const searchInput =
        document.getElementById(
            "searchInput"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    searchNews();

                }

            }
        );

    }


    /* =====================================================
       SEARCH RESULTS
       ===================================================== */

    function showSearchResults(
        results,
        query
    ) {

        const old =
            document.querySelector(
                ".search-result-section"
            );


        if (old) {
            old.remove();
        }


        const section =
            document.createElement("section");


        section.className =
            "search-result-section";


        section.innerHTML = `

            <h2>
                🔎 "${escapeHTML(query)}"
                — Search Results
            </h2>

            <div class="search-result-grid"></div>

        `;


        const grid =
            section.querySelector(
                ".search-result-grid"
            );


        if (!results.length) {

            grid.innerHTML = `
                <div class="no-news">
                    ఈ పదానికి వార్తలు లభించలేదు.
                </div>
            `;

        } else {

            results.forEach(
                function (post) {

                    const card =
                        document.createElement(
                            "a"
                        );


                    card.className =
                        "all-news-card";


                    card.href =
                        post.url;


                    card.innerHTML = `
                        <img
                            src="${escapeHTML(post.image)}"
                            alt="${escapeHTML(post.alt || post.title)}"
                            loading="lazy"
                        >

                        <div class="all-news-card-content">

                            <p class="all-news-card-title">
                                ${escapeHTML(post.title)}
                            </p>

                        </div>
                    `;


                    grid.appendChild(card);

                }
            );

        }


        const main =
            document.querySelector(
                "main"
            );


        const search =
            document.querySelector(
                ".search-container"
            );


        if (
            main &&
            search
        ) {

            main.insertBefore(
                section,
                search.nextSibling
            );

        }


        section.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    /* =====================================================
       DARK MODE
       ===================================================== */

    window.toggleTheme =
        function () {

            document.body.classList.toggle(
                "dark-mode"
            );


            const button =
                document.getElementById(
                    "themeButton"
                );


            if (!button) {
                return;
            }


            if (
                document.body.classList.contains(
                    "dark-mode"
                )
            ) {

                button.textContent =
                    "☀️ Light";


                localStorage.setItem(
                    "bs360-theme",
                    "dark"
                );

            } else {

                button.textContent =
                    "🌙 Dark";


                localStorage.setItem(
                    "bs360-theme",
                    "light"
                );

            }

        };


    /* =====================================================
       LOAD SAVED THEME
       ===================================================== */

    const savedTheme =
        localStorage.getItem(
            "bs360-theme"
        );


    if (
        savedTheme === "dark"
    ) {

        document.body.classList.add(
            "dark-mode"
        );


        const button =
            document.getElementById(
                "themeButton"
            );


        if (button) {

            button.textContent =
                "☀️ Light";

        }

    }


    /* =====================================================
       MOBILE NAV
       ===================================================== */

    window.toggleMobileNav =
        function () {

            const nav =
                document.getElementById(
                    "navLinks"
                );


            if (!nav) {
                return;
            }


            nav.classList.toggle(
                "mobile-open"
            );

        };


    /* =====================================================
       TOP HEADLINES
       ===================================================== */

    function updateHeadlines() {

        const element =
            document.querySelector(
                ".headlines-text"
            );


        if (!element) {
            return;
        }


        const headlines =
            latestPosts
                .slice(0, 8)
                .map(
                    function (post) {
                        return post.title;
                    }
                );


        if (headlines.length) {

            element.textContent =
                headlines.join(
                    "  •  "
                );

        }

    }


    updateHeadlines();


    /* =====================================================
       ESCAPE HTML
       ===================================================== */

    function escapeHTML(value) {

        return String(value)
            .replace(
                /&/g,
                "&amp;"
            )
            .replace(
                /</g,
                "&lt;"
            )
            .replace(
                />/g,
                "&gt;"
            )
            .replace(
                /"/g,
                "&quot;"
            )
            .replace(
                /'/g,
                "&#039;"
            );

    }

});
