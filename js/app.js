/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

// Global Variables **
const sections = Array.from(document.getElementsByTagName("section"));
const ul = document.querySelector("#navbar__list");


// Main Functions **

// Hides the navbar when scrolling down
let prevScroll = window.pageYOffset;
window.onscroll = function() {
let currentScroll = window.pageYOffset;
  if (prevScroll > currentScroll) {
    document.querySelector('.page__header').style.top = '0';
  } else {
    document.querySelector('.page__header').style.top = '-52px';
  }
  prevScroll = currentScroll;
}


// builds the navigation based on content sections
for(section of sections){
    const li = document.createElement('li');
    li.innerHTML += `<a href="#${section.id}" class="menu__link">${section.dataset.nav}</a>`;
    ul.appendChild(li);
}


// Adds active class when near top of viewport
let makeActive = () => {
  for (const section of sections) {
    const box = section.getBoundingClientRect();
    if (box.top <= 150 && box.bottom >= 150){
      section.classList.add("active")
    } else {
      section.classList.remove("active")
    }
  }
}


// Adds smooth scroll function when clicking link in menu
const links = document.querySelectorAll(".menu__link");

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth"
  });
}


// Events **

// Listener for scroll after link click
for (const link of links) {
  link.addEventListener("click", clickHandler);
}


// Listener for setting active class based on position in viewport
document.addEventListener("scroll", function() {
  makeActive();
});
