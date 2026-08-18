// =====================================================
// BS 360 NEWS PULSE
// LIKE / COMMENT / SHARE / SAVE
// =====================================================

(function () {

    // ప్రతి articleకి separate key
    const pageKey = window.location.pathname;

    const likeKey = "bs360_like_" + pageKey;
    const countKey = "bs360_like_count_" + pageKey;
    const saveKey = "bs360_save_" + pageKey;

    // =====================================================
    // NUMBER FORMAT
    // =====================================================

    window.bsFormatNumber = function (number) {

        number = Number(number) || 0;

        if (number >= 1000) {
            return (number / 1000).toFixed(1) + "K";
        }

        return number;
    };


    // =====================================================
    // LIKE
    // =====================================================

    window.bsToggleLike = function () {

        const btn =
            document.getElementById("bsLikeBtn");

        const count =
            document.getElementById("bsLikeCount");

        if (!btn || !count) {
            console.log("BS Like elements not found");
            return;
        }

        let liked =
            localStorage.getItem(likeKey) === "true";

        let likes =
            parseInt(
                localStorage.getItem(countKey),
                10
            );

        if (isNaN(likes)) {
            likes = 0;
        }


        // LIKE
        if (!liked) {

            likes++;

            liked = true;

            btn.classList.add("bs-liked");

        }

        // UNLIKE
        else {

            likes--;

            if (likes < 0) {
                likes = 0;
            }

            liked = false;

            btn.classList.remove("bs-liked");

        }


        // Update screen

        count.innerText =
            bsFormatNumber(likes);


        // Save

        localStorage.setItem(
            likeKey,
            liked
        );

        localStorage.setItem(
            countKey,
            likes
        );


        // Animation

        btn.style.transform =
            "scale(1.08)";

        setTimeout(function () {

            btn.style.transform =
                "scale(1)";

        }, 180);

    };


    // =====================================================
    // COMMENT FOCUS
    // =====================================================

    window.bsFocusComment = function () {

        const input =
            document.getElementById(
                "bsCommentInput"
            );

        if (!input) {
            return;
        }

        input.focus();

        input.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    };


    // =====================================================
    // ADD COMMENT
    // =====================================================

    window.bsAddComment = function () {

        const input =
            document.getElementById(
                "bsCommentInput"
            );

        const list =
            document.getElementById(
                "bsCommentsList"
            );

        const count =
            document.getElementById(
                "bsCommentCount"
            );

        if (!input || !list) {
            return;
        }


        const text =
            input.value.trim();

        if (!text) {
            return;
        }


        const card =
            document.createElement("div");

        card.className =
            "bs-comment-card";


        card.innerHTML = `

            <div class="bs-comment-head">

                <div class="bs-avatar">
                    R
                </div>

                <div>

                    <div class="bs-comment-name">
                        Reader
                    </div>

                    <div class="bs-comment-time">
                        ఇప్పుడే
                    </div>

                </div>

            </div>

            <div class="bs-comment-text"></div>

            <button
                class="bs-comment-like"
                type="button"
                onclick="
                    this.innerHTML='❤️ Liked';
                    this.style.color='#e60000';
                "
            >
                ❤️ Like
            </button>

        `;


        card.querySelector(
            ".bs-comment-text"
        ).textContent = text;


        list.prepend(card);

        input.value = "";


        if (count) {

            let current =
                parseInt(
                    count.innerText,
                    10
                ) || 0;

            current++;

            count.innerText =
                current;

        }

    };


    // =====================================================
    // SHARE
    // =====================================================

    window.bsShareArticle = function () {

        const shareData = {

            title:
                document.title,

            text:
                "BS 360 NEWS - తాజా వార్త",

            url:
                window.location.href

        };


        // Mobile Share

        if (
            navigator.share &&
            typeof navigator.share === "function"
        ) {

            navigator.share(
                shareData
            ).catch(function () {});

            return;
        }


        // Desktop Copy

        if (
            navigator.clipboard &&
            typeof navigator.clipboard.writeText === "function"
        ) {

            navigator.clipboard
                .writeText(
                    window.location.href
                )
                .then(function () {

                    alert(
                        "🔗 వార్త లింక్ Copy అయింది!"
                    );

                })
                .catch(function () {

                    bsCopyArticleFallback();

                });

            return;
        }


        bsCopyArticleFallback();

    };


    // =====================================================
    // SHARE FALLBACK
    // =====================================================

    function bsCopyArticleFallback() {

        const textarea =
            document.createElement(
                "textarea"
            );

        textarea.value =
            window.location.href;

        textarea.style.position =
            "fixed";

        textarea.style.left =
            "-9999px";

        document.body.appendChild(
            textarea
        );

        textarea.focus();

        textarea.select();


        try {

            document.execCommand(
                "copy"
            );

            alert(
                "🔗 వార్త లింక్ Copy అయింది!"
            );

        }

        catch (error) {

            alert(
                window.location.href
            );

        }


        document.body.removeChild(
            textarea
        );

    }


    // =====================================================
    // SAVE
    // =====================================================

    window.bsSaveArticle = function () {

        const text =
            document.getElementById(
                "bsSaveText"
            );

        const button =
            document.querySelector(
                ".save-action"
            );


        if (!text) {
            return;
        }


        let saved =
            localStorage.getItem(
                saveKey
            ) === "true";


        if (!saved) {

            localStorage.setItem(
                saveKey,
                "true"
            );

            text.innerText =
                "Saved";


            if (button) {

                button.classList.add(
                    "bs-saved"
                );

            }

        }

        else {

            localStorage.removeItem(
                saveKey
            );

            text.innerText =
                "Save";


            if (button) {

                button.classList.remove(
                    "bs-saved"
                );

            }

        }

    };


    // =====================================================
    // LOAD PULSE
    // =====================================================

    window.loadBsNewsPulse = function () {

        const likeCount =
            document.getElementById(
                "bsLikeCount"
            );

        const likeButton =
            document.getElementById(
                "bsLikeBtn"
            );


        // Load Like Count

        if (likeCount) {

            let likes =
                parseInt(
                    localStorage.getItem(
                        countKey
                    ),
                    10
                );

            if (isNaN(likes)) {
                likes = 0;
            }

            likeCount.innerText =
                bsFormatNumber(likes);

        }


        // Load Like State

        if (likeButton) {

            const liked =
                localStorage.getItem(
                    likeKey
                ) === "true";


            if (liked) {

                likeButton.classList.add(
                    "bs-liked"
                );

            }

        }


        // Load Save State

        const saveText =
            document.getElementById(
                "bsSaveText"
            );

        const saveButton =
            document.querySelector(
                ".save-action"
            );


        const saved =
            localStorage.getItem(
                saveKey
            ) === "true";


        if (saved) {

            if (saveText) {

                saveText.innerText =
                    "Saved";

            }


            if (saveButton) {

                saveButton.classList.add(
                    "bs-saved"
                );

            }

        }

    };


    // =====================================================
    // PAGE LOAD
    // =====================================================

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            loadBsNewsPulse();

        }
    );

})();
