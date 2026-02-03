const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const successMessage = document.getElementById('success-message');
const container = document.getElementById('collage-container');

// --- All Photos ---
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
    for (let i = 1; i <= 20; i++) {
        photos.push(`assets/photo${i}.jpg`);
    }
    extraPhotos.forEach(p => photos.push(`assets/${p}`));
    return photos;
}

const allPhotos = generatePhotoSources();

// Shuffle array
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Size classes for variety
const sizeClasses = ['size-xl', 'size-lg', 'size-md', 'size-sm'];

// Generate random positions that fill the screen
function generatePositions(count) {
    const positions = [];
    const cols = 5;
    const rows = Math.ceil(count / cols);

    for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);

        // Base position with some randomness
        const baseX = (col / cols) * 100;
        const baseY = (row / rows) * 100;

        // Add randomness but keep within bounds
        const x = Math.max(0, Math.min(85, baseX + (Math.random() * 15 - 7.5)));
        const y = Math.max(0, Math.min(85, baseY + (Math.random() * 15 - 7.5)));

        positions.push({ x, y });
    }

    return shuffle(positions);
}

// Render all photos with varying sizes and positions
function renderPhotos() {
    container.innerHTML = '';
    const shuffledPhotos = shuffle([...allPhotos]);
    const positions = generatePositions(shuffledPhotos.length);

    shuffledPhotos.forEach((src, index) => {
        const div = document.createElement('div');
        div.classList.add('collage-item');

        // Assign size class - more large ones for visual interest
        const sizeIndex = index < 4 ? 0 : index < 10 ? 1 : index < 20 ? 2 : 3;
        div.classList.add(sizeClasses[sizeIndex]);

        // Position
        const pos = positions[index] || { x: Math.random() * 80, y: Math.random() * 80 };
        div.style.left = pos.x + '%';
        div.style.top = pos.y + '%';

        // Stagger animation delay for elegant appearance
        div.style.animationDelay = (index * 0.1) + 's';

        // Set background
        div.style.backgroundImage = `url('${encodeURI(src)}')`;

        // Random z-index for depth
        div.style.zIndex = Math.floor(Math.random() * 5);

        container.appendChild(div);
    });
}

// Periodically shuffle and move photos
function animatePhotos() {
    const items = document.querySelectorAll('.collage-item');

    items.forEach((item, i) => {
        // Random new position with smooth transition
        setTimeout(() => {
            const newX = Math.random() * 80;
            const newY = Math.random() * 80;
            item.style.left = newX + '%';
            item.style.top = newY + '%';
        }, i * 100);
    });
}

// Create butterflies
function createButterfly() {
    const butterfly = document.createElement('div');
    butterfly.classList.add('butterfly');
    butterfly.textContent = '🦋';
    butterfly.style.left = '-50px';
    butterfly.style.top = (20 + Math.random() * 60) + 'vh';
    document.body.appendChild(butterfly);

    setTimeout(() => butterfly.remove(), 6000);
}

// Start butterfly spawning
setInterval(createButterfly, 3000);
createButterfly();

// Yes button click
yesBtn.addEventListener('click', () => {
    document.querySelector('.buttons').style.display = 'none';
    document.querySelector('.question').style.display = 'none';

    successMessage.classList.remove('hidden');
    successMessage.innerHTML = '<h2>Love You Batta ❤️</h2>';

    // Strawberry rain
    const duration = 8000;
    const end = Date.now() + duration;

    function spawnStrawberry() {
        const s = document.createElement('div');
        s.classList.add('strawberry');
        s.textContent = '🍓';
        s.style.left = Math.random() * 100 + 'vw';
        s.style.top = '-60px';
        s.style.animationDuration = (2 + Math.random() * 3) + 's';
        document.body.appendChild(s);

        setTimeout(() => s.remove(), 5000);

        if (Date.now() < end) {
            setTimeout(spawnStrawberry, 50);
        }
    }
    spawnStrawberry();

    // Confetti too
    if (typeof confetti !== 'undefined') {
        confetti({
            particleCount: 150,
            spread: 100,
            origin: { y: 0.6 }
        });
    }
});

// Runaway "No" button
noBtn.style.left = '60%';
noBtn.style.top = '55%';

function moveButton() {
    const maxW = window.innerWidth - 80;
    const maxH = window.innerHeight - 40;
    noBtn.style.position = 'fixed';
    noBtn.style.left = Math.random() * maxW + 'px';
    noBtn.style.top = Math.random() * maxH + 'px';
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', moveButton);
noBtn.addEventListener('click', moveButton);

// Initialize
renderPhotos();

// Shuffle positions every 8 seconds for dynamic feel
setInterval(animatePhotos, 8000);
