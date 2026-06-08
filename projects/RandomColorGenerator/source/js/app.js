const button_Generator = document.querySelector(".button_Generator");
const color_code = document.querySelector(".color_code");
const color_card = document.querySelector(".color-card");
const currentTimeEl = document.querySelector("#currentTime");

button_Generator.addEventListener("click", function () {
  let red = Math.floor(Math.random() * 255);
  let green = Math.floor(Math.random() * 255);
  let blue = Math.floor(Math.random() * 255);

  color_code.innerHTML = `rgb(${red},${green},${blue})`;
  color_card.style.backgroundColor = `rgb(${red},${green},${blue})`;
});
// Update current time
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  currentTimeEl.textContent = `${hours}:${minutes}`;
}
updateTime();
setInterval(updateTime, 60000);
