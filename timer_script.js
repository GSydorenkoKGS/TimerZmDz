// let timer;
// let interval30Sec;
// let timeRemaining;
// let selectedSound;
// let totalTime; // Додано змінну для загального часу

// document.getElementById('startButton').addEventListener('click', startTimer);
// document.getElementById('stopButton').addEventListener('click', stopTimer); // Обробник для кнопки "Стоп"

// // Додаємо обробник події для натискання клавіші "Enter"
// document.addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//         startTimer();  // Запускаємо таймер
//     }
// });


//     function startTimer() {
//         const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
//         const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
//         selectedSound = document.getElementById('soundInput').value;
    
//         timeRemaining = minutes * 60 + seconds;
//         totalTime = timeRemaining;
    
//         // Перевірка на коректність введення
//         if (isNaN(timeRemaining) || timeRemaining <= 0) {
//             alert('Введіть коректний час!');
//             return;
//         }

//     updateDisplay(timeRemaining);
//     resetSnail();  // Скинути равлика на початкову позицію

//     // Очищення попередніх таймерів
//     clearInterval(timer);
//     clearInterval(interval30Sec);

//     // Запуск таймера на 30 секунд
//        // interval30Sec = setInterval(playIntervalSound, 30000);
      
    
//     // Запуск основного таймера
//         timer = setInterval(countdown, 1000);
    
// }
// function countdown() {


//     // Якщо час закінчився
//     if (timeRemaining <=0) {
//         clearInterval(timer);
//         clearInterval(interval30Sec);
//         playEndSound();
//         updateDisplay(0);  // Відобразити 00:00
//         return; // Виходимо з функції
//     }
//     timeRemaining--;
//     updateDisplay(timeRemaining);
//     playIntervalSound();
//     moveSnail();  // Рух равлика при кожному оновленні таймера
// }

// function playIntervalSound() {
//     const sound = document.getElementById(selectedSound);
//     sound.currentTime = 0; // Скидання до початку, щоб звук відтворювався з нуля    
//     sound.play();
//     }

// function playEndSound() {
//     const endSound = document.getElementById('endSound');
//     endSound.currentTime = 0; // Скидання до початку, щоб звук відтворювався з нуля       
//     endSound.play();
//     }

// function updateDisplay(seconds) {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
// }

// function moveSnail() {
//     const snail = document.getElementById('snail');
//     const track = document.querySelector('.track');
//     const trackWidth = track.clientWidth;  // Ширина доріжки
//     const snailWidth = snail.clientWidth;  // Ширина равлика

//     // Відсоток часу, що минув
//     const timePassedPercentage = (totalTime - timeRemaining) / totalTime;

//     // Нова позиція равлика, обмежена шириною доріжки мінус ширина равлика
//     const newPosition = timePassedPercentage * (trackWidth - snailWidth);

//     // Оновлення положення равлика
//     snail.style.right = `${newPosition}px`;
// }

// function resetSnail() {
//     const snail = document.getElementById('snail');
//     snail.style.right = '0px';  // Початкова позиція равлика
// }

// function stopTimer() {
//     clearInterval(timer);
//     clearInterval(interval30Sec);
//     updateDisplay(0);  // Відобразити 00:00
//     resetSnail();  // Повернути равлика на початок
//     }



let timer;
let timeRemaining;
let totalTime;
let sounds = ['beep1', 'beep2'];
let currentSoundIndex = 0;

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('stopButton').addEventListener('click', stopTimer);

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startTimer();
    }
});

function startTimer() {
    const minutes = parseInt(document.getElementById('minutesInput').value) || 0;
    const seconds = parseInt(document.getElementById('secondsInput').value) || 0;
    
    timeRemaining = minutes * 60 + seconds;
    totalTime = timeRemaining;

    if (isNaN(timeRemaining) || timeRemaining <= 0) {
        alert('Введіть коректний час!');
        return;
    }

    updateDisplay(timeRemaining);
    resetSnail();

    clearInterval(timer);
    currentSoundIndex = 0; // Почати з першого звуку

    playIntervalSound(); // Відразу грає перший звук
    timer = setInterval(countdown, 1000);
}

function countdown() {
    if (timeRemaining <= 0) {
        clearInterval(timer);
        playEndSound();
        updateDisplay(0);
        return;
    }

    timeRemaining--;
    updateDisplay(timeRemaining);

    
    playIntervalSound();
    

    moveSnail();
}

function playIntervalSound() {
    const sound = document.getElementById(sounds[currentSoundIndex]);
    sound.currentTime = 0;
    sound.play();
if (timeRemaining%30===0){
    currentSoundIndex = (currentSoundIndex + 1) % sounds.length;
}
}

function playEndSound() {
    const endSound = document.getElementById('endSound');
    endSound.currentTime = 0;
    endSound.play();
}

function updateDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    document.getElementById('timerDisplay').textContent = `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function moveSnail() {
    const snail = document.getElementById('snail');
    const track = document.querySelector('.track');
    const trackWidth = track.clientWidth;
    const snailWidth = snail.clientWidth;

    const timePassedPercentage = (totalTime - timeRemaining) / totalTime;
    const newPosition = timePassedPercentage * (trackWidth - snailWidth);
    snail.style.left = `${newPosition}px`;
}

function resetSnail() {
    const snail = document.getElementById('snail');
    snail.style.left = '0px';
}

function stopTimer() {
    clearInterval(timer);
    updateDisplay(0);
    resetSnail();
}
