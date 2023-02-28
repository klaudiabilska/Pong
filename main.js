// Update loop - co każdą frames, nasza gra wywołuje funkcje called updateLoop i ta funkcja updates positions and the logic of all the pieces gry

// całą grę przełamiemy w seperated classes, zeby było łatwiej z nimi pracować (osobne pliki js dla np piłki) - stad bierze sie import, export itp

import Ball from './ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const computerPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElem = document.getElementById("player-score")
const computerScoreElem = document.getElementById("computer-score")

let lastTime

document.addEventListener("keypress", handleStart, { once: true})
const title = document.querySelector("[data-title]")

function handleStart () {
    title.classList.add("hide")
    window.requestAnimationFrame(update)
}
//sprawdzanie, ile czasu minelo - ile frames
// kazda frames wywola ten loop za nas, infinity loop
//musimy obliczyc ile czasu mija miedzy jedna frames a kolejna, musimy ten czas przekonwertowac w delte
function update(time){
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta, [playerPaddle.rect(), computerPaddle.rect()])
        computerPaddle.update(delta, ball.y)
        //zmiana koloru
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

        document.documentElement.style.setProperty("--hue", hue + delta * 0.01)

        if (isLose()) handleLose()

    }
    lastTime = time
    window.requestAnimationFrame(update)
}


//sprawdza, czy jest przegrana
function isLose() {
    const rect = ball.rect()
    return rect.right >= window.innerWidth || rect.left <= 0
}

function handleLose() {
    const rect = ball.rect()
    if (rect.right >= window.innerWidth) {
        playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
    } else {
        computerScoreElem.textContent = parseInt(computerScoreElem.textContent) + 1
    }

    ball.reset()
    computerPaddle.reset()
}



//ustawienie playerpaddle na ten sam co myszka
document.addEventListener("mousemove", e => {
    playerPaddle.position = (e.y / window.innerHeight) * 100
})





//https://www.youtube.com/watch?v=PeY6lXPrPaA