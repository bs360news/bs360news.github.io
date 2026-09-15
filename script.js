/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================================
       HELPERS
       ===================================================== */

    const $ = (selector, parent = document) => {
        return parent.querySelector(selector);
    };

    const $$ = (selector, parent = document) => {
        return Array.from(parent.querySelectorAll(selector));
    };


    /* =====================================================
       LEGACY SOURCE
       Read all existing articles from HTML
       ===================================================== */

    const sourcePosts = $$("#legacyNewsSource .post");

    const articles = sourcePosts.map((post, index) => {

        const image = $("img", post);
        const titleElement = $(".news-content p", post);

        return {
            index: index,

            category: (
                post.dataset.category || ""
            ).toLowerCase().trim(),

            url: post.dataset.url || "#",

            image: image ? image.getAttribute("src") : "",

            alt: image
                ? image.getAttribute("alt") || ""
                : "",

            title: titleElement
                ? titleElement.textContent.trim()
                : ""
        };

    }).filter(article => {

        return (
            article.title &&
            article.image &&
            article.url
        );

    });


    /* =====================================================
       CATEGORY LABEL
       ===================================================== */

    function categoryLabel(category) {

        const labels = {

            business: "💼 BUSINESS",

            sports: "🏏 SPORTS",

            cinema: "🎬 ENTERTAINMENT",

            movies: "🎬 ENTERTAINMENT",

            ap: "🏛️ AP NEWS",

            ts: "🏛️ TS NEWS",

            bigboss10: "📺 BIGG BOSS",

            lifestyle: "👑 LIFESTYLE",

            agriculture: "🌾 AGRICULTURE",

            automobiles: "🚗 AUTOMOBILES",

            "human-interest": "📰 NEWS",

            politics: "🏛️ POLITICS",

            news: "📰 NEWS"

        };

        return labels[category] || "📰 NEWS";
    }


    /* =====================================================
       CREATE IMAGE
       ===================================================== */

    function createImage(src, alt) {

        const img = document.createElement("img");

        img.src = src;
        img.alt = alt || "BS 360 NEWS";
        img.loading = "lazy";

        img.onerror = function () {
            this.style.display = "none";
        };

        return img;
    }


    /* =====================================================
       CREATE LATEST FEATURE
       ===================================================== */

    function createLatestFeature(article, index, total) {

        const feature = document.createElement("a");

        feature.className = "latest-feature";

        feature.href = article.url;

        feature.setAttribute(
            "aria-label",
            article.title
        );


        const image = createImage(
            article.image,
            article.alt || article.title
        );


        const content = document.createElement("div");

        content.className = "latest-content";


        const category = document.createElement("span");

        category.className = "latest-category";

        category.textContent =
            categoryLabel(article.category);


        const title = document.createElement("h3");

        title.className = "latest-title";

        title.textContent = article.title;


        const read = document.createElement("span");

        read.className = "latest-read";

        read.textContent = "READ MORE →";


        content.appendChild(category);
        content.appendChild(title);
        content.appendChild(read);


        feature.appendChild(image);
        feature.appendChild(content);


        /* Dots */

        if (total > 1) {

            const dots = document.createElement("div");

            dots.className = "latest-dots";

            dots.addEventListener(
                "click",
                function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            );


            for (let i = 0; i < total; i++) {

                const dot = document.createElement("button");

                dot.type = "button";

                dot.className =
                    "latest-dot" +
                    (i === index ? " active" : "");

                dot.setAttribute(
                    "aria-label",
                    "Latest News " + (i + 1)
                );


                dot.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        showLatest(i);

                    }
                );


                dots.appendChild(dot);

            }

            feature.appendChild(dots);
        }


        return feature;
    }


    /* =====================================================
       LATEST NEWS
       5 SECOND AUTO CHANGE
       ===================================================== */

    const latestContainer = $("#topStory");

    let latestArticles = [];

    let latestIndex = 0;

    let latestTimer = null;


    if (latestContainer) {

        /*
         * Bigg Boss articles are kept separate.
         * Latest News uses the latest general news
         * from the existing HTML source.
         */

        latestArticles = articles
            .filter(article => {
                return article.category !== "bigboss10";
            })
            .slice(0, 5);


        /*
         * If fewer than 5 articles exist,
         * use whatever is available.
         */

        if (latestArticles.length === 0) {

            latestContainer.innerHTML =
                '<div class="no-news">వార్తలు అందుబాటులో లేవు.</div>';

        } else {

            function showLatest(index) {

                if (!latestArticles.length) {
                    return;
                }

                latestIndex =
                    (index + latestArticles.length) %
                    latestArticles.length;


                latestContainer.innerHTML = "";

                const feature =
                    createLatestFeature(
                        latestArticles[latestIndex],
                        latestIndex,
                        latestArticles.length
                    );

                latestContainer.appendChild(feature);

            }


            window.showLatest = showLatest;


            showLatest(0);


            /*
             * EXACTLY 5 SECONDS
             */

            latestTimer = setInterval(
                function () {

                    showLatest(
                        latestIndex + 1
                    );

                },
                5000
            );

        }

    }


    /* =====================================================
       FILTER CATEGORY ARTICLES
       ===================================================== */

    function getCategoryArticles(categories) {

        return articles.filter(article => {

            return categories.includes(
                article.category
            );

        });

    }


    /* =====================================================
       CREATE FEATURED CATEGORY CARD
       ===================================================== */

    function createFeaturedCard(article) {

        const card = document.createElement("a");

        card.className = "category-featured";

        card.href = article.url;


        const imageWrap =
            document.createElement("div");

        imageWrap.className =
            "category-featured-image";


        const image = createImage(
            article.image,
            article.alt || article.title
        );


        imageWrap.appendChild(image);


        const body =
            document.createElement("div");

        body.className =
            "category-featured-body";


        const badge =
            document.createElement("span");

        badge.className =
            "category-badge";

        badge.textContent =
            categoryLabel(article.category);


        const title =
            document.createElement("h3");

        title.className =
            "category-featured-title";

        title.textContent =
            article.title;


        body.appendChild(badge);
        body.appendChild(title);


        card.appendChild(imageWrap);
        card.appendChild(body);


        return card;
    }


    /* =====================================================
       CREATE SMALL CARD
       ===================================================== */

    function createSmallCard(article) {

        const card = document.createElement("a");

        card.className = "news-card";

        card.href = article.url;


        const imageWrap =
            document.createElement("div");

        imageWrap.className =
            "news-card-image";


        const image = createImage(
            article.image,
            article.alt || article.title
        );


        imageWrap.appendChild(image);


        const body =
            document.createElement("div");

        body.className =
            "news-card-body";


        const category =
            document.createElement("span");

        category.className =
            "news-card-category";

        category.textContent =
            categoryLabel(article.category);


        const title =
            document.createElement("p");

        title.className =
            "news-card-title";

        title.textContent =
            article.title;


        body.appendChild(category);
        body.appendChild(title);


        card.appendChild(imageWrap);
        card.appendChild(body);


        return card;
    }


    /* =====================================================
       RENDER CATEGORY
       1 BIG + ALL REMAINING IN 2 COLUMN GRID
       ===================================================== */

    function renderCategory(
        container,
        categoryList
    ) {

        if (!container) {
            return;
        }


        container.innerHTML = "";


        if (!categoryList.length) {

            container.innerHTML =
                '<div class="no-news">వార్తలు అందుబాటులో లేవు.</div>';

            return;
        }


        const layout =
            document.createElement("div");

        layout.className =
            "category-news-layout";


        /*
         * First article = BIG ARTICLE
         */

        const featured =
            createFeaturedCard(
                categoryList[0]
            );


        /*
         * Remaining articles
         */

        const smallGrid =
            document.createElement("div");

        smallGrid.className =
            "small-news-grid";


        categoryList
            .slice(1)
            .forEach(function (article) {

                smallGrid.appendChild(
                    createSmallCard(article)
                );

            });


        layout.appendChild(featured);


        /*
         * Only add grid if remaining articles exist
         */

        if (categoryList.length > 1) {

            layout.appendChild(
                smallGrid
            );

        }


        container.appendChild(layout);

    }


    /* =====================================================
       AP & TS
       ===================================================== */

    const apTsArticles =
        getCategoryArticles([
            "ap",
            "ts"
        ]);


    /*
     * Your HTML uses old carousel container.
     * We use the same ID so HTML does not need
     * another complicated structure.
     */

    const apTsContainer =
        $("#sliderTrack");


    renderCategory(
        apTsContainer,
        apTsArticles
    );


    /* =====================================================
       SPORTS
       ===================================================== */

    const sportsArticles =
        getCategoryArticles([
            "sports"
        ]);


    const sportsContainer =
        $("#sportsGrid");


    renderCategory(
        sportsContainer,
        sportsArticles
    );


    /* =====================================================
       ENTERTAINMENT
       ===================================================== */

    const entertainmentArticles =
        getCategoryArticles([
            "cinema",
            "movies"
        ]);


    const entertainmentContainer =
        $("#cinemaGrid");


    renderCategory(
        entertainmentContainer,
        entertainmentArticles
    );


    /* =====================================================
       BUSINESS
       ===================================================== */

    const businessArticles =
        getCategoryArticles([
            "business"
        ]);


    const businessContainer =
        $("#businessGrid");


    renderCategory(
        businessContainer,
        businessArticles
    );


    /* =====================================================
       SEARCH
       ===================================================== */

    window.toggleSearch = function () {

        const box =
            $("#searchBox");

        if (!box) {
            return;
        }

        box.classList.toggle("show");

        if (box.classList.contains("show")) {

            const input =
                $("#searchInput");

            if (input) {
                setTimeout(
                    function () {
                        input.focus();
                    },
                    50
                );
            }

        }

    };


    window.searchNews = function () {

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
            return;
        }


        const result =
            articles.find(article => {

                return article.title
                    .toLowerCase()
                    .includes(query);

            });


        if (result) {

            window.location.href =
                result.url;

        } else {

            alert(
                "ఈ పదంతో వార్త ఏదీ కనుగొనబడలేదు."
            );

        }

    };


    /* =====================================================
       SEARCH ENTER KEY
       ===================================================== */

    const searchInput =
        $("#searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

                    event.preventDefault();

                    window.searchNews();

                }

            }
        );

    }


    /* =====================================================
       THEME
       ===================================================== */

    window.toggleTheme = function () {

        document.body.classList.toggle(
            "dark-mode"
        );


        const button =
            $("#themeButton");


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

        } else {

            button.textContent =
                "🌙 Dark";

        }

    };


    /* =====================================================
       MOBILE NAV
       ===================================================== */

    window.toggleMobileNav = function () {

        const nav =
            $("#navLinks");

        if (!nav) {
            return;
        }

        nav.classList.toggle("show");

    };


    /* =====================================================
       STOP LATEST TIMER WHEN PAGE IS HIDDEN
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function () {

            if (
                document.hidden &&
                latestTimer
            ) {

                clearInterval(
                    latestTimer
                );

                latestTimer = null;

            } else if (
                !document.hidden &&
                latestArticles.length &&
                !latestTimer
            ) {

                latestTimer =
                    setInterval(
                        function () {

                            showLatest(
                                latestIndex + 1
                            );

                        },
                        5000
                    );

            }

        }
    );


});
