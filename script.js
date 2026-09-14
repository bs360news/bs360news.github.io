/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   IMAGE STYLE VERSION

   Latest News:
   - ONLY Latest News auto changes
   - 5 seconds interval
   - dots + sidebar
   - title/image/category/link change together

   AP & TS:
   - article cards
   - manual slider
   - NO automatic 5-second change

   Movies:
   - 2 column mobile / 4 column desktop

   Sports:
   - 2 column mobile / 4 column desktop

   Business:
   - 2 column mobile / 4 column desktop
========================================================= */

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
       GET ALL ORIGINAL ARTICLES
    ===================================================== */

    const source = $("#legacyNewsSource");

    if(!source){
        console.warn("legacyNewsSource not found.");
        return;
    }

    const articles = $$(".news-item.post", source).map((article, index) => {

        const image = $("img", article);
        const title = $(".news-content p", article);

        return {
            index: index,
            category: article.dataset.category || "news",
            url: article.dataset.url || "#",
            image: image ? image.getAttribute("src") : "",
            alt: image ? image.getAttribute("alt") : "",
            title: title ? title.textContent.trim() : ""
        };

    }).filter(item => item.image && item.title);


    /* =====================================================
       CATEGORY HELPERS
    ===================================================== */

    function categoryName(category){

        const names = {

            business: "BUSINESS",

            sports: "SPORTS",

            cinema: "MOVIES",

            movies: "MOVIES",

            bigboss10: "BIGG BOSS",

            ap: "AP NEWS",

            ts: "TS NEWS",

            lifestyle: "LIFESTYLE",

            agriculture: "AGRICULTURE",

            automobiles: "AUTOMOBILES",

            "human-interest": "NEWS",

            politics: "POLITICS",

            news: "TOP NEWS"

        };

        return names[category] || "NEWS";
    }


    /* =====================================================
       ARTICLE LINK
    ===================================================== */

    function articleLink(item){

        return item.url && item.url !== "#"
            ? item.url
            : "#";

    }


    /* =====================================================
       CREATE CARD
    ===================================================== */

    function createCategoryCard(item){

        const card = document.createElement("a");

        card.className = "category-card";

        card.href = articleLink(item);

        card.innerHTML = `

            <div class="category-card-image">

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.alt || item.title)}"
                    loading="lazy"
                >

                <span class="category-label">
                    ${categoryName(item.category)}
                </span>

            </div>

            <div class="category-card-body">

                <h3>
                    ${escapeHTML(item.title)}
                </h3>

            </div>

        `;

        return card;
    }


    /* =====================================================
       HTML ESCAPE
    ===================================================== */

    function escapeHTML(text){

        const div = document.createElement("div");

        div.textContent = text || "";

        return div.innerHTML;

    }


    /* =====================================================
       LATEST NEWS
       5 SECOND AUTO CHANGE
    ===================================================== */

    const latestHero = $("#topStory");
    const latestSidebar = $("#latestSidebar");

    let latestArticles = [];

    let latestIndex = 0;

    let latestTimer = null;


    if(latestHero){

        /*
           Bigg Boss articles are kept separate.
           Latest section gets normal news.
        */

        latestArticles = articles.filter(item =>
            item.category !== "bigboss10"
        );


        /*
           If normal articles are not enough,
           use everything except Bigg Boss.
        */

        if(latestArticles.length === 0){
            latestArticles = articles;
        }


        function createLatestHero(){

            latestHero.innerHTML = "";

            const item = latestArticles[latestIndex];

            if(!item) return;


            const hero = document.createElement("a");

            hero.className = "latest-hero";

            hero.href = articleLink(item);

            hero.innerHTML = `

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

            `;


            latestHero.appendChild(hero);


            /*
               DOTS
            */

            const dots = $(".latest-dots", hero);

            /*
               Mobile screen lo too many dots kanipinchakunda
               first 12 articles only.
            */

            const maxDots = Math.min(latestArticles.length, 12);

            for(let i = 0; i < maxDots; i++){

                const dot = document.createElement("button");

                dot.type = "button";

                dot.className =
                    "latest-dot" +
                    (i === latestIndex ? " active" : "");

                dot.setAttribute(
                    "aria-label",
                    "Latest news " + (i + 1)
                );


                dot.addEventListener("click", function(event){

                    event.preventDefault();

                    event.stopPropagation();

                    latestIndex = i;

                    showLatest();

                    restartLatestTimer();

                });


                dots.appendChild(dot);

            }

        }


        function createLatestSidebar(){

            if(!latestSidebar) return;

            latestSidebar.innerHTML = "";


            /*
               Sidebar lo latest first 8
            */

            const sideArticles =
                latestArticles.slice(0, 8);


            sideArticles.forEach((item, i) => {

                const side = document.createElement("div");

                side.className =
                    "latest-side-item" +
                    (i === latestIndex ? " active" : "");


                side.innerHTML = `

                    <span class="latest-side-number">
                        ${i + 1}
                    </span>

                    <span class="latest-side-title">
                        ${escapeHTML(item.title)}
                    </span>

                `;


                side.addEventListener("click", function(){

                    latestIndex = i;

                    showLatest();

                    restartLatestTimer();

                });


                latestSidebar.appendChild(side);

            });

        }


        function showLatest(){

            if(!latestArticles.length) return;

            if(latestIndex >= latestArticles.length){
                latestIndex = 0;
            }

            createLatestHero();

            createLatestSidebar();

        }


        function nextLatest(){

            latestIndex++;

            if(latestIndex >= latestArticles.length){
                latestIndex = 0;
            }

            showLatest();

        }


        function startLatestTimer(){

            stopLatestTimer();

            /*
               EXACTLY 5 SECONDS
            */

            latestTimer = setInterval(
                nextLatest,
                5000
            );

        }


        function stopLatestTimer(){

            if(latestTimer){

                clearInterval(latestTimer);

                latestTimer = null;

            }

        }


        function restartLatestTimer(){

            startLatestTimer();

        }


        /*
           Initial
        */

        showLatest();

        startLatestTimer();


        /*
           Pause when mouse is over hero on desktop.
           Mobile lo normal 5-sec auto scroll continue.
        */

        latestHero.addEventListener(
            "mouseenter",
            stopLatestTimer
        );

        latestHero.addEventListener(
            "mouseleave",
            startLatestTimer
        );

    }


    /* =====================================================
       BIGG BOSS
       Separate from Latest News
    ===================================================== */

    const bigbossTrack = $("#bigbossTrack");

    if(bigbossTrack){

        const bigbossArticles =
            articles.filter(item =>
                item.category === "bigboss10"
            );

        bigbossTrack.innerHTML = "";

        bigbossArticles.forEach(item => {

            const card = document.createElement("a");

            card.className = "bigboss-card";

            card.href = articleLink(item);

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

        });


        setupTrackSlider({

            track: bigbossTrack,

            prev: $(".bigboss-prev"),

            next: $(".bigboss-next"),

            desktopVisible: 4,

            tabletVisible: 3,

            mobileVisible: 2

        });

    }


    /* =====================================================
       AP & TS
       BOTH AP + TS ARTICLES
    ===================================================== */

    const sliderTrack = $("#sliderTrack");

    if(sliderTrack){

        const apArticles =
            articles.filter(item =>
                item.category === "ap" ||
                item.category === "ts"
            );


        sliderTrack.innerHTML = "";


        apArticles.forEach(item => {

            const card = document.createElement("a");

            card.className = "apts-card";

            card.href = articleLink(item);

            card.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${escapeHTML(item.alt || item.title)}"
                    loading="lazy"
                >

                <div class="apts-content">

                    <span>
                        ${categoryName(item.category)}
                    </span>

                    <p>
                        ${escapeHTML(item.title)}
                    </p>

                </div>

            `;

            sliderTrack.appendChild(card);

        });


        /*
           AP&TS is manually scrollable.
           No 5 second automatic change.
        */

        setupTrackSlider({

            track: sliderTrack,

            prev: $("#sliderPrev"),

            next: $("#sliderNext"),

            desktopVisible: 1,

            tabletVisible: 1,

            mobileVisible: 1

        });

    }


    /* =====================================================
       MOVIES
    ===================================================== */

    const cinemaGrid = $("#cinemaGrid");

    if(cinemaGrid){

        const movies =
            articles.filter(item =>
                item.category === "cinema" ||
                item.category === "movies"
            );


        cinemaGrid.innerHTML = "";

        movies.forEach(item => {

            cinemaGrid.appendChild(
                createCategoryCard(item)
            );

        });

    }


    /* =====================================================
       SPORTS
    ===================================================== */

    const sportsGrid = $("#sportsGrid");

    if(sportsGrid){

        const sports =
            articles.filter(item =>
                item.category === "sports"
            );


        sportsGrid.innerHTML = "";

        sports.forEach(item => {

            sportsGrid.appendChild(
                createCategoryCard(item)
            );

        });

    }


    /* =====================================================
       BUSINESS SECTION
       HTML lo section lekapothe JS create chestundi
    ===================================================== */

    createBusinessSection();


    function createBusinessSection(){

        const businessArticles =
            articles.filter(item =>
                item.category === "business"
            );


        if(!businessArticles.length) return;


        /*
           Already business section unte use it.
        */

        let section =
            $(".business-section");


        /*
           HTML lo lekapothe create
        */

        if(!section){

            section = document.createElement("section");

            section.className =
                "category-section business-section";

            section.id =
                "businessSection";


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


            /*
               Sports section taruvata Business
            */

            const sportsSection =
                $("#sportsSection");


            if(sportsSection){

                sportsSection.after(section);

            }else{

                const portal =
                    $(".portal-wrap");

                if(portal){
                    portal.appendChild(section);
                }

            }

        }


        const grid =
            $("#businessGrid", section);


        if(!grid) return;


        grid.innerHTML = "";


        businessArticles.forEach(item => {

            grid.appendChild(
                createCategoryCard(item)
            );

        });

    }


    /* =====================================================
       MOST READ
    ===================================================== */

    const mostReadList =
        $("#mostReadList");


    if(mostReadList){

        /*
           Most read:
           normal news first
           Bigg Boss separate
           First 6
        */

        const mostRead =
            articles
                .filter(item =>
                    item.category !== "bigboss10"
                )
                .slice(0, 6);


        mostReadList.innerHTML = "";


        mostRead.forEach((item, index) => {

            const card =
                document.createElement("a");


            card.className =
                "most-read-card";


            card.href =
                articleLink(item);


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


            mostReadList.appendChild(card);

        });

    }


    /* =====================================================
       GENERIC HORIZONTAL SLIDER
    ===================================================== */

    function setupTrackSlider(options){

        const track =
            options.track;

        const prev =
            options.prev;

        const next =
            options.next;


        if(!track) return;


        let position = 0;


        function getVisible(){

            const width =
                window.innerWidth;


            if(width <= 600){

                return options.mobileVisible;

            }

            if(width <= 900){

                return options.tabletVisible;

            }

            return options.desktopVisible;

        }


        function getCards(){

            return Array.from(
                track.children
            );

        }


        function getStep(){

            const cards =
                getCards();

            if(!cards.length) return 0;


            const card =
                cards[0];


            const gap =
                parseFloat(
                    getComputedStyle(track).gap
                ) || 0;


            return card.getBoundingClientRect().width + gap;

        }


        function update(){

            const cards =
                getCards();


            if(!cards.length) return;


            const visible =
                getVisible();


            const maxPosition =
                Math.max(
                    0,
                    cards.length - visible
                );


            if(position > maxPosition){
                position = maxPosition;
            }


            if(position < 0){
                position = 0;
            }


            track.style.transform =
                "translateX(-" +
                (position * getStep()) +
                "px)";

        }


        if(prev){

            prev.addEventListener(
                "click",
                function(){

                    position--;

                    update();

                }
            );

        }


        if(next){

            next.addEventListener(
                "click",
                function(){

                    position++;

                    update();

                }
            );

        }


        window.addEventListener(
            "resize",
            update
        );


        update();

    }


    /* =====================================================
       SEARCH
    ===================================================== */

    window.toggleSearch = function(){

        const box =
            $("#searchBox");

        if(!box) return;

        box.classList.toggle("active");

        if(box.classList.contains("active")){

            const input =
                $("#searchInput");

            if(input){
                setTimeout(
                    () => input.focus(),
                    100
                );
            }

        }

    };


    window.searchNews = function(){

        const input =
            $("#searchInput");

        if(!input) return;


        const value =
            input.value.trim().toLowerCase();


        if(!value) return;


        const matching =
            articles.filter(item =>
                item.title
                    .toLowerCase()
                    .includes(value)
            );


        if(!matching.length){

            alert(
                "వార్తలు ఏవీ కనిపించలేదు."
            );

            return;

        }


        /*
           First matching article open
        */

        window.location.href =
            matching[0].url;

    };


    /* =====================================================
       ENTER KEY SEARCH
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

    window.toggleTheme = function(){

        document.body.classList.toggle(
            "dark-mode"
        );


        const button =
            $("#themeButton");


        if(!button) return;


        if(
            document.body.classList.contains(
                "dark-mode"
            )
        ){

            button.textContent =
                "☀️ Light";

            localStorage.setItem(
                "bs360-theme",
                "dark"
            );

        }else{

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


    if(savedTheme === "dark"){

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

    window.toggleMobileNav = function(){

        const nav =
            $("#navLinks");


        if(!nav) return;


        nav.classList.toggle(
            "mobile-open"
        );

    };


    /* =====================================================
       TOP HEADLINES SIMPLE AUTO TEXT
       Does NOT affect Latest News
    ===================================================== */

    const headline =
        $(".headlines-text");


    const headlineTexts = [

        "తెలుగు రాష్ట్రాలు, సినిమా, క్రికెట్, స్పోర్ట్స్, బిజినెస్ తాజా అప్‌డేట్స్",

        "AP & TSలో తాజా రాజకీయ, ప్రజా సమస్యల వార్తలు",

        "సినిమా ప్రపంచంలో తాజా అప్‌డేట్స్",

        "క్రికెట్, స్పోర్ట్స్‌లో బ్రేకింగ్ న్యూస్",

        "బిజినెస్, స్టాక్ మార్కెట్ తాజా వార్తలు"

    ];


    if(headline){

        let headlineIndex = 0;


        setInterval(function(){

            headlineIndex++;

            if(
                headlineIndex >=
                headlineTexts.length
            ){

                headlineIndex = 0;

            }


            headline.textContent =
                headlineTexts[headlineIndex];

        }, 6000);

    }


});
