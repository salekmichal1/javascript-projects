'use strict';
const canvas = document.getElementById('canva');
const startBtn = document.querySelector('.start-btn');
const resetBtn = document.querySelector('.reset-btn');
const ctx = canvas.getContext('2d');

const balls = [];
const ballCount = 40;
const ballRadius = 25;
const cursorForce = 0.25;
const maxSpeed = 1.5;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - ballRadius;

for (let i = 0; i < ballCount; i++) {
  balls.push({
    // pozycja
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    // predkosc
    dx: (Math.random() < 0.5 ? Math.random() - 1 : Math.random()) * 2,
    dy: (Math.random() < 0.5 ? Math.random() - 1 : Math.random()) * 2,
    originalSpeed: 1,
    currentSpeed: 1,
    slowingDown: false,
  });
}

const drawBall = function (x, y) {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = 'aqua';
  ctx.fill();
  ctx.closePath();
};

const drawLine = function (ball1, ball2) {
  ctx.beginPath();
  ctx.moveTo(ball1.x, ball1.y);
  ctx.lineTo(ball2.x, ball2.y);
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
};

const resetCanvas = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < balls.length; i++) {
    balls[i] = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: (Math.random() - 0.5) * 4,
      dy: (Math.random() - 0.5) * 4,
      originalSpeed: 1,
      currentSpeed: 1,
      slowingDown: false,
    };
  }
};

const onMouseMove = function (event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const distance = Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2);

    if (distance < 50) {
      const angle = Math.atan2(ball.y - mouseY, ball.x - mouseX);
      ball.dx += Math.cos(angle) * cursorForce;
      ball.dy += Math.sin(angle) * cursorForce;
      ball.slowingDown = true;
    }
  }
};

const onClick = function (event) {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];
    const distance = Math.sqrt((ball.x - mouseX) ** 2 + (ball.y - mouseY) ** 2);

    if (distance < ballRadius) {
      // usuń klikniętą kulę
      balls.splice(i, 1);

      // Dodaj dwie nowe kule
      for (let j = 0; j < 2; j++) {
        balls.push({
          // pozycja
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          // predkosc
          dx: (Math.random() < 0.5 ? Math.random() - 1 : Math.random()) * 2,
          dy: (Math.random() < 0.5 ? Math.random() - 1 : Math.random()) * 2,
          originalSpeed: 1,
          currentSpeed: 1,
          slowingDown: false,
        });
      }
      console.log(balls);
      //
      break;
    }
  }
};

const startAnimate = function () {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    // sprawdzanie ścianek
    if (
      ball.x + ball.dx > canvas.width - ballRadius ||
      ball.x + ball.dx < ballRadius
    ) {
      ball.dx = -ball.dx;
    }

    if (
      ball.y + ball.dy > canvas.height - ballRadius ||
      ball.y + ball.dy < ballRadius
    ) {
      ball.dy = -ball.dy;
    }

    // Ruszanie kulek
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.slowingDown) {
      // zmniejsanie przedkości do orygianlnej
      ball.currentSpeed *= 0.95;
      if (ball.currentSpeed < ball.originalSpeed) {
        // zatrzymaj zwalnianie
        ball.slowingDown = false;
        ball.currentSpeed = ball.originalSpeed;
      }
    } else {
      // utrzymanie predkosci
      const speed = Math.sqrt(ball.dx ** 2 + ball.dy ** 2);
      if (speed > maxSpeed) {
        const ratio = maxSpeed / speed;
        ball.dx *= ratio;
        ball.dy *= ratio;
      }
    }

    // Draw ball
    drawBall(ball.x, ball.y);

    // Rysowanie lini
    for (let j = i + 1; j < balls.length; j++) {
      const otherBall = balls[j];
      const distance = Math.sqrt(
        (ball.x - otherBall.x) ** 2 + (ball.y - otherBall.y) ** 2
      );

      if (distance < 100) {
        drawLine(ball, otherBall);
      }
    }
  }

  requestAnimationFrame(startAnimate);
};

startBtn.addEventListener('click', function () {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('click', onClick);

  startAnimate();
});
resetBtn.addEventListener('click', resetCanvas);

console.log(balls, canvas.width, canvas.height);

// 1500 kulek
