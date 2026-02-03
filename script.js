const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const successMessage = document.getElementById('success-message');
const buttonsContainer = document.querySelector('.buttons');

// Initial setup to place "No" button next to "Yes"
// We let CSS handle initial static layout, but once moved, it becomes absolute in larger context?
// Actually CSS has it absolute. Let's position it initially nicely.
// Just letting flexbox handle it first might be tricky if one is absolute. 
// Let's modify logic: on hover, we change its position securely.

// Initial position fix logic if needed, but let's assume it sits nicely first.
// The CSS has 'position: absolute' for no-btn. We should probably give it a default right/top in css or js.
noBtn.style.left = '60%'; // Initial placement hint
noBtn.style.top = '50%';

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton); // Just in case mobile tap

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

yesBtn.addEventListener('click', () => {
    // Hide buttons? Or just show success
    // buttonsContainer.style.display = 'none';
    successMessage.classList.remove('hidden');

    // Confetti!
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function () {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        var particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
});
