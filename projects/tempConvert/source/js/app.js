const clear_btn = document.querySelector(".clear_btn");
const temp_input = document.querySelector(".temp-input");
const f_result = document.querySelector(".f-result");
const alert_result = document.querySelector("#alert_result");
const currentTimeEl = document.querySelector("#currentTime");

const errorToast = document.querySelector("#errorToast");

let result_f = 0;

function cTemp() {
  const tempInput = +temp_input.value;
  if (isNaN(tempInput)) {
    errorToast.classList.remove("hide");
    errorToast.classList.add("show");
    alert_result.innerHTML =
      "Please enter a valid number! Only numeric values are accepted";
  } else {
    errorToast.classList.remove("show");
    errorToast.classList.add("hide");
    result_f = tempInput * 1.8 + 32;
    f_result.innerHTML = result_f;
  }
}

function clearData() {
  errorToast.classList.remove("show");
  errorToast.classList.add("hide");
  temp_input.value = "";
  f_result.innerHTML = "--";
}

temp_input.addEventListener("keyup", cTemp);
clear_btn.addEventListener("click", clearData);

// Update current time
function updateTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  currentTimeEl.textContent = `${hours}:${minutes}`;
}
updateTime();
setInterval(updateTime, 60000);
