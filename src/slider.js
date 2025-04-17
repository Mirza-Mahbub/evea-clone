document.addEventListener("DOMContentLoaded", function () {
    const sliderTrack = document.getElementById("sliderTrack");
    // Save the original slides for rebuilding purposes.
    const originalSlides = Array.from(sliderTrack.children).map((slide) =>
        slide.cloneNode(true)
    );

    // Function to determine the number of visible slides based on viewport width.
    function getVisibleCount() {
        if (window.innerWidth >= 1024) {
            return 3;
        } else if (window.innerWidth >= 768) {
            return 2;
        } else {
            return 1;
        }
    }

    // Keep track of visible slide count and current index.
    let visibleCount = getVisibleCount();
    let currentIndex = visibleCount; // Start position (after prepended clones)
    let slideWidth = 0;
    let slides = [];
    let autoSlide;

    // Build (or rebuild) the slider track by cloning slides as needed for infinite loop.
    function buildSlider() {
        // Clear any content in sliderTrack.
        sliderTrack.innerHTML = "";
        // Recalculate the visibleCount (if needed).
        visibleCount = getVisibleCount();

        // Clone the last 'visibleCount' slides from the original slides and prepend.
        const prependClones = originalSlides
            .slice(-visibleCount)
            .map((slide) => slide.cloneNode(true));
        prependClones.forEach((clone) => sliderTrack.appendChild(clone));

        // Append the original slides.
        originalSlides.forEach((slide) =>
            sliderTrack.appendChild(slide.cloneNode(true))
        );

        // Clone the first 'visibleCount' slides from the original slides and append.
        const appendClones = originalSlides
            .slice(0, visibleCount)
            .map((slide) => slide.cloneNode(true));
        appendClones.forEach((clone) => sliderTrack.appendChild(clone));

        // Update slides array.
        slides = Array.from(sliderTrack.children);
        // Adjust the width for each slide according to visibleCount.
        slides.forEach((slide) => {
            // Use Tailwind-like widths dynamically.
            if (visibleCount === 3) {
                slide.classList.remove("w-full", "w-1/2");
                slide.classList.add("w-1/3");
            } else if (visibleCount === 2) {
                slide.classList.remove("w-full", "w-1/3");
                slide.classList.add("w-1/2");
            } else {
                slide.classList.remove("w-1/2", "w-1/3");
                slide.classList.add("w-full");
            }
        });
        // Reset the current index to the first original slide.
        currentIndex = visibleCount;
        // Set initial transform position.
        slideWidth = slides[0].clientWidth;
        sliderTrack.style.transition = "none";
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        // Force reflow and re-enable transition.
        sliderTrack.offsetHeight;
        sliderTrack.style.transition = "transform 0.5s";
    }

    // Initialize slider.
    buildSlider();

    // Function to update the slider transform according to currentIndex.
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Listen for transition end to detect if we've reached clones.
    sliderTrack.addEventListener("transitionend", function () {
        const originalCount = originalSlides.length;
        // If we've moved into the clone group at the end...
        if (currentIndex >= originalCount + visibleCount) {
            currentIndex = visibleCount;
            sliderTrack.style.transition = "none";
            updateSlider();
            // Force reflow.
            sliderTrack.offsetHeight;
            sliderTrack.style.transition = "transform 0.5s";
        }
        // If we've moved into the clone group at the beginning...
        if (currentIndex < visibleCount) {
            currentIndex = originalCount + currentIndex;
            sliderTrack.style.transition = "none";
            updateSlider();
            sliderTrack.offsetHeight;
            sliderTrack.style.transition = "transform 0.5s";
        }
    });

    // Move slider to the next position.
    function nextSlide() {
        currentIndex++;
        updateSlider();
    }

    // Move slider to the previous position.
    function prevSlide() {
        currentIndex--;
        updateSlider();
    }

    // Attach button events and reset auto-slide timer on interaction.
    document.getElementById("nextBtn").addEventListener("click", function () {
        clearInterval(autoSlide);
        nextSlide();
        autoSlide = setInterval(nextSlide, 3000);
    });
    document.getElementById("prevBtn").addEventListener("click", function () {
        clearInterval(autoSlide);
        prevSlide();
        autoSlide = setInterval(nextSlide, 3000);
    });

    // Start auto-slide.
    autoSlide = setInterval(nextSlide, 3000);

    // On window resize: update slide width and rebuild slider if visibleCount has changed.
    let resizeTimeout;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function () {
            // Check if the number of visible slides needs to change.
            const newVisibleCount = getVisibleCount();
            if (newVisibleCount !== visibleCount) {
                buildSlider();
            } else {
                // Just update slideWidth and reposition if the size changed.
                slideWidth = slides[0].clientWidth;
                sliderTrack.style.transition = "none";
                updateSlider();
                sliderTrack.offsetHeight;
                sliderTrack.style.transition = "transform 0.5s";
            }
        }, 250);
    });
});
