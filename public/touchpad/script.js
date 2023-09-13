const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); //get the canvas from html

// var colors = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"],
var colors = ["#000000"],
  mouseX = 0,
  mouseY = 0, //save current mouse/finger position
  rectangles = [], //array of menu items
  centerX = 0,
  centerY = 0, //saves the center position of canvas
  startX = 0,
  start = 0, //saves position of mouse/finger where dragging/swiping starts
  offsetX,
  offsetY, //offset to center the menu items and move them around, gets in/decreased by dragging
  oldOffsetX,
  oldOffsetY, //save old offsets to update current offset
  scale,
  i,
  j, //used for counters
  x,
  y, //used for creating the array of rectangles
  clicked, //for saving the mouse state
  HORIZONTAL = 10,
  VERTICAL = 10, //how many rectangles will be on the canvas
  RECTANGLE_WIDTH = 360,
  RECTANGLE_WIDTH_HALF = RECTANGLE_WIDTH / 2,
  RECTANGLE_HEIGHT = 180, //size of rectangles
  RECTANGLE_HEIGHT_HALF = RECTANGLE_HEIGHT / 2,
  PADDINGX = 10,
  PADDINGY = 20, //the gap between rectangles
  SCALE_FACTOR = 900; //small number = icons get small faster, smaller number = icons get small slowly

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; //set canvas to full size of the window

offsetX =
  (canvas.width - RECTANGLE_WIDTH * HORIZONTAL - PADDINGX * (HORIZONTAL - 1)) /
  2; //center the rectangles horizontally
offsetY =
  (canvas.height - RECTANGLE_HEIGHT * VERTICAL - PADDINGY * (VERTICAL - 1)) / 2; //center the rectangles vertically

centerX = canvas.width / 2;
centerY = canvas.height / 2;

x = 0;
y = 0;

for (i = 0; i < VERTICAL; i++) {
  for (j = 0; j < HORIZONTAL; j++) {
    var randomColor = colors[Math.round(Math.random() * (colors.length - 1))]; //generating a random color for the menu rectangle

    rectangles.push({ x: x, y: y, color: randomColor }); //add rectangle with x and y coordinates and color to the array
    x += RECTANGLE_WIDTH + PADDINGX; //increase x for the next rectangle
  }

  if (i % 2 == 0) {
    //x = PADDINGX / 2 + RECTANGLE_WIDTH; //if its the second, fourth, sixth etc. row then move the row to right
    x = RECTANGLE_WIDTH / 2;
  } else {
    x = 0;
  }

  y += RECTANGLE_HEIGHT + PADDINGY; //increase y for the next rectangle row
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas

  ctx.save();

  ctx.translate(offsetX, offsetY);

  for (i = 0; i < rectangles.length; i++) {
    ctx.save();
    scale = getDistance(rectangles[i]);
    //ctx.translate(rectangles[i].x + RECTANGLE_WIDTH / 2, rectangles[i].y + RECTANGLE_HEIGHT / 2); // translate to the center of the rectangle
    //ctx.scale(scale, scale);

    // ctx.translate(rectangles[i].x, rectangles[i].y);
    // ctx.translate(RECTANGLE_WIDTH_HALF, RECTANGLE_HEIGHT_HALF);
    // ctx.scale(scale, scale);
    // ctx.translate(-RECTANGLE_WIDTH_HALF, -RECTANGLE_HEIGHT_HALF / 2);
    // ctx.translate(RECTANGLE_WIDTH_HALF, 0);

    ctx.translate(rectangles[i].x, rectangles[i].y);
    // ctx.translate(RECTANGLE_WIDTH_HALF, RECTANGLE_HEIGHT_HALF);
    ctx.scale(scale, scale);
    // ctx.translate(-RECTANGLE_WIDTH_HALF, -RECTANGLE_HEIGHT_HALF / 2);

    ctx.fillStyle = rectangles[i].color;
    ctx.fillRect(
      -RECTANGLE_WIDTH / 2,
      -RECTANGLE_HEIGHT / 2,
      RECTANGLE_WIDTH,
      RECTANGLE_HEIGHT
    ); // draw rectangle centered at (0, 0)
    ctx.font = "16px Arial";
    ctx.fillStyle = "#000";
    //ctx.fillText (i, 50,0 + (i * 20));
    ctx.textAlign = "center";
    ctx.fillText(i, 0, 0);
    ctx.restore();
  }

  ctx.restore();
  requestAnimationFrame(draw);
}

draw();

function getDistance(rectangle) {
  var dx, dy, dist;
  dx = rectangle.x - centerX + offsetX;
  dy = rectangle.y - centerY + offsetY;
  dist = Math.sqrt(dx * dx + dy * dy);
  scale = 1.2 - dist / SCALE_FACTOR;
  scale = scale > 0 ? scale : 0.5;

  return scale;
}

window.addEventListener("touchstart", handleTouch);

function handleTouch(e) {
  window.addEventListener("touchmove", handleSwipe);
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  oldOffsetX = offsetX;
  oldOffsetY = offsetY;

  //Package touch data and send it over the socket
  let touchPayload = {
    clientX: startX,
    clientY: startY,
  };
  socket.emit("touchstart", touchPayload);
}

function handleSwipe(e) {
  mouseX = e.changedTouches[0].clientX;
  mouseY = e.changedTouches[0].clientY;
  offsetX = oldOffsetX + mouseX - startX;
  offsetY = oldOffsetY + mouseY - startY;

  //Package touch data and send it over the socket
  let touchPayload = {
    clientX: mouseX,
    clientY: mouseY,
  };
  socket.emit("touchmove", touchPayload);
}

window.addEventListener("touchend", () => {
  window.removeEventListener("touchmove", handleSwipe);
  socket.emit("pauseanimation");
});

window.addEventListener("mousedown", handleClick);

function handleClick(e) {
  window.addEventListener("mousemove", handleMouse);
  window.addEventListener("mouseup", handleRelease);
  startX = e.clientX;
  startY = e.clientY;
  oldOffsetX = offsetX;
  oldOffsetY = offsetY;
  canvas.style.cursor = "grabbing";

  //Package mouse data and send it over the socket
  let mousePayload = {
    clientX: startX,
    clientY: startY,
    // oldOffsetX: oldOffsetX,
    // oldOffsetY: oldOffsetY,
  };
  socket.emit("handle click", mousePayload);
}

function handleMouse(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  offsetX = oldOffsetX + mouseX - startX;
  offsetY = oldOffsetY + mouseY - startY;

  //Package mouse data and send it over the socket
  let mousePayload = {
    clientX: mouseX,
    clientY: mouseY,
    // offsetX: offsetX,
    // offsetY: offsetY,
  };
  socket.emit("move mouse", mousePayload);
}

function handleRelease() {
  window.removeEventListener("mouseup", handleRelease);
  window.removeEventListener("mousemove", handleMouse);
  canvas.style.cursor = "grab";
  socket.emit("pauseanimation");
}

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
});

var socket = io();
