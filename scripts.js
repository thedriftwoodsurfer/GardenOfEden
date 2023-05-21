/*!
* Start Bootstrap - Grayscale v7.0.6 (https://startbootstrap.com/theme/grayscale)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-grayscale/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

//slider//

$(function() {
    "use strict";
    var body = $("body"),
        active = $(".slider ol li, .slider .controll"),
        controll = $(".slider .controll"),
        playpause = $(".playpause"),
        sliderTime = 1,
        sliderWait = 3000,
        i = 999,
        autoRun,
        stop = false;
    // Reset
    $(".slider ul li:first").css("left", 0);
    // Run Slider
    function runSlider(what) {
        what.addClass("active").siblings("li, span").removeClass("active");
    }
    // slider gsap
    function gsapSlider(whose, left) {
        i++;
        if (whose.hasClass("active")) {
            TweenMax.fromTo(
                ".slider ul li.active",
                sliderTime,
                { zIndex: i, left: left },
                { left: 0 }
            );
        }
    }
    // Active
    active.on("click", function() {
        runSlider($(this));
    });
    // Arrow left
    controll.first().on("click", function() {
        var slide = $(".slider ul li.active, .slider ol li.active").is(
            ":first-of-type"
        )
            ? $(".slider ul li:last, .slider ol li:last")
            : $(".slider ul li.active, .slider ol li.active").prev("li");
        runSlider(slide);
        gsapSlider(slide, "100%");
    });
    // Arrow right
    controll.last().on("click", function() {
        var slide = $(".slider ul li.active, .slider ol li.active").is(
            ":last-of-type"
        )
            ? $(".slider ul li:first, .slider ol li:first")
            : $(".slider ul li.active, .slider ol li.active").next("li");
        runSlider(slide);
        gsapSlider(slide, "-100%");
    });
    // Point
    $(".slider ol li").on("click", function() {
        var start = $(".slider ul li.active").index();
        var slide = $(".slider ul li").eq($(this).index());
        runSlider(slide);
        var end = $(".slider ul li.active").index();
        if (start > end) {
            gsapSlider(slide, "100%");
        }
        if (start < end) {
            gsapSlider(slide, "-100%");
        }
    });
    // Auto run slider
    function autoRunSlider() {
        if (body.css("direction") === "ltr" && stop === false) {
            autoRun = setInterval(function() {
                controll.last().click();
            }, sliderWait);
        } else if (body.css("direction") === "rtl" && stop === false) {
            autoRun = setInterval(function() {
                controll.first().click();
            }, sliderWait);
        }
    }
    
    });
    document.addEventListener("DOMContentLoaded", () => {
        document.querySelectorAll(".carousel-container").forEach((carousel) => {
          insertNumbers(carousel);
      
          carousel.querySelector(".prev").addEventListener("click", (e) => {
            minusItem(carousel);
          });
      
          carousel.querySelector(".next").addEventListener("click", () => {
            plusItem(carousel);
          });
      
          insertDots(carousel);
      
          carousel.querySelectorAll(".dot").forEach((dot) => {
            dot.addEventListener("click", (e) => {
              let item = Array.prototype.indexOf.call(
                e.target.parentNode.children,
                e.target
              );
      
              showItems(carousel, item);
            });
          });
      
          showItems(carousel, 0);
        });
      });
      
      function insertNumbers(carousel) {
        const length = carousel.querySelectorAll(".item").length;
        for (let i = 0; i < length; i++) {
          const nmbr = document.createElement("div");
          nmbr.classList.add("numbertext");
          nmbr.innerText = i + 1 + " / " + length;
      
          carousel.querySelectorAll(".item")[i].append(nmbr);
        }
      }
      
      function insertDots(carousel) {
        const dots = document.createElement("div");
        dots.classList.add("dots");
      
        carousel.append(dots);
      
        carousel.querySelectorAll(".item").forEach((elem) => {
          const dot = document.createElement("div");
          dot.classList.add("dot");
      
          carousel.querySelector(".dots").append(dot);
        });
      }
      
      function plusItem(carousel) {
        let item = currentItem(carousel);
      
        carousel
          .querySelectorAll(".item")
          [item].nextElementSibling.classList.contains("item")
          ? showItems(carousel, item + 1)
          : showItems(carousel, 0);
      }
      
      function minusItem(carousel) {
        let item = currentItem(carousel);
      
        carousel.querySelectorAll(".item")[item].previousElementSibling != null
          ? showItems(carousel, item - 1)
          : showItems(carousel, carousel.querySelectorAll(".item").length - 1);
      }
      
      function currentItem(carousel) {
        return [...carousel.querySelectorAll(".item")].findIndex(
          (item) => item.style.display == "block"
        );
      }
      
      function showItems(carousel, item) {
        if (carousel.querySelectorAll(".item")[currentItem(carousel)] != undefined)
          carousel.querySelectorAll(".item")[currentItem(carousel)].style.display =
            "none";
        carousel.querySelectorAll(".item")[item].style.display = "block";
      
        if (carousel.querySelector(".dot.active") != null)
          carousel.querySelector(".dot.active").classList.remove("active");
        carousel.querySelectorAll(".dot")[item].classList.add("active");
      }
      