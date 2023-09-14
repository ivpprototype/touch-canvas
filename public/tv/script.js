const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); //get the canvas from html

var contents = []; // array to hold loaded content images
const contentUrls = [
  "1EAxNqdkVnp48a7NUuNBHGflowM.jpg",
  "1OD1Uf1934VxlAC19NZcVJUu0Eu.jpg",
  "1omLO5cfU8sYjm9xs9EwkyZkZ8l.jpg",
  "1pz4ZArUTM1jrpR6XkYuDlEQncG.jpg",
  "28er4p7B5zMSxUDQKPF1hBsgnys.jpg",
  "2SJFhDivnnYfltnxcYecydC0buv.jpg",
  "2ii07lSwHarg0gWnJoCYL3Gyd1j.jpg",
  "2vFuG6bWGyQUzYS9d69E5l85nIz.jpg",
  "3VjhZz7CrNSdKUIMYg4dVcyrRbb.jpg",
  "3mrli3xsGrAieQks7KsBUm2LpCg.jpg",
  "4TAKTbN3viFUERDGAvEF1iuSHVD.jpg",
  "4cAAKyUuVn30LKUXxJHPSaqvrVH.jpg",
  "4fLZUr1e65hKPPVw0R3PmKFKxj1.jpg",
  "4vlsYpItGVZN1UWZGqQBoCzrUSw.jpg",
  "53z2fXEKfnNg2uSOPss2unPBGX1.jpg",
  "5FQZ5fnveOkAsxeCTK94KqZg0WA.jpg",
  "5Jfk2p3iGrChUKkl0cBD5krr2u8.jpg",
  "5SBgIj4PejTBe3gGMb2zTTCMkXB.jpg",
  "5cdSqqn5fglcggXqh2jpPHCqSrN.jpg",
  "5mzr6JZbrqnqD8rCEvPhuCE5Fw2.jpg",
  "5ut2rC5H1YE0GnNPpl1csnNvqum.jpg",
  "70aVSo3fuZ94jyQ3rT64afEf8lV.jpg",
  "747dgDfL5d8esobk7h4odaOFhUq.jpg",
  "7C0xeAUYGQa0ETvPYndlaml9Y8H.jpg",
  "7CSILt4l54Kxsk0DzQTYPq9WojO.jpg",
  "7TdVWAO7vV9j1OLDq1hQJS3pb4U.jpg",
  "7drO1kYgQ0PnnU87sAnBEphYrSM.jpg",
  "7gFEPIcJDQvGq9xTvlPL2ZQB27c.jpg",
  "8FQeHmusSN2hk3bICf16x5GFQvT.jpg",
  "8FhKnPpql374qyyHAkZDld93IUw.jpg",
  "8Y0RxH5cXiKV8C9Wyj6JkW9VYaG.jpg",
  "9fd2ER66g0X5CHOuklLpLxaanvU.jpg",
  "9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
  "A2avUoNFstnBhAnHiogXQs4c9Bt.jpg",
  "AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
  "Als2QyqbLgT5G3rwTGJta8QQfqP.jpg",
  "AvSeU3ji59QLN2tfWXzVqI6hg8x.jpg",
  "a9zLkSGkP4NLSwTEr67RDM6eWIC.jpg",
  "aPvIX46VtxZDwu5bB2UcJ7xdpxs.jpg",
  "aRYhlWtxJoW8URLJJsPtn5788ge.jpg",
  "bmStpqOfwZt7tUbGZXp3VbSL8a0.jpg",
  "c3XZUKhBpzzciUDYxeWRnZtOpXz.jpg",
  "c6Splshb8lb2Q9OvUfhpqXl7uP0.jpg",
  "cOF7XiobQU4TC2tKDPXJ8d2nULP.jpg",
  "cUHxmWfkp6se0Rt10Kr86bMCYDE.jpg",
  "cjRlBXjfevMG3MvTjYi7om9XFuR.jpg",
  "ctMserH8g2SeOAnCw5gFjdQF8mo.jpg",
  "czVIuIXqDPgCBHI3vLYQcRtzAo7.jpg",
  "dvHKdXijoN1OEzGcPhd0eRvkfMd.jpg",
  "eMPxmNvJjxVZIQWI2t1VmNC5IuR.jpg",
  "eXDkeWY3EGBhAPL5y8Jk7aonwu4.jpg",
  "egLT5zBX70WvctWWnDmayB7RAOR.jpg",
  "eyGQvQ2vd57OcxpfIV402a55lHd.jpg",
  "f5FjEf3u4ybAKfqUainQwJhZPy2.jpg",
  "f5pYm9znYtntwZYNoVG2tIfvpWq.jpg",
  "fIQfdZ6fqf9mIbqBaexbgIEIk5K.jpg",
  "fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
  "fydUcbkqLyESCFa9U5XKqi8dIVj.jpg",
  "g54U2tvRg94NXzx2oUh1bypXg3F.jpg",
  "g8kCHQzfogy1t1dE9nPBtiFkz64.jpg",
  "gcbZ2ZdVzfBsGmfjTy8g7UaZS16.jpg",
  "gknIloEJve4FgAzlKdOUZu1K9HT.jpg",
  "h0nmmdFAdBjQttN8Y0q825MWzZp.jpg",
  "hCxxOJojCUFyuahDx167glJgp7E.jpg",
  "hYzwW7cyU39u88ZX5IMGtnm1tiw.jpg",
  "hZ5r3hrbQ9uqXBxto1VpixOfqvj.jpg",
  "hb0BeFvZNx2zLGWwuwENOIVeK1U.jpg",
  "hooqHRFqNrpVn7qhOPS9t9fOux8.jpg",
  "iEFuHjqrE059SmflBva1JzDJutE.jpg",
  "iUCNrTKQZRKmKMEMIznm2UlUmEd.jpg",
  "ib60Wkq4ejmslT7PlSm0lYqxxqg.jpg",
  "ie2IAAPq5464uEmiMsabQExYmrD.jpg",
  "ixZzr4PyM2TPs5fka3IJj058WYo.jpg",
  "jDjmnEuNUfWHg8rbW6u8mylkcO0.jpg",
  "jkKVLzLWjSvTnc84VzeljhSy6j8.jpg",
  "jn7U0C8ZKjL1M8skZ5lBdSLYcST.jpg",
  "jsgRkhPxYtzAhDFCUyNbvlX63tY.jpg",
  "lEMO9pVODhiWLgJzuCaYlfJkdNz.jpg",
  "lMZ4KpFi6nhm4VjPvAxUt18HeOx.jpg",
  "lUPz9zW0uf0bHfYsRRID8RtBHEU.jpg",
  "lay1O68tG9WdLnHxOLCHe2WcWwn.jpg",
  "nEuPSz6LhmrtYp7K56dbsmomuqA.jpg",
  "nKOutYdpjpxdeftoXcDnSAaD2z8.jpg",
  "nVP2UAvA9pH7h3pkkKryyMc3cGl.jpg",
  "nYDPmxvl0if5vHBBp7pDYGkTFc7.jpg",
  "o9bbojtrrpl0yriiTmzC3Lp3OhA.jpg",
  "oGY415S8J0NxVbXKHaEOwns1ZWf.jpg",
  "ofhCK7zP0fMJzJC3mn9roLmAfq5.jpg",
  "p4o1xEIHdQVuchXzkFSQORh3gWx.jpg",
  "pcWxKfFNCznTKYy0E8M9nG1cwL4.jpg",
  "qAvou7F5P4VcIR72JzzrnKEQSN3.jpg",
  "qElNES0sHVQcbzvGrTx7ccpGzij.jpg",
  "qEm4FrkGh7kGoEiBOyGYNielYVc.jpg",
  "qNmLEOGZy37vKAPqcTuZ47uCOS9.jpg",
  "qykUYxstHurdadXTF711AWZi0f8.jpg",
  "rHnANzYUmV3WZw3n0yWOLiR3pen.jpg",
  "rMvPXy8PUjj1o8o1pzgQbdNCsvj.jpg",
  "rRcNmiH55Tz0ugUsDUGmj8Bsa4V.jpg",
  "rTJ8LLzT9NPRJA2dnQs0241bMRn.jpg",
  "rztN8OH9nuFGTaNJHE3kN62VZTz.jpg",
  "sdwjQEM869JFwMytTmvr6ggvaUl.jpg",
  "tOfJuyfEbUMSSyBK24CAehphKwD.jpg",
  "tUlUdP04nDWsy372myIHuA2qdNv.jpg",
  "uKTkiw3w3LfdzgiPOvu0C19Voi3.jpg",
  "ueGDrUAyaA3HyucvixFOkr4nqPD.jpg",
  "urDWNffjwmNi5IQaezw9GwqkUXa.jpg",
  "v9L9ydhE5gExur77cLGyaxGNJoN.jpg",
  "vU17WOMHpwTxdOHU4AuNDxDCuf7.jpg",
  "w2nFc2Rsm93PDkvjY4LTn17ePO0.jpg",
  "wD2kUCX1Bb6oeIb2uz7kbdfLP6k.jpg",
  "wNYUv8u5Z0AI4dkyxGyet7eLEWm.jpg",
  "wcka0WH6otb1xueWk62Rpxqh3nm.jpg",
  "wyFvoSPBw2WbRO0LW5CDeNhTZVA.jpg",
  "xkXsV1WOiKfAJ6dzXiavdwsZ3E2.jpg",
  "yHmE5nLR6uWDZlwo3z7zHC5GFKh.jpg",
  "ymDCdsobG8P4S3epFvT0CLDvEhP.jpg",
  "yvotjJ9nKlPKiwc8PtktIjRCkof.jpg",
  "zjmHE7pDSOFVOsfDTwSsczwXPdP.jpg",
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
    // const imageIndex = getRandomInt(0, contentUrls.length);
    contentImg.src = "/posters/" + contentUrls[j];
    console.log(contentImg.src);
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
