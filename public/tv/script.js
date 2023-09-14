const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); //get the canvas from html

var contents = []; // array to hold loaded content images
var contentUrls = [
  "http://image.tmdb.org/t/p/original/53z2fXEKfnNg2uSOPss2unPBGX1.jpg",
  "http://image.tmdb.org/t/p/original/5mzr6JZbrqnqD8rCEvPhuCE5Fw2.jpg",
  "http://image.tmdb.org/t/p/original/2ii07lSwHarg0gWnJoCYL3Gyd1j.jpg",
  "http://image.tmdb.org/t/p/original/eMPxmNvJjxVZIQWI2t1VmNC5IuR.jpg",
  "http://image.tmdb.org/t/p/original/3mrli3xsGrAieQks7KsBUm2LpCg.jpg",
  "http://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
  "http://image.tmdb.org/t/p/original/4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg",
  "http://image.tmdb.org/t/p/original/8FQeHmusSN2hk3bICf16x5GFQvT.jpg",
  "http://image.tmdb.org/t/p/original/rTJ8LLzT9NPRJA2dnQs0241bMRn.jpg",
  "http://image.tmdb.org/t/p/original/jn7U0C8ZKjL1M8skZ5lBdSLYcST.jpg",
  "http://image.tmdb.org/t/p/original/w2nFc2Rsm93PDkvjY4LTn17ePO0.jpg",
  "http://image.tmdb.org/t/p/original/2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
  "http://image.tmdb.org/t/p/original/qEm4FrkGh7kGoEiBOyGYNielYVc.jpg",
  "http://image.tmdb.org/t/p/original/9m161GawbY3cWxe6txd1NOHTjd0.jpg",
  "http://image.tmdb.org/t/p/original/fgsHxz21B27hOOqQBiw9L6yWcM7.jpg",
  "http://image.tmdb.org/t/p/original/2QL5j6mB4ZpyBcVr0WO9H9MQGBu.jpg",
  "http://image.tmdb.org/t/p/original/yF1eOkaYvwiORauRCPWznV9xVvi.jpg",
  "http://image.tmdb.org/t/p/original/4XM8DUTQb3lhLemJC51Jx4a2EuA.jpg",
  "http://image.tmdb.org/t/p/original/sC8YOcp8tOQ5s9RgGsZnLDGTZSa.jpg",
  "http://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
];

var colors = ["#FF9AA2", "#FFB7B2", "#FFDAC1", "#E2F0CB", "#B5EAD7", "#C7CEEA"],
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
  RECTANGLE_WIDTH = 320,
  RECTANGLE_WIDTH_HALF = RECTANGLE_WIDTH / 2,
  RECTANGLE_HEIGHT = 180, //size of rectangles
  RECTANGLE_HEIGHT_HALF = RECTANGLE_HEIGHT / 2,
  PADDINGX = 20,
  PADDINGY = 50, //the gap between rectangles
  SCALE_FACTOR = 1000; //small number = icons get small faster, smaller number = icons get small slowly

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

function lerp(start, end, t) {
  return start * (1 - t) + end * t;
}

function getImageOpacity(scale) {
  if (scale >= 0 && scale < 0.6) {
    return lerp(0, 0.3, scale / 0.6);
  }

  if (scale >= 0.6 && scale < 0.8) {
    return lerp(0.3, 0.6, (scale - 0.6) / 0.2);
  }

  if (scale >= 0.8 && scale < 0.9) {
    return lerp(0.6, 0.8, (scale - 0.8) / 0.1);
  }

  if (scale >= 0.9) {
    return 0.9;
  }

  return 1;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

// Load content images
function loadImages() {
  let loadedContentImages = 0;

  for (let j = 0; j < HORIZONTAL * VERTICAL; j++) {
    let contentImg = new Image();

    //get a random index from 0 to length of posters
    const imageIndex = getRandomInt(0, contentUrls.length);
    contentImg.src = contentUrls[imageIndex];
    // contentImg.src = contentUrls[0] + "?random=" + j;
    contentImg.onload = function () {
      loadedContentImages++;
      if (loadedContentImages === HORIZONTAL * VERTICAL) {
        initializeImages();
      }
    };
    contents.push(contentImg);
  }
}

function initializeImages() {
  for (i = 0; i < VERTICAL; i++) {
    for (j = 0; j < HORIZONTAL; j++) {
      var contentIndex = i * HORIZONTAL + j;
      console.log(contentIndex);
      rectangles.push({ x: x, y: y, content: contents[contentIndex] });
      x += RECTANGLE_WIDTH + PADDINGX;
    }

    if (i % 2 == 0) {
      x = RECTANGLE_WIDTH / 2;
    } else {
      x = 0;
    }

    y += RECTANGLE_HEIGHT + PADDINGY;
  }

  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();

  ctx.translate(offsetX, offsetY);

  for (i = 0; i < rectangles.length; i++) {
    ctx.save();
    scale = getDistance(rectangles[i]);
    ctx.translate(rectangles[i].x, rectangles[i].y);
    ctx.scale(scale, scale);

    // Create a path for the rectangle
    ctx.beginPath();
    // ctx.rect(
    //   -RECTANGLE_WIDTH / 2,
    //   -RECTANGLE_HEIGHT / 2,
    //   RECTANGLE_WIDTH,
    //   RECTANGLE_HEIGHT
    // );

    ctx.roundRect(
      -RECTANGLE_WIDTH / 2,
      -RECTANGLE_HEIGHT / 2,
      RECTANGLE_WIDTH,
      RECTANGLE_HEIGHT,
      12
    );
    ctx.closePath();
    ctx.clip(); // Clip to the rectangle path
    ctx.globalAlpha = getImageOpacity(scale);
    // Draw the content image within the clipped area
    ctx.drawImage(
      rectangles[i].content,
      -RECTANGLE_WIDTH / 2,
      -RECTANGLE_HEIGHT / 2,
      RECTANGLE_WIDTH,
      RECTANGLE_HEIGHT
    );

    ctx.restore();
  }

  ctx.restore();
  requestAnimationFrame(draw);
}

function getDistance(rectangle) {
  var dx, dy, dist;
  dx = rectangle.x - centerX + offsetX;
  dy = rectangle.y - centerY + offsetY;
  dist = Math.sqrt(dx * dx + dy * dy);
  scale = 1.2 - dist / SCALE_FACTOR;

  scale = scale > 0 ? scale : 0.1;

  return scale;
}

loadImages();

window.addEventListener("touchstart", handleTouch);

function handleTouch(e) {
  window.addEventListener("touchmove", handleSwipe);
  // startX = e.touches[0].clientX;
  // startY = e.touches[0].clientY;
  startX = e.clientX;
  startY = e.clientY;
  oldOffsetX = offsetX;
  oldOffsetY = offsetY;
}

function handleSwipe(e) {
  // mouseX = e.changedTouches[0].clientX;
  // mouseY = e.changedTouches[0].clientY;
  mouseX = e.clientX;
  mouseY = e.clientY;
  offsetX = oldOffsetX + mouseX - startX;
  offsetY = oldOffsetY + mouseY - startY;
}

window.addEventListener("touchend", () => {
  window.removeEventListener("touchmove", handleSwipe);
});

window.addEventListener("mousedown", handleClick);

// function handleClick(e) {
//   window.addEventListener("mousemove", handleMouse);
//   window.addEventListener("mouseup", handleRelease);
//   startX = e.clientX;
//   startY = e.clientY;
//   oldOffsetX = offsetX;
//   oldOffsetY = offsetY;
//   canvas.style.cursor = "grabbing";
// }

// function handleMouse(e) {
//   mouseX = e.clientX;
//   mouseY = e.clientY;
//   offsetX = oldOffsetX + mouseX - startX;
//   offsetY = oldOffsetY + mouseY - startY;
// }

function handleClick(e) {
  // window.addEventListener("mousemove", handleMouse);
  // window.addEventListener("mouseup", handleRelease);
  //console.log("handle click");
  startX = e.clientX;
  startY = e.clientY;
  oldOffsetX = offsetX;
  oldOffsetY = offsetY;
  // canvas.style.cursor = "grabbing";
}

function handleMouse(e) {
  // console.log("handle mouse");
  mouseX = e.clientX;
  mouseY = e.clientY;
  offsetX = oldOffsetX + mouseX - startX;
  offsetY = oldOffsetY + mouseY - startY;
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

socket.on("move mouse", (data) => {
  //received message
  handleMouse(data);
});

socket.on("handle click", (data) => {
  //received message
  handleClick(data);
});

socket.on("touchmove", (data) => {
  //received message
  handleSwipe(data);
});

socket.on("touchstart", (data) => {
  //received message
  handleTouch(data);
});

socket.on("pauseanimation", () => {
  pauseAnimation();
});
