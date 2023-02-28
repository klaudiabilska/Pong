const INITIAL_VELOCITY = 0.025
const VELOCITY_INCREASE = 0.00001

//zastanawiamy sie, czego update musimy robic nasza delta. wiemy, ze musimy ustawic:
//POSITION - x i y pozycja
//VELOCITY - poruszanie sie
// DIRECTION - kierunek, w ktorym sie porusza

export default class Ball {
    //create a ball
    constructor(ballElem){
        this.ballElem = ballElem
        this.reset()
    }
    
    //helper funkcje:

    //!POSITION
    // bierzemy wartosc bal --x z naszego css i konwerstujemy ja w js number ktorego mozemy uzywac 
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

    rect() {
        return this.ballElem.getBoundingClientRect()
    }

    ///!DIRECTION
    reset() {
        //ustawienie pilki na srodku zawsze po resecie
        this.x = 50
        this.y = 50
        //find out jaki jest kierunek
        //UNIT VECTOR
        //korzystamy z unit vector, bo pozwala nam przesunac pilke o 1 w kierunku x i y combined together
        this.direction = { x: 0}
        //ustawienie, jaki jest x i y
        //zdecydowalismy sie na while loop, bo, chcemy, aby gra byla fun i pilka miala wystarczajaco duzo miejsca do poruszania sie nie tylko gorsa dol, ale rowniez lewo prawo
        //.2 sprawdcza, by pilka nie porusza sie tylko gora dol
        //.9 sprawdcza, by pilka nie porusza sie tylko lewo prawo
        //math.abs - distance between value and 0, w tym przypadku dba o to, zeby wartosc ujemna zamienila sie w dodatnia
        while(Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.x) >= .9) {
            //tworzymy random number pomiedzy zero a 2xPI, ktory determinuje kierunek, w ktorym sie poruszamy
            const heading = randomNumberBetween(0, 2 *  Math.PI)
            //bierzemy ta direction i konwertujemy ja w x i y position, to bedzie unit vector dla tych pozycji
            this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
        }
        //!VELOCITY
        this.velocity = INITIAL_VELOCITY

    }


    update(delta, paddleRects) {
        this.x += this.direction.x * this.velocity * delta
        this.y += this.direction.y * this.velocity * delta
        //przyspieszanie pilki z uplywem czasu
        this.velocity += VELOCITY_INCREASE * delta
        const rect = this.rect()

        //zmienia kierunek kiedy uderzy o "sciane"
        if (rect.bottom >= window.innerHeight || rect.top <= 0) {
            this.direction.y *= -1
        }

        if (paddleRects.some(r => isCollision(r, rect))) {
            this.direction.x *= -1
          }
        }
      }

function randomNumberBetween(min, max) {
    return Math.random() * (max - min) + min
}

function isCollision(rect1, rect2) {
return  rect1.left <= rect2.right &&
rect1.right >= rect2.left &&
rect1.top <= rect2.bottom &&
rect1.bottom >= rect2.top
}

