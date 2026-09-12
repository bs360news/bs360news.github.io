/* =========================================================
   BS 360 NEWS - HOMEPAGE JAVASCRIPT
   CLEAN HOMEPAGE CSS MATCHED VERSION
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


    function escapeHTML(value) {

        const div = document.createElement("div");

        div.textContent = value || "";

        return div.innerHTML;
    }


    /* =====================================================
       LEGACY NEWS SOURCE
       ===================================================== */

    const legacySource =
        $("#legacyNewsSource");


    if (!legacySource) {

        console.error(
            "BS360: #legacyNewsSource not found."
        );

        return;
    }


    /* =====================================================
       READ ALL ORIGINAL ARTICLES
       ===================================================== */

    let articles =
        $$(".news-item.post", legacySource)
        .map(function (article) {

            const image =
                $("img", article);


            const titleElement =
                $(".news-content p", article) ||
                $(".news-content h3", article) ||
                $("p", article) ||
                $("h3", article);


            return {

                element: article,

                title:
                    titleElement
                        ? titleElement.textContent.trim()
                        : (
                            image
                                ? image.alt
                                : "Latest News"
                        ),

                image:
                    image
                        ? image.getAttribute("src") || ""
                        : "",

                url:
                    article.getAttribute("data-url") ||
                    article.getAttribute("href") ||
                    "#",

                category:
                    (
                        article.getAttribute(
                            "data-category"
                        ) || ""
                    )
                    .toLowerCase()
                    .trim()
            };

        });


    /* =====================================================
       REMOVE DUPLICATES
       ===================================================== */

    const seen =
        new Set();


    articles =
        articles.filter(function (article) {

            const key =
                article.url !== "#"
                    ? article.url
                    : article.title;


            if (seen.has(key)) {

                return false;
            }


            seen.add(key);

            return true;

        });


    /* =====================================================
       CATEGORY TEXT
       ===================================================== */

    function articleText(article) {

        return (
            article.category +
            " " +
            article.title
        ).toLowerCase();

    }


    /* =====================================================
       BIGG BOSS
       ===================================================== */

    function isBigBoss(article) {

        const text =
            articleText(article);


        return (
            text.includes("bigboss") ||
            text.includes("big boss") ||
            text.includes("బిగ్‌బాస్") ||
            text.includes("బిగ్ బాస్")
        );
    }


    /* =====================================================
       SPORTS
       ===================================================== */

    function isSports(article) {

        const text =
            articleText(article);


        return (

            /* Category */
            text.includes("sports") ||
            text.includes("sport") ||
            text.includes("cricket") ||

            /* Cricket / Sports keywords */
            text.includes("ipl") ||
            text.includes("bcci") ||
            text.includes("world cup") ||
            text.includes("afghanistan") ||
            text.includes("australia") ||
            text.includes("bumrah") ||
            text.includes("hardik") ||
            text.includes("dhoni") ||
            text.includes("rohit") ||
            text.includes("tilak") ||
            text.includes("pakistan") ||
            text.includes("hong kong") ||

            /* Telugu */
            text.includes("క్రికెట్") ||
            text.includes("క్రికెటర్") ||
            text.includes("మ్యాచ్") ||
            text.includes("టీ20") ||
            text.includes("టెస్ట్") ||
            text.includes("వరల్డ్ కప్") ||
            text.includes("బీసీసీఐ") ||
            text.includes("బుమ్రా") ||
            text.includes("హార్దిక్") ||
            text.includes("ధోనీ") ||
            text.includes("రోహిత్ శర్మ") ||
            text.includes("తిలక్ వర్మ")
        );
    }


    /* =====================================================
       MOVIES
       ===================================================== */

    function isMovies(article) {

        const text =
            articleText(article);


        return (

            text.includes("movies") ||
            text.includes("movie") ||
            text.includes("cinema") ||
            text.includes("entertainment") ||

            /* Telugu */
            text.includes("సినిమా") ||
            text.includes("హీరో") ||
            text.includes("హీరోయిన్") ||
            text.includes("నటుడు") ||
            text.includes("నటి") ||
            text.includes("షూటింగ్") ||
            text.includes("థియేటర్") ||
            text.includes("ట్రైలర్") ||
            text.includes("కల్కి") ||
            text.includes("సర్దార్") ||
            text.includes("తమన్నా") ||
            text.includes("సిద్ధార్థ్") ||
            text.includes("హనుమాన్")
        );
    }


    /* =====================================================
       BUSINESS
       ===================================================== */

    function isBusiness(article) {

        const text =
            articleText(article);


        return (

            text.includes("business") ||
            text.includes("stock") ||
            text.includes("finance") ||
            text.includes("economy") ||
            text.includes("gold") ||
            text.includes("market") ||

            /* Telugu */
            text.includes("బిజినెస్") ||
            text.includes("స్టాక్ మార్కెట్") ||
            text.includes("మార్కెట్") ||
            text.includes("ఆర్థిక") ||
            text.includes("రేటింగ్") ||
            text.includes("ఆర్బీఐ") ||
            text.includes("ఆర్‌బీఐ") ||
            text.includes("నిఫ్టీ") ||
            text.includes("సెన్సెక్స్")
        );
    }


    /* =====================================================
       AP & TS
       ===================================================== */

    function isAPTS(article) {

        const category =
            article.category;


        const title =
            article.title.toLowerCase();


        if (

            category === "ap" ||
            category === "ts" ||
            category.includes("andhra") ||
            category.includes("telangana")

        ) {

            return true;
        }


        const keywords = [

            "చంద్రబాబు",
            "పవన్ కల్యాణ్",
            "పవన్ కళ్యాణ్",
            "కేటీఆర్",
            "కె.టి.ఆర్",
            "హరీశ్ రావు",
            "హరీష్ రావు",
            "రేవంత్ రెడ్డి",
            "కొండా సురేఖ",
            "తెలంగాణ",
            "ఆంధ్రప్రదేశ్",
            "అసెంబ్లీ",
            "బీఆర్ఎస్",
            "బీఆర్‌ఎస్",
            "కాంగ్రెస్",
            "జనసేన",
            "తిరుమల",
            "లడ్డు",
            "కలెక్టర్ల",
            "కలెక్టర్ల కాన్ఫరెన్స్",
            "ఏపీ",
            "టీఎస్"
        ];


        return keywords.some(function (word) {

            return title.includes(
                word.toLowerCase()
            );

        });
    }


    /* =====================================================
       LATEST NEWS
       
       Bigg Boss
       Sports
       Movies
       AP & TS
       Business

       ఇవన్నీ Latest నుంచి బయటకు వెళ్తాయి.
       ===================================================== */

    function isLatest(article) {

        return (

            !isBigBoss(article) &&
            !isSports(article) &&
            !isMovies(article) &&
            !isAPTS(article) &&
            !isBusiness(article)

        );
    }


    /* =====================================================
       SLIDER CARD
       ===================================================== */

    function createSliderCard(article) {

        const card =
            document.createElement("a");


        card.className =
            "slider-card";


        card.href =
            article.url || "#";


        card.innerHTML = `

            <img
                src="${escapeHTML(article.image)}"
                alt="${escapeHTML(article.title)}"
                loading="lazy"
            >

            <div class="slider-content">

                <h3>
                    ${escapeHTML(article.title)}
                </h3>

            </div>
        `;


        return card;
    }


    /* =====================================================
       BIGG BOSS CARD
       ===================================================== */

    function createBigBossCard(article) {

        const card =
            document.createElement("a");


        card.className =
            "bigboss-card";


        card.href =
            article.url || "#";


        card.innerHTML = `

            <img
                src="${escapeHTML(article.image)}"
                alt="${escapeHTML(article.title)}"
                loading="lazy"
            >

            <div class="bigboss-content">

                <h3>
                    ${escapeHTML(article.title)}
                </h3>

            </div>
        `;


        return card;
    }


    /* =====================================================
       CATEGORY CARD
       Movies / Sports
       ===================================================== */

    function createCategoryCard(article) {

        const card =
            document.createElement("a");


        card.className =
            "category-card";


        card.href =
            article.url || "#";


        card.innerHTML = `

            <img
                src="${escapeHTML(article.image)}"
                alt="${escapeHTML(article.title)}"
                loading="lazy"
            >

            <div class="category-content">

                <h3>
                    ${escapeHTML(article.title)}
                </h3>

            </div>
        `;


        return card;
    }


    /* =====================================================
       ALL NEWS CARD
       ===================================================== */

    function createAllNewsCard(article) {

        const card =
            document.createElement("a");


        card.className =
            "all-news-card";


        card.href =
            article.url || "#";


        card.innerHTML = `

            <img
                src="${escapeHTML(article.image)}"
                alt="${escapeHTML(article.title)}"
                loading="lazy"
            >

            <div class="all-news-card-content">

                <h3 class="all-news-card-title">
                    ${escapeHTML(article.title)}
                </h3>

            </div>
        `;


        return card;
    }


    /* =====================================================
       LATEST NEWS
       
       1 HERO
       +
       9 SMALL ARTICLES
       ===================================================== */

    function renderLatestNews() {

        const section =
            $(".top-story-section");


        if (!section) {

            console.warn(
                "BS360: .top-story-section not found."
            );

            return;
        }


        const latestArticles =
            articles
                .filter(isLatest)
                .slice(0, 10);


        if (!latestArticles.length) {
            return;
        }


        let grid =
            $(".top-story-grid", section);


        let sidebar =
            $(".latest-sidebar", section);


        let heroWrap =
            $(".hero-wrap", section);


        if (!grid) {

            grid =
                document.createElement("div");

            grid.className =
                "top-story-grid";

            section.appendChild(grid);
        }


        if (!sidebar) {

            sidebar =
                document.createElement("aside");

            sidebar.className =
                "latest-sidebar";

            grid.appendChild(sidebar);
        }


        if (!heroWrap) {

            heroWrap =
                document.createElement("div");

            heroWrap.className =
                "hero-wrap";

            grid.appendChild(heroWrap);
        }


        /* SIDEBAR */

        sidebar.innerHTML = `

            <div class="sidebar-heading">
                📰 తాజా వార్తలు
            </div>

            <div class="sidebar-list"></div>
        `;


        const sidebarList =
            $(".sidebar-list", sidebar);


        latestArticles
            .slice(1, 10)
            .forEach(function (article) {

                const item =
                    document.createElement("a");


                item.className =
                    "latest-side-item";


                item.href =
                    article.url || "#";


                item.innerHTML = `

                    <img
                        src="${escapeHTML(article.image)}"
                        alt="${escapeHTML(article.title)}"
                        loading="lazy"
                    >

                    <div class="latest-side-title">
                        ${escapeHTML(article.title)}
                    </div>
                `;


                sidebarList.appendChild(item);

            });


        /* HERO */

        const hero =
            latestArticles[0];


        heroWrap.innerHTML = `

            <a
                href="${escapeHTML(hero.url)}"
                class="latest-hero"
            >

                <img
                    src="${escapeHTML(hero.image)}"
                    alt="${escapeHTML(hero.title)}"
                    loading="eager"
                >

                <div class="latest-hero-overlay">

                    <h2 class="latest-hero-title">
                        ${escapeHTML(hero.title)}
                    </h2>

                </div>

            </a>
        `;
    }


    /* =====================================================
       BIGG BOSS
       ===================================================== */

    function renderBigBoss() {

        const section =
            $(".bigboss-section") ||
            $("#bigboss10Section");


        if (!section) return;


        const track =
            $("#bigbossTrack", section) ||
            $(".bigboss-track", section);


        if (!track) return;


        const list =
            articles
                .filter(isBigBoss)
                .slice(0, 10);


        track.innerHTML = "";


        if (!list.length) {

            track.innerHTML = `
                <div class="no-news">
                    No Bigg Boss news available.
                </div>
            `;

            return;
        }


        list.forEach(function (article) {

            track.appendChild(
                createBigBossCard(article)
            );

        });
    }


    /* =====================================================
       AP & TS
       ===================================================== */

    function renderAPTS() {

        const section =
            $(".slider-section");


        if (!section) return;


        const track =
            $("#sliderTrack", section) ||
            $(".slider-track", section);


        if (!track) return;


        const list =
            articles
                .filter(isAPTS)
                .slice(0, 10);


        track.innerHTML = "";


        if (!list.length) {

            track.innerHTML = `
                <div class="no-news">
                    No AP & TS news available.
                </div>
            `;

            return;
        }


        list.forEach(function (article) {

            track.appendChild(
                createSliderCard(article)
            );

        });
    }


    /* =====================================================
       BUSINESS
       ===================================================== */

    function renderBusiness() {

        let section =
            $(".business-section");


        /* CREATE BUSINESS SECTION */

        if (!section) {

            section =
                document.createElement("section");


            section.className =
                "business-section";


            section.innerHTML = `

                <div class="section-title-row">

                    <h2>
                        💼 Business
                    </h2>

                    <span>
                        బిజినెస్ తాజా వార్తలు
                    </span>

                    <a
                        href="business.html"
                        class="view-all"
                    >
                        READ MORE →
                    </a>

                </div>


                <div class="carousel-wrap">

                    <button
                        type="button"
                        class="carousel-btn business-prev"
                        aria-label="Previous"
                    >
                        ‹
                    </button>


                    <div class="news-slider">

                        <div
                            class="slider-track business-track"
                        ></div>

                    </div>


                    <button
                        type="button"
                        class="carousel-btn business-next"
                        aria-label="Next"
                    >
                        ›
                    </button>

                </div>
            `;


            const apSection =
                $(".slider-section");


            if (apSection) {

                apSection.insertAdjacentElement(
                    "afterend",
                    section
                );

            } else {

                const movieSection =
                    $("#cinemaSection") ||
                    $(".category-section");


                if (movieSection) {

                    movieSection.insertAdjacentElement(
                        "beforebegin",
                        section
                    );

                }
            }
        }


        const track =
            $(".business-track", section);


        if (!track) return;


        const list =
            articles
                .filter(isBusiness)
                .slice(0, 10);


        track.innerHTML = "";


        if (!list.length) {

            track.innerHTML = `
                <div class="no-news">
                    No Business news available.
                </div>
            `;

            return;
        }


        list.forEach(function (article) {

            track.appendChild(
                createSliderCard(article)
            );

        });


        setupCarousel(

            $(".business-prev", section),

            $(".business-next", section),

            track

        );
    }


    /* =====================================================
       CATEGORY CAROUSEL
       
       IMPORTANT:
       Movies / Sports రెండింటినీ proper
       .carousel-wrap
       +
       .news-slider
       +
       .horizontal-carousel
       లోకి మార్చుతుంది.
       ===================================================== */

    function setupCategoryCarousel(
        section,
        grid,
        type
    ) {

        if (!section || !grid) {
            return;
        }


        /* Already setup */

        if (
            grid.dataset.carouselReady === "true"
        ) {

            return;
        }


        grid.dataset.carouselReady =
            "true";


        grid.classList.add(
            "horizontal-carousel"
        );


        let slider =
            grid.closest(".news-slider");


        let wrapper =
            slider
                ? slider.parentElement
                : null;


        let previous =
            wrapper
                ? $(".category-prev", wrapper)
                : null;


        let next =
            wrapper
                ? $(".category-next", wrapper)
                : null;


        /* -------------------------------------------------
           If existing news-slider is NOT present,
           create one.
           ------------------------------------------------- */

        if (!slider) {

            wrapper =
                document.createElement("div");


            wrapper.className =
                `carousel-wrap category-carousel-${type}`;


            previous =
                document.createElement("button");


            previous.type =
                "button";


            previous.className =
                "carousel-btn category-prev";


            previous.setAttribute(
                "aria-label",
                `${type} previous`
            );


            previous.textContent =
                "‹";


            slider =
                document.createElement("div");


            slider.className =
                "news-slider";


            next =
                document.createElement("button");


            next.type =
                "button";


            next.className =
                "carousel-btn category-next";


            next.setAttribute(
                "aria-label",
                `${type} next`
            );


            next.textContent =
                "›";


            /* Put new wrapper exactly where grid was */

            grid.parentElement.insertBefore(
                wrapper,
                grid
            );


            wrapper.appendChild(
                previous
            );


            wrapper.appendChild(
                slider
            );


            wrapper.appendChild(
                next
            );


            slider.appendChild(
                grid
            );
        }


        /* -------------------------------------------------
           If wrapper exists but buttons don't exist
           ------------------------------------------------- */

        if (!previous) {

            previous =
                document.createElement("button");


            previous.type =
                "button";


            previous.className =
                "carousel-btn category-prev";


            previous.textContent =
                "‹";


            previous.setAttribute(
                "aria-label",
                `${type} previous`
            );


            wrapper.insertBefore(
                previous,
                slider
            );
        }


        if (!next) {

            next =
                document.createElement("button");


            next.type =
                "button";


            next.className =
                "carousel-btn category-next";


            next.textContent =
                "›";


            next.setAttribute(
                "aria-label",
                `${type} next`
            );


            wrapper.appendChild(
                next
            );
        }


        /* -------------------------------------------------
           Scroll
           ------------------------------------------------- */

        setupCarousel(
            previous,
            next,
            grid
        );
    }


    /* =====================================================
       MOVIES
       
       MAX 10
       HORIZONTAL SCROLL
       ===================================================== */

    function renderMovies() {

        const section =
            $("#cinemaSection") ||
            $(".category-section");


        if (!section) {

            console.warn(
                "BS360: Movies section not found."
            );

            return;
        }


        const grid =
            $("#cinemaGrid", section) ||
            $(".horizontal-carousel", section) ||
            $(".slider-track", section);


        if (!grid) {

            console.warn(
                "BS360: #cinemaGrid not found."
            );

            return;
        }


        const list =
            articles
                .filter(isMovies)
                .slice(0, 10);


        grid.innerHTML = "";


        if (!list.length) {

            grid.innerHTML = `
                <div class="no-news">
                    No Movies news available.
                </div>
            `;

            return;
        }


        list.forEach(function (article) {

            grid.appendChild(
                createCategoryCard(article)
            );

        });


        /* FIX MOVIES CAROUSEL */

        setupCategoryCarousel(
            section,
            grid,
            "movies"
        );
    }


    /* =====================================================
       SPORTS
       
       MAX 10
       HORIZONTAL SCROLL
       ===================================================== */

    function renderSports() {

        const section =
            $("#sportsSection") ||
            $(".sports-section");


        if (!section) {

            console.warn(
                "BS360: Sports section not found."
            );

            return;
        }


        const grid =
            $("#sportsGrid", section) ||
            $(".horizontal-carousel", section) ||
            $(".slider-track", section);


        if (!grid) {

            console.warn(
                "BS360: #sportsGrid not found."
            );

            return;
        }


        const list =
            articles
                .filter(isSports)
                .slice(0, 10);


        grid.innerHTML = "";


        if (!list.length) {

            grid.innerHTML = `
                <div class="no-news">
                    No Sports news available.
                </div>
            `;

            return;
        }


        list.forEach(function (article) {

            grid.appendChild(
                createCategoryCard(article)
            );

        });


        /* FIX SPORTS CAROUSEL */

        setupCategoryCarousel(
            section,
            grid,
            "sports"
        );
    }


    /* =====================================================
       ALL NEWS
       ===================================================== */

    function renderAllNews() {

        let section =
            $("#allNewsSection");


        /* EXISTING SECTION */

        if (section) {

            let grid =
                $("#allNewsGrid", section) ||
                $(".all-news-grid", section);


            if (!grid) {

                grid =
                    document.createElement("div");

                grid.id =
                    "allNewsGrid";

                grid.className =
                    "all-news-grid";

                section.appendChild(grid);
            }


            grid.innerHTML = "";


            articles.forEach(function (article) {

                grid.appendChild(
                    createAllNewsCard(article)
                );

            });


            return;
        }


        /* CREATE SECTION */

        section =
            document.createElement("section");


        section.id =
            "allNewsSection";


        section.className =
            "all-news-section";


        section.innerHTML = `

            <div class="section-title-row">

                <h2>
                    📰 ALL NEWS
                </h2>

                <span>
                    అన్ని తాజా వార్తలు
                </span>

            </div>


            <div
                id="allNewsGrid"
                class="all-news-grid"
            ></div>
        `;


        const grid =
            $("#allNewsGrid", section);


        articles.forEach(function (article) {

            grid.appendChild(
                createAllNewsCard(article)
            );

        });


        /* AFTER SPORTS */

        const sports =
            $("#sportsSection") ||
            $(".sports-section");


        if (sports) {

            sports.insertAdjacentElement(
                "afterend",
                section
            );

        } else {

            const footer =
                $(".site-footer") ||
                $("footer");


            if (footer) {

                footer.insertAdjacentElement(
                    "beforebegin",
                    section
                );

            } else {

                document.body.appendChild(
                    section
                );
            }
        }
    }


    /* =====================================================
       REMOVE MOST READ
       ===================================================== */

    function removeMostRead() {

        $$(".most-read-section")
            .forEach(function (section) {

                section.remove();

            });


        $$("#mostReadSection")
            .forEach(function (element) {

                element.remove();

            });
    }


    /* =====================================================
       REMOVE EXTRA TOP STORY
       ===================================================== */

    function cleanExtraTopStory() {

        const sections =
            $$("section");


        sections.forEach(function (section) {

            if (
                section.classList.contains(
                    "top-story-section"
                )
            ) {

                return;
            }


            const heading =
                $("h1, h2, h3", section);


            if (!heading) return;


            const text =
                heading.textContent
                    .toLowerCase()
                    .trim();


            if (
                text === "top story" ||
                text.includes("top story")
            ) {

                section.remove();

            }

        });
    }


    /* =====================================================
       GENERAL CAROUSEL
       ===================================================== */

    function setupCarousel(
        previousButton,
        nextButton,
        track
    ) {

        if (!track) return;


        function getScroller() {

            const slider =
                track.closest(".news-slider") ||
                track.closest(".bigboss-slider") ||
                track.parentElement;


            return slider;
        }


        function scrollAmount() {

            const first =
                track.children[0];


            if (!first) {

                return 230;
            }


            return (
                first.getBoundingClientRect().width +
                12
            );
        }


        if (previousButton) {

            previousButton.onclick =
                function () {

                    const scroller =
                        getScroller();


                    if (!scroller) return;


                    scroller.scrollBy({

                        left:
                            -scrollAmount(),

                        behavior:
                            "smooth"

                    });

                };
        }


        if (nextButton) {

            nextButton.onclick =
                function () {

                    const scroller =
                        getScroller();


                    if (!scroller) return;


                    scroller.scrollBy({

                        left:
                            scrollAmount(),

                        behavior:
                            "smooth"

                    });

                };
        }
    }


    /* =====================================================
       EXISTING CAROUSELS
       ===================================================== */

    function setupAllCarousels() {

        /* BIGG BOSS */

        const bigbossSection =
            $(".bigboss-section") ||
            $("#bigboss10Section");


        if (bigbossSection) {

            const track =
                $("#bigbossTrack", bigbossSection) ||
                $(".bigboss-track", bigbossSection);


            const previous =
                $(".bigboss-prev", bigbossSection) ||
                $(".prev", bigbossSection);


            const next =
                $(".bigboss-next", bigbossSection) ||
                $(".next", bigbossSection);


            setupCarousel(
                previous,
                next,
                track
            );
        }


        /* AP & TS */

        const apSection =
            $(".slider-section");


        if (apSection) {

            const track =
                $("#sliderTrack", apSection) ||
                $(".slider-track", apSection);


            const previous =
                $(".carousel-btn.prev", apSection) ||
                $(".prev", apSection);


            const next =
                $(".carousel-btn.next", apSection) ||
                $(".next", apSection);


            setupCarousel(
                previous,
                next,
                track
            );
        }
    }


    /* =====================================================
       BIGG BOSS AUTO SCROLL
       EVERY 5 SECONDS
       ===================================================== */

    function startBigBossAutoScroll() {

        const section =
            $(".bigboss-section") ||
            $("#bigboss10Section");


        if (!section) return;


        const slider =
            $(".bigboss-slider", section) ||
            $(".bigboss-track", section)?.parentElement;


        if (!slider) return;


        let timer =
            null;


        function start() {

            stop();


            timer =
                setInterval(
                    function () {

                        const maxScroll =
                            slider.scrollWidth -
                            slider.clientWidth;


                        if (maxScroll <= 0) {

                            return;
                        }


                        const first =
                            slider.querySelector(
                                ".bigboss-card"
                            );


                        const amount =
                            first
                                ? first.getBoundingClientRect().width + 12
                                : 227;


                        if (
                            slider.scrollLeft >=
                            maxScroll - 10
                        ) {

                            slider.scrollTo({

                                left: 0,

                                behavior:
                                    "smooth"

                            });

                        } else {

                            slider.scrollBy({

                                left: amount,

                                behavior:
                                    "smooth"

                            });
                        }

                    },
                    5000
                );
        }


        function stop() {

            if (timer) {

                clearInterval(timer);

                timer = null;
            }
        }


        slider.addEventListener(
            "mouseenter",
            stop
        );


        slider.addEventListener(
            "mouseleave",
            start
        );


        slider.addEventListener(
            "touchstart",
            stop,
            {
                passive: true
            }
        );


        slider.addEventListener(
            "touchend",
            start,
            {
                passive: true
            }
        );


        start();
    }


    /* =====================================================
       DATE & TIME
       ===================================================== */

    function setupDateTime() {

        const headerActions =
            $(".header-actions");


        if (!headerActions) return;


        let box =
            $(".header-date-time", headerActions);


        if (!box) {

            box =
                document.createElement("div");


            box.className =
                "header-date-time";


            const liveButton =
                $(".live-button", headerActions);


            if (liveButton) {

                headerActions.insertBefore(
                    box,
                    liveButton
                );

            } else {

                headerActions.appendChild(
                    box
                );
            }
        }


        box.innerHTML = `

            <div class="header-date"></div>

            <div class="header-time"></div>
        `;


        const dateElement =
            $(".header-date", box);


        const timeElement =
            $(".header-time", box);


        function updateDateTime() {

            const now =
                new Date();


            const date =
                now.toLocaleDateString(
                    "en-IN",
                    {
                        weekday:
                            "short",

                        day:
                            "2-digit",

                        month:
                            "short",

                        year:
                            "numeric"
                    }
                );


            const time =
                now.toLocaleTimeString(
                    "en-IN",
                    {
                        hour:
                            "2-digit",

                        minute:
                            "2-digit",

                        second:
                            "2-digit",

                        hour12:
                            true
                    }
                );


            dateElement.textContent =
                date;


            timeElement.textContent =
                time;
        }


        updateDateTime();


        setInterval(
            updateDateTime,
            1000
        );
    }


    /* =====================================================
       SEARCH
       ===================================================== */

    function setupSearch() {

        const icon =
            $(".search-icon");


        const box =
            $(".search-box");


        const input =
            $(".search-box input");


        const button =
            $(".search-box button");


        if (
            !icon ||
            !box ||
            !input
        ) {

            return;
        }


        icon.addEventListener(
            "click",
            function () {

                box.classList.toggle(
                    "show"
                );


                if (
                    box.classList.contains(
                        "show"
                    )
                ) {

                    input.focus();

                } else {

                    input.value = "";

                    clearSearch();
                }

            }
        );


        function performSearch() {

            const query =
                input.value
                    .trim()
                    .toLowerCase();


            if (!query) {

                clearSearch();

                return;
            }


            let found =
                false;


            articles.forEach(
                function (article) {

                    const title =
                        article.title.toLowerCase();


                    const matches =
                        title.includes(query);


                    article.element.style.display =
                        matches
                            ? ""
                            : "none";


                    if (matches) {

                        found = true;
                    }

                }
            );


            showSearchResults(
                query,
                found
            );
        }


        function clearSearch() {

            articles.forEach(
                function (article) {

                    article.element.style.display =
                        "";

                }
            );


            const result =
                $("#searchResultSection");


            if (result) {

                result.remove();
            }
        }


        if (button) {

            button.addEventListener(
                "click",
                performSearch
            );
        }


        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter"
                ) {

                    event.preventDefault();

                    performSearch();
                }

            }
        );
    }


    /* =====================================================
       SEARCH RESULTS
       ===================================================== */

    function showSearchResults(
        query,
        found
    ) {

        let section =
            $("#searchResultSection");


        if (!section) {

            section =
                document.createElement("section");


            section.id =
                "searchResultSection";


            section.className =
                "search-result-section";


            const searchContainer =
                $(".search-container");


            if (searchContainer) {

                searchContainer.insertAdjacentElement(
                    "afterend",
                    section
                );

            } else {

                const portal =
                    $(".portal-wrap");


                if (portal) {

                    portal.prepend(
                        section
                    );

                } else {

                    document.body.prepend(
                        section
                    );
                }
            }
        }


        section.innerHTML = `

            <h2>
                🔎 Search Results
            </h2>

            <div
                class="search-result-grid"
            ></div>
        `;


        const grid =
            $(".search-result-grid", section);


        const results =
            articles.filter(
                function (article) {

                    return article.title
                        .toLowerCase()
                        .includes(query);

                }
            );


        if (!results.length) {

            grid.innerHTML = `

                <div class="no-news">
                    "${escapeHTML(query)}"
                    కు వార్తలు లభించలేదు.
                </div>

            `;

            return;
        }


        results.forEach(
            function (article) {

                grid.appendChild(
                    createAllNewsCard(article)
                );

            }
        );


        section.scrollIntoView({

            behavior:
                "smooth",

            block:
                "start"

        });
    }


    /* =====================================================
       DARK MODE
       ===================================================== */

    function setupDarkMode() {

        const button =
            $(".theme-button");


        if (!button) return;


        const saved =
            localStorage.getItem(
                "bs360-dark-mode"
            );


        if (saved === "on") {

            document.body.classList.add(
                "dark-mode"
            );
        }


        updateThemeButton();


        button.addEventListener(
            "click",
            function () {

                document.body.classList.toggle(
                    "dark-mode"
                );


                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "bs360-dark-mode",
                    isDark
                        ? "on"
                        : "off"
                );


                updateThemeButton();

            }
        );


        function updateThemeButton() {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );


            button.textContent =
                isDark
                    ? "☀️ Light"
                    : "🌙 Dark";
        }
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    function setupMobileMenu() {

        const button =
            $(".mobile-menu-toggle");


        const nav =
            $(".main-nav");


        if (!button || !nav) {
            return;
        }


        button.addEventListener(
            "click",
            function () {

                nav.classList.toggle(
                    "mobile-open"
                );

            }
        );
    }


    /* =====================================================
       TOP HEADLINES
       ===================================================== */

    function setupHeadlines() {

        const text =
            $(".headlines-text");


        if (!text) return;


        const headlineArticles =
            articles.slice(0, 8);


        if (!headlineArticles.length) {
            return;
        }


        let index =
            0;


        function showHeadline() {

            const article =
                headlineArticles[index];


            text.textContent =
                article.title;


            index =
                (
                    index + 1
                ) %
                headlineArticles.length;
        }


        showHeadline();


        setInterval(
            showHeadline,
            4000
        );
    }


    /* =====================================================
       READ MORE LINKS
       ===================================================== */

    function setupReadMore() {

        /* BIGG BOSS */

        const bigboss =
            $(".bigboss-section") ||
            $("#bigboss10Section");


        if (bigboss) {

            const link =
                $(".view-all", bigboss) ||
                $$("a", bigboss).find(
                    function (a) {

                        return a.textContent
                            .toUpperCase()
                            .includes(
                                "READ MORE"
                            );

                    }
                );


            if (link) {

                link.href =
                    "bigboss10.html";
            }
        }


        /* AP & TS */

        const apSection =
            $(".slider-section");


        if (apSection) {

            const link =
                $(".view-all", apSection) ||
                $$("a", apSection).find(
                    function (a) {

                        return a.textContent
                            .toUpperCase()
                            .includes(
                                "READ MORE"
                            );

                    }
                );


            if (link) {

                link.href =
                    "AP&TS.html";
            }
        }


        /* BUSINESS */

        const business =
            $(".business-section");


        if (business) {

            const link =
                $(".view-all", business);


            if (link) {

                link.href =
                    "business.html";
            }
        }


        /* MOVIES */

        const movies =
            $("#cinemaSection") ||
            $(".category-section");


        if (movies) {

            const link =
                $(".view-all", movies) ||
                $$("a", movies).find(
                    function (a) {

                        return a.textContent
                            .toUpperCase()
                            .includes(
                                "READ MORE"
                            );

                    }
                );


            if (link) {

                link.href =
                    "movies.html";
            }
        }


        /* SPORTS */

        const sports =
            $("#sportsSection") ||
            $(".sports-section");


        if (sports) {

            const link =
                $(".view-all", sports) ||
                $$("a", sports).find(
                    function (a) {

                        return a.textContent
                            .toUpperCase()
                            .includes(
                                "READ MORE"
                            );

                    }
                );


            if (link) {

                link.href =
                    "sports.html";
            }
        }
    }


    /* =====================================================
       INITIALIZE
       ===================================================== */

    cleanExtraTopStory();


    removeMostRead();


    renderLatestNews();


    renderBigBoss();


    renderAPTS();


    renderBusiness();


    renderMovies();


    renderSports();


    renderAllNews();


    setupAllCarousels();


    startBigBossAutoScroll();


    setupDateTime();


    setupSearch();


    setupDarkMode();


    setupMobileMenu();


    setupHeadlines();


    setupReadMore();


    /* =====================================================
       DEBUG / CONSOLE
       ===================================================== */

    console.log(
        "===================================="
    );


    console.log(
        "✅ BS 360 NEWS homepage loaded."
    );


    console.log(
        "📰 Total articles:",
        articles.length
    );


    console.log(
        "📺 Bigg Boss:",
        articles.filter(
            isBigBoss
        ).length
    );


    console.log(
        "🏛️ AP & TS:",
        articles.filter(
            isAPTS
        ).length
    );


    console.log(
        "💼 Business:",
        articles.filter(
            isBusiness
        ).length
    );


    console.log(
        "🎬 Movies:",
        articles.filter(
            isMovies
        ).length
    );


    console.log(
        "🏏 Sports:",
        articles.filter(
            isSports
        ).length
    );


    console.log(
        "===================================="
    );

});
