let squares = [];
let overlappingsquares = []; //variable to hold squares drawn in intersecting area
let dragObject = null; // variable to hold the object being dragged

var myColour = (255);


function setup() {

  createCanvas(600, 520);

  button1 = createButton("Alpha");
  button2 = createButton("Bravo");
  button3 = createButton("Charlie");
  button4 = createButton("Delta");
  button5 = createButton("Echo");
  button6 = createButton("Foxtrot");
  button7 = createButton("Golf");
  button8 = createButton("Hotel");
  button9 = createButton("India");
  button10 = createButton("Juliet");

  button1.mousePressed(fun1);
  button2.mousePressed(fun2);
  button3.mousePressed(fun3);
  button4.mousePressed(fun4);
  button5.mousePressed(fun5);
  button6.mousePressed(fun6);
  button7.mousePressed(fun7);
  button8.mousePressed(fun8);
  button9.mousePressed(fun9);
  button10.mousePressed(fun10);

  
}

function draw() {
  background(135, 206, 250);

  //myColour = (255);
  // if a square is being dragged, update its position
  if (this.dragObject != null) {
    this.dragObject.position.x = mouseX;
    this.dragObject.position.y = mouseY;
  }

  //draw all squares
  for (let i = 0; i < squares.length; i++) {
    let s = squares[i];
    s.show();
  }

  for (let i = 0; i < squares.length; i++) {
    for (let j = i + 1; j < squares.length; j++) {
      //block checking collision
      if (i != j && squares[i].collides(squares[j])) {
        squares[i].changecolor();

        //set intersection color
        //fill(myColour);

        //calculate parameters
        newX = Math.max(squares[i].position.x, squares[j].position.x);
        newY = Math.max(squares[i].position.y, squares[j].position.y);

        newW = Math.min(squares[i].position.x + squares[i].w, squares[j].position.x + squares[j].w) - newX;
        newH = Math.min(squares[i].position.y + squares[i].h, squares[j].position.y + squares[j].h) - newY;

        //draw rectangle
        let col = myColour
        let Osquare = new OverlappingSquares(newX, newY, newW, newH, col);
        overlappingsquares.push(Osquare);
      }
    }
  }


}

function mousePressed() {

  if (this.dragObject == null) {

    //ask every square if they are being "hit"
    for (let i = 0; i < squares.length; i++) {
      let s = squares[i];
      if (s.hitTest()) {
        //if so, set the drag object as this square and return
        this.dragObject = s;
        return;
      }
    }

    //no squares are hit, create a new square.
    let square = new Square(mouseX, mouseY);
    squares.push(square);
  }
}

//mouse is released, release the current dragged object if there is one
function mouseReleased() {
  this.dragObject = null;
}

class Square {
  constructor(InitialX, InitialY) {
    this.w = 60;
    this.h = 60;
    this.position = {
      x: InitialX,
      y: InitialY
    };
  }

  //basic test of mouse position against square position and if its inside the rectangle
  hitTest() {
    let x = mouseX - this.position.x;
    let y = mouseY - this.position.y;
    return (x > 0 && x < this.w) && (y > 0 && y < this.h);
  }

  show() {
    fill(50);
    rect(this.position.x, this.position.y, this.w, this.h);
  }
  collides(sqr) {
    if (this.position.x < sqr.position.x + sqr.w &&
      this.position.x + this.w > sqr.position.x &&
      this.position.y < sqr.position.y + sqr.h &&
      this.position.y + this.h > sqr.position.y) {

      return true;
    }
    return false;

  }
  changecolor() {
    for (let i = 0; i < squares.length; i++) {
      let s = squares[i];
      s.show();

    }
    for (let i = 0; i < overlappingsquares.length; i++) {
      let s = overlappingsquares[i];
      s.show();

    }
  }
}
//Overlapping sqaures class
class OverlappingSquares {
  constructor(X, Y, W, H, C) {
    this.w = W;
    this.h = H;
    this.col = C
    this.position = {
      x: X,
      y: Y
    };
  }
  show() {
    fill(this.col)
    rect(this.position.x, this.position.y, this.w, this.h);
  }
}

function fun1() {
  myColour = color(0, 255, 0); //green
}

function fun2() {
  myColour = color(255, 0, 0); //red
}

function fun3() {
  myColour = color(0, 0, 200); //blue
}

function fun4() {
  myColour = color(250, 0, 150); //pink
}

function fun5() {
  myColour = color(128, 0, 128); //purple
}

function fun6() {
  myColour = color(255, 255, 0); //yellow
}

function fun7() {
  myColour = color(128, 0, 0); //marroon
}

function fun8() {
  myColour = color(255, 128, 0); //orange
}

function fun9() {
  myColour = color(192, 105, 50); //brown
}

function fun10() {
  myColour = color(255, 228, 196); //bisque
}