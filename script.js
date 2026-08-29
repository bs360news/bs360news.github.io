<script>
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".news-item.post").forEach(function (card) {

    card.addEventListener("click", function (e) {

      /* Share button click అయితే article open చేయకూడదు */
      if (
        e.target.closest(".share-row") ||
        e.target.closest("button")
      ) {
        return;
      }

      /* Read More link click అయితే browser normal href ఉపయోగించాలి */
      if (e.target.closest("a")) {
        return;
      }

      const url = card.getAttribute("data-url");

      if (url) {
        window.location.href = url;
      }

    });

  });

});
</script>


// =====================================================
// BS 360 NEWS - MAIN JAVASCRIPT (OPTIMIZED)
// =====================================================


// =====================================================
// BS 360 NEWS PULSE
// LIKE / COMMENT / SHARE / SAVE
// =====================================================


// =====================================================
// PER ARTICLE LIKE SYSTEM
// =====================================================

const bsArticleKey =
    window.location.pathname;

const bsLikeStateKey =
    "bs360_liked_" + bsArticleKey;

const bsLikeCountKey =
    "bs360_likes_" + bsArticleKey;


let bsLiked =
    localStorage.getItem(
        bsLikeStateKey
    ) === "true";


let bsLikes =
    Number(
        localStorage.getItem(
            bsLikeCountKey
        )
    );


if (isNaN(bsLikes) || bsLikes === 0) {

    bsLikes = 2800;

}


// =====================================================
// NUMBER FORMAT
// =====================================================

function bsFormatNumber(number) {

    if (number >= 1000) {

        return (
            number / 1000
        ).toFixed(1) + "K";

    }

    return number;

}


// =====================================================
// LIKE
// =====================================================

function bsToggleLike() {

    const btn =
        document.getElementById(
            "bsLikeBtn"
        );


    const count =
        document.getElementById(
            "bsLikeCount"
        );


    if (!btn || !count) {

        return;

    }


    // =========================
    // LIKE
    // =========================

    if (!bsLiked) {

        bsLikes++;

        bsLiked = true;

        btn.classList.add(
            "bs-liked"
        );

    }


    // =========================
    // UNLIKE
    // =========================

    else {

        bsLikes--;

        if (bsLikes < 0) {

            bsLikes = 0;

        }

        bsLiked = false;

        btn.classList.remove(
            "bs-liked"
        );

    }


    // UPDATE SCREEN

    count.innerText =
        bsFormatNumber(
            bsLikes
        );


    // SAVE LIKE COUNT
    // ONLY FOR THIS ARTICLE

    localStorage.setItem(
        bsLikeCountKey,
        bsLikes
    );


    // SAVE LIKE STATE
    // ONLY FOR THIS ARTICLE

    localStorage.setItem(
        bsLikeStateKey,
        bsLiked
    );


    // LIKE ANIMATION

    btn.style.transform =
        "scale(1.08)";


    setTimeout(
        function () {

            btn.style.transform =
                "scale(1)";

        },
        180
    );

}


// =====================================================
// COMMENT FOCUS
// =====================================================

function bsFocusComment() {

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

}


// =====================================================
// ADD COMMENT
// =====================================================

function bsAddComment() {

    const input =
        document.getElementById(
            "bsCommentInput"
        );


    const commentsList =
        document.getElementById(
            "bsCommentsList"
        );


    const commentCount =
        document.getElementById(
            "bsCommentCount"
        );


    if (!input || !commentsList) {

        return;

    }


    const text =
        input.value.trim();


    if (!text) {

        return;

    }


    const card =
        document.createElement(
            "div"
        );


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


        <div class="bs-comment-text">
            ${bsEscape(text)}
        </div>


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


    commentsList.prepend(
        card
    );


    input.value = "";


    if (commentCount) {

        let count =
            Number(
                commentCount.innerText
            ) || 0;


        count++;


        commentCount.innerText =
            count;

    }

}


// =====================================================
// SHARE
// =====================================================

function bsShareArticle() {

    const shareData = {

        title:
            document.title,

        text:
            "BS 360 NEWS - తాజా వార్త",

        url:
            window.location.href

    };


    // =================================================
    // MOBILE / SUPPORTED BROWSERS
    // =================================================

    if (
        navigator.share &&
        typeof navigator.share ===
        "function"
    ) {

        navigator
            .share(shareData)

            .then(
                function () {

                    console.log(
                        "Article shared successfully"
                    );

                }
            )

            .catch(
                function () {

                    console.log(
                        "Share cancelled"
                    );

                }
            );

        return;

    }


    // =================================================
    // DESKTOP FALLBACK
    // =================================================

    if (
        navigator.clipboard &&
        typeof navigator
            .clipboard
            .writeText ===
            "function"
    ) {

        navigator.clipboard
            .writeText(
                window.location.href
            )

            .then(
                function () {

                    alert(
                        "🔗 Article link copied!"
                    );

                }
            )

            .catch(
                function () {

                    bsCopyArticleFallback();

                }
            );

        return;

    }


    bsCopyArticleFallback();

}


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
            "🔗 Article link copied!"
        );

    }


    catch (error) {

        alert(
            "🔗 " +
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

function bsSaveArticle() {

    const btn =
        document.getElementById(
            "bsSaveText"
        );


    const saveButton =
        document.querySelector(
            ".save-action"
        );


    if (!btn) {

        return;

    }


    if (
        btn.innerText ===
        "Save"
    ) {

        btn.innerText =
            "Saved";


        if (saveButton) {

            saveButton.classList.add(
                "bs-saved"
            );

        }


        localStorage.setItem(

            "bs360_saved_" +
            window.location.pathname,

            "yes"

        );


        alert(
            "🔖 Article saved!"
        );

    }


    else {

        btn.innerText =
            "Save";


        if (saveButton) {

            saveButton.classList.remove(
                "bs-saved"
            );

        }


        localStorage.removeItem(

            "bs360_saved_" +
            window.location.pathname

        );

    }

}


// =====================================================
// SECURITY
// =====================================================

function bsEscape(text) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent =
        text;


    return div.innerHTML;

}


// =====================================================
// LOAD BS NEWS PULSE DATA
// =====================================================

function loadBsNewsPulse() {

    const likeCount =
        document.getElementById(
            "bsLikeCount"
        );


    const likeButton =
        document.getElementById(
            "bsLikeBtn"
        );


    // =================================================
    // LOAD LIKE COUNT & STATE
    // =================================================

    bsLiked =
        localStorage.getItem(
            bsLikeStateKey
        ) === "true";

    let savedLikes =
        Number(
            localStorage.getItem(
                bsLikeCountKey
            )
        );

    if (!isNaN(savedLikes) && savedLikes > 0) {

        bsLikes = savedLikes;

    }

    if (likeCount) {

        likeCount.innerText =
            bsFormatNumber(
                bsLikes
            );

    }


    if (likeButton) {

        if (bsLiked) {

            likeButton.classList.add(
                "bs-liked"
            );

        }

        else {

            likeButton.classList.remove(
                "bs-liked"
            );

        }

    }


    // =================================================
    // LOAD SAVED STATE
    // =================================================

    const saved =
        localStorage.getItem(

            "bs360_saved_" +
            window.location.pathname

        );


    const saveText =
        document.getElementById(
            "bsSaveText"
        );


    const saveButton =
        document.querySelector(
            ".save-action"
        );


    if (
        saved === "yes" &&
        saveText
    ) {

        saveText.innerText =
            "Saved";


        if (saveButton) {

            saveButton.classList.add(
                "bs-saved"
            );

        }

    }

}


// =====================================================
// 1. FILTER POSTS BY CATEGORY
// WITH NAV ACTIVE CLASS SYNC
// =====================================================

function filterPosts(
    category,
    element = null
) {

    document
        .querySelectorAll(
            ".post"
        )
        .forEach(
            post => {

                const postCategory =
                    post.dataset.category;


                if (
                    category === "all" ||
                    postCategory ===
                    category
                ) {

                    post.classList.remove(
                        "hidden"
                    );

                }

                else {

                    post.classList.add(
                        "hidden"
                    );

                }

            }
        );


    // Active Tab Highlight

    if (element) {

        document
            .querySelectorAll(
                ".nav-links a"
            )
            .forEach(
                link =>
                    link.classList.remove(
                        "active"
                    )
            );


        element.classList.add(
            "active"
        );

    }


    // Clear search inputs

    const searchInput =
        document.getElementById(
            "search-input"
        );


    const headerSearchInput =
        document.getElementById(
            "header-search-input"
        );


    if (searchInput) {

        searchInput.value = "";

    }


    if (headerSearchInput) {

        headerSearchInput.value = "";

    }

}


// =====================================================
// 2. LIVE SEARCH SYSTEM
// SYNC BOTH INPUTS
// =====================================================

function searchPosts(
    customQuery = null
) {

    const searchInput =
        document.getElementById(
            "search-input"
        );


    const headerSearchInput =
        document.getElementById(
            "header-search-input"
        );


    let query =
        customQuery;


    if (query === null) {

        query =
            (
                searchInput
                ? searchInput.value
                : ""
            )
            ||
            (
                headerSearchInput
                ? headerSearchInput.value
                : ""
            );

    }


    query =
        query
            .trim()
            .toLowerCase();


    // Sync input values

    if (
        searchInput &&
        searchInput.value !==
        query
    ) {

        searchInput.value =
            query;

    }


    if (
        headerSearchInput &&
        headerSearchInput.value !==
        query
    ) {

        headerSearchInput.value =
            query;

    }


    document
        .querySelectorAll(
            ".post"
        )
        .forEach(
            post => {

                const text =
                    post.innerText
                        .toLowerCase();


                if (
                    !query ||
                    text.includes(query)
                ) {

                    post.classList.remove(
                        "hidden"
                    );

                }

                else {

                    post.classList.add(
                        "hidden"
                    );

                }

            }
        );

}


// =====================================================
// 3. SHARE POST
// WITH BETTER USER FEEDBACK
// =====================================================

function sharePost(button) {

    const post =
        button.closest(
            ".post"
        );


    if (!post) {

        return;

    }


    const titleElement =
        post.querySelector(
            "h1, h2, h3"
        );


    const title =
        titleElement
        ? titleElement.innerText.trim()
        : "BS 360 NEWS";


    const articleUrl =
        post.dataset.url;


    let shareUrl =
        window.location.href;


    if (articleUrl) {

        const baseUrl =
            window.location.origin +
            window.location.pathname.substring(
                0,
                window.location.pathname.lastIndexOf(
                    "/"
                ) + 1
            );


        shareUrl =
            baseUrl +
            articleUrl;

    }


    if (navigator.share) {

        navigator.share({

            title: title,

            text: title,

            url: shareUrl

        }).catch(
            () => {}
        );

    }


    else {

        if (
            navigator.clipboard
        ) {

            navigator.clipboard
                .writeText(
                    shareUrl
                )

                .then(
                    () => {

                        const originalText =
                            button.innerHTML;


                        button.innerText =
                            "✓ లింక్ కాపీ అయింది!";


                        setTimeout(
                            () => {

                                button.innerHTML =
                                    originalText;

                            },
                            2000
                        );

                    }
                )

                .catch(
                    () => {

                        alert(
                            "లింక్ కాపీ చేయలేకపోయాం."
                        );

                    }
                );

        }


        else {

            alert(
                shareUrl
            );

        }

    }

}


// =====================================================
// 4. DARK / LIGHT MODE
// =====================================================

function toggleTheme() {

    document.body.classList.toggle(
        "dark-mode"
    );


    const button =
        document.querySelector(
            ".theme-button"
        )
        ||
        document.querySelector(
            ".theme-btn"
        );


    if (!button) {

        return;

    }


    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        button.innerHTML =
            "☀️ <span>Light</span>";


        localStorage.setItem(
            "bs360-theme",
            "dark"
        );

    }


    else {

        button.innerHTML =
            "🌙 <span>Dark</span>";


        localStorage.setItem(
            "bs360-theme",
            "light"
        );

    }

}


// =====================================================
// 5. LOAD SAVED THEME
// =====================================================

function loadTheme() {

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
            document.querySelector(
                ".theme-button"
            )
            ||
            document.querySelector(
                ".theme-btn"
            );


        if (button) {

            button.innerHTML =
                "☀️ <span>Light</span>";

        }

    }

}


// =====================================================
// 6. LIVE DATE & CLOCK
// =====================================================

function updateClock() {

    const now =
        new Date();


    const clockElement =
        document.getElementById(
            "live-clock"
        );


    const dateElement =
        document.getElementById(
            "live-date"
        );


    if (clockElement) {

        clockElement.innerText =
            "🕒 " +
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true
                }
            );

    }


    if (dateElement) {

        dateElement.innerText =
            "📅 " +
            now.toLocaleDateString(
                "te-IN",
                {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }

}


setInterval(
    updateClock,
    1000
);


// =====================================================
// 7. REAL-TIME "TIME AGO"
// IN TELUGU
// =====================================================

function updateTimeAgo() {

    const timeElements =
        document.querySelectorAll(
            ".time-stamp[data-time]"
        );


    timeElements.forEach(
        element => {

            const timeAttribute =
                element.getAttribute(
                    "data-time"
                );


            if (!timeAttribute) {

                return;

            }


            const postTime =
                new Date(
                    timeAttribute
                ).getTime();


            const currentTime =
                Date.now();


            if (
                isNaN(postTime)
            ) {

                return;

            }


            const difference =
                Math.floor(
                    (
                        currentTime -
                        postTime
                    ) / 1000
                );


            let text =
                "";


            if (
                difference < 60
            ) {

                text =
                    "ఇప్పుడే";

            }


            else if (
                difference < 3600
            ) {

                const minutes =
                    Math.floor(
                        difference / 60
                    );


                text =
                    `${minutes} నిమిషాల క్రితం`;

            }


            else if (
                difference < 86400
            ) {

                const hours =
                    Math.floor(
                        difference / 3600
                    );


                text =
                    `${hours} గంటల క్రితం`;

            }


            else {

                const days =
                    Math.floor(
                        difference / 86400
                    );


                text =
                    `${days} రోజుల క్రితం`;

            }


            element.innerText =
                `🕒 ${text}`;

        }
    );

}


setInterval(
    updateTimeAgo,
    60000
);


// =====================================================
// 8. EVENT BINDINGS
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {


        // BS Pulse

        loadBsNewsPulse();


        // Theme

        loadTheme();


        // Clock

        updateClock();


        // Time Ago

        updateTimeAgo();


        // Input Listeners

        const searchInput =
            document.getElementById(
                "search-input"
            );


        const headerSearchInput =
            document.getElementById(
                "header-search-input"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                (e) =>
                    searchPosts(
                        e.target.value
                    )
            );

        }


        if (
            headerSearchInput
        ) {

            headerSearchInput.addEventListener(
                "input",
                (e) =>
                    searchPosts(
                        e.target.value
                    )
            );

        }


        // Mobile Menu Toggle

        const menuToggle =
            document.querySelector(
                ".mobile-menu-toggle"
            );


        const mainNav =
            document.querySelector(
                ".main-nav"
            );


        if (
            menuToggle &&
            mainNav
        ) {

            menuToggle.addEventListener(
                "click",
                () => {

                    mainNav.classList.toggle(
                        "active"
                    );

                }
            );

        }

    }
);


// =====================================================
// 9. CLEAR INPUTS ON PAGE LOAD
// =====================================================

window.addEventListener(
    "load",
    () => {

        const searchInput =
            document.getElementById(
                "search-input"
            );


        const headerSearchInput =
            document.getElementById(
                "header-search-input"
            );


        if (searchInput) {

            searchInput.value =
                "";

        }


        if (
            headerSearchInput
        ) {

            headerSearchInput.value =
                "";

        }

    }
);
