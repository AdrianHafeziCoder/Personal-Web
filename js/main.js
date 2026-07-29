// ========================================
// GRADIENT TRAIL LINE
// Follows mouse with smooth animation
// ========================================

class TrailLine {
  constructor() {
    this.canvas = document.getElementById("trailCanvas");
    this.ctx = this.canvas.getContext("2d");

    // ====== Settings ======
    this.points = [];
    this.maxPoints = 20; // طول خط (تعداد نقطه)
    this.mouseX = 0;
    this.mouseY = 0;
    this.isMoving = false;
    this.moveTimeout = null;
    this.isVisible = false;

    // ====== Colors (Gradient) ======
    this.colors = [
      "rgba(99, 102, 241, 1)", //  (primary)
      "rgba(139, 92, 246, 1)", //  (secondary)
      "rgba(168, 85, 247, 1)", // 
      "rgba(99, 102, 241, 0.8)", // 
    ];

    // ====== Initialize ======
    this.resize();
    this.bindEvents();
    this.animate();
  }

  // ====== Resize canvas ======
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
  }

  // ====== Bind events ======
  bindEvents() {
    // Mouse move
    window.addEventListener("mousemove", (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      this.isMoving = true;
      this.isVisible = true;

      // Clear previous timeout
      clearTimeout(this.moveTimeout);

      // After mouse stops, slowly fade out
      this.moveTimeout = setTimeout(() => {
        this.isMoving = false;
      }, 300);
    });

    // Mouse leave window
    window.addEventListener("mouseleave", () => {
      this.isMoving = false;
      this.isVisible = false;
    });

    // Window resize
    window.addEventListener("resize", () => {
      this.resize();
    });
  }

  // ====== Add point to trail ======
  addPoint(x, y) {
    this.points.push({ x, y, time: Date.now() });

    // Limit points
    if (this.points.length > this.maxPoints) {
      this.points.shift();
    }
  }

  // ====== Draw trail ======
  draw() {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // If not visible or no points, skip
    if (!this.isVisible || this.points.length < 2) {
      // If no points but visible, add current mouse
      if (this.isVisible) {
        this.addPoint(this.mouseX, this.mouseY);
      }
      return;
    }

    // ====== Draw the trail ======
    const gradient = ctx.createLinearGradient(
      this.points[0].x,
      this.points[0].y,
      this.points[this.points.length - 1].x,
      this.points[this.points.length - 1].y,
    );

    // Add gradient colors
    gradient.addColorStop(0, this.colors[0]);
    gradient.addColorStop(0.4, this.colors[1]);
    gradient.addColorStop(0.7, this.colors[2]);
    gradient.addColorStop(1, this.colors[3]);

    // Start path
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    // Smooth curve through points
    for (let i = 1; i < this.points.length - 1; i++) {
      const p0 = this.points[i - 1];
      const p1 = this.points[i];
      const p2 = this.points[i + 1];

      // Catmull-Rom to smooth curve
      const cp1x = p0.x + (p1.x - p0.x) * 0.5;
      const cp1y = p0.y + (p1.y - p0.y) * 0.5;
      const cp2x = p2.x - (p2.x - p1.x) * 0.5;
      const cp2y = p2.y - (p2.y - p1.y) * 0.5;

      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p1.x, p1.y);
    }

    // Last point
    const last = this.points[this.points.length - 1];
    ctx.lineTo(last.x, last.y);

    // Stroke style
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Glow effect
    ctx.shadowColor = "rgba(99, 102, 241, 0.3)";
    ctx.shadowBlur = 15;

    ctx.stroke();

    // Reset shadow
    ctx.shadowBlur = 0;

    // ====== Draw glow dots at points ======
    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i];
      const alpha = (i / this.points.length) * 0.5 + 0.2;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2 + (i / this.points.length) * 3, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
      ctx.fill();
    }
  }

  // ====== Animate loop ======
  animate() {
    // Add current mouse position
    if (this.isMoving && this.isVisible) {
      this.addPoint(this.mouseX, this.mouseY);
    }

    // If not moving, gradually remove points (fade out)
    if (!this.isMoving && this.points.length > 0) {
      // Remove points slowly
      if (this.points.length > 0 && Math.random() < 0.1) {
        this.points.shift();
      }

      // If points become less than 2, hide completely
      if (this.points.length < 2) {
        this.isVisible = false;
      }
    }

    // Draw
    this.draw();

    // Next frame
    requestAnimationFrame(() => this.animate());
  }
}

// ====== Initialize when DOM is ready ======
document.addEventListener("DOMContentLoaded", () => {
  const trail = new TrailLine();
});
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
//* ================== PROGRESS HEADER ===================  //
const progressElem = document.querySelector(".progress");

if (progressElem) {
  function customScroll() {
    const bodyHeight = document.body.clientHeight;
    const scroll = Math.floor((scrollY / (bodyHeight - innerWidth)) * 100);
    progressElem.style.width = `${scroll}%`;
  }

  document.addEventListener("scroll", customScroll);
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
