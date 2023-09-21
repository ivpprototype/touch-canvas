const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); //get the canvas from html

// var colors = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"],
var colors = ["#000000"],
  mouseX = 0,
  mouseY = 0, //save current mouse/finger position
  centerX = 0,
  centerY = 0, //saves the center position of canvas
  startX = 0,
  start = 0, //saves position of mouse/finger where dragging/swiping starts
  offsetX,
  offsetY, //offset to center the menu items and move them around, gets in/decreased by dragging
  oldOffsetX,
  oldOffsetY,
  initialDistance,
  HORIZONTAL = 10,
  VERTICAL = 10, //how many rectangles will be on the canvas
  RECTANGLE_WIDTH = 320,
  RECTANGLE_WIDTH_HALF = RECTANGLE_WIDTH / 2,
  RECTANGLE_HEIGHT = 180, //size of rectangles
  RECTANGLE_HEIGHT_HALF = RECTANGLE_HEIGHT / 2,
  PADDINGX = 20,
  PADDINGY = 50; //the gap between rectangles

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; //set canvas to full size of the window

offsetX =
  (canvas.width - RECTANGLE_WIDTH * HORIZONTAL - PADDINGX * (HORIZONTAL - 1)) /
  2; //center the rectangles horizontally
offsetY =
  (canvas.height - RECTANGLE_HEIGHT * VERTICAL - PADDINGY * (VERTICAL - 1)) / 2; //center the rectangles vertically

centerX = canvas.width / 2;
centerY = canvas.height / 2;

window.addEventListener("touchstart", handleTouch);

function handleTouch(e) {
  // e.preventDefault();

  window.addEventListener("touchmove", handleSwipe);
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
  oldOffsetX = offsetX;
  oldOffsetY = offsetY;

  const touches = e.touches;
  // Calculate the initial distance between the two touch points
  if (touches.length === 2) {
    const x1 = touches[0].pageX;
    const y1 = touches[0].pageY;
    const x2 = touches[1].pageX;
    const y2 = touches[1].pageY;
    initialDistance = Math.hypot(x2 - x1, y2 - y1);
  }

  //Package touch data and send it over the socket
  let touchPayload = {
    clientX: startX,
    clientY: startY,
  };
  socket.emit("touchstart", touchPayload);
}

function handleSwipe(e) {
  // e.preventDefault();
  mouseX = e.changedTouches[0].clientX;
  mouseY = e.changedTouches[0].clientY;
  offsetX = oldOffsetX + mouseX - startX;
  offsetY = oldOffsetY + mouseY - startY;

  // Calculate the current distance between the two touch points
  if (initialDistance !== null && e.touches.length === 2) {
    const x1 = e.touches[0].pageX;
    const y1 = e.touches[0].pageY;
    const x2 = e.touches[1].pageX;
    const y2 = e.touches[1].pageY;

    const currentDistance = Math.hypot(x2 - x1, y2 - y1);

    // Determine whether it's an expand or pinch gesture
    if (currentDistance > initialDistance) {
      console.log("Expand", currentDistance, initialDistance);
      socket.emit("expand", currentDistance);
    } else {
      console.log("Pinch", currentDistance, initialDistance);
      socket.emit("pinch", currentDistance);
    }
  }

  //Package touch data and send it over the socket
  let touchPayload = {
    clientX: mouseX,
    clientY: mouseY,
  };
  socket.emit("touchmove", touchPayload);
}

window.addEventListener("touchend", () => {
  window.removeEventListener("touchmove", handleSwipe);
});

window.addEventListener("mousedown", handleClick);

function handleClick(e) {
  // e.preventDefault();
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
}

window.addEventListener("resize", () => {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
});

var socket = io();
