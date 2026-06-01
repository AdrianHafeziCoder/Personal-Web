//* ================== INDEX ===================  //
// loading
const loading_screen = document.querySelector(".loading-screen");
function showSite() {
  loading_screen.classList.add("hidden");
}
// HEADER-INDEX
const header = document.querySelector(".header");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//* ================== CONTACTS ME ===================  //
// FORM
const form = document.querySelector("form");
// INPUTS
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const message = document.querySelector("#message");
// ERROR
const error_toast = document.querySelector(".error-toast");
const alert_result = document.querySelector("#alert_result");
//SUBMIT
const submit_toast = document.querySelector(".submit-toast");
const alert_submit_result = document.querySelector("#alert_submit_result");

form.addEventListener("submit", (e) => {
  const username2 = username.value.trim();
  const email2 = email.value.trim();
  const subject2 = subject.value.trim();
  const message2 = message.value.trim();
  //TIME OUTE
  let time = setTimeout(() => {
    error_toast.classList.add("hide");
    error_toast.classList.remove("show");
  }, 3000);
  e.preventDefault();
  if (username2.length === 0) {
    error_toast.classList.add("show");
    error_toast.classList.remove("hide");
    alert_result.innerHTML = "Username must not be empty!";
  } else if (email2.length === 0) {
    error_toast.classList.add("show");
    error_toast.classList.remove("hide");
    alert_result.innerHTML = "Email Addresses must not be empty!";
  } else if (subject2.length === 0) {
    error_toast.classList.add("show");
    error_toast.classList.remove("hide");
    alert_result.innerHTML = "Subject must not be empty!";
  } else if (message2.length === 0) {
    error_toast.classList.add("show");
    error_toast.classList.remove("hide");
    alert_result.innerHTML = "Message must not be empty!";
  }
  //SUBMIT
  else {
    error_toast.classList.add("hide");
    error_toast.classList.remove("show");

    submit_toast.classList.remove("hide");
    submit_toast.classList.add("show");
    alert_submit_result.innerHTML = "Your request has been filed";
    //TIME OUTE
    let time = setTimeout(() => {
      submit_toast.classList.add("hide");
      submit_toast.classList.remove("show");
    }, 3000);
  }
});
