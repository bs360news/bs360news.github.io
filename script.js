// Sample Post Data (ఇక్కడ మీరు కొత్త పోస్ట్‌లను యాడ్ చేసుకోవచ్చు)
const posts = [
    {
        
        id: 1,
        title: "Suresh 360 Media గ్రాండ్ లాంచ్!",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600",
        date: "March 30, 2026",
        snippet: "సురేష్ 360 మీడియా అధికారికంగా ప్రారంభించబడింది. మరింత సమాచారం కోసం ఇక్కడ క్లిక్ చేయండి...",
        fullContent: "సురేష్ 360 మీడియా వెబ్‌సైట్ విజయవంతంగా ప్రారంభించబడింది. ప్రతిరోజూ లేటెస్ట్ వార్తలు, సినిమా అప్‌డేట్స్, స్పోర్ట్స్ మరియు టెక్నాలజీకి సంబంధించిన విశేషాలను ఇక్కడ పొందవచ్చు. నిరంతరం అప్‌డేట్‌గా ఉండటానికి మన వెబ్‌సైట్‌ను ఫాలో అవ్వండి."
    },
    {
        id: 2,
        title: "క్రికెట్ ప్రపంచంలో సంచలనం",
        image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600",
        date: "March 29, 2026",
        snippet: "తాజా మ్యాచ్ వివరాలు మరియు ప్లేయర్ల రికార్డుల గురించిన పూర్తి వివరాలు...",
        fullContent: "నేడు జరిగిన ఉత్కంఠభరితమైన మ్యాచ్‌లో ఆఖరి బంతికి విజయం దక్కింది. ఆటగాళ్ల ప్రదర్శన అభిమానులను విశేషంగా ఆకట్టుకుంది. ఈ మ్యాచ్‌కు సంబంధించిన పూర్తి రికార్డులు మరియు మ్యాచ్ హైలైట్స్ కోసం సురేష్ 360 మీడియా చూస్తూనే ఉండండి."
    },
    {
        id: 3,
        title: "టెక్నాలజీ రంగంలో కొత్త మార్పులు",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        date: "March 28, 2026",
        snippet: "ఆర్టిఫిషియల్ ఇంటెలిజెన్స్ రంగంలో సరికొత్త విప్లవం రాబోతోంది...",
        fullContent: "టెక్నాలజీ వేగంగా మారుతోంది. రోజురోజుకూ ఏఐ (AI) అభివృద్ధి చెందుతున్న తీరు అందరినీ ఆశ్చర్యపరుస్తోంది. కొత్తగా రాబోతున్న టెక్నాలజీ టూల్స్ మన దైనందిన జీవితాన్ని మరింత సులభతరం చేయనున్నాయి."
    },
            id: 4,
        title: "మీ 4వ పోస్ట్ టైటిల్",
        image: "https://your-image-url.com/photo.jpg",
        date: "August 7, 2026",
        snippet: "ఇక్కడ చిన్న వివరణ రాయండి...",
        fullContent: "ఇక్కడ పూర్తి వార్త లేదా వ్యాసం రాయండి..."
},
];

// Load Posts Dynamic గా జనరేట్ చేయడం
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

// Open Modal Window
function openModal(id) {
    const post = posts.find(p => p.id === id);
    if (post) {
        document.getElementById("modal-title").innerText = post.title;
        document.getElementById("modal-img").src = post.image;
        document.getElementById("modal-date").innerText = "Published on " + post.date;
        document.getElementById("modal-body").innerText = post.fullContent;
        document.getElementById("post-modal").style.display = "flex";
    }
}

// Close Modal Window
function closeModal() {
    document.getElementById("post-modal").style.display = "none";
}

// Window బయట క్లిక్ చేస్తే ప్యానెల్ క్లోజ్ అవ్వడానికి
window.onclick = function(event) {
    const modal = document.getElementById("post-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

// Initiate Load Posts
loadPosts();
