const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const successMessage = document.getElementById('success-message');
const container = document.getElementById('collage-container');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');

// --- Music Logic ---
musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play();
        musicToggle.textContent = "🔇 Pause Music";
    } else {
        bgMusic.pause();
        musicToggle.textContent = "🎵 Play Music";
    }
});

// Try auto-play on first user interaction if blocked
document.body.addEventListener('click', () => {
    if (bgMusic.paused) {
        bgMusic.play().then(() => {
            musicToggle.textContent = "🔇 Pause Music";
        }).catch(e => console.log("Audio autoplay prevented"));
    }
}, { once: true });


// --- Slideshow Logic ---
// --- Slideshow Logic ---
// We have photo1-20 and then WhatsApp images. 
// Hardcoding the WhatsApp filenames found in directory listing to ensure we get them all.
const extraPhotos = [
    "WhatsApp Image 2026-02-03 at 8.45.41 PM (1).jpeg",
    "WhatsApp Image 2026-02-03 at 8.45.41 PM.jpeg",
    "WhatsApp Image 2026-02-03 at 8.45.42 PM (1).jpeg",
    "WhatsApp Image 2026-02-03 at 8.45.42 PM (2).jpeg",
    "WhatsApp Image 2026-02-03 at 8.45.42 PM.jpeg",
    "WhatsApp Image 2026-02-03 at 8.45.43 PM (1).jpeg",
    "WhatsApp Image 2026-02-03 at 8.45.43 PM (2).jpeg",
    "WhatsApp Image 2026-02-03 at 8.45.43 PM.jpeg",
    "WhatsApp Image 2026-02-03 at 8.48.59 PM (1).jpeg",
    "WhatsApp Image 2026-02-03 at 8.48.59 PM (2).jpeg",
    "WhatsApp Image 2026-02-03 at 8.48.59 PM.jpeg",
    "WhatsApp Image 2026-02-03 at 8.49.00 PM (1).jpeg",
    "WhatsApp Image 2026-02-03 at 8.49.00 PM (2).jpeg",
    "WhatsApp Image 2026-02-03 at 8.49.00 PM.jpeg",
    "WhatsApp Image 2026-02-03 at 8.49.01 PM (1).jpeg",
    "WhatsApp Image 2026-02-03 at 8.49.01 PM.jpeg"
];

function generatePhotoSources() {
    const photos = [];
    // Existing 20 photos
    for (let i = 1; i <= 20; i++) {
        photos.push(`assets/photo${i}.jpg`);
    }
    // Add WhatsApp photos
    extraPhotos.forEach(p => photos.push(`assets/${p}`));
    return photos;
}

const allPhotos = generatePhotoSources();
const totalPhotos = allPhotos.length;
const photosPerBatch = totalPhotos; // "Show them all in the background at first" - maybe all?
// If fitting 36 photos, we need a dense grid.
// Let's adapt render logic to show ALL photos if requested, or just a lot.
// "Show them all... at first". Let's show all in a grid.

function renderAll() {
    container.innerHTML = '';
    // Adjust grid for all photos?
    // Let's make items smaller to fit
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';

    allPhotos.forEach(src => {
        const div = document.createElement('div');
        div.classList.add('collage-item');
        // Encode URI to handle spaces in filenames
        const encodedSrc = encodeURI(src);
        div.style.backgroundImage = `url('${encodedSrc}')`;
        // Override width for "Show All" mode
        div.style.width = '16.66%'; // 6 across?
        div.style.height = '20%';   // 5 rows?
        container.appendChild(div);
    });
}

// "and then replace them in a swift animation with a new one"
// This usage suggests a slideshow might still be desired, OR "Show all" -> "Effect" -> "New set"?
// The user said: "show them all in the background at first, in a style and animation"
// Maybe shuffling them?
// Let's stick to the slideshow batch logic but maybe bigger batches? 
// Or actually render ALL and just animate their positions? 
// Let's keep the Slideshow logic but make it random shuffle of all images.

let currentIndex = 0;
function renderBatch() { // reusing function name but logic updated
    // Let's show 9 at a time for better visibility? Or 15?
    // User said "show them all... at first". 
    // I'll render ALL 36 at once.

    // Actually, let's stick to the previous logic but use all photos
    renderAll();
}

// Butterfly Logic
function createButterflies() {
    setInterval(() => {
        const b = document.createElement('div');
        b.classList.add('butterfly');
        b.style.left = Math.random() * 100 + 'vw';
        b.style.top = Math.random() * 100 + 'vh';
        document.body.appendChild(b);

        // Move it
        setTimeout(() => {
            b.style.transform = `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px)`;
            b.style.opacity = 0;
        }, 100);

        setTimeout(() => b.remove(), 2000);
    }, 500);
}
createButterflies();

// Yes Logic
yesBtn.addEventListener('click', () => {
    // Hide buttons
    document.querySelector('.buttons').style.display = 'none';
    document.querySelector('.question').style.display = 'none';

    successMessage.classList.remove('hidden');
    // Update Text
    successMessage.innerHTML = '<h2>Love You Batta ❤️</h2>';

    // Strawberry Rain
    const duration = 5000;
    const end = Date.now() + duration;

    (function frame() {
        // Create strawberry
        const s = document.createElement('div');
        s.classList.add('strawberry');
        s.textContent = '🍓'; // Big strawberry emoji
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = '-50px';
        s.style.animationDuration = (Math.random() * 2 + 2) + 's'; // 2-4s fall
        document.body.appendChild(s);

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});

// Runaway Logic (Keep existing)
noBtn.style.position = 'absolute'; // Ensure absolute
noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

function moveButton() {
    const containerRect = document.querySelector('.container').getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate new random position within the window, keeping it somewhat reachable but elusive
    // or just within the container? Window is funnier.

    const maxWid = window.innerWidth - btnRect.width;
    const maxHei = window.innerHeight - btnRect.height;

    const randomX = Math.floor(Math.random() * maxWid);
    const randomY = Math.floor(Math.random() * maxHei);

    noBtn.style.position = 'fixed'; // Break out of container flow
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Initial Render
renderAll();
// Optional: Swap images randomly every few seconds for "animation" without clearing all
setInterval(() => {
    const items = document.querySelectorAll('.collage-item');
    if (items.length > 0) {
        const randomItem = items[Math.floor(Math.random() * items.length)];
        const randomPhoto = allPhotos[Math.floor(Math.random() * allPhotos.length)];
        randomItem.style.backgroundImage = `url('${encodeURI(randomPhoto)}')`;
        // Add a pop effect?
        randomItem.style.transform = "scale(0.8)";
        setTimeout(() => randomItem.style.transform = "scale(1)", 500);
    }
}, 500); // Fast swapping
