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

    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}


function mutateAsteroid() {
  const radius = (Math.random() * 30) + 20;
  const x = CANVAS_WIDTH;
  const y = Math.random() * CANVAS_HEIGHT;
  return { x, radius, y};
}


class Asteroid extends Circle {
  constructor() {
    const { x, radius, y } = mutateAsteroid();
    super(x + radius, y, radius, '#9FA4A9');
    this.speed = -(Math.random() * 5 + 2);
  }

  update() {
    this.x = this.x + this.speed;

    // Mutate and Reuse
    if(this.x <= -this.radius) {
      const { x, radius, y} = mutateAsteroid();
      this.x = x + radius ;
      this.y = y;
      this.radius = radius;
      this.speed = -(Math.random() * 5 + 2);
    }
  }
}

// Game Params
const NO_OF_ASTEROIDS = 5

let asteroidGang = Array(NO_OF_ASTEROIDS).fill(null);


function init() {
  asteroidGang = asteroidGang.map(() => new Asteroid());
}

function updateState() {
  asteroidGang.forEach(asteroid => asteroid.update());
}

function drawFrame() {
  asteroidGang.forEach(asteroid => asteroid.draw());
}

function loop() {
  updateState();

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  drawFrame();

  requestAnimationFrame(loop);
}

init();
loop();
