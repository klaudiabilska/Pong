// Update loop - co każdą frames, nasza gra wywołuje funkcje called updateLoop i ta funkcja updates positions and the logic of all the pieces gry

// całą grę przełamiemy w seperated classes, zeby było łatwiej z nimi pracować (osobne pliki js dla np piłki) - stad bierze sie import, export itp

import Ball from './ball.js'
const ball = new Ball(document.getElementById("ball"))

let lastTime
//sprawdzanie, ile czasu minelo - ile frames
// kazda frames wywola ten loop za nas, infinity loop
//musimy obliczyc ile czasu mija miedzy jedna frames a kolejna, musimy ten czas przekonwertowac w delte
function update(time){
    if (lastTime != null) {
        const delta = time - lastTime
        ball.update(delta)
    }
    lastTime = time
    window.requestAnimationFrame(update)
}

window.requestAnimationFrame(update)

//SKONCZYLAM W 15:50 https://www.youtube.com/watch?v=PeY6lXPrPaA