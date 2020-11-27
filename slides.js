var slideIndexa = 1;
showSlides(slideIndexa);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndexa += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndexa = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndexa = 1}
  if (n < 1) {slideIndexa = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexa-1].style.display = "block";
  dots[slideIndexa-1].className += " active";
}
