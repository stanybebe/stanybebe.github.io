var slideIndexb = 1;
showSlides1(slideIndexb);

// Next/previous controls
function plusSlides(n) {
  showSlides1(slideIndexb += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides1(slideIndexb = n);
}

function showSlides1(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides1");
  var dots = document.getElementsByClassName("dot1");
  if (n > slides.length) {slideIndexb = 1}
  if (n < 1) {slideIndexb = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexb-1].style.display = "block";
  dots[slideIndexb-1].className += " active";
}
