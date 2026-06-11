// GO TOP BUTTON
const go_top = document.querySelector(".go-top");

if (go_top) {
  function Gotop() {
    if (document.documentElement.scrollTop > 1000) {
      go_top.classList.add("show");
    } else {
      go_top.classList.remove("show");
    }
  }
  function GotopButton() {
    document.documentElement.scrollTo(0, 0);
  }
  document.addEventListener("scroll", Gotop);
  go_top.addEventListener("click", GotopButton);
}

//* ================== HEADER ===================  //
// ========== BUBBLE MENU ==========
const hamburger = document.getElementById("hamburger");
const bubbleMenu = document.getElementById("bubbleMenu");
let isOpen = false;
let isBursting = false;

if (hamburger && bubbleMenu) {
  function openMenu() {
    bubbleMenu.classList.remove("burst");
    bubbleMenu.classList.add("open");
    hamburger.classList.add("active");
    isOpen = true;
  }

  function closeMenu() {
    if (isBursting) return;
    isBursting = true;

    bubbleMenu.classList.remove("open");
    bubbleMenu.classList.add("burst");
    hamburger.classList.remove("active");

    setTimeout(() => {
      bubbleMenu.classList.remove("burst");
      isBursting = false;
    }, 500);

    isOpen = false;
  }

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  document.querySelectorAll(".bubble-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const link = item.getAttribute("data-link");

      closeMenu();

      setTimeout(() => {
        if (link.startsWith("#")) {
          const target = document.querySelector(link);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
          }
        } else {
          window.location.href = link;
        }
      }, 300);
    });
  });

  document.addEventListener("click", (e) => {
    if (
      isOpen &&
      !hamburger.contains(e.target) &&
      !bubbleMenu.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

//* ================== INDEX ===================  //
// loading
const loading_screen = document.querySelector(".loading-screen");

if (loading_screen) {
  function showSite() {
    loading_screen.classList.add("hidden");
  }
}

// HEADER-INDEX
const header = document.querySelector(".header");
if (header) {
  window.addEventListener("scroll", () => {
    if (document.documentElement.scrollTop > 5) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

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

if (
  form &&
  username &&
  email &&
  subject &&
  message &&
  error_toast &&
  alert_result &&
  submit_toast &&
  alert_submit_result
) {
  form.addEventListener("submit", (e) => {
    const username2 = username.value.trim();
    const email2 = email.value.trim();
    const subject2 = subject.value.trim();
    const message2 = message.value.trim();

    e.preventDefault();

    if (username2.length === 0) {
      error_toast.classList.add("show");
      error_toast.classList.remove("hide");
      alert_result.innerHTML = "Username must not be empty!";

      setTimeout(() => {
        error_toast.classList.add("hide");
        error_toast.classList.remove("show");
      }, 3000);
    } else if (email2.length === 0) {
      error_toast.classList.add("show");
      error_toast.classList.remove("hide");
      alert_result.innerHTML = "Email Addresses must not be empty!";

      setTimeout(() => {
        error_toast.classList.add("hide");
        error_toast.classList.remove("show");
      }, 3000);
    } else if (subject2.length === 0) {
      error_toast.classList.add("show");
      error_toast.classList.remove("hide");
      alert_result.innerHTML = "Subject must not be empty!";

      setTimeout(() => {
        error_toast.classList.add("hide");
        error_toast.classList.remove("show");
      }, 3000);
    } else if (message2.length === 0) {
      error_toast.classList.add("show");
      error_toast.classList.remove("hide");
      alert_result.innerHTML = "Message must not be empty!";

      setTimeout(() => {
        error_toast.classList.add("hide");
        error_toast.classList.remove("show");
      }, 3000);
    } else {
      error_toast.classList.add("hide");
      error_toast.classList.remove("show");

      submit_toast.classList.remove("hide");
      submit_toast.classList.add("show");
      alert_submit_result.innerHTML = "Your request has been filed";

      setTimeout(() => {
        submit_toast.classList.add("hide");
        submit_toast.classList.remove("show");
      }, 3000);
    }
  });
}
