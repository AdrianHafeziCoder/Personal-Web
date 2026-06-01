const button_Generator = document.querySelector(".button_Generator");
const color_code = document.querySelector(".color_code");
const color_card = document.querySelector(".color-card");

button_Generator.addEventListener("click", function () {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  color_code.innerHTML = `rgb(${red},${green},${blue})`;
  color_card.style.backgroundColor = `rgb(${red},${green},${blue})`;
});
