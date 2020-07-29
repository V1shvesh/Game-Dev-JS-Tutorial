import './styles.css';

// 2. Query the DOM Tree for its DOM node.
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

// 4. Fetch the rendering context for programmatically drawing on the canvas.
const ctx = canvas.getContext('2d');