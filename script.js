/* =========================================================
   BS 360 NEWS - EXACT HOMEPAGE JS
========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    "use strict";


    /* =====================================================
       GET LEGACY SOURCE
    ===================================================== */

    const source =
        document.getElementById("legacyNewsSource");

    if(!source){
        console.error("legacyNewsSource not found");
        return;
    }


    /* =====================================================
       READ ALL ARTICLES
    ===================================================== */

    const articles =
        Array.from(
            source.querySelectorAll(".news-item.post")
        )
        .map(function(item){

            const image =
                item.querySelector("img");

            const title =
                item.querySelector(".news-content p");

            return {

                category:
                    (item.dataset.category || "")
                    .trim()
                    .toLowerCase(),

                url:
                    item.dataset.url || "#",

                image:
                    image
                        ? image.getAttribute("src")
                        : "",

                alt:
                    image
                        ? image.getAttribute("alt") || ""
                        : "",

                title:
                    title
                        ? title.textContent.trim()
                        : ""
            };

        })
        .filter(function(article){

            return (
                article.title &&
                article.image
            );

        });


    console.log(
        "BS360 ARTICLES:",
        articles.length
    );


    /* =====================================================
       LATEST NEWS
       
       BIGBOSS EXCLUDED
    ===================================================== */

    const latestArticles =
        articles.filter(function(article){

            return article.category !== "bigboss10";

        });


    const latestTarget =
        document.getElementById("topStory");


    let latestIndex = 0;

    let latestTimer = null;


    /* =====================================================
       LATEST CARD
    ===================================================== */

    function createLatest(article){

        return `
            <a
                href="${article.url}"
                class="latest-big-card"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="eager"
                >

                <div class="latest-big-content">

                    <span class="read-label">
                        LATEST NEWS
                    </span>

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>
        `;

    }


    /* =====================================================
       SHOW NEXT LATEST
    ===================================================== */

    function showLatest(){

        if(
            !latestTarget ||
            latestArticles.length === 0
        ){
            return;
        }


        if(
            latestIndex >=
            latestArticles.length
        ){

            latestIndex = 0;

        }


        latestTarget.innerHTML =
            createLatest(
                latestArticles[latestIndex]
            );


        latestIndex++;

    }


    /* =====================================================
       5 SECOND TIMER
    ===================================================== */

    function startLatestTimer(){

        if(latestTimer){

            clearInterval(
                latestTimer
            );

        }


        latestTimer =
            setInterval(
                showLatest,
                5000
            );

    }


    /* FIRST LATEST */

    showLatest();

    startLatestTimer();


    /* =====================================================
       CATEGORY RENDER FUNCTION
       
       1 = BIG
       2,3,4,5 = SMALL
    ===================================================== */

    function renderCategory(
        targetId,
        categoryNames
    ){

        const target =
            document.getElementById(targetId);

        if(!target){
            return;
        }


        const categoryArticles =
            articles.filter(function(article){

                return categoryNames.includes(
                    article.category
                );

            });


        target.innerHTML = "";


        if(categoryArticles.length === 0){

            return;

        }


        /*
          ONLY FIRST 5 ARTICLES

          1 = BIG
          2 = SMALL
          3 = SMALL
          4 = SMALL
          5 = SMALL
        */

        const fiveArticles =
            categoryArticles.slice(0,5);


        const layout =
            document.createElement("div");


        layout.className =
            "category-news-layout";


        /* =============================================
           BIG ARTICLE
        ============================================= */

        layout.insertAdjacentHTML(
            "beforeend",

            createFeature(
                fiveArticles[0]
            )

        );


        /* =============================================
           ARTICLES 2 - 5
        ============================================= */

        fiveArticles
            .slice(1,5)
            .forEach(function(article){

                layout.insertAdjacentHTML(
                    "beforeend",

                    createSmallCard(
                        article
                    )

                );

            });


        target.appendChild(
            layout
        );

    }


    /* =====================================================
       BIG CATEGORY CARD
    ===================================================== */

    function createFeature(article){

        return `
            <a
                href="${article.url}"
                class="category-feature"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="lazy"
                >

                <div class="category-feature-content">

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>
        `;

    }


    /* =====================================================
       SMALL CATEGORY CARD
    ===================================================== */

    function createSmallCard(article){

        return `
            <a
                href="${article.url}"
                class="category-card"
            >

                <img
                    src="${article.image}"
                    alt="${article.alt}"
                    loading="lazy"
                >

                <div class="category-card-content">

                    <h3>
                        ${article.title}
                    </h3>

                </div>

            </a>
        `;

    }


    /* =====================================================
       AP & TS
    ===================================================== */

    renderCategory(
        "sliderTrack",
        ["ap","ts"]
    );


    /* =====================================================
       SPORTS
    ===================================================== */

    renderCategory(
        "sportsGrid",
        ["sports"]
    );


    /* =====================================================
       ENTERTAINMENT
    ===================================================== */

    renderCategory(
        "cinemaGrid",
        ["cinema","movies"]
    );


    /* =====================================================
       BUSINESS
    ===================================================== */

    renderCategory(
        "businessGrid",
        ["business"]
    );


    /* =====================================================
       PAUSE LATEST WHEN TAB HIDDEN
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        function(){

            if(document.hidden){

                if(latestTimer){

                    clearInterval(
                        latestTimer
                    );

                    latestTimer = null;

                }

            }else{

                startLatestTimer();

            }

        }
    );

});
