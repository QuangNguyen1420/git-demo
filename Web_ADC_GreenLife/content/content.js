"use strict"

function openNav() {
    document.getElementById("myNav").style.width = "65%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}
var slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
    return 1;
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function autoshow() {
    var x = setTimeout(autoshow, 7000);
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].style.transition = "all 0.6s ease;"
    dots[slideIndex - 1].className += " active";

}
autoshow();

// if (showSlides() == 1) {
//     clearTimeout(x.autoshow());
// }

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    return true;
}