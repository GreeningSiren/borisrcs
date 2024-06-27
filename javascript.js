window.addEventListener("blur", () => {
  document.title = "Come back ☹";
});
window.addEventListener("focus", () => {
  document.title = docTitle;
});

let docTitle = document.title;

const slider = document.querySelector(".theme input");
const root = document.querySelector(":root");

function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/borisrcs/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function initializeSlider() {
  const savedColor = getCookie("sliderColor");
  if (savedColor) {
    document.getElementById("colorSlider").value = savedColor;
    let hue = savedColor;
    root.style.setProperty("--primary-color", `oklch(45.12% 0.267 ${hue})`);
    root.style.setProperty("--secondary-color", `oklch(94.45% 0.03 ${hue})`);
  } else {
    let hue = 131.5; // default dark green
    root.style.setProperty("--primary-color", `oklch(45.12% 0.267 ${hue})`);
    root.style.setProperty("--secondary-color", `oklch(94.45% 0.03 ${hue})`);
  }
}

document.addEventListener("DOMContentLoaded", (event) => {
  initializeSlider();
  currentImage(1); // Ensure the first image is displayed when the page loads
});

slider.addEventListener("input", () => {
  let hue = slider.value;
  setCookie("sliderColor", hue, 365); // save for one year
  root.style.setProperty("--primary-color", `oklch(45.12% 0.267 ${hue})`);
  root.style.setProperty("--secondary-color", `oklch(94.45% 0.03 ${hue})`);
});

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
  showImage(currentIndex); // Ensure the first image is displayed when the page loads
});

function showImage(index) {
  const images = document.getElementsByClassName("imageClass");
  const dots = document.getElementsByClassName("dot");

  for (let i = 0; i < images.length; i++) {
    images[i].classList.remove("slide-in", "slide-out");
    images[i].style.display = "none";
    images[i].style.opacity = 0;
  }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  images[index].style.display = "block";
  images[index].classList.add("slide-in");
  setTimeout(() => {
    images[index].style.opacity = 1;
  }, 10);

  dots[index].className += " active";
}

function changeImage(n) {
  const images = document.getElementsByClassName("imageClass");
  const currentImage = images[currentIndex];
  currentImage.classList.remove("slide-in");
  currentImage.classList.add("slide-out");

  setTimeout(() => {
    currentIndex += n;

    if (currentIndex >= images.length) {
      currentIndex = 0;
    } else if (currentIndex < 0) {
      currentIndex = images.length - 1;
    }

    showImage(currentIndex);
  }, 500); // Delay to allow slide-out animation to complete
}
function currentImage(n) {
  currentIndex = n - 1;
  showImage(currentIndex);
}