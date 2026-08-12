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

    // Clear search inputs
    const searchInput = document.getElementById('search-input');
    const headerSearchInput = document.getElementById('header-search-input');

    if (searchInput) searchInput.value = '';
    if (headerSearchInput) headerSearchInput.value = '';
}

// 2. LIVE SEARCH SYSTEM (Syncs both inputs)
function searchPosts(customQuery = null) {
    const searchInput = document.getElementById('search-input');
    const headerSearchInput = document.getElementById('header-search-input');

    let query = customQuery;
    if (query === null) {
        query = (searchInput ? searchInput.value : '') || (headerSearchInput ? headerSearchInput.value : '');
    }
    
    query = query.trim().toLowerCase();

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
    const title = titleElement ? titleElement.innerText.trim() : 'BS 360 NEWS';
    const articleUrl = post.dataset.url;

    let shareUrl = window.location.href;

    if (articleUrl) {
        const baseUrl = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        shareUrl = baseUrl + articleUrl;
    }

    if (navigator.share) {
        navigator.share({
            title: title,
            text: title,
            url: shareUrl
        }).catch(() => {});
    } else {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareUrl)
                .then(() => alert('లింక్ కాపీ అయింది!'))
                .catch(() => alert('లింక్ కాపీ చేయలేకపోయాం.'));
        } else {
            alert(shareUrl);
        }
    }
}

// 4. DARK / LIGHT MODE
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.theme-button') || document.querySelector('.theme-btn');

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
        const button = document.querySelector('.theme-button') || document.querySelector('.theme-btn');
        if (button) button.innerHTML = '☀️ <span>Light</span>';
    }
}

// 6. LIVE DATE & CLOCK
function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('live-clock');
    const dateElement = document.getElementById('live-date');

    if (clockElement) {
        clockElement.innerText = '🕒 ' + now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    }

    if (dateElement) {
        dateElement.innerText = '📅 ' + now.toLocaleDateString('en-IN', {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    }
}

setInterval(updateClock, 1000);

// 7. REAL-TIME "TIME AGO"
function updateTimeAgo() {
    const timeElements = document.querySelectorAll('.time-stamp[data-time]');

    timeElements.forEach(element => {
        const timeAttribute = element.getAttribute('data-time');
        if (!timeAttribute) return;

        const postTime = new Date(timeAttribute).getTime();
        const currentTime = Date.now();

        if (isNaN(postTime)) return;

        const difference = Math.floor((currentTime - postTime) / 1000);
        let text = '';

        if (difference < 60) {
            text = 'Just Now';
        } else if (difference < 3600) {
            const minutes = Math.floor(difference / 60);
            text = `${minutes} min${minutes > 1 ? 's' : ''} ago`;
        } else if (difference < 86400) {
            const hours = Math.floor(difference / 3600);
            text = `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else {
            const days = Math.floor(difference / 86400);
            text = `${days} day${days > 1 ? 's' : ''} ago`;
        }

        element.innerText = `🕒 ${text}`;
    });
}

setInterval(updateTimeAgo, 60000);

// 8. MOBILE MENU TOGGLE & SEARCH BINDINGS
document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    updateClock();
    updateTimeAgo();

    // Header Search Input Event Binding
    const headerSearchInput = document.getElementById('header-search-input');
    if (headerSearchInput) {
        headerSearchInput.addEventListener('input', (e) => {
            searchPosts(e.target.value);
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }
});

// Clear Inputs on Page Load
window.addEventListener('load', () => {
    const searchInput = document.getElementById('search-input');
    const headerSearchInput = document.getElementById('header-search-input');
    if (searchInput) searchInput.value = '';
    if (headerSearchInput) headerSearchInput.value = '';
});
