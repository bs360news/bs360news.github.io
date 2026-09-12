/* ========================================================= 
   BS 360 NEWS 
   HOMEPAGE FINAL SCRIPT 
   TOP NEWS + SCROLLING SECTIONS 
========================================================= */ 
 
document.addEventListener("DOMContentLoaded", function () { 
 
"use strict"; 
 
/* ========================================================= 
   HELPERS 
========================================================= */ 
 
const $ = (selector, parent = document) => 
    parent.querySelector(selector); 
 
const $$ = (selector, parent = document) => 
    Array.from(parent.querySelectorAll(selector)); 
 
 
/* ========================================================= 
   SOURCE POSTS 
========================================================= */ 
 
function sourcePosts() { 
 
    let posts = $$("#legacyNewsSource .post[data-url]"); 
 
    if (!posts.length) 
        posts = $$(".news-list .post[data-url]"); 
 
    if (!posts.length) 
        posts = $$(".news-item.post[data-url]"); 
 
    if (!posts.length) 
        posts = $$(".post[data-url]"); 
 
    return posts; 
} 
 
let allPosts = sourcePosts(); 
 
 
/* ========================================================= 
   UNIQUE POSTS 
========================================================= */ 
 
function uniquePosts(posts) { 
 
    const seen = new Set(); 
 
    return posts.filter(post => { 
 
        const url = 
            (post.getAttribute("data-url") || "").trim(); 
 
        const titleElement = 
            $(".post-title", post) || 
            $(".article-title", post) || 
            $("h1", post) || 
            $("h2", post) || 
            $("h3", post) || 
            $("p", post); 
 
        const title = titleElement 
            ? titleElement.textContent.trim() 
            : ""; 
 
        const key = url + "|" + title; 
 
        if (seen.has(key)) 
            return false; 
 
        seen.add(key); 
 
        return true; 
 
    }); 
} 
 
allPosts = uniquePosts(allPosts); 
 
 
/* ========================================================= 
   CATEGORY 
========================================================= */ 
 
function catsOf(post) { 
 
    return ( 
        (post.getAttribute("data-category") || "") + 
        " " + 
        (post.getAttribute("data-categories") || "") + 
        " " + 
        (post.getAttribute("category") || "") 
    ) 
    .toLowerCase() 
    .trim(); 
 
} 
 
 
/* ========================================================= 
   BIGG BOSS 
========================================================= */ 
 
function isBigBoss(post) { 
 
    const value = catsOf(post); 
 
    return ( 
        value.includes("bigboss10") || 
        value.includes("bigg boss 10") || 
        value.includes("bigboss 10") || 
        value.includes("bigg-boss-10") || 
        value.includes("bigg_boss_10") || 
        value.includes("బిగ్ బాస్ 10") || 
        value.includes("బిగ్‌బాస్ 10") 
    ); 
 
} 
 
function normalPosts() { 
 
    return allPosts.filter(post => !isBigBoss(post)); 
 
} 
 
 
/* ========================================================= 
   SPORTS 
========================================================= */ 
 
function isSports(post) { 
 
    const value = catsOf(post); 
 
    return ( 
        /\bsports?\b/.test(value) || 
        value.includes("క్రీడ") || 
        value.includes("cricket") || 
        value.includes("ipl") 
    ); 
 
} 
 
 
/* ========================================================= 
   MOVIES 
========================================================= */ 
 
function isMovies(post) { 
 
    const value = catsOf(post); 
 
    return ( 
        /\bmovies?\b/.test(value) || 
        /\bcinema\b/.test(value) || 
        value.includes("movie") || 
        value.includes("film") || 
        value.includes("tollywood") || 
        value.includes("సినిమా") 
    ); 
 
} 
 
 
/* ========================================================= 
   BUSINESS 
========================================================= */ 
 
function isBusiness(post) { 
 
    const value = catsOf(post); 
 
    return ( 
        /\bbusiness\b/.test(value) || 
        /\bgold\b/.test(value) || 
        /\bfinance\b/.test(value) || 
        value.includes("బిజినెస్") 
    ); 
 
} 
 
 
/* ========================================================= 
   AP 
========================================================= */ 
 
function isAPNews(post) { 
 
    const value = catsOf(post); 
 
    return ( 
        /\bap\b/.test(value) || 
        value.includes("andhra-pradesh") || 
        value.includes("andhrapradesh") || 
        value.includes("andhra pradesh") || 
        value.includes("ap-news") || 
        value.includes("ap_news") || 
        value.includes("apnews") || 
        value.includes("ఆంధ్రప్రదేశ్") || 
        value.includes("ఆంధ్ర ప్రదేశ్") 
    ); 
 
} 
 
 
/* ========================================================= 
   TELANGANA 
========================================================= */ 
 
function isTSNews(post) { 
 
    const value = catsOf(post); 
 
    return ( 
        /\bts\b/.test(value) || 
        value.includes("telangana") || 
        value.includes("telangana-news") || 
        value.includes("telangana_news") || 
        value.includes("ts-news") || 
        value.includes("ts_news") || 
        value.includes("tsnews") || 
        value.includes("తెలంగాణ") 
    ); 
 
} 
 
 
/* ========================================================= 
   TITLE 
========================================================= */ 
 
function titleOf(post) { 
 
    const element = 
        $(".post-title", post) || 
        $(".article-title", post) || 
        $("h1", post) || 
        $("h2", post) || 
        $("h3", post) || 
        $(".news-content p", post) || 
        $("p", post) || 
        $("a", post); 
 
    return element 
        ? element.textContent.replace(/\s+/g, " ").trim() 
        : "BS 360 NEWS"; 
 
} 
 
 
/* ========================================================= 
   IMAGE 
========================================================= */ 
 
function imageOf(post) { 
 
    const image = $("img", post); 
 
    if (!image) 
        return "dp.png.png"; 
 
    return ( 
        image.getAttribute("src") || 
        image.getAttribute("data-src") || 
        image.getAttribute("data-lazy-src") || 
        "dp.png.png" 
    ); 
 
} 
 
 
/* ========================================================= 
   ALT 
========================================================= */ 
 
function altOf(post) { 
 
    const image = $("img", post); 
 
    return image 
        ? image.getAttribute("alt") || titleOf(post) 
        : titleOf(post); 
 
} 
 
 
/* ========================================================= 
   URL 
========================================================= */ 
 
function articleUrl(post) { 
 
    return ( 
        post.getAttribute("data-url") || 
        post.querySelector("a")?.getAttribute("href") || 
        "#" 
    ); 
 
} 
 
 
function openPost(post) { 
 
    const url = articleUrl(post); 
 
    if ( 
        url && 
        url !== "#" && 
        url !== "javascript:void(0)" 
    ) { 
        window.location.href = url; 
    } 
 
} 
 
 
/* ========================================================= 
   ESCAPE 
========================================================= */ 
 
function escapeHTML(value) { 
 
    return String(value) 
        .replace(/&/g, "&amp;") 
        .replace(/</g, "&lt;") 
        .replace(/>/g, "&gt;") 
        .replace(/"/g, "&quot;") 
        .replace(/'/g, "&#039;"); 
 
} 
 
 
/* ========================================================= 
   LABEL 
========================================================= */ 
 
function labelOf(post) { 
 
    if (isBigBoss(post)) 
        return "BIGG BOSS 10"; 
 
    if (isSports(post)) 
        return "SPORTS"; 
 
    if (isMovies(post)) 
        return "CINEMA"; 
 
    if (isBusiness(post)) 
        return "BUSINESS"; 
 
    if (isAPNews(post)) 
        return "AP"; 
 
    if (isTSNews(post)) 
        return "TELANGANA"; 
 
    return "LATEST"; 
 
} 
 
 
/* ========================================================= 
   CREATE CARD 
========================================================= */ 
 
function createCard( 
    post, 
    type = "latest", 
    customLabel = null 
) { 
 
    const card = 
        document.createElement("article"); 
 
    card.className = 
        "portal-card " + type + "-card"; 
 
    card.innerHTML = ` 
 
        <div class="portal-card-media"> 
 
            <img 
                src="${escapeHTML(imageOf(post))}" 
                alt="${escapeHTML(altOf(post))}" 
                loading="lazy" 
                onerror="this.onerror=null;this.src='dp.png.png';" 
            > 
 
        </div> 
 
        <div class="portal-card-body"> 
 
            <span class="portal-tag"> 
                ${escapeHTML( 
                    customLabel || labelOf(post) 
                )} 
            </span> 
 
            <h3> 
                ${escapeHTML(titleOf(post))} 
            </h3> 
 
        </div> 
 
    `; 
 
    card.addEventListener( 
        "click", 
        () => openPost(post) 
    ); 
 
    return card; 
} 
 
 
/* ========================================================= 
   CREATE TOP NEWS SECTION 
========================================================= */ 
 
function createTopNewsSection() { 
 
    if ($("#topNewsSection")) 
        return $("#topNewsSection"); 
 
    const section = 
        document.createElement("section"); 
 
    section.id = "topNewsSection"; 
    section.className = "top-news-section"; 
 
    section.innerHTML = ` 
 
        <div class="top-news-heading"> 
 
            <div> 
                <h2>🔥 TOP NEWS</h2> 
                <span>తాజా ముఖ్య వార్తలు</span> 
            </div> 
 
        </div> 
 
        <div class="top-news-layout"> 
 
            <div 
                class="top-news-main" 
                id="topNewsMain" 
            ></div> 
 
            <div class="top-news-side-window"> 
 
                <div 
                    class="top-news-side-track" 
                    id="topNewsSideTrack" 
                ></div> 
 
            </div> 
 
        </div> 
 
    `; 
 
    const latestSection = 
        $("#latestSection"); 
 
    if (latestSection) { 
 
        latestSection.parentNode.insertBefore( 
            section, 
            latestSection 
        ); 
 
    } 
 
    return section; 
} 
 
 
/* ========================================================= 
   TOP NEWS 
========================================================= */ 
 
let topNewsTimer = null; 
 
function renderTopNews(posts = normalPosts()) { 
 
    const section = 
        createTopNewsSection(); 
 
    const main = 
        $("#topNewsMain"); 
 
    const track = 
        $("#topNewsSideTrack"); 
 
    if (!main || !track) 
        return; 
 
    posts = posts 
        .filter(post => articleUrl(post) !== "#") 
        .filter(post => !isBigBoss(post)) 
        .slice(0, 8); 
 
    if (!posts.length) 
        return; 
 
    main.innerHTML = ""; 
    track.innerHTML = ""; 
 
    const mainPost = posts[0]; 
 
    const hero = 
        document.createElement("article"); 
 
    hero.className = 
        "top-news-main-card"; 
 
    hero.innerHTML = ` 
 
        <img 
            src="${escapeHTML(imageOf(mainPost))}" 
            alt="${escapeHTML(altOf(mainPost))}" 
            onerror="this.onerror=null;this.src='dp.png.png';" 
        > 
 
        <div class="top-news-main-overlay"> 
 
            <span>TOP NEWS</span> 
 
            <h2> 
                ${escapeHTML(titleOf(mainPost))} 
            </h2> 
 
            <small> 
                పూర్తి వార్త చదవండి → 
            </small> 
 
        </div> 
 
    `; 
 
    hero.addEventListener( 
        "click", 
        () => openPost(mainPost) 
    ); 
 
    main.appendChild(hero); 
 
 
    posts.slice(1, 6).forEach( 
        function (post) { 
 
            const item = 
                document.createElement("article"); 
 
            item.className = 
                "top-news-side-card"; 
 
            item.innerHTML = ` 
 
                <div class="top-news-side-image"> 
 
                    <img 
                        src="${escapeHTML(imageOf(post))}" 
                        alt="${escapeHTML(altOf(post))}" 
                        loading="lazy" 
                        onerror="this.onerror=null;this.src='dp.png.png';" 
                    > 
 
                </div> 
 
                <div class="top-news-side-content"> 
 
                    <span> 
                        ${escapeHTML(labelOf(post))} 
                    </span> 
 
                    <h3> 
                        ${escapeHTML(titleOf(post))} 
                    </h3> 
 
                </div> 
 
            `; 
 
            item.addEventListener( 
                "click", 
                () => openPost(post) 
            ); 
 
            track.appendChild(item); 
 
        } 
    ); 
 
 
    startTopNewsScroll(); 
} 
 
 
/* ========================================================= 
   TOP NEWS VERTICAL AUTO SCROLL 
========================================================= */ 
 
function startTopNewsScroll() { 
 
    const container = 
        $(".top-news-side-window"); 
 
    const track = 
        $("#topNewsSideTrack"); 
 
    if (!container || !track) 
        return; 
 
    if (topNewsTimer) 
        clearInterval(topNewsTimer); 
 
    let paused = false; 
 
    container.onmouseenter = () => { 
        paused = true; 
    }; 
 
    container.onmouseleave = () => { 
        paused = false; 
    }; 
 
    topNewsTimer = 
        setInterval(function () { 
 
            if (paused) 
                return; 
 
            if ( 
                window.innerWidth <= 768 
            ) { 
                return; 
            } 
 
            const max = 
                container.scrollHeight - 
                container.clientHeight; 
 
            if (max <= 5) 
                return; 
 
            const item = 
                track.querySelector( 
                    ".top-news-side-card" 
                ); 
 
            const distance = 
                item 
                    ? item.offsetHeight + 10 
                    : 90; 
 
            if ( 
                container.scrollTop >= 
                max - 5 
            ) { 
 
                container.scrollTo({ 
                    top: 0, 
                    behavior: "smooth" 
                }); 
 
            } else { 
 
                container.scrollBy({ 
                    top: distance, 
                    behavior: "smooth" 
                }); 
 
            } 
 
        }, 5000); 
} 
 
 
/* ========================================================= 
   LATEST NEWS 
========================================================= */ 
 
function renderLatestNews() { 
 
    const oldSection = 
        $("#latestSection"); 
 
    if (!oldSection) 
        return; 
 
    oldSection.className = 
        "latest-news-section"; 
 
    oldSection.innerHTML = ` 
 
        <div class="section-title-row"> 
 
            <h2>📰 Latest News</h2> 
 
            <span> 
                తాజా వార్తలు 
            </span> 
 
        </div> 
 
        <div 
            class="latest-news-slider" 
            id="latestNewsSlider" 
        ></div> 
 
    `; 
 
    const slider = 
        $("#latestNewsSlider"); 
 
    const posts = 
        normalPosts() 
            .slice(0, 12); 
 
    posts.forEach(function (post) { 
 
        slider.appendChild( 
            createCard( 
                post, 
                "latest" 
            ) 
        ); 
 
    }); 
 
    setupHorizontalAutoScroll( 
        slider, 
        305, 
        4000 
    ); 
} 
 
 
/* ========================================================= 
   BIGG BOSS 
========================================================= */ 
 
function renderBigBoss() { 
 
    const track = 
        $("#bigbossTrack"); 
 
    const slider = 
        $("#bigbossSlider"); 
 
    if (!track || !slider) 
        return; 
 
    track.innerHTML = ""; 
 
    const posts = 
        allPosts 
            .filter(isBigBoss) 
            .slice(0, 10); 
 
    posts.forEach(function (post) { 
 
        const card = 
            document.createElement("article"); 
 
        card.className = 
            "bigboss-card"; 
 
        card.innerHTML = ` 
 
            <img 
                src="${escapeHTML(imageOf(post))}" 
                alt="${escapeHTML(altOf(post))}" 
                loading="lazy" 
                onerror="this.onerror=null;this.src='dp.png.png';" 
            > 
 
            <div class="bigboss-overlay"> 
 
                <span class="bigboss-tag"> 
                    📺 BIGG BOSS 10 
                </span> 
 
                <h3> 
                    ${escapeHTML(titleOf(post))} 
                </h3> 
 
            </div> 
 
        `; 
 
        card.addEventListener( 
            "click", 
            () => openPost(post) 
        ); 
 
        track.appendChild(card); 
 
    }); 
 
    if (!posts.length) 
        return; 
 
    setupBigBossAutoScroll(slider); 
    setupBigBossButtons(slider); 
} 
 
 
/* ========================================================= 
   BIGG BOSS AUTO SCROLL 
========================================================= */ 
 
function setupBigBossAutoScroll(container) { 
 
    if ( 
        container.dataset.started === "true" 
    ) 
        return; 
 
    container.dataset.started = "true"; 
 
    let paused = false; 
 
    container.addEventListener( 
        "mouseenter", 
        () => paused = true 
    ); 
 
    container.addEventListener( 
        "mouseleave", 
        () => paused = false 
    ); 
 
    setInterval(function () { 
 
        if (paused) 
            return; 
 
        const max = 
            container.scrollWidth - 
            container.clientWidth; 
 
        if (max <= 5) 
            return; 
 
        if ( 
            container.scrollLeft >= 
            max - 10 
        ) { 
 
            container.scrollTo({ 
                left: 0, 
                behavior: "smooth" 
            }); 
 
        } else { 
 
            container.scrollBy({ 
                left: 260, 
                behavior: "smooth" 
            }); 
 
        } 
 
    }, 5000); 
} 
 
 
/* ========================================================= 
   BIGG BOSS BUTTONS 
========================================================= */ 
 
function setupBigBossButtons(slider) { 
 
    const prev = 
        $(".bigboss-prev"); 
 
    const next = 
        $(".bigboss-next"); 
 
    if (prev) { 
 
        prev.addEventListener( 
            "click", 
            () => { 
 
                slider.scrollBy({ 
                    left: -260, 
                    behavior: "smooth" 
                }); 
 
            } 
        ); 
 
    } 
 
    if (next) { 
 
        next.addEventListener( 
            "click", 
            () => { 
 
                const max = 
                    slider.scrollWidth - 
                    slider.clientWidth; 
 
                if ( 
                    slider.scrollLeft >= 
                    max - 10 
                ) { 
 
                    slider.scrollTo({ 
                        left: 0, 
                        behavior: "smooth" 
                    }); 
 
                } else { 
 
                    slider.scrollBy({ 
                        left: 260, 
                        behavior: "smooth" 
                    }); 
 
                } 
 
            } 
        ); 
 
    } 
} 
 
 
/* ========================================================= 
   AP + TS 
========================================================= */ 
 
function renderSlider() { 
 
    const track = 
        $("#sliderTrack"); 
 
    const container = 
        $("#newsSlider"); 
 
    if (!track) 
        return; 
 
    track.innerHTML = ""; 
 
    const posts = 
        normalPosts() 
            .filter(post => 
                isAPNews(post) || 
                isTSNews(post) 
            ) 
            .slice(0, 15); 
 
    posts.forEach(function (post) { 
 
        let label = "NEWS"; 
 
        if (isAPNews(post)) 
            label = "AP NEWS"; 
 
        if (isTSNews(post)) 
            label = "TS NEWS"; 
 
        track.appendChild( 
            createCard( 
                post, 
                "slider", 
                label 
            ) 
        ); 
 
    }); 
 
    setupHorizontalAutoScroll( 
        container, 
        270, 
        3500 
    ); 
} 
 
 
/* ========================================================= 
   BUSINESS 
========================================================= */ 
 
function createBusinessSection() { 
 
    if ($("#businessSection")) 
        return; 
 
    const section = 
        document.createElement("section"); 
 
    section.id = 
        "businessSection"; 
 
    section.className = 
        "category-section custom-business-section"; 
 
    section.innerHTML = ` 
 
        <div class="section-title-row"> 
 
            <h2>💰 Business</h2> 
 
            <span> 
                బిజినెస్ వార్తలు 
            </span> 
 
        </div> 
 
        <div 
            class="horizontal-carousel" 
            id="businessGrid" 
        ></div> 
 
    `; 
 
    const cinema = 
        $("#cinemaSection"); 
 
    if (cinema) { 
 
        cinema.parentNode.insertBefore( 
            section, 
            cinema 
        ); 
 
    } 
 
    const grid = 
        $("#businessGrid"); 
 
    normalPosts() 
        .filter(isBusiness) 
        .slice(0, 12) 
        .forEach(post => { 
 
            grid.appendChild( 
                createCard( 
                    post, 
                    "category", 
                    "BUSINESS" 
                ) 
            ); 
 
        }); 
 
    setupHorizontalAutoScroll( 
        grid, 
        285, 
        3500 
    ); 
} 
 
 
/* ========================================================= 
   MOVIES 
   EXACTLY 10 ARTICLES 
========================================================= */ 
 
function renderMovies() { 
 
    const target = 
        $("#cinemaGrid"); 
 
    if (!target) 
        return; 
 
    target.innerHTML = ""; 
 
    normalPosts() 
        .filter(isMovies) 
        .slice(0, 10) 
        .forEach(post => { 
 
            target.appendChild( 
                createCard( 
                    post, 
                    "category", 
                    "CINEMA" 
                ) 
            ); 
 
        }); 
 
    setupHorizontalAutoScroll( 
        target, 
        285, 
        3500 
    ); 
} 
 
 
/* ========================================================= 
   SPORTS 
   EXACTLY 10 ARTICLES 
========================================================= */ 
 
function renderSports() { 
 
    const target = 
        $("#sportsGrid"); 
 
    if (!target) 
        return; 
 
    target.innerHTML = ""; 
 
    normalPosts() 
        .filter(isSports) 
        .slice(0, 10) 
        .forEach(post => { 
 
            target.appendChild( 
                createCard( 
                    post, 
                    "sports", 
                    "SPORTS" 
                ) 
            ); 
 
        }); 
 
    setupHorizontalAutoScroll( 
        target, 
        300, 
        3500 
    ); 
} 
 
 
/* ========================================================= 
   HORIZONTAL AUTO SCROLL 
========================================================= */ 
 
function setupHorizontalAutoScroll( 
    container, 
    distance = 280, 
    interval = 3500 
) { 
 
    if (!container) 
        return; 
 
    if ( 
        container.dataset.autoStarted === "true" 
    ) 
        return; 
 
    container.dataset.autoStarted = "true"; 
 
    let paused = false; 
 
    container.addEventListener( 
        "mouseenter", 
        () => paused = true 
    ); 
 
    container.addEventListener( 
        "mouseleave", 
        () => paused = false 
    ); 
 
    setInterval(function () { 
 
        if (paused) 
            return; 
 
        const max = 
            container.scrollWidth - 
            container.clientWidth; 
 
        if (max <= 5) 
            return; 
 
        if ( 
            container.scrollLeft >= 
            max - 10 
        ) { 
 
            container.scrollTo({ 
                left: 0, 
                behavior: "smooth" 
            }); 
 
        } else { 
 
            container.scrollBy({ 
                left: distance, 
                behavior: "smooth" 
            }); 
 
        } 
 
    }, interval); 
} 
 
 
/* ========================================================= 
   MOST READ 
   IMAGE TOP 
   TEXT ONLY BELOW IMAGE 
========================================================= */ 
 
function renderMostRead() { 
 
    const target = 
        $("#mostReadList"); 
 
    if (!target) 
        return; 
 
    target.innerHTML = ""; 
 
    normalPosts() 
        .slice(0, 12) 
        .forEach(function (post) { 
 
            const item = 
                document.createElement("article"); 
 
            item.className = 
                "most-read-item"; 
 
            item.innerHTML = ` 
 
                <div class="most-read-image"> 
 
                    <img 
                        src="${escapeHTML(imageOf(post))}" 
                        alt="${escapeHTML(altOf(post))}" 
                        loading="lazy" 
                        onerror="this.onerror=null;this.src='dp.png.png';" 
                    > 
 
                </div> 
 
                <div class="most-read-text"> 
 
                    <h3> 
                        ${escapeHTML(titleOf(post))} 
                    </h3> 
 
                </div> 
 
            `; 
 
            item.style.display = "block"; 
            item.style.width = "100%"; 
 
            const imageBox = 
                item.querySelector( 
                    ".most-read-image" 
                ); 
 
            const textBox = 
                item.querySelector( 
                    ".most-read-text" 
                ); 
 
            if (imageBox) { 
 
                imageBox.style.display = "block"; 
                imageBox.style.width = "100%"; 
 
            } 
 
            if (textBox) { 
 
                textBox.style.display = "block"; 
                textBox.style.width = "100%"; 
                textBox.style.position = "static"; 
                textBox.style.transform = "none"; 
 
            } 
 
            item.addEventListener( 
                "click", 
                () => openPost(post) 
            ); 
 
            target.appendChild(item); 
 
        }); 
} 
 
 
/* ========================================================= 
   SEARCH 
========================================================= */ 
 
function performSearch() { 
 
    const input = 
        $("#searchInput"); 
 
    if (!input) 
        return; 
 
    const query = 
        input.value 
            .trim() 
            .toLowerCase(); 
 
    if (!query) { 
 
        renderTopNews(); 
        renderLatestNews(); 
 
        return; 
    } 
 
    const matched = 
        normalPosts() 
            .filter(post => 
                titleOf(post) 
                    .toLowerCase() 
                    .includes(query) 
                || 
                catsOf(post) 
                    .includes(query) 
            ); 
 
    renderSearchResults(matched); 
} 
 
 
function renderSearchResults(posts) { 
 
    const main = 
        $("#topNewsMain"); 
 
    const track = 
        $("#topNewsSideTrack"); 
 
    if (!main || !track) 
        return; 
 
    main.innerHTML = ""; 
    track.innerHTML = ""; 
 
    if (!posts.length) { 
 
        main.innerHTML = ` 
 
            <div class="no-results"> 
 
                <h3> 
                    వార్తలు కనిపించలేదు 
                </h3> 
 
                <p> 
                    మరో keywordతో search చేయండి. 
                </p> 
 
            </div> 
 
        `; 
 
        return; 
    } 
 
    renderTopNews(posts); 
} 
 
 
/* ========================================================= 
   SEARCH SETUP 
========================================================= */ 
 
function setupSearch() { 
 
    const button = 
        $("#searchButton"); 
 
    const box = 
        $("#searchBox"); 
 
    const input = 
        $("#searchInput"); 
 
    const submit = 
        $("#searchSubmit"); 
 
    if (button && box) { 
 
        button.addEventListener( 
            "click", 
            function () { 
 
                box.classList.toggle("active"); 
                box.classList.toggle("open"); 
 
                if ( 
                    box.classList.contains("active") && 
                    input 
                ) { 
 
                    setTimeout( 
                        () => input.focus(), 
                        100 
                    ); 
 
                } 
 
            } 
        ); 
 
    } 
 
    if (submit) 
        submit.addEventListener( 
            "click", 
            performSearch 
        ); 
 
    if (input) { 
 
        input.addEventListener( 
            "keydown", 
            event => { 
 
                if (event.key === "Enter") { 
 
                    event.preventDefault(); 
 
                    performSearch(); 
 
                } 
 
            } 
        ); 
 
    } 
} 
 
window.searchNews = 
    performSearch; 
 
 
/* ========================================================= 
   MOBILE MENU 
========================================================= */ 
 
function setupMobileMenu() { 
 
    const toggle = 
        $("#mobileMenuToggle"); 
 
    const nav = 
        $(".nav-links"); 
 
    if (!toggle || !nav) 
        return; 
 
    toggle.addEventListener( 
        "click", 
        () => { 
 
            nav.classList.toggle( 
                "mobile-open" 
            ); 
 
        } 
    ); 
} 
 
window.toggleMobileNav = 
function () { 
 
    const nav = 
        $(".nav-links"); 
 
    if (nav) 
        nav.classList.toggle( 
            "mobile-open" 
        ); 
 
}; 
 
 
/* ========================================================= 
   DARK MODE 
========================================================= */ 
 
function setupDarkMode() { 
 
    const button = 
        $("#themeButton"); 
 
    if ( 
        localStorage.getItem( 
            "bs360-dark-mode" 
        ) === "true" 
    ) { 
 
        document.body.classList.add( 
            "dark-mode" 
        ); 
 
    } 
 
    updateThemeButton(); 
 
    if (button) { 
 
        button.addEventListener( 
            "click", 
            window.toggleTheme 
        ); 
 
    } 
} 
 
window.toggleTheme = 
function () { 
 
    document.body.classList.toggle( 
        "dark-mode" 
    ); 
 
    localStorage.setItem( 
        "bs360-dark-mode", 
        document.body.classList.contains( 
            "dark-mode" 
        ) 
    ); 
 
    updateThemeButton(); 
 
}; 
 
function updateThemeButton() { 
 
    const button = 
        $("#themeButton"); 
 
    if (!button) 
        return; 
 
    button.textContent = 
        document.body.classList.contains( 
            "dark-mode" 
        ) 
            ? "☀️" 
            : "🌙"; 
} 
 
 
/* ========================================================= 
   DATE + TIME 
========================================================= */ 
 
function setupDateTime() { 
 
    let dateElement = 
        $("#currentDate") || 
        $("#live-date"); 
 
    let timeElement = 
        $("#currentTime") || 
        $("#live-clock"); 
 
    if (!dateElement || !timeElement) { 
 
        const headerActions = 
            $(".header-actions"); 
 
        if (headerActions) { 
 
            const box = 
                document.createElement("div"); 
 
            box.className = 
                "date-time-box"; 
 
            box.innerHTML = ` 
 
                <span id="currentDate"></span> 
 
                <strong id="currentTime"></strong> 
 
            `; 
 
            headerActions.insertBefore( 
                box, 
                headerActions.firstChild 
            ); 
 
            dateElement = 
                $("#currentDate"); 
 
            timeElement = 
                $("#currentTime"); 
 
        } 
 
    } 
 
    if (!dateElement && !timeElement) 
        return; 
 
    function update() { 
 
        const now = new Date(); 
 
        if (dateElement) { 
 
            dateElement.textContent = 
                now.toLocaleDateString( 
                    "en-IN", 
                    { 
                        weekday:"short", 
                        day:"2-digit", 
                        month:"short", 
                        year:"numeric" 
                    } 
                ); 
 
        } 
 
        if (timeElement) { 
 
            timeElement.textContent = 
                now.toLocaleTimeString( 
                    "en-IN", 
                    { 
                        hour:"2-digit", 
                        minute:"2-digit", 
                        second:"2-digit", 
                        hour12:true 
                    } 
                ); 
 
        } 
 
    } 
 
    update(); 
 
    setInterval(update,1000); 
} 
 
 
/* ========================================================= 
   SLIDER BUTTONS 
========================================================= */ 
 
function setupSliderButtons() { 
 
    const slider = 
        $("#newsSlider"); 
 
    if (!slider) 
        return; 
 
    const prev = 
        $("#sliderPrev"); 
 
    const next = 
        $("#sliderNext"); 
 
    if (prev) { 
 
        prev.addEventListener( 
            "click", 
            () => { 
 
                slider.scrollBy({ 
                    left:-280, 
                    behavior:"smooth" 
                }); 
 
            } 
        ); 
 
    } 
 
    if (next) { 
 
        next.addEventListener( 
            "click", 
            () => { 
 
                slider.scrollBy({ 
                    left:280, 
                    behavior:"smooth" 
                }); 
 
            } 
        ); 
 
    } 
} 
 
 
/* ========================================================= 
   NAV ACTIVE 
========================================================= */ 
 
function setupActiveNav() { 
 
    const links = 
        document.querySelectorAll( 
            ".main-nav a" 
        ); 
 
    const current = 
        window.location.pathname 
            .split("/") 
            .pop() 
            .toLowerCase(); 
 
    links.forEach(link => { 
 
        const href = 
            link.getAttribute("href"); 
 
        if (!href) 
            return; 
 
        const page = 
            href 
                .split("/") 
                .pop() 
                .toLowerCase(); 
 
        if ( 
            page === current || 
            ( 
                current === "" && 
                page === "index.html" 
            ) 
        ) { 
 
            link.classList.add("active"); 
 
        } 
 
    }); 
 
} 
 
 
/* ========================================================= 
   INITIALIZE 
========================================================= */ 
 
function initializePortal() { 
 
    if (!allPosts.length) { 
 
        console.warn( 
            "BS 360 NEWS: No articles found." 
        ); 
 
        return; 
    } 
 
    /* TOP NEWS */ 
 
    renderTopNews(); 
 
    /* LATEST */ 
 
    renderLatestNews(); 
 
    /* BIGG BOSS */ 
 
    renderBigBoss(); 
 
    /* AP + TS */ 
 
    renderSlider(); 
 
    /* BUSINESS */ 
 
    createBusinessSection(); 
 
    /* MOVIES - 10 ARTICLES */ 
 
    renderMovies(); 
 
    /* SPORTS - 10 ARTICLES */ 
 
    renderSports(); 
 
    /* MOST READ */ 
 
    renderMostRead(); 
 
    /* SEARCH */ 
 
    setupSearch(); 
 
    /* MOBILE */ 
 
    setupMobileMenu(); 
 
    /* DARK */ 
 
    setupDarkMode(); 
 
    /* DATE TIME */ 
 
    setupDateTime(); 
 
    /* BUTTONS */ 
 
    setupSliderButtons(); 
 
    /* NAV */ 
 
    setupActiveNav(); 
 
} 
 
initializePortal(); 
 
}); 
 
 
/* ========================================================= 
   GLOBAL SEARCH 
========================================================= */ 
 
window.toggleSearch = 
function () { 
 
    const box = 
        document.querySelector( 
            "#searchBox" 
        ); 
 
    if (!box) 
        return; 
 
    box.classList.toggle("active"); 
    box.classList.toggle("open"); 
 
    const input = 
        document.querySelector( 
            "#searchInput" 
        ); 
 
    if ( 
        input && 
        box.classList.contains("active") 
    ) { 
 
        setTimeout( 
            () => input.focus(), 
            100 
        ); 
 
    } 
 
};
