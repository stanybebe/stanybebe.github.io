var slideIndexc = 1;
showSlides2(slideIndexc);

// Next/previous controls
function plusSlides2(n) {
  showSlides2(slideIndexc += n);
}

// Thumbnail image controls
function currentSlide2(n) {
  showSlides2(slideIndexc = n);
}

function showSlides2(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides2");
  var dots = document.getElementsByClassName("dot2");
  if (n > slides.length) {slideIndexc = 1}
  if (n < 1) {slideIndexc = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      var iframe = document.getElementById('index'+'n');
      iframe.src = iframe.src;
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndexc-1].style.display = "block";
  dots[slideIndexc-1].className += " active";

}
