import './styles.css';

// 2. Query the DOM Tree for its DOM node.
const audioElement = document.querySelector('audio');

// 3. Create an AudioContext for programmatically controlling its playback.
const audioContext = new AudioContext();

// 4. Access the track from the <audio> element. 
const track = audioContext.createMediaElementSource(audioElement);
track.mediaElement.loop = true;

// Set up the GainNode and adjust volume
const volumeControl = new GainNode(audioContext);
volumeControl.gain.value = 0.7;

// Connect the Audio Nodes
track.connect(volumeControl);
volumeControl.connect(audioContext.destination);

// To circumvent Chrome autoplay policy
if(audioContext.state === 'suspended') {
  audioContext.resume();
}

// Play it up!
audioElement.play();

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

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

// Cursor Coordinates
let mouseX = CANVAS_WIDTH / 2;
let mouseY = CANVAS_HEIGHT / 2;

// Mouse Move Event Handler
window.addEventListener('mousemove', event => {
  mouseX = event.x;
  mouseY = event.y;
});

const debounce = (func) => {
  let timer;
  return (event) => {
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(func, 100, event);
  }
}

// Window Resize Event Handler
window.addEventListener('resize', debounce(updateCanvasDimensions));

const ctx = canvas.getContext('2d');


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

// Warp Drive Sold Separately
class Spaceship extends Circle {
  constructor() {
    super(mouseX, mouseY, 20, '#1A535C');
  }

  // Follow the cursor
  update() {
    this.x = mouseX;
    this.y = mouseY;
  }
}

function detectCollisions(spaceship, asteroidGang) {
  for(let asteroid of asteroidGang) {
    const distanceBetweenPlayerandBoulder = distance(spaceship.x, spaceship.y, asteroid.x, asteroid.y);
    if (distanceBetweenPlayerandBoulder <= spaceship.radius + asteroid.radius) {
      asteroid.fillColor = '#3d4042';
      return true;
    }
  }
  return false;
}

// Game Params
const NO_OF_ASTEROIDS = 5

let asteroidGang = Array(NO_OF_ASTEROIDS).fill(null);
let spaceship = null;
let isColliding = false;

function init() {
  asteroidGang = asteroidGang.map(() => new Asteroid());
  spaceship = new Spaceship();
}

function updateState() {
  asteroidGang.forEach(asteroid => asteroid.update());
  isColliding || spaceship.update();
}

function drawFrame() {
  asteroidGang.forEach(asteroid => asteroid.draw());
  spaceship.draw()
}

function loop() {
  updateState();

  if(detectCollisions(spaceship, asteroidGang)) {
    isColliding = true;
    spaceship.fillColor = '#A53F2B';
    asteroidGang.forEach(asteroid => {
      asteroid.speed = 0;
    });
  }

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

  drawFrame();

  requestAnimationFrame(loop);
}

init();
loop();
