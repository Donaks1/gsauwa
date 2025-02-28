window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('signup') === 'success') {
        document.getElementById('successMessage').style.display = 'block';
    }
}

// Mobile menu functionality
document.querySelector('.menu-toggle').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        document.querySelector('.nav-links').classList.remove('active');
    }
});

function buyNow() {
    window.location.href = "https://yourwebsite.com/checkout";
}

// Instagram feed functionality
async function fetchInstagramFeed() {
    const INSTAGRAM_TOKEN = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
    const INSTAGRAM_USER_ID = 'YOUR_INSTAGRAM_USER_ID';
    
    try {
        const response = await fetch(
            `https://graph.instagram.com/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${INSTAGRAM_TOKEN}`
        );
        const data = await response.json();
        return data.data[0]; // Gets the latest post
    } catch (error) {
        console.error('Error fetching Instagram feed:', error);
        return null;
    }
}

async function displayLatestPost() {
    const container = document.getElementById('instagram-container');
    const post = await fetchInstagramFeed();
    
    if (post) {
        container.innerHTML = `
            <div class="instagram-post" style="max-width: 350px; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <a href="${post.permalink}" target="_blank">
                    <img src="${post.media_url}" alt="Latest Instagram post" style="width: 100%; height: auto;">
                </a>
                <div style="padding: 15px;">
                    <p>${post.caption ? post.caption.substring(0, 100) + '...' : ''}</p>
                    <a href="https://instagram.com/gsauwa" target="_blank" style="color: #1a237e; text-decoration: none;">@gsauwa</a>
                </div>
            </div>
        `;
    }
}

// Initialize Instagram feed
displayLatestPost();

// Instagram slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.slider-container');
    const items = document.querySelectorAll('.slider-item');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    function updateSlider() {
        const itemWidth = items[0].offsetWidth + 20; // width + gap
        container.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    nextBtn.addEventListener('click', () => {
        if (currentIndex < items.length - 1) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    container.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < items.length - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateSlider();
        }
    }
});

// Carousel functionality
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    let currentIndex = 0;

    // Set initial position
    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Click handlers for buttons
    nextButton?.addEventListener('click', () => {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            updateSlidePosition();
        }
    });

    prevButton?.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlidePosition();
        }
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentIndex < slides.length - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateSlidePosition();
        }
    }
});