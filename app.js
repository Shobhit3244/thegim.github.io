const menus = {
    sidebar: [
        "Home",
        "About",
        "Services",
        "Portfolio",
        "Contact"
    ],
    dropdown: [
        "Home",
        "About",
        "Services",
        "Portfolio",
        "Contact"
    ],
    radial: [
        "Home",
        "About",
        "Services",
        "Portfolio",
        "Contact"
    ],
    hamburger: [
        "Home",
        "About",
        "Services",
        "Portfolio",
        "Contact"
    ]
};

const main = document.getElementById('menus');
const transcriptionText = document.getElementById('transcriptionText');
const toggleModeBtn = document.getElementById('toggleMode');

// Open the selected menu and display items
function openMenu(name) {
    main.innerHTML = ''; // Clear previous menu

    const menuDiv = document.createElement('div');
    menuDiv.className = `menu ${name}`;

    menus[name].forEach(item => {
        const menuItem = document.createElement('button');
        menuItem.className = 'menu-item';
        menuItem.textContent = item;
        menuDiv.appendChild(menuItem);
    });

    main.appendChild(menuDiv);
}

// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.start();

recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    transcriptionText.textContent = transcript;

    if (transcript.includes("sidebar") || transcript.includes("side") || transcript.includes("site")) {
        openMenu('sidebar');
    } else if (transcript.includes("dropdown") || transcript.includes("drop") || transcript.includes("down")) {
        openMenu('dropdown');
    } else if (transcript.includes("radial")) {
        openMenu('radial');
    } else if (transcript.includes("hamburger")) {
        openMenu('hamburger');
    }
};

// Light/Dark Mode Toggle
toggleModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light');
});

// Swipe support for menu switching
let touchstartX = 0;
let touchendX = 0;

document.addEventListener('touchstart', e => {
    touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
});

// Handle swipe gestures
function handleSwipe() {
    const keys = Object.keys(menus);
    const currentMenu = main.textContent.toLowerCase().split(' ')[0];
    let idx = keys.indexOf(currentMenu);

    if (touchendX < touchstartX) {
        // Swipe left (next menu)
        idx = (idx + 1) % keys.length;
    } else if (touchendX > touchstartX) {
        // Swipe right (previous menu)
        idx = (idx - 1 + keys.length) % keys.length;
    }

    openMenu(keys[idx]);
}
