//zastanawiamy sie, czego update musimy robic nasza delta. wiemy, ze musimy ustawic:
//POSITION - x i y pozycja
//VELOCITY - poruszanie sie
// DIRECTION - kierunek, w ktorym sie porusza

export default class Ball {
    constructor(ballElem){
        this.ballElem = ballElem
    }
    
    //POSITION
    // bierzemy wartosc bal --x z naszego css i konwerstujemy ja w js number ktorego mozemy uzywac - helper function
    // bierze wartosc pozycji z js zebysmy mogli jej uzywac
    get x() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--x"))
    }

    // ustawia wartosc pozycji pilki
    set x(value) {
        this.ballElem.style.setProperty("--x", value)
    }

       // analogicznie do x, tylko ze teraz ustawiamy pozycje y
    get y() {
        return parseFloat(getComputedStyle(this.ballElem).getPropertyValue("--y"))
    }

    // ustawia wartosc pozycji pilki
    set y(value) {
        this.ballElem.style.setProperty("--y", value)
    }

    //VELOCITY

    update(delta) {

    }
}