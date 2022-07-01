function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    console.log("reveal",reveals.length)

    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      console.log("revealƯin",windowHeight)
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 200;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);
  