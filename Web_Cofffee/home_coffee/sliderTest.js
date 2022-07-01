const carouselSlide = document.querySelector(".carousel-slide");
const carouselImage = document.querySelectorAll(".carousel-slide img")

// 
const prevBtn = document.querySelector('#preBtn');
const nextBtn = document.querySelector('#nextBtn');
let counter = 1;
const size = carouselImage[0].clientWidth;
carouselSlide.style.transform = 'traslateX(' + (-size*counter ) + 'px)' ; 

