/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT

   LATEST NEWS:
   - One large featured card
   - Changes every 5 seconds
   - Image + title + category + Read More + dots change together

   AP & TS:
   - 1 large article
   - Remaining articles in 2 columns
   - NO automatic scrolling

   SPORTS:
   - 1 large article
   - Remaining articles in 2 columns
   - NO automatic scrolling

   ENTERTAINMENT:
   - 1 large article
   - Remaining articles in 2 columns
   - NO automatic scrolling

   BUSINESS:
   - 1 large article
   - Remaining articles in 2 columns
   - NO automatic scrolling

   DATA:
   - Everything comes automatically from #legacyNewsSource
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
       LEGACY ARTICLES
    ===================================================== */

    const source = $("#legacyNewsSource");

    if (!source) {
        console.error("legacyNewsSource not found.");
        return;
    }


    const allPosts = $$(".news-item.post", source);


    /*
       Convert old HTML article into clean JS object
    */

    const articles = allPosts.map((post, index) => {

        const image = $("img", post);
        const titleElement = $(".news-content p", post);

        return {

            index: index,

            category:
                post.dataset.category || "news",

            url:
                post.dataset.url || "#",

            image:
                image ? image.getAttribute("src") : "",

            alt:
                image
                    ? image.getAttribute("alt") || ""
                    : "",

            title:
                titleElement
                    ? titleElement.textContent.trim()
                    : ""

        };

    }).filter(item => {

        return item.title &&
               item.image &&
               item.url;

    });


    /* =====================================================
       CATEGORY FILTERS
    ===================================================== */

    function getCategoryArticles(category) {

        return articles.filter(article => {

            return article.category.toLowerCase() ===
                category.toLowerCase();

        });

    }


    /*
       Entertainment uses BOTH cinema + movies
    */

    function getEntertainmentArticles() {

        return articles.filter(article => {

            const cat = article.category.toLowerCase();

            return cat === "cinema" ||
                   cat === "movies";

        });

    }


    /*
       AP + TS together
    */

    function getAptsArticles() {

        return articles.filter(article => {

            const cat = article.category.toLowerCase();

            return cat === "ap" ||
                   cat === "ts";

        });

    }


    /* =====================================================
       CATEGORY NAME
    ===================================================== */

    function categoryName(category) {

        const names = {

            business: "BUSINESS",

            sports: "SPORTS",

            cinema: "ENTERTAINMENT",

            movies: "ENTERTAINMENT",

            ap: "AP & TS",

            ts: "AP & TS",

            news: "NEWS",

            lifestyle: "LIFESTYLE",

            politics: "POLITICS",

            agriculture: "AGRICULTURE",

            automobiles: "AUTOMOBILES",

            "human-interest": "NEWS"

        };

        return names[category] || category.toUpperCase();

    }


    /* =====================================================
       SAFE HTML
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
       LATEST NEWS
    ===================================================== */

    /*
       Bigg Boss is kept separate.
       Latest gets all normal news.
    */

    let latestArticles = articles.filter(article => {

        return article.category.toLowerCase() !== "bigboss10";

    });


    /*
       If no normal articles exist,
       use all articles.
    */

    if (!latestArticles.length) {
        latestArticles = [...articles];
    }


    const topStory = $("#topStory");

    let latestIndex = 0;

    let latestTimer = null;


    function renderLatest(index) {

        if (!topStory || !latestArticles.length) {
            return;
        }

        latestIndex =
            (index + latestArticles.length) %
            latestArticles.length;


        const article =
            latestArticles[latestIndex];


        topStory.innerHTML = `

            <article class="latest-hero">

                <a href="${escapeHTML(article.url)}"
                   aria-label="${escapeHTML(article.title)}">

                    <img
                        src="${escapeHTML(article.image)}"
                        alt="${escapeHTML(article.alt || article.title)}"
                        loading="eager"
                    >

                </a>


                <div class="latest-info">

                    <span class="latest-category">

                        ${escapeHTML(
                            categoryName(article.category)
                        )}

                    </span>


                    <h1 class="latest-title">

                        ${escapeHTML(article.title)}

                    </h1>


                    <a
                        class="latest-read"
                        href="${escapeHTML(article.url)}"
                    >
                        Read More →
                    </a>

                </div>


                <div class="latest-dots">

                    ${latestArticles.map((item, i) => `

                        <span
                            class="latest-dot
                            ${i === latestIndex ? "active" : ""}"
                            data-latest-index="${i}"
                        ></span>

                    `).join("")}

                </div>

            </article>

        `;


        /*
           Dots click
        */

        $$(".latest-dot", topStory).forEach(dot => {

            dot.addEventListener("click", function (event) {

                event.preventDefault();

                const newIndex =
                    Number(
                        this.dataset.latestIndex
                    );

                renderLatest(newIndex);

                restartLatestTimer();

            });

        });

    }


    function startLatestTimer() {

        clearInterval(latestTimer);

        latestTimer = setInterval(function () {

            renderLatest(latestIndex + 1);

        }, 5000);

    }


    function restartLatestTimer() {

        clearInterval(latestTimer);

        startLatestTimer();

    }


    /*
       FIRST LATEST
    */

    renderLatest(0);

    startLatestTimer();


    /* =====================================================
       CATEGORY CARD
    ===================================================== */

    function createSmallCard(article) {

        return `

            <article class="category-card">

                <a href="${escapeHTML(article.url)}">

                    <div class="category-card-image">

                        <img
                            src="${escapeHTML(article.image)}"
                            alt="${escapeHTML(
                                article.alt || article.title
                            )}"
                            loading="lazy"
                        >

                    </div>


                    <div class="category-card-content">

                        <div class="category-card-label">

                            ${escapeHTML(
                                categoryName(article.category)
                            )}

                        </div>


                        <h3 class="category-card-title">

                            ${escapeHTML(article.title)}

                        </h3>

                    </div>

                </a>

            </article>

        `;

    }


    /* =====================================================
       FEATURED CATEGORY
    ===================================================== */

    function createFeaturedCard(article) {

        return `

            <article class="category-featured">

                <a href="${escapeHTML(article.url)}">

                    <img
                        src="${escapeHTML(article.image)}"
                        alt="${escapeHTML(
                            article.alt || article.title
                        )}"
                        loading="lazy"
                    >


                    <div class="category-featured-content">

                        <span class="category-label">

                            ${escapeHTML(
                                categoryName(article.category)
                            )}

                        </span>


                        <h2 class="category-featured-title">

                            ${escapeHTML(article.title)}

                        </h2>

                    </div>

                </a>

            </article>

        `;

    }


    /* =====================================================
       RENDER CATEGORY
    ===================================================== */

    function renderCategory(container, categoryArticles) {

        if (!container) {
            return;
        }


        if (!categoryArticles.length) {

            container.innerHTML = "";

            return;

        }


        const featured =
            categoryArticles[0];


        const remaining =
            categoryArticles.slice(1);


        let html = `

            <div class="category-news-layout">

                ${createFeaturedCard(featured)}

                ${remaining.map(article => {

                    return createSmallCard(article);

                }).join("")}

            </div>

        `;


        container.innerHTML = html;

    }


    /* =====================================================
       AP & TS
    ===================================================== */

    const apTsArticles =
        getAptsArticles();


    /*
       Existing sliderTrack is reused.
       This avoids changing your HTML structure.
    */

    const sliderTrack =
        $("#sliderTrack");


    if (sliderTrack) {

        renderCategory(
            sliderTrack,
            apTsArticles
        );

    }


    /* =====================================================
       BUSINESS
    ===================================================== */

    const businessGrid =
        $("#businessGrid");


    if (businessGrid) {

        renderCategory(
            businessGrid,
            getCategoryArticles("business")
        );

    }


    /* =====================================================
       SPORTS
    ===================================================== */

    const sportsGrid =
        $("#sportsGrid");


    if (sportsGrid) {

        renderCategory(
            sportsGrid,
            getCategoryArticles("sports")
        );

    }


    /* =====================================================
       ENTERTAINMENT
    ===================================================== */

    const cinemaGrid =
        $("#cinemaGrid");


    if (cinemaGrid) {

        renderCategory(
            cinemaGrid,
            getEntertainmentArticles()
        );

    }


    /* =====================================================
       REMOVE OLD AP TS CAROUSEL BUTTONS
       NO AUTO SLIDER FOR AP TS
    ===================================================== */

    const sliderPrev =
        $("#sliderPrev");

    const sliderNext =
        $("#sliderNext");


    if (sliderPrev) {

        sliderPrev.style.display = "none";

    }


    if (sliderNext) {

        sliderNext.style.display = "none";

    }


    /* =====================================================
       LATEST SIDEBAR
       HIDDEN BY CSS BUT KEEP DATA
    ===================================================== */

    const latestSidebar =
        $("#latestSidebar");


    if (latestSidebar) {

        latestSidebar.innerHTML =
            latestArticles.slice(0, 10).map((article, index) => {

                return `

                    <a
                        href="${escapeHTML(article.url)}"
                        class="latest-side-item"
                    >

                        <strong>
                            ${index + 1}
                        </strong>

                        <span>
                            ${escapeHTML(article.title)}
                        </span>

                    </a>

                `;

            }).join("");

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch = function () {

        const searchBox =
            $("#searchBox");

        if (!searchBox) {
            return;
        }

        searchBox.classList.toggle("show");

        if (searchBox.classList.contains("show")) {

            const input =
                $("#searchInput");

            if (input) {
                input.focus();
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
            input.value.trim().toLowerCase();


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
                "వార్తలు కనబడలేదు."
            );

        }

    };


    /*
       Enter key search
    */

    const searchInput =
        $("#searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Enter") {

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


    /*
       Restore theme
    */

    const savedTheme =
        localStorage.getItem(
            "bs360-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );


        const button =
            $("#themeButton");


        if (button) {

            button.textContent =
                "☀️ Light";

        }

    }


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    window.toggleMobileNav = function () {

        const nav =
            $("#navLinks");

        if (!nav) {
            return;
        }

        nav.classList.toggle(
            "mobile-nav-open"
        );

    };


    /* =====================================================
       PREVENT OLD CAROUSEL JS EFFECTS
    ===================================================== */

    const newsSlider =
        $("#newsSlider");


    if (newsSlider) {

        newsSlider.style.overflow =
            "visible";

    }


    console.log(
        "BS 360 NEWS loaded:",
        articles.length,
        "articles"
    );


    console.log(
        "Latest:",
        latestArticles.length
    );


    console.log(
        "AP & TS:",
        apTsArticles.length
    );


    console.log(
        "Sports:",
        getCategoryArticles("sports").length
    );


    console.log(
        "Entertainment:",
        getEntertainmentArticles().length
    );


    console.log(
        "Business:",
        getCategoryArticles("business").length
    );

});
/* =========================================================
   BS 360 NEWS
   HOMEPAGE AUTOMATIC ARTICLE SYSTEM
   ========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    "use strict";


    /* =====================================================
       SOURCE
       ===================================================== */

    const source =
        document.querySelector("#legacyNewsSource");

    if(!source){

        console.error(
            "BS360: #legacyNewsSource not found"
        );

        return;
    }


    /* =====================================================
       GET ARTICLES
       ===================================================== */

    function getArticles(){

        const posts =
            Array.from(
                source.querySelectorAll(
                    ".news-item.post"
                )
            );

        return posts.map(function(post){

            const img =
                post.querySelector("img");

            const titleElement =
                post.querySelector(
                    ".news-content p"
                ) ||
                post.querySelector("p") ||
                post.querySelector("h3") ||
                post.querySelector("h2");

            return {

                category:
                    (
                        post.dataset.category ||
                        ""
                    )
                    .toLowerCase()
                    .trim(),

                url:
                    post.dataset.url ||
                    "#",

                image:
                    img
                        ? img.getAttribute("src")
                        : "",

                title:
                    titleElement
                        ? titleElement.textContent
                            .replace(/\s+/g," ")
                            .trim()
                        : ""

            };

        }).filter(function(article){

            return (
                article.title &&
                article.image &&
                article.url
            );

        });

    }


    const articles =
        getArticles();


    console.log(
        "BS360 total articles:",
        articles.length
    );


    /* =====================================================
       CATEGORY NAME
       ===================================================== */

    function categoryName(category){

        const names = {

            ap:
                "AP NEWS",

            ts:
                "TS NEWS",

            sports:
                "SPORTS",

            cinema:
                "ENTERTAINMENT",

            movies:
                "ENTERTAINMENT",

            business:
                "BUSINESS",

            politics:
                "POLITICS",

            news:
                "NEWS",

            lifestyle:
                "LIFESTYLE",

            agriculture:
                "AGRICULTURE",

            automobiles:
                "AUTOMOBILES",

            "human-interest":
                "NEWS"

        };

        return (
            names[category] ||
            "NEWS"
        );

    }


    /* =====================================================
       ESCAPE
       ===================================================== */

    function escapeHTML(value){

        return String(value || "")
            .replace(/&/g,"&amp;")
            .replace(/</g,"&lt;")
            .replace(/>/g,"&gt;")
            .replace(/"/g,"&quot;")
            .replace(/'/g,"&#039;");

    }


    /* =====================================================
       CATEGORY FILTER
       ===================================================== */

    const latestArticles =
        articles.filter(function(article){

            return article.category !==
                "bigboss10";

        });


    const apTsArticles =
        articles.filter(function(article){

            return (
                article.category === "ap" ||
                article.category === "ts"
            );

        });


    const sportsArticles =
        articles.filter(function(article){

            return (
                article.category === "sports"
            );

        });


    const entertainmentArticles =
        articles.filter(function(article){

            return (
                article.category === "cinema" ||
                article.category === "movies"
            );

        });


    const businessArticles =
        articles.filter(function(article){

            return (
                article.category === "business"
            );

        });


    /* =====================================================
       LATEST NEWS
       ===================================================== */

    const latestBox =
        document.querySelector("#topStory");

    let latestIndex = 0;

    let latestTimer = null;


    function renderLatest(){

        if(
            !latestBox ||
            !latestArticles.length
        ){

            return;
        }


        const article =
            latestArticles[latestIndex];


        latestBox.innerHTML = `

            <div class="latest-feature">

                <img
                    src="${escapeHTML(article.image)}"
                    alt="${escapeHTML(article.title)}"
                >

                <div class="latest-content">

                    <span class="latest-category">
                        ${escapeHTML(
                            categoryName(
                                article.category
                            )
                        )}
                    </span>

                    <h3>
                        ${escapeHTML(
                            article.title
                        )}
                    </h3>

                    <a
                        href="${escapeHTML(article.url)}"
                        class="latest-read"
                    >
                        Read More →
                    </a>

                </div>


                <div class="latest-dots">

                    ${
                        latestArticles
                            .map(function(item,index){

                                return `

                                    <button
                                        type="button"
                                        class="
                                            latest-dot
                                            ${
                                                index === latestIndex
                                                    ? "active"
                                                    : ""
                                            }
                                        "
                                        data-index="${index}"
                                    ></button>

                                `;

                            })
                            .join("")
                    }

                </div>

            </div>

        `;


        latestBox
            .querySelectorAll(".latest-dot")
            .forEach(function(dot){

                dot.addEventListener(
                    "click",
                    function(){

                        latestIndex =
                            Number(
                                this.dataset.index
                            );

                        renderLatest();

                        restartLatest();

                    }
                );

            });

    }


    function nextLatest(){

        if(
            !latestArticles.length
        ){

            return;
        }


        latestIndex++;


        if(
            latestIndex >=
            latestArticles.length
        ){

            latestIndex = 0;

        }


        renderLatest();

    }


    function restartLatest(){

        if(latestTimer){

            clearInterval(
                latestTimer
            );

        }


        if(
            latestArticles.length > 1
        ){

            latestTimer =
                setInterval(
                    nextLatest,
                    5000
                );

        }

    }


    renderLatest();

    restartLatest();


    /* =====================================================
       CATEGORY RENDERER
       ===================================================== */

    function renderCategory(
        container,
        categoryArticles
    ){

        if(!container){

            return;
        }


        if(
            !categoryArticles.length
        ){

            container.innerHTML = "";

            return;
        }


        /*
         * ARTICLE 1
         * = BIG ARTICLE
         */

        const featured =
            categoryArticles[0];


        /*
         * ARTICLE 2+
         * = SMALL 2 COLUMN CARDS
         */

        const smallArticles =
            categoryArticles.slice(1);


        let html = `

            <a
                href="${escapeHTML(featured.url)}"
                class="category-feature"
            >

                <img
                    src="${escapeHTML(featured.image)}"
                    alt="${escapeHTML(featured.title)}"
                    loading="lazy"
                >

                <div class="category-feature-content">

                    <span class="article-category">

                        ${escapeHTML(
                            categoryName(
                                featured.category
                            )
                        )}

                    </span>

                    <h3>

                        ${escapeHTML(
                            featured.title
                        )}

                    </h3>

                </div>

            </a>

        `;


        /*
         * SMALL ARTICLES
         */

        if(
            smallArticles.length
        ){

            html += `

                <div class="category-small-grid">

            `;


            smallArticles.forEach(
                function(article){

                    html += `

                        <a
                            href="${escapeHTML(
                                article.url
                            )}"
                            class="category-small-card"
                        >

                            <img
                                src="${escapeHTML(
                                    article.image
                                )}"
                                alt="${escapeHTML(
                                    article.title
                                )}"
                                loading="lazy"
                            >

                            <div
                                class="category-small-content"
                            >

                                <span
                                    class="article-category"
                                >

                                    ${escapeHTML(
                                        categoryName(
                                            article.category
                                        )
                                    )}

                                </span>

                                <h3>

                                    ${escapeHTML(
                                        article.title
                                    )}

                                </h3>

                            </div>

                        </a>

                    `;

                }
            );


            html += `</div>`;

        }


        container.innerHTML =
            html;

    }


    /* =====================================================
       AP & TS
       ===================================================== */

    renderCategory(

        document.querySelector(
            "#sliderTrack"
        ),

        apTsArticles

    );


    /* =====================================================
       SPORTS
       ===================================================== */

    renderCategory(

        document.querySelector(
            "#sportsGrid"
        ),

        sportsArticles

    );


    /* =====================================================
       ENTERTAINMENT
       ===================================================== */

    renderCategory(

        document.querySelector(
            "#cinemaGrid"
        ),

        entertainmentArticles

    );


    /* =====================================================
       BUSINESS
       ===================================================== */

    renderCategory(

        document.querySelector(
            "#businessGrid"
        ),

        businessArticles

    );


    /* =====================================================
       OLD CAROUSEL BUTTONS
       ===================================================== */

    document
        .querySelectorAll(
            ".carousel-btn"
        )
        .forEach(function(button){

            button.style.display =
                "none";

        });


    /* =====================================================
       DEBUG
       ===================================================== */

    console.log(
        "BS360 Latest:",
        latestArticles.length
    );

    console.log(
        "BS360 AP & TS:",
        apTsArticles.length
    );

    console.log(
        "BS360 Sports:",
        sportsArticles.length
    );

    console.log(
        "BS360 Entertainment:",
        entertainmentArticles.length
    );

    console.log(
        "BS360 Business:",
        businessArticles.length
    );

});
