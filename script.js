/* =====================================================
   UNIVERSAL HORIZONTAL AUTO SCROLL
   FEATURED + LATEST + MOVIES + SPORTS
===================================================== */

function setupHorizontalAutoScroll(
    container,
    distance = 280,
    interval = 3000
) {

    if (!container) {
        return;
    }

    /* Prevent duplicate timers */
    if (
        container.dataset.autoScrollStarted === "true"
    ) {
        return;
    }

    container.dataset.autoScrollStarted = "true";


    /* Make sure horizontal scrolling is enabled */

    container.style.overflowX = "auto";
    container.style.overflowY = "hidden";
    container.style.scrollBehavior = "smooth";


    let paused = false;


    /* =================================================
       MOUSE PAUSE
    ================================================= */

    container.addEventListener(
        "mouseenter",
        function () {
            paused = true;
        }
    );


    container.addEventListener(
        "mouseleave",
        function () {
            paused = false;
        }
    );


    /* =================================================
       TOUCH PAUSE
    ================================================= */

    container.addEventListener(
        "touchstart",
        function () {
            paused = true;
        },
        {
            passive: true
        }
    );


    container.addEventListener(
        "touchend",
        function () {

            setTimeout(
                function () {
                    paused = false;
                },
                1500
            );

        },
        {
            passive: true
        }
    );


    /* =================================================
       AUTO SCROLL TIMER
    ================================================= */

    setInterval(
        function () {

            if (paused) {
                return;
            }


            const maxScroll =
                container.scrollWidth -
                container.clientWidth;


            /* No horizontal overflow */

            if (maxScroll <= 5) {
                return;
            }


            /* =================================================
               REACH END → RETURN TO START
            ================================================= */

            if (
                container.scrollLeft >=
                maxScroll - 10
            ) {

                container.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });

                return;
            }


            /* =================================================
               MOVE FORWARD
            ================================================= */

            container.scrollBy({
                left: distance,
                behavior: "smooth"
            });


        },
        interval
    );

}
