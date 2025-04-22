document.addEventListener("DOMContentLoaded", () => {
    const gmailInput = document.getElementById("gmail_input");
    const gmailButton = document.getElementById("gmail_button");
    const gmailResult = document.getElementById("gmail_result");
    const checker = document.getElementById('gmail_result');

    const validateEmail = (email) => {
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
        return gmailRegex.test(email);
    };

    gmailButton.addEventListener("click", () => {
        const email = gmailInput.value.trim();
        if (validateEmail(email)) {
            checker.style.display = 'flex';
            gmailResult.textContent = "✅ Email корректный!";
            gmailResult.style.color = "green";
        } else {
            checker.style.display = 'flex';
            gmailResult.textContent = "❌ Введите корректный Gmail адрес!";
            gmailResult.style.color = "darkred";
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const smallBlock = document.querySelector(".child_block");
    const parentBlock = document.querySelector(".parent_block");

    const parentWidth = parentBlock.clientWidth;
    const parentHeight = parentBlock.clientHeight;
    const blockSize = smallBlock.clientWidth;

    let x = 0;
    let y = 0;
    let direction = "right";
    const speed = 2;

    let leftTurns = 0;
    let completedSides = 0;

    const setRotation = (dir) => {
        if (dir === "left") {
            leftTurns++;

            if (leftTurns === 1) {
                smallBlock.style.transform = "rotate(180deg) scaleX(1) scaleY(-1)";
            } else {
                smallBlock.style.transform = "rotate(180deg) scaleX(1) scaleY(1)";
            }
        } else {
            switch (dir) {
                case "right":
                    smallBlock.style.transform = "rotate(0deg) scaleX(1) scaleY(1)";
                    break;
                case "down":
                    smallBlock.style.transform = "rotate(90deg) scaleX(1) scaleY(-1)";
                    break;
                case "up":
                    smallBlock.style.transform = "rotate(270deg) scaleX(1) scaleY(-1)";
                    break;
            }
        }
    };

    const resetAndRestart = () => {
        x = 0;
        y = 0;
        direction = "right";
        leftTurns = 0;
        completedSides = 0;
        setRotation(direction);
        moveBlock(); // запуск заново
    };

    const moveBlock = () => {
        switch (direction) {
            case "right":
                if (x < parentWidth - blockSize) {
                    x += speed;
                } else {
                    direction = "down";
                    completedSides++;
                    setRotation(direction);
                }
                break;
            case "down":
                if (y < parentHeight - blockSize) {
                    y += speed;
                } else {
                    direction = "left";
                    completedSides++;
                    setRotation(direction);
                }
                break;
            case "left":
                if (x > 0) {
                    x -= speed;
                } else {
                    direction = "up";
                    completedSides++;
                    setRotation(direction);
                }
                break;
            case "up":
                if (y > 0) {
                    y -= speed;
                } else {
                    completedSides++;
                    resetAndRestart();
                    return;
                }
                break;
        }

        smallBlock.style.left = `${x}px`;
        smallBlock.style.top = `${y}px`;

        requestAnimationFrame(moveBlock);
    };

    setRotation(direction);
    moveBlock();
});

const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const video = document.getElementById('video');

let counter = 0;
let isRunning = false;
let shotRegistered = false;

video.loop = true;

video.addEventListener('timeupdate', () => {
    if (!isRunning) return;

    // Засчитываем выстрел, когда почти конец видео
    if (video.currentTime >= 0.95 && !shotRegistered) {
        counter++;
        secondsDisplay.textContent = counter;
        shotRegistered = true;
    }

    // Сбросить флаг, когда видео начинается заново
    if (video.currentTime < 0.95) {
        shotRegistered = false;
    }
});

startBtn.addEventListener('click', () => {
    if (isRunning) return;
    isRunning = true;
    video.play();
});

stopBtn.addEventListener('click', () => {
    isRunning = false;
    video.pause();
});

resetBtn.addEventListener('click', () => {
    isRunning = false;
    video.pause();
    video.currentTime = 0;
    counter = 0;
    secondsDisplay.textContent = 0;
    shotRegistered = false;
});
