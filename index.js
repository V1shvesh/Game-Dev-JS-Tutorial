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

// Style Attributes
ctx.fillStyle = 'black';
ctx.strokeStyle = 'black';

// Rectangles
ctx.fillRect(25, 25, 100, 100);
ctx.clearRect(45, 45, 60, 60);
ctx.strokeRect(50, 50, 50, 50);

// Triangle
ctx.beginPath();
ctx.moveTo(200, 100);
ctx.lineTo(260, 40);
ctx.lineTo(320, 100);
ctx.closePath()
ctx.fill();
// Or to draw just the outline
// ctx.stroke()

// Circle
ctx.beginPath()
// ctx.arc(75, 200, 50, 0, Math.PI*2, false);
// Or a half-circle
// ctx.arc(75, 200, 50, 0, Math.PI, true);
// Let's turn that frown upside down
ctx.arc(75, 200, 50, 0, Math.PI, false);
ctx.stroke();