"use strict";

// const valueOne = document.getElementById("value-one");
// const valueTwo = document.getElementById("value-two");
// const valueThree = document.getElementById("value-three");
// const valueFour = document.getElementById("value-four");
const sumValue = document.getElementById("sum-value");
const avgValue = document.getElementById("avg-value");
const minValue = document.getElementById("min-value");
const maxValue = document.getElementById("max-value");
let values = document.querySelectorAll(".value");
const form = document.getElementById("form");
const btn = document.getElementById("btn");
const btnAdd = document.querySelector(".btn-add");
const btnDelete = document.querySelector(".btn-delete");

let sum = 0;
let avg = 0;
let min = 0;
let max = 0;

btn.addEventListener("click", function (e) {
  e.preventDefault();
  values.forEach((element) => {
    sum += Number(element.value);
    avg = sum / 4;
    min = Math.min(element.value);
    max = Math.max(element.value);
  });
  sumValue.innerHTML = `${sum}`;
  avgValue.innerHTML = `${avg}`;
  minValue.innerHTML = `${min}`;
  maxValue.innerHTML = `${max}`;

  sum = 0;
});

const onChangeCalck = function () {
  values.forEach((el) => {
    el.addEventListener("input", function () {
      values.forEach((element) => {
        sum += Number(element.value);
        avg = sum / 4;
        min = Math.min(element.value);
        max = Math.max(element.value);
      });
      sumValue.innerHTML = `${sum}`;
      avgValue.innerHTML = `${avg}`;
      minValue.innerHTML = `${min}`;
      maxValue.innerHTML = `${max}`;

      sum = 0;
    });
  });
};

onChangeCalck();

btnAdd.addEventListener("click", function () {
  form.insertAdjacentHTML(
    "afterbegin",
    `<input type="number" class="value" />`
  );
  values = document.querySelectorAll(".value");
  onChangeCalck();
});

btnDelete.addEventListener("click", function () {
  console.log(values);
  console.log(values[values.length - 1].remove());
  values[values.length - 1].remove();
  values = document.querySelectorAll(".value");
  onChangeCalck();
});
