"use strict";

//Logo animation

const logo = document.getElementById("logo");

logo.addEventListener("mouseover", function () {

    logo.classList.add("animate__animated", "animate__hinge");
    logo.style.setProperty('--animate-duration', '2s');
    logo.style.setProperty('animation-fill-mode', 'backwards');
});



//Card Content Events

const cardButton = document.querySelector(".card-footer-btn");

const cardHeaderTitle = document.querySelector(".card-header-title");

const cardText = document.querySelector(".card-text");

const diceIcon = document.getElementById("diceIcon");

const URL = "https://api.adviceslip.com/advice";


async function createAdvice() {
    try {
        //Add animate.css rotateOut class to create animation effects
        diceIcon.classList.add("animate__animated", "animate__rotateOut");

        //Change animation duration
        diceIcon.style.setProperty("--animate-duration", "0.5s");

        //Load new quote from adviceslip.com
        //Fetch api using async and await
        const response = await fetch(URL);

        //Example object from adviceslip.com - {"slip": { "id": 144, "advice": "Pedantry is fine, unless you're on the receiving end. And not a pedant."}}
        const {
            slip: {
                id,
                advice
            },
        } = await response.json();

        //Update card title content
        cardHeaderTitle.textContent = `Advice #${id}`;

        //Update card text content
        cardText.textContent = `"${advice}"`;

        //Stop dice from spinning
        diceIcon.classList.remove("animate__animated", "animate__rotateOut");

    } catch (err) {
        diceIcon.classList.remove("animate__animated", "animate__rotateOut");
        console.log(err)
    }

}

//Spins dice and loads new quote when dice is click
cardButton.addEventListener("click", createAdvice);

//Spins dice and loads new quote when HTML document has been completely parsed and scripts downloaded and executed.
window.addEventListener('DOMContentLoaded', createAdvice);