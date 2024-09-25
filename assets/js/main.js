document.addEventListener("DOMContentLoaded", function () {
  const dropdownMenu = document.getElementById("mobile-menu");
  const dropdownToggle = document.getElementById("navbar-toggler");
  // Hide the dropdown menu when clicking outside of it

  dropdownToggle.addEventListener("click", function (event) {
    event.stopPropagation(); // Prevent the click from bubbling to the document
    if (dropdownMenu.style.display === "block") {
      dropdownMenu.style.display = "none"; // Hide the menu
    } else {
      dropdownMenu.style.display = "block"; // Show the menu
    }
  });

  document.addEventListener("click", function (event) {
    // Check if the clicked target is not the dropdownToggle or inside dropdownMenu
    if (
      !dropdownToggle.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.style.display = "none"; // Hide the menu
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".carousel-slide"));
  const innerCarousel = document.querySelector(".carousel-inner");

  let currentIndex = 1; // Start with the second slide as the active one (middle)
  const visibleSlides = 3; // Number of slides visible in the carousel
  const totalSlides = slides.length;

  // Clone the first and last slides for an infinite loop effect
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[totalSlides - 1].cloneNode(true);

  innerCarousel.append(firstClone);
  innerCarousel.insertBefore(lastClone, slides[0]);

  const afterSlides = Array.from(document.querySelectorAll(".carousel-slide"));

  // Function to update carousel position and set the active slide
  const updateCarousel = (animation = true) => {
    afterSlides.forEach((slide) => {
      slide.style.transition = animation
        ? "transform 0.5s ease-in-out"
        : "none";
    });

    // Translate the slides based on the current index (middle one is centered)
    afterSlides.forEach((slide) => {
      slide.style.transform = `translateX(${(currentIndex - 1) * -100}%)`;
    });

    // Remove the active class from all slides
    afterSlides.forEach((slide) => slide.classList.remove("active"));

    // Add active class to the current visible middle slide
    let activeSlideIndex = currentIndex;
    if (currentIndex === totalSlides + 1) {
      activeSlideIndex = 1; // Wrap around to the first slide
    } else if (currentIndex === 0) {
      activeSlideIndex = totalSlides; // Wrap around to the last slide
    }
    afterSlides[activeSlideIndex].classList.add("active");
  };

  // Initial setup: make the middle slide active
  updateCarousel(false);

  // Auto-slide every 3 seconds
  setInterval(() => {
    if (currentIndex === totalSlides + 1) {
      currentIndex = 1;
      updateCarousel(false); // Reset without animation
    } else {
      currentIndex++;
      updateCarousel(true); // Animate to the next slide
    }
  }, 3000);
});
