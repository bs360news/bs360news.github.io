// Filter Posts by Category
function filterPosts(category) {
    document.querySelectorAll('.post').forEach(p => {
        p.classList.toggle('hidden', category !== 'all' && p.dataset.category !== category);
    });
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Live Search System
function searchPosts() {
    const searchInput = document.getElementById('search-input');
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    document.querySelectorAll('.post').forEach(p => {
        const text = p.innerText.toLowerCase();
        p.classList.toggle('hidden', q && !text.includes(q));
    });
}

// Web Share API System
function sharePost(btn) {
    const postElement = btn.closest('.post');
    const titleElement = postElement ? postElement.querySelector('h1, h3') : null;
    const title = titleElement ? titleElement.innerText : 'Suresh 360 Media';

    if (navigator.share) {
        navigator.share({
            title: title,
            url: window.location.href
        }).catch(() => {});
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert('లింక్ కాపీ అయింది!');
    }
}

// Dark / Light Theme Toggle
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const btn = document.querySelector('.theme-btn');
    if (btn) {
        btn.textContent = document.body.classList.contains('dark-mode') ? '☀️ Light' : '🌙 Dark';
    }
}

// Breaking News Ticker System
const ticker = [
    'సురేష్ 360 మీడియా తాజా వార్తలు మీ ముందుకు...',
    'సినిమా, స్పోర్ట్స్, తెలుగు రాష్ట్రాల ముఖ్యమైన అప్‌డేట్స్...',
    'బ్రేకింగ్ న్యూస్ కోసం Suresh 360 Mediaను ఫాలో అవ్వండి...'
];
let ti = 0;

setInterval(() => {
    const tickerElement = document.getElementById('ticker');
    if (tickerElement) {
        ti = (ti + 1) % ticker.length;
        tickerElement.textContent = ticker[ti];
    }
}, 4000);

// Live Date & Clock System
function updateClock() {
    const now = new Date();
    const clockElem = document.getElementById('live-clock');
    const dateElem = document.getElementById('live-date');
    if(clockElem) clockElem.innerText = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    if(dateElem) dateElem.innerText = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: '2-digit', year: 'numeric' }); 
}
setInterval(updateClock, 1000);
updateClock();

// Auto Time Ago System
function updateTimeAgo() {
    const timeElements = document.querySelectorAll('.time-stamp[data-time]');
    
    timeElements.forEach(el => {
        const timeAttr = el.getAttribute('data-time');
        if (!timeAttr) return;

        const postTime = new Date(timeAttr).getTime();
        const currentTime = new Date().getTime();

        if (isNaN(postTime)) return;

        const diffInSeconds = Math.floor((currentTime - postTime) / 1000);
        let timeString = "";

        if (diffInSeconds < 60) {
            timeString = "Just Now";
        } else if (diffInSeconds < 3600) {
            const mins = Math.floor(diffInSeconds / 60);
            timeString = `${mins} min${mins > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            timeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            timeString = `${days} day${days > 1 ? 's' : ''} ago`;
        }

        el.innerText = `🕒 ${timeString}`;
    });
}

// Initial Run and Interval Set for Time Ago
updateTimeAgo();
setInterval(updateTimeAgo, 60000);
// Auto Time Ago System
function updateTimeAgo() {
    const timeElements = document.querySelectorAll('.time-stamp[data-time]');
    
    timeElements.forEach(el => {
        const timeAttr = el.getAttribute('data-time');
        if (!timeAttr) return;

        const postTime = new Date(timeAttr).getTime();
        const currentTime = new Date().getTime();

        if (isNaN(postTime)) return;

        const diffInSeconds = Math.floor((currentTime - postTime) / 1000);
        let timeString = "";

        if (diffInSeconds < 60) {
            timeString = "Just Now";
        } else if (diffInSeconds < 3600) {
            const mins = Math.floor(diffInSeconds / 60);
            timeString = `${mins} min${mins > 1 ? 's' : ''} ago`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            timeString = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            timeString = `${days} day${days > 1 ? 's' : ''} ago`;
        }

        el.innerText = `🕒 ${timeString}`;
    });
}

// Page Load అవ్వగానే మరియు ప్రతి నిమిషానికి టైమ్ అప్‌డేట్ అవుతుంది
document.addEventListener('DOMContentLoaded', updateTimeAgo);
setInterval(updateTimeAgo, 60000);

