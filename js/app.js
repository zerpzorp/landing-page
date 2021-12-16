// Global Variables **
const sections = document.getElementsByTagName('section');
const ul = document.querySelector("#navbar__list");
const medQuery = window.matchMedia( "(min-width: 430px)" );
let isScrolling = null;

// Main Functions **
function makeActive() {
    for (const section of sections) {

        const position = section.getBoundingClientRect();
        if (position.top <= 150 && position.bottom >= 150) {
            document.querySelector(`.${section.id}`).classList.add("active-nav");
            section.classList.add("active");
        } else {
            const id = section.getAttribute("id");
            document.querySelector(`.${section.id}`).classList.remove("active-nav");
            section.classList.remove("active");
        }
    }
}

// Hides the navbar when scrolling down
function hideNav() {
  if (medQuery.matches) {
    let prevScrollpos = window.scrollY;
    window.onscroll = function() {
    let currentScrollpos = window.scrollY;
      if (prevScrollpos > currentScrollpos) {
        document.querySelector(".page__header").style.top = "0";
      } else {
        document.querySelector(".page__header").style.top = "-52px";
      }
      prevScrollpos = currentScrollpos;
    }
  }
  else {
    let prevScrollpos = window.scrollY;
    window.onscroll = function() {
    let currentScrollpos = window.scrollY;
      if (prevScrollpos > currentScrollpos) {
        document.querySelector(".page__header").style.top = "0";
      } else {
        document.querySelector(".page__header").style.top = "-220px";
      }
      prevScrollpos = currentScrollpos;
    }
  }
}


// Function to hide the navbar if the user stops scrolling
function isUserScrolling() {
    if(isScrolling !== null){
        clearTimeout(isScrolling);
    }
    isScrolling = setTimeout(function(){
        document.querySelector(".page__header").style.display = "none";
    }, 2500);
}


// builds a dynamic navbar based on how many sections are in the DOM
for(section of sections) {
    const li = document.createElement("li");
    li.innerHTML += `<a href="#${section.id}" class="menu__link ${section.id}">${section.dataset.nav}</a>`;
    ul.appendChild(li);
}


// Adds smooth scroll function when clicking link in menu
function smoothScroll(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  window.scrollTo({
    top: offsetTop,
    behavior: "smooth"
  });
}


// Events **
// Listener for setting active class based on position in viewport
document.addEventListener('scroll', function () {
    makeActive();
});

// Listeners for media query
// Ongoing listener
medQuery.addListener(hideNav);
// Initial listener
hideNav(medQuery)

// Listener for smooth scroll after link click ** Note: Global variable must remain here for the smooth scrolling function to work.
const links = (document.querySelectorAll('.menu__link'));
for (const link of links) {
   link.addEventListener("click", smoothScroll);
}

// Listener for hiding the navbar after the user stops scrolling
document.addEventListener('scroll', function(){
    isUserScrolling();
}, false);

// This brings the navbar back when the user starts scrolling
document.addEventListener('scroll', function(){
    document.querySelector(".page__header").style.display = "block";
})