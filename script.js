// Sample Post Data
const posts = [
    {
        id: 1,
        title: "Suresh 360 Media గ్రాండ్ లాంచ్!",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
        date: "March 30, 2026",
        snippet: "సురేష్ 360 میڈیا అధికారికంగా ప్రారంభించబడింది. మరింత సమాచారం కోసం క్లిక్ చేయండి...",
        fullContent: "సురేష్ 360 میڈیا వెబ్‌సైట్ విజయవంతంగా ప్రారంభించబడింది. ప్రతిరోజూ లేటెస్ట్ వార్తలు, సినిమా అప్‌డేట్స్, స్పోర్ట్స్ మరియు టెక్నాలజీకి సంబంధించిన విశేషాలను ఇక్కడ పొందవచ్చు."
    },
    {
        id: 2,
        title: "క్రికెట్ ప్రపంచంలో సంచలనం",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600",
        date: "March 29, 2026",
        snippet: "తాజా మ్యాచ్ వివరాలు మరియు ప్లేయర్ల రికార్డుల గురించిన పూర్తి వివరాలు...",
        fullContent: "నేడు జరిగిన ఉత్కంఠభరితమైన మ్యాచ్‌లో ఆఖరి బంతికి విజయం దక్కింది. ఆటగాళ్ల ప్రదర్శన అభిమానులను విశేషంగా ఆకట్టుకుంది."
    },
    {
        id: 3,
        title: "టెక్నాలజీ రంగంలో కొత్త మార్పులు",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        date: "March 28, 2026",
        snippet: "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ రంగంలో సరికొత్త విప్లవం రాబోతోంది...",
        fullContent: "టెక్నాలజీ వేగంగా మారుతోంది. రోజురోజుకూ ఏఐ (AI) అభివృద్ధి చెందుతున్న తీరు అందరినీ ఆశ్చర్యపరుస్తోంది."
    },
    {
        id: 4,
        title: "లేటెస్ట్ మూవీ అప్‌డేట్: బాక్సాఫీస్ వద్ద రికార్డుల సునామీ!",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600",
        date: "August 7, 2026",
        snippet: "ఈ వారం విడుదలైన కొత్త సినిమా థియేటర్లలో భారీ కలెక్షన్లతో దూసుకుపోతోంది...",
        fullContent: "ఈ వారం థియేటర్లలో విడుదలైన బిగ్ బడ్జెట్ మూవీ ప్రేక్షకులను విశేషంగా ఆకట్టుకుంటోంది. మొదటి రోజు నుంచే హౌస్‌ఫుల్ బోర్డులతో బాక్సాఫీస్ వద్ద కలెక్షన్ల వర్షం కురిపిస్తోంది."
    }
];

// Load Main Posts Grid
const postsContainer = document.getElementById("posts-container");

function loadPosts() {
    postsContainer.innerHTML = "";
    posts.forEach(post => {
        const postCard = document.createElement("div");
        postCard.classList.add("card");
        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}">
            <div class="card-content">
                <h3>${post.title}</h3>
                <p>${post.snippet}</p>
                <button class="read-more-btn" onclick="openModal(${post.id})">Read More</button>
            </div>
        `;
        postsContainer.appendChild(postCard);
    });
}

// Open Modal Window & Show Related Posts
function openModal(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        document.getElementById("modal-title").innerText = post.title;
        document.getElementById("modal-img").src = post.image;
        document.getElementById("modal-date").innerText = "Published on " + post.date;
        document.getElementById("modal-body").innerText = post.fullContent;
        
        // Related Posts జనరేట్ చేయడం (ప్రస్తుత పోస్ట్ కాకుండా మిగిలినవి)
        const relatedContainer = document.getElementById("related-posts");
        if (relatedContainer) {
            relatedContainer.innerHTML = "";
            const otherPosts = posts.filter(p => p.id !== id);
            
            otherPosts.forEach(rel => {
                const item = document.createElement("div");
                item.classList.add("related-item");
                item.onclick = () => openModal(rel.id);
                item.innerHTML = `
                    <img src="${rel.image}" alt="${rel.title}">
                    <h4>${rel.title}</h4>
                `;
                relatedContainer.appendChild(item);
            });
        }

        document.getElementById("post-modal").style.display = "flex";
    }
}

// Close Modal Window
function closeModal() {
    document.getElementById("post-modal").style.display = "none";
}

window.onclick = function(event) {
    const modal = document.getElementById("post-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

loadPosts();

