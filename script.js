// Data Storage
let dateData = {
    date: '',
    day: '',
    time: '',
    food: []
};

// Background Particle Generator
function createParticles() {
    const container = document.getElementById('hearts');
    const emojis = ['💖', '✨', '🌸', '🥰'];
    
    setInterval(() => {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 4 + 3) + 's'; // 3-7 seconds
        particle.style.fontSize = (Math.random() * 15 + 15) + 'px';
        
        container.appendChild(particle);
        
        setTimeout(() => { particle.remove(); }, 7000);
    }, 500);
}

// Initialize particles
createParticles();

// Navigation Function
function nextPage(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    setTimeout(() => {
        document.getElementById(nextId).classList.add('active');
    }, 500); // Wait for fade out
}

// Page 1: Dodging NO Button (100% Unclickable)
function dodgeButton(e) {
    if(e) e.preventDefault(); // Ye galti se hone wale click ko block kar dega
    
    const noBtn = document.getElementById('noBtn');
    
    // Calculate random position considering window boundaries
    const maxX = window.innerWidth - noBtn.offsetWidth - 20;
    const maxY = window.innerHeight - noBtn.offsetHeight - 20;
    
    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));
    
    noBtn.style.position = 'fixed';
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}


// Page 3: Save Date & Time
function saveDateTime() {
    const dateInput = document.getElementById('dateInput').value;
    const dayInput = document.getElementById('dayInput').value;
    const timeInput = document.getElementById('timeInput').value;
    const errorMsg = document.getElementById('error1');

    if (!dateInput || !dayInput || !timeInput) {
        errorMsg.style.display = 'block';
        return;
    }

    errorMsg.style.display = 'none';
    dateData.date = dateInput;
    dateData.day = dayInput;
    dateData.time = timeInput;

    nextPage('page3', 'page4');
}

// Page 4: Handle Food Selection
function toggleFood(element, foodName) {
    element.classList.toggle('selected');
    
    if (dateData.food.includes(foodName)) {
        dateData.food = dateData.food.filter(item => item !== foodName);
    } else {
        dateData.food.push(foodName);
    }
}

function saveFood() {
    const errorMsg = document.getElementById('error2');
    
    if (dateData.food.length === 0) {
        errorMsg.style.display = 'block';
        return;
    }

    errorMsg.style.display = 'none';
    
    // Populate Page 5 & Final Page Summary
    document.getElementById('summDate').innerText = dateData.date;
    document.getElementById('summDay').innerText = dateData.day;
    document.getElementById('summTime').innerText = dateData.time;
    document.getElementById('summFood').innerText = dateData.food.join(', ');

    document.getElementById('finalDate').innerText = dateData.date;
    document.getElementById('finalDay').innerText = dateData.day;
    document.getElementById('finalTime').innerText = dateData.time;
    document.getElementById('finalFood').innerText = dateData.food.join(', ');

    nextPage('page4', 'page5');
}

// Page 6: Payment Selection
function fakeYouButton() {
    const msg = document.getElementById('fakeMsg');
    msg.style.opacity = 1;
    
    // Hide message again after 3 seconds
    setTimeout(() => {
        msg.style.opacity = 0;
    }, 3000);
}

function realMeButton() {
    // Add extra confetti/hearts for the final page
    setInterval(() => {
        const container = document.getElementById('hearts');
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.innerText = '🎉';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = '3s'; 
        particle.style.fontSize = '30px';
        container.appendChild(particle);
        setTimeout(() => { particle.remove(); }, 3000);
    }, 300);

    nextPage('page6', 'page7');
}
