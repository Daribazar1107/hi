let slideIndex = 0;
showSlides();

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slides");
  
  if (n !== undefined) {
    slideIndex = n;
  } else {
    slideIndex++;
  }
  
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  slides[slideIndex - 1].style.display = "block";
  
  // Auto slide every 5 seconds
  setTimeout(showSlides, 5000);
} 