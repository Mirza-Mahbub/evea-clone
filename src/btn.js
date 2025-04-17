const btn1 = document.getElementById("month");
const btn2 = document.getElementById("annual");

// Get references for the number display elements
const num1 = document.getElementById("standard");
const num2 = document.getElementById("premium");
const num3 = document.getElementById("enterprise");

// Define the two sets of numbers
const numbers1 = [49, 78, 99];
const numbers2 = [199, 299, 399];

// Current active set (1 or 2)
let currentActive = 1;

// Function to set the numbers immediately (for onload)
function setNumbers(numbers) {
    num1.textContent = numbers[0];
    num2.textContent = numbers[1];
    num3.textContent = numbers[2];
}

// Animate a number from start to end within a given duration (ms)
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.innerText = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Function to animate transition between two sets of numbers
function animateNumbers(fromNumbers, toNumbers, duration = 300) {
    animateValue(num1, fromNumbers[0], toNumbers[0], duration);
    animateValue(num2, fromNumbers[1], toNumbers[1], duration);
    animateValue(num3, fromNumbers[2], toNumbers[2], duration);
}

// Function to switch active state and animate numbers
function switchNumbers(newActive) {
    if (currentActive === newActive) return; // already active, do nothing

    if (newActive === 1) {
        // Animate from button2's numbers to button1's numbers
        animateNumbers(numbers2, numbers1);
        btn1.classList.add("active");
        btn2.classList.remove("active");
    } else if (newActive === 2) {
        // Animate from button1's numbers to button2's numbers
        animateNumbers(numbers1, numbers2);
        btn2.classList.add("active");
        btn1.classList.remove("active");
    }
    currentActive = newActive;
}

// Set button1 as active by default and show its numbers on load
window.onload = () => {
    btn1.classList.add("active");
    setNumbers(numbers1);
};

// Button event listeners: when clicked, switch active state and animate numbers
btn1.addEventListener("click", () => {
    switchNumbers(1);
});
btn2.addEventListener("click", () => {
    switchNumbers(2);
});