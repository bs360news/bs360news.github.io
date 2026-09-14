document.addEventListener("DOMContentLoaded", function(){

    "use strict";


    /* =====================================================
       HELPERS
    ===================================================== */

    const $ = (selector, parent = document) =>
        parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        Array.from(parent.querySelectorAll(selector));


    /* =====================================================
       READ ORIGINAL ARTICLES
    ===================================================== */

    const source = $("#legacyNewsSource");

    if(!source) return;


    const articles = $$(".news-item.post", source)
        .map(function(article){

            const img = $("img", article);
            const title = $(".news-content p", article);

            return {

                category:
                    article.dataset.category || "news",

                url:
                    article.dataset.url || "#",

                image:
                    img ? img.getAttribute("src") : "",

                alt:
                    img ? img.getAttribute("alt") : "",

                title:
                    title
                        ? title.textContent.trim()
                        : ""

            };

        })
        .filter(function(item){

            return item.image && item.title;

        });


    /* =====================================================
       CATEGORY NAME
    ===================================================== */

    function categoryName(category){

        const names = {

            ap: "AP NEWS",

            ts: "TS NEWS",

            sports: "SPORTS",

            cinema: "ENTERTAINMENT",

            movies: "ENTERTAINMENT",

            business: "BUSINESS",

            bigboss10: "BIGG BOSS",

            lifestyle: "LIFESTYLE",

            politics: "POLITICS",

            agriculture: "AGRICULTURE",

            automobiles: "AUTOMOBILES",

            "human-interest": "NEWS",

            news: "NEWS"

        };

        return names[category] || "NEWS";

    }


    /* =====================================================
       ESCAPE
    ===================================================== */

    function escapeHTML(text){

        const div =
            document.createElement("div");

        div.textContent =
            text || "";

        return div.innerHTML;

    }


    /* =====================================================
       GET CATEGORY ARTICLES
    ===================================================== */

    function getCategory(category){

        return articles.filter(function(item){

            return item.category === category;

        });

    }


    /* =====================================================
       LATEST NEWS
       ONLY THIS AUTO CHANGES
       EVERY 5 SECONDS
    ===================================================== */

    const latestHero =
        $("#topStory");

    const latestSidebar =
        $("#latestSidebar");


    let latestArticles =
        articles.filter(function(item){

            return item.category !== "bigboss10";

        });


    let latestIndex = 0;

    let latestTimer = null;


    function showLatest(){

        if(!latestHero || !latestArticles.length)
            return;


        const item =
            latestArticles[latestIndex];


        latestHero.innerHTML = `

            <a
                class="latest-hero"
                href="${item.url}"
            >

                <img
                    class="latest-hero-image"
                    src="${item.image}"
                    alt="${escapeHTML(item.alt || item.title)}"
                >

                <div class="latest-hero-content">

                    <span class="latest-category">
                        ${categoryName(item.category)}
                    </span>

                    <h1 class="latest-title">
                        ${escapeHTML(item.title)}
                    </h1>

                    <span class="latest-read">
                        Read More →
                    </span>

                </div>

                <div class="latest-dots"></div>

            </a>

        `;


        /* -----------------------------------------------
           DOTS
        ------------------------------------------------ */

        const dots =
            $(".latest-dots", latestHero);


        const dotCount =
            Math.min(latestArticles.length, 10);


        for(let i = 0; i < dotCount; i++){

            const dot =
                document.createElement("button");

            dot.type = "button";

            dot.className =
                "latest-dot" +
                (
                    i === latestIndex
                    ? " active"
                    : ""
                );


            dot.addEventListener(
                "click",
                function(event){

                    event.preventDefault();
                    event.stopPropagation();

                    latestIndex = i;

                    showLatest();

                    restartLatest();

                }
            );


            dots.appendChild(dot);

        }


        /* -----------------------------------------------
           OLD SIDEBAR HIDDEN BUT KEEP DATA UPDATED
        ------------------------------------------------ */

        if(latestSidebar){

            latestSidebar.innerHTML = "";

        }

    }


    function nextLatest(){

        latestIndex++;

        if(
            latestIndex >=
            latestArticles.length
        ){

            latestIndex = 0;

        }

        showLatest();

    }


    function startLatest(){

        clearInterval(latestTimer);

        latestTimer =
            setInterval(
                nextLatest,
                5000
            );

    }


    function restartLatest(){

        clearInterval(latestTimer);

        startLatest();

    }


    showLatest();

    startLatest();


    /* =====================================================
       GENERATE SECTION
       1 BIG + 4 SMALL
    ===================================================== */

    function createNewsSection(
        section,
        items
    ){

        if(!section || !items.length)
            return;


        const oldCarousel =
            $(".horizontal-carousel", section);


        const oldCarousel2 =
            $(".carousel-wrap", section);


        let container =
            oldCarousel ||
            oldCarousel2;


        if(!container)
            return;


        /*
           Remove old generated content
        */

        container.innerHTML = "";

        container.className =
            "section-news-layout";


        /* -----------------------------------------------
           FEATURE
        ------------------------------------------------ */

        const feature =
            items[0];


        const featureLink =
            document.createElement("a");


        featureLink.className =
            "section-feature";

        featureLink.href =
            feature.url;


        featureLink.innerHTML = `

            <img
                class="section-feature-image"
                src="${feature.image}"
                alt="${escapeHTML(feature.alt || feature.title)}"
                loading="lazy"
            >

            <div class="section-feature-content">

                <span class="category-label">
                    ${categoryName(feature.category)}
                </span>

                <h3 class="section-feature-title">
                    ${escapeHTML(feature.title)}
                </h3>

            </div>

        `;


        /* -----------------------------------------------
           SMALL GRID
        ------------------------------------------------ */

        const smallGrid =
            document.createElement("div");


        smallGrid.className =
            "section-small-grid";


        /*
           Next 4 articles
        */

        items.slice(1,5)
            .forEach(function(item){

                const card =
                    document.createElement("a");


                card.className =
                    "section-small-card";


                card.href =
                    item.url;


                card.innerHTML = `

                    <img
                        class="section-small-image"
                        src="${item.image}"
                        alt="${escapeHTML(item.alt || item.title)}"
                        loading="lazy"
                    >

                    <div class="section-small-body">

                        <span class="section-small-category">
                            ${categoryName(item.category)}
                        </span>

                        <p class="section-small-title">
                            ${escapeHTML(item.title)}
                        </p>

                    </div>

                `;


                smallGrid.appendChild(card);

            });


        container.appendChild(featureLink);

        container.appendChild(smallGrid);

    }


    /* =====================================================
       AP & TS
       AP + TS COMBINED
    ===================================================== */

    const apTsSection =
        $(".slider-section");


    const apTsArticles =
        articles.filter(function(item){

            return (
                item.category === "ap" ||
                item.category === "ts"
            );

        });


    createNewsSection(
        apTsSection,
        apTsArticles
    );


    /* =====================================================
       MOVIES / ENTERTAINMENT
    ===================================================== */

    const cinemaSection =
        $("#cinemaSection");


    const cinemaArticles =
        articles.filter(function(item){

            return (
                item.category === "cinema" ||
                item.category === "movies"
            );

        });


    createNewsSection(
        cinemaSection,
        cinemaArticles
    );


    /* =====================================================
       SPORTS
    ===================================================== */

    const sportsSection =
        $("#sportsSection");


    const sportsArticles =
        getCategory("sports");


    createNewsSection(
        sportsSection,
        sportsArticles
    );


    /* =====================================================
       BUSINESS SECTION
       CREATE BECAUSE YOUR HTML DOES NOT HAVE IT
    ===================================================== */

    const businessArticles =
        getCategory("business");


    let businessSection =
        $("#businessSection");


    if(
        businessArticles.length &&
        !businessSection
    ){

        businessSection =
            document.createElement("section");


        businessSection.id =
            "businessSection";


        businessSection.className =
            "category-section business-section";


        businessSection.innerHTML = `

            <div class="section-title-row">

                <h2>
                    💼 Business
                </h2>

                <a
                    href="business.html"
                    class="view-all"
                >
                    SEE MORE →
                </a>

            </div>

            <div
                class="horizontal-carousel"
            ></div>

        `;


        /*
           Sports taruvata Business
        */

        if(sportsSection){

            sportsSection.after(
                businessSection
            );

        }

    }


    if(businessSection){

        createNewsSection(
            businessSection,
            businessArticles
        );

    }


    /* =====================================================
       ORDER
       AP&TS
       SPORTS
       ENTERTAINMENT
       BUSINESS
    ===================================================== */

    const portal =
        $(".portal-wrap");


    const ad =
        $(".ad-space");


    if(
        portal &&
        apTsSection &&
        sportsSection &&
        cinemaSection &&
        businessSection
    ){

        /*
           Keep Bigg Boss separate,
           then AP&TS,
           Sports,
           Entertainment,
           Business.
        */

        const bigboss =
            $("#bigboss10Section");


        if(bigboss){

            portal.appendChild(
                bigboss
            );

        }


        portal.appendChild(
            apTsSection
        );


        portal.appendChild(
            sportsSection
        );


        portal.appendChild(
            cinemaSection
        );


        portal.appendChild(
            businessSection
        );


        /*
           Ad last
        */

        if(ad){

            portal.appendChild(ad);

        }

    }


    /* =====================================================
       BIGG BOSS
       SEPARATE CAROUSEL
    ===================================================== */

    const bigbossTrack =
        $("#bigbossTrack");


    if(bigbossTrack){

        const bigbossArticles =
            getCategory("bigboss10");


        bigbossTrack.innerHTML = "";


        bigbossArticles.forEach(
            function(item){

                const card =
                    document.createElement("a");


                card.className =
                    "bigboss-card";


                card.href =
                    item.url;


                card.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.alt || item.title)}"
                        loading="lazy"
                    >

                    <div class="bigboss-card-content">

                        <span>
                            BIGG BOSS
                        </span>

                        <p>
                            ${escapeHTML(item.title)}
                        </p>

                    </div>

                `;


                bigbossTrack.appendChild(card);

            }
        );


        setupBigBoss();

    }


    /* =====================================================
       BIGG BOSS SLIDER
    ===================================================== */

    function setupBigBoss(){

        const track =
            $("#bigbossTrack");


        const prev =
            $(".bigboss-prev");


        const next =
            $(".bigboss-next");


        if(!track) return;


        let position = 0;


        function visible(){

            if(window.innerWidth <= 600)
                return 2;

            if(window.innerWidth <= 900)
                return 3;

            return 4;

        }


        function update(){

            const cards =
                Array.from(
                    track.children
                );


            if(!cards.length)
                return;


            const gap =
                parseFloat(
                    getComputedStyle(track).gap
                ) || 0;


            const step =
                cards[0].getBoundingClientRect().width +
                gap;


            const max =
                Math.max(
                    0,
                    cards.length - visible()
                );


            if(position < 0)
                position = 0;


            if(position > max)
                position = max;


            track.style.transform =
                "translateX(-" +
                position * step +
                "px)";

        }


        if(prev){

            prev.onclick =
                function(){

                    position--;

                    update();

                };

        }


        if(next){

            next.onclick =
                function(){

                    position++;

                    update();

                };

        }


        window.addEventListener(
            "resize",
            update
        );


        update();

    }


    /* =====================================================
       MOST READ
    ===================================================== */

    const mostRead =
        $("#mostReadList");


    if(mostRead){

        const items =
            latestArticles.slice(0,6);


        mostRead.innerHTML = "";


        items.forEach(
            function(item,index){

                const card =
                    document.createElement("a");


                card.className =
                    "most-read-card";


                card.href =
                    item.url;


                card.innerHTML = `

                    <span class="most-read-rank">
                        ${index + 1}
                    </span>

                    <img
                        src="${item.image}"
                        alt="${escapeHTML(item.alt || item.title)}"
                        loading="lazy"
                    >

                    <span class="most-read-title">
                        ${escapeHTML(item.title)}
                    </span>

                `;


                mostRead.appendChild(card);

            }
        );

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch =
        function(){

            const box =
                $("#searchBox");


            if(box){

                box.classList.toggle(
                    "active"
                );

            }

        };


    window.searchNews =
        function(){

            const input =
                $("#searchInput");


            if(!input)
                return;


            const query =
                input.value
                    .trim()
                    .toLowerCase();


            if(!query)
                return;


            const result =
                articles.find(
                    function(item){

                        return item.title
                            .toLowerCase()
                            .includes(query);

                    }
                );


            if(result){

                window.location.href =
                    result.url;

            }else{

                alert(
                    "వార్తలు ఏవీ కనిపించలేదు."
                );

            }

        };


    /* =====================================================
       SEARCH ENTER
    ===================================================== */

    const searchInput =
        $("#searchInput");


    if(searchInput){

        searchInput.addEventListener(
            "keydown",
            function(event){

                if(event.key === "Enter"){

                    searchNews();

                }

            }
        );

    }


    /* =====================================================
       THEME
    ===================================================== */

    window.toggleTheme =
        function(){

            document.body.classList.toggle(
                "dark-mode"
            );


            const button =
                $("#themeButton");


            if(
                document.body.classList.contains(
                    "dark-mode"
                )
            ){

                if(button)
                    button.textContent =
                        "☀️ Light";

                localStorage.setItem(
                    "bs360-theme",
                    "dark"
                );

            }else{

                if(button)
                    button.textContent =
                        "🌙 Dark";

                localStorage.setItem(
                    "bs360-theme",
                    "light"
                );

            }

        };


    if(
        localStorage.getItem(
            "bs360-theme"
        ) === "dark"
    ){

        document.body.classList.add(
            "dark-mode"
        );


        const button =
            $("#themeButton");


        if(button){

            button.textContent =
                "☀️ Light";

        }

    }


    /* =====================================================
       MOBILE NAV
    ===================================================== */

    window.toggleMobileNav =
        function(){

            const nav =
                $("#navLinks");


            if(nav){

                nav.classList.toggle(
                    "mobile-open"
                );

            }

        };


});
