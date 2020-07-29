import './styles.css';

const canvas = document.querySelector('canvas');

let CANVAS_WIDTH = 400;
let CANVAS_HEIGHT = 400;

function updateCanvasDimensions() {
    CANVAS_WIDTH = window.innerWidth;
    CANVAS_HEIGHT = window.innerHeight;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
  }
  
updateCanvasDimensions();

const ctx = canvas.getContext('2d');

// Circle class
class Circle {
  constructor(x, y, radius, fillColor) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.fillColor = fillColor;
  }

  update(x,y,r,c) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.fillColor = c;
  }

  draw() {
    const { x, y, radius, fillColor } = this;

    ctx.save(); // Push the current Canvas context state in a stack.
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore(); // Pop out the previous Canvas context state from the stack.
  }
}

class Ball extends Circle {
  constructor(x, y, radius, fillColor, speed) {
    super(x, y, radius, fillColor);
    this.speed = speed; // Need for Speed
  }

  update() {
    this.x = this.x + this.speed;
  }
}

// !!!Global Variables!!!
let ballObject = null;


// Init GameObjects
function init() {
  // Init your game objects here
  ballObject = new Ball(0, 100, 50, '#00a0ef', 1);
}

function updateState() {
  ballObject.update();
}

function drawFrame() {
  ballObject.draw();
}

// Render Loop
function loop() {
  // 1. Update the state
  updateState();

  // 2. Clear the canvas
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  // 3. Render the new frame
  drawFrame();

  // Recurse Responsibly
  requestAnimationFrame(loop);
}


// Get...Set...Go!
init();
loop();
