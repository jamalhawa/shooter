// setup
var cnv = document.getElementById("myCanvas");
var ctx = cnv.getContext("2d");
cnv.width = 500;
cnv.height = 500;

//vars
var ballx = 130;
var bally = 270;
var rising = 0;
var message = "I'm READY";
var btn = document.getElementById("btn");
var position = 140;

var message2 = "";
var size = 40;
var visibility = 0;
var status = "inactive";

btn.addEventListener("click", Animate);

requestAnimationFrame(draw);

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, cnv.width, cnv.height);

  //floor
  ctx.fillStyle = "burlywood";
  ctx.fillRect(0, 350, 500, 150);

  //background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 500, 350);

  //pole
  ctx.fillStyle = "gray";
  ctx.fillRect(470, 200, 15, 200);

  ctx.fillStyle = "gray";
  ctx.fillRect(440, 200, 40, 15);

  //backboard
  ctx.fillStyle = "white";
  ctx.fillRect(440, 160, 8, 80);

  //paint
  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(120, 350);
  ctx.lineTo(120, 450);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(120, 450);
  ctx.lineTo(150, 500);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(200, 350);
  ctx.lineTo(200, 450);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(120, 450);
  ctx.lineTo(420, 450);
  ctx.stroke();

  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.beginPath();
  ctx.moveTo(420, 500);
  ctx.lineTo(420, 350);
  ctx.stroke();

  // the shoota
  let shooter = document.getElementById("shoota");
  ctx.drawImage(shooter, 30, 275, 150, 120);

  // ball
  ctx.fillStyle = "orange";
  ctx.beginPath();
  ctx.arc(ballx, bally, 13, 0, 3 * Math.PI);
  ctx.fill();

  //rim
  ctx.fillStyle = "red";
  ctx.fillRect(410, 215, 30, 5);

  //netting
  ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
  ctx.fillRect(411, 220, 28, 25);

  //speech
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`${message}`, 20, 260);

  //miss or make message
  ctx.fillStyle = `rgba(255, 255, 255, ${visibility})`;
  ctx.font = `${size}px Arial`;
  ctx.fillText(`${message2}`, `${position}`, 180);

  // Animate ball
  //miss

  if (rising == 1) {
    bally -= 2;
    ballx = ballx + 2;
    if (bally <= 150) {
      rising = 2;
    }
  } else if (rising == 2) {
    //down
    bally += 2;
    ballx = ballx + 2;
    if (size < 150 && status == "active") {
      size = size + 1;
      message2 = "MISS!";
      visibility = visibility + 0.01;
      position = position - 1;
    } else {
      position = 140;
      visibility = 0;
      size = 40;
      status = "inactive";
    }
    if (bally >= 400) {
      message = "damn it";
    }
  }

  //make
  if (rising == 3) {
    bally -= 2;
    ballx = ballx + 2;
    if (bally <= 120) {
      rising = 4;
    }
  } else if (rising == 4) {
    //down
    bally += 1.5;
    ballx = ballx + 2;
    if (bally >= 230) {
      message = "made it baby";
      if (size < 150 && status == "active") {
        size = size + 1;
        message2 = "MAKE!";
        visibility = visibility + 0.01;
        position = position - 1;
      } else {
        position = 140;
        visibility = 0;
        size = 40;
        status = "inactive";
      }
    }
  }

  requestAnimationFrame(draw);
}

function Animate() {
  if (status == "inactive") {
    var rng = Math.random() * 2;

    if (rng >= 1) {
      rising = 1;
    } else {
      rising = 3;
    }
    bally = 270;
    ballx = 130;
    message = "thats gotta be in";
    status = "active";
  }
}
