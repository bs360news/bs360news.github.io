// ========================================
// SURESH 360 MEDIA - MAIN SCRIPT
// ========================================

const posts = [
    {
        id: 1,
        category: "news",
        title: "Suresh 360 Media గ్రాండ్ లాంచ్!",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
        date: "March 30, 2026",
        snippet: "సురేష్ 360 మీడియా అధికారికంగా ప్రారంభించబడింది. మరింత సమాచారం కోసం క్లిక్ చేయండి...",
        fullContent: "సురేష్ 360 మీడియా వెబ్‌సైట్ విజయవంతంగా ప్రారంభించబడింది. ప్రతిరోజూ లేటెస్ట్ వార్తలు, సినిమా అప్‌డేట్స్, స్పోర్ట్స్ మరియు టెక్నాలజీకి సంబంధించిన విశేషాలను ఇక్కడ పొందవచ్చు."
    },

    {
        id: 2,
        category: "sports",
        title: "క్రికెట్ ప్రపంచంలో సంచలనం",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600",
        date: "March 29, 2026",
        snippet: "తాజా మ్యాచ్ వివరాలు మరియు ప్లేయర్ల రికార్డుల గురించిన పూర్తి వివరాలు...",
        fullContent: "నేడు జరిగిన ఉత్కంఠభరితమైన మ్యాచ్‌లో ఆఖరి బంతికి విజయం దక్కింది. ఆటగాళ్ల ప్రదర్శన అభిమానులను విశేషంగా ఆకట్టుకుంది."
    },

    {
        id: 3,
        category: "technology",
        title: "టెక్నాలజీ రంగంలో కొత్త మార్పులు",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        date: "March 28, 2026",
        snippet: "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ రంగంలో సరికొత్త విప్లవం రాబోతోంది...",
        fullContent: "టెక్నాలజీ వేగంగా మారుతోంది. రోజురోజుకూ AI అభివృద్ధి చెందుతున్న తీరు అందరినీ ఆశ్చర్యపరుస్తోంది."
    },

    {
        id: 4,
        category: "movies",
        title: "లేటెస్ట్ మూవీ అప్‌డేట్: బాక్సాఫీస్ వద్ద రికార్డుల సునామీ!",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
        date: "August 7, 2026",
        snippet: "ఈ వారం విడుదలైన కొత్త సినిమా థియేటర్లలో భారీ కలెక్షన్లతో దూసుకుపోతోంది...",
        fullContent: "ఈ వారం థియేటర్లలో విడుదలైన బిగ్ బడ్జెట్ మూవీ ప్రేక్షకులను విశేషంగా ఆకట్టుకుంటోంది. మొదటి రోజు నుంచే హౌస్‌ఫుల్ బోర్డులతో బాక్సాఫీస్ వద్ద కలెక్షన్ల వర్షం కురుస్తోంది."
    },

    // ========================================
    // CRICKET RECORDS
    // ========================================

    {
        id: 5,
        category: "sports",
        title: "💥 5000 వన్డేల చరిత్రలో చెరిగిపోని ఆల్‌టైమ్ రికార్డులు!",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600",
        date: "August 8, 2026",

        snippet:
            "అంతర్జాతీయ వన్డే క్రికెట్ చరిత్రలో ఎప్పటికీ గుర్తుండిపోయే అత్యుత్తమ రికార్డులు!",

        fullContent: `
అంతర్జాతీయ వన్డే క్రికెట్ (Mens ODI) చరిత్రలో ఎప్పటికీ గుర్తుండిపోయేలా కొంతమంది ఆటగాళ్లు మరియు జట్లు నెలకొల్పిన అత్యుత్తమ రికార్డులు ఇవే!

👑 రోహిత్ శర్మ (IND)

• అత్యధిక వ్యక్తిగత స్కోరు: 264 పరుగులు
• అత్యధిక డబుల్ సెంచరీలు: 3 ద్విశతకాలు


👑 విరాట్ కోహ్లీ (IND)

• అత్యధిక సెంచరీలు: 54 సెంచరీలు


👑 సచిన్ టెండూల్కర్ (IND)

• అత్యధిక పరుగులు: 18,426 పరుగులు


⚡ చమిందా వాస్ (SL)

• బెస్ట్ బౌలింగ్ ఫిగర్స్: 8/19


⚡ ముత్తయ్య మురళీధరన్ (SL)

• అత్యధిక వికెట్లు: 534 వికెట్లు


🏆 జట్ల రికార్డులు

• అత్యధిక టీమ్ స్కోర్: ఇంగ్లండ్ — 498/4
• అత్యల్ప టీమ్ స్కోర్: జింబాబ్వే — 35 పరుగులు


💬 ఈ రికార్డులలో మీ ఫేవరెట్ రికార్డ్ ఏంటో కామెంట్ చేయండి!

#Suresh360Media
#CricketRecords
#RohitSharma
#ViratKohli
#SachinTendulkar
#TeamIndia
`
    }
];


// ========================================
// LOAD POSTS
// ========================================

function loadPosts() {

    const container =
        document.getElementById("posts-container");

    if (!container) return;

    container.innerHTML = "";

    posts.forEach(post => {

        const card =
            document.createElement("div");

        card.className = "card";

        card.innerHTML = `

            <img
                src="${post.image}"
                alt="${post.title}"
                loading="lazy"
            >

            <div class="card-content">

                <span class="category">
                    ${post.category.toUpperCase()}
                </span>

                <h3>
                    ${post.title}
                </h3>

                <p>
                    ${post.snippet}
                </p>

                <button
                    class="read-more-btn"
                    onclick="openModal(${post.id})"
                >
                    పూర్తి వార్త →
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// ========================================
// OPEN ARTICLE MODAL
// ========================================

function openModal(id) {

    const post =
        posts.find(item => item.id === id);

    if (!post) return;

    const modal =
        document.getElementById("post-modal");

    document.getElementById("modal-title")
        .innerText = post.title;

    document.getElementById("modal-img")
        .src = post.image;

    document.getElementById("modal-img")
        .alt = post.title;

    document.getElementById("modal-date")
        .innerText = "Published on " + post.date;

    document.getElementById("modal-body")
        .innerText = post.fullContent;


    // ========================================
    // RELATED POSTS
    // ========================================

    const related =
        document.getElementById("related-posts");

    if (related) {

        related.innerHTML = "";

        const relatedPosts =
            posts.filter(item => item.id !== id);

        relatedPosts.forEach(item => {

            const relatedCard =
                document.createElement("div");

            relatedCard.className =
                "related-item";

            relatedCard.innerHTML = `

                <img
                    src="${item.image}"
                    alt="${item.title}"
                    loading="lazy"
                >

                <h4>
                    ${item.title}
                </h4>

            `;

            relatedCard.onclick = function () {
                openModal(item.id);
            };

            related.appendChild(relatedCard);
        });
    }


    // SHOW MODAL

    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    const modal =
        document.getElementById("post-modal");

    if (!modal) return;

    modal.style.display = "none";

    document.body.style.overflow = "auto";
}


// ========================================
// CLICK OUTSIDE MODAL
// ========================================

window.addEventListener("click", function (event) {

    const modal =
        document.getElementById("post-modal");

    if (event.target === modal) {

        closeModal();

    }

});


// ========================================
// ESC KEY CLOSE
// ========================================

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeModal();

    }

});


// ========================================
// SEARCH POSTS
// ========================================

function searchPosts() {

    const input =
        document.getElementById("search-input");

    const container =
        document.getElementById("posts-container");

    if (!input || !container) return;

    const searchText =
        input.value.trim().toLowerCase();

    const cards =
        container.querySelectorAll(".card");

    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        if (text.includes(searchText)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });
}


// ========================================
// CATEGORY FILTER
// ========================================

function filterPosts(category) {

    const container =
        document.getElementById("posts-container");

    if (!container) return;

    const cards =
        container.querySelectorAll(".card");

    cards.forEach((card, index) => {

        const post = posts[index];

        if (
            category === "all" ||
            post.category === category
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });
}


// ========================================
// BREAKING NEWS
// ========================================

const breakingNews = [

    "🚨 Suresh 360 Media తాజా వార్తలు మీ ముందుకు...",

    "🔥 క్రికెట్ ప్రపంచంలోని తాజా అప్‌డేట్స్ ఇక్కడ చూడండి...",

    "🎬 సినిమా ఇండస్ట్రీలో తాజా వార్తలు...",

    "⚡ బ్రేకింగ్ న్యూస్ కోసం Suresh 360 Mediaను ఫాలో అవ్వండి..."

];

let breakingIndex = 0;

function updateBreakingNews() {

    const ticker =
        document.getElementById("ticker");

    if (!ticker) return;

    ticker.innerText =
        breakingNews[breakingIndex];

    breakingIndex++;

    if (
        breakingIndex >= breakingNews.length
    ) {

        breakingIndex = 0;

    }
}

setInterval(
    updateBreakingNews,
    4000
);


// ========================================
// PAGE LOAD
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadPosts();

        updateBreakingNews();

    }
);

function sharePost(button) {
    const card = button.closest(".post");

    const title =
        card?.querySelector("h2")?.innerText ||
        document.title;

    const url = window.location.href;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: title,
            url: url
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert("Post link copied! 🔗");
        });
    }
}
