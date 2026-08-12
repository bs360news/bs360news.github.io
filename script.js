// =====================================================
// BS 360 NEWS - MAIN JAVASCRIPT
// =====================================================


// 1. FILTER POSTS BY CATEGORY
function filterPosts(category) {

    document.querySelectorAll('.post').forEach(post => {

        const postCategory = post.dataset.category;

        if (category === 'all' || postCategory === category) {
            post.classList.remove('hidden');
        } else {
            post.classList.add('hidden');
        }

    });

    // Clear search box
    const searchInput = document.getElementById('search-input');

    if (searchInput) {
        searchInput.value = '';
    }

}


// 2. LIVE SEARCH SYSTEM
function searchPosts() {

    const searchInput = document.getElementById('search-input');

    if (!searchInput) return;

    const query = searchInput.value.trim().toLowerCase();

    document.querySelectorAll('.post').forEach(post => {

        const text = post.innerText.toLowerCase();

        if (!query || text.includes(query)) {
            post.classList.remove('hidden');
        } else {
            post.classList.add('hidden');
        }

    });

}


// 3. SHARE POST
function sharePost(button) {

    const post = button.closest('.post');

    if (!post) return;

    const titleElement = post.querySelector('h1, h2, h3');

    const title = titleElement
        ? titleElement.innerText.trim()
        : 'BS 360 NEWS';

    // If article has its own URL
    const articleUrl = post.dataset.url;

    let shareUrl = window.location.href;

    if (articleUrl) {

        const baseUrl =
            window.location.origin +
            window.location.pathname.substring(
                0,
                window.location.pathname.lastIndexOf('/') + 1
            );

        shareUrl = baseUrl + articleUrl;

    }

    // Web Share API
    if (navigator.share) {

        navigator.share({

            title: title,
            text: title,
            url: shareUrl

        }).catch(() => {});

    } else {

        // Clipboard fallback
        if (navigator.clipboard) {

            navigator.clipboard.writeText(shareUrl)
                .then(() => {
                    alert('లింక్ కాపీ అయింది!');
                })
                .catch(() => {
                    alert('లింక్ కాపీ చేయలేకపోయాం.');
                });

        } else {

            alert(shareUrl);

        }

    }

}


// 4. DARK / LIGHT MODE
function toggleTheme() {

    document.body.classList.toggle('dark-mode');

    const button =
        document.querySelector('.theme-button') ||
        document.querySelector('.theme-btn');

    if (!button) return;

    if (document.body.classList.contains('dark-mode')) {

        button.innerHTML = '☀️ <span>Light</span>';

        localStorage.setItem('bs360-theme', 'dark');

    } else {

        button.innerHTML = '🌙 <span>Dark</span>';

        localStorage.setItem('bs360-theme', 'light');

    }

}


// 5. LOAD SAVED THEME
function loadTheme() {

    const savedTheme = localStorage.getItem('bs360-theme');

    if (savedTheme === 'dark') {

        document.body.classList.add('dark-mode');

        const button =
            document.querySelector('.theme-button') ||
            document.querySelector('.theme-btn');

        if (button) {
            button.innerHTML = '☀️ <span>Light</span>';
        }

    }

}


// 6. BREAKING NEWS TICKER
const tickerMessages = [

    'BS 360 NEWS — తాజా వార్తలు మీ ముందుకు...',

    'సినిమా, క్రికెట్, స్పోర్ట్స్ మరియు తెలుగు రాష్ట్రాల ముఖ్యమైన అప్‌డేట్స్...',

    'బ్రేకింగ్ న్యూస్ కోసం BS 360 NEWSను ఫాలో అవ్వండి...',

    'దేశ, రాష్ట్ర, సినిమా, స్పోర్ట్స్ వార్తలు వేగంగా మీ కోసం...'

];

let tickerIndex = 0;


function updateTicker() {

    const tickerElement =
        document.getElementById('ticker');

    if (!tickerElement) return;

    tickerIndex =
        (tickerIndex + 1) % tickerMessages.length;

    tickerElement.textContent =
        tickerMessages[tickerIndex];

}


setInterval(updateTicker, 4000);


// 7. LIVE DATE & CLOCK
function updateClock() {

    const now = new Date();

    const clockElement =
        document.getElementById('live-clock');

    const dateElement =
        document.getElementById('live-date');


    if (clockElement) {

        clockElement.innerText =
            now.toLocaleTimeString('en-IN', {

                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true

            });

    }


    if (dateElement) {

        dateElement.innerText =
            now.toLocaleDateString('en-IN', {

                weekday: 'short',
                month: 'short',
                day: '2-digit',
                year: 'numeric'

            });

    }

}


setInterval(updateClock, 1000);

updateClock();


// 8. REAL-TIME "TIME AGO"
function updateTimeAgo() {

    const timeElements =
        document.querySelectorAll('.time-stamp[data-time]');


    timeElements.forEach(element => {

        const timeAttribute =
            element.getAttribute('data-time');

        if (!timeAttribute) return;


        const postTime =
            new Date(timeAttribute).getTime();

        const currentTime =
            Date.now();


        if (isNaN(postTime)) return;


        const difference =
            Math.floor(
                (currentTime - postTime) / 1000
            );


        let text = '';


        // Future time protection
        if (difference < 0) {

            text = 'Just Now';

        }

        else if (difference < 60) {

            text = 'Just Now';

        }

        else if (difference < 3600) {

            const minutes =
                Math.floor(difference / 60);

            text =
                `${minutes} min${minutes > 1 ? 's' : ''} ago`;

        }

        else if (difference < 86400) {

            const hours =
                Math.floor(difference / 3600);

            text =
                `${hours} hour${hours > 1 ? 's' : ''} ago`;

        }

        else {

            const days =
                Math.floor(difference / 86400);

            text =
                `${days} day${days > 1 ? 's' : ''} ago`;

        }


        element.innerText =
            `🕒 ${text}`;

    });

}


// Run immediately
updateTimeAgo();


// Update every 60 seconds
setInterval(updateTimeAgo, 60000);


// 9. PAGE LOAD
document.addEventListener('DOMContentLoaded', () => {

    loadTheme();

    updateClock();

    updateTimeAgo();

});


// 10. PREVENT BROKEN SEARCH / FILTER STATE ON PAGE LOAD
window.addEventListener('load', () => {

    const searchInput =
        document.getElementById('search-input');

    if (searchInput) {
        searchInput.value = '';
    }

});
