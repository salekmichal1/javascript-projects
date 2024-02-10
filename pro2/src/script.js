const slides = document.querySelectorAll(".slide");
const silderBtnLeft = document.querySelector(".slider__btn--left");
const silderBtnRight = document.querySelector(".slider__btn--right");
const dots = document.querySelector(".dots");

const btnStart = document.querySelector(".btn-start");
const btnStop = document.querySelector(".btn-stop");

let curSlide = 0;
const maxSlide = slides.length;

// functions
const createDots = function () {
  slides.forEach(function (_, i) {
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

const slideFunc = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

const nextSlide = function () {
  if (curSlide == maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slideFunc(curSlide);
  activeDot(curSlide);
};

const previusSlide = function () {
  if (curSlide == 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  slideFunc(curSlide);
  activeDot(curSlide);
};

// function initialization
const init = function () {
  createDots();
  activeDot(0);
  slideFunc(0);
};

init();

// event handlers
silderBtnRight.addEventListener("click", nextSlide);
silderBtnLeft.addEventListener("click", previusSlide);

document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowLeft") previusSlide();
  if (e.key == "ArrowRight") nextSlide();
});

dots.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    //const slide = e.target.dataset.slide;
    const { slide } = e.target.dataset;
    slideFunc(slide);
    activeDot(slide);
  }
});

function myStopFunction() {
  clearInterval(myInterval);
}

let myInterval = setInterval(nextSlide, 2000);

[btnStop, silderBtnRight, silderBtnLeft].forEach((elem) =>
  elem.addEventListener("click", myStopFunction)
);

btnStart.addEventListener("click", function () {
  myInterval = setInterval(nextSlide, 2000);
});
