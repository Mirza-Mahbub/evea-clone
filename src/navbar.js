const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const navbar = document.getElementById("navbar");

mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.remove("bg-black", "text-white");
        navbar.classList.add("bg-white", "text-black", "shadow");
        mobileMenuButton.classList.remove("text-white");
        mobileMenuButton.classList.add("text-black");
        // Remove mobile menu bg-black when scrolled
        mobileMenu.classList.remove("bg-gray-800");
    } else {
        navbar.classList.add("bg-black", "text-white");
        navbar.classList.remove("bg-white", "text-black", "shadow");
        mobileMenuButton.classList.add("text-white");
        mobileMenuButton.classList.remove("text-black");
        // Add bg-black to mobile menu when at the top
        mobileMenu.classList.add("bg-gray-800");
    }
});

// Active menu highlight based on current section
// Select all sections by their id
const sections = document.querySelectorAll("section[id]");

// Select all desktop and mobile menu links
const desktopMenuLinks = document.querySelectorAll("nav .lg\\:flex a");
const mobileMenuLinks = document.querySelectorAll("#mobile-menu a");

function updateActiveMenu() {
    let currentSection = "";
    // Adjust the offset value (e.g., 60) as needed for when a section becomes active
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute("id");
        }
    });

    // Update desktop menu links
    desktopMenuLinks.forEach((link) => {
        link.classList.remove("text-lightBlue");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("text-lightBlue");
        }
    });

    // Update mobile menu links
    mobileMenuLinks.forEach((link) => {
        link.classList.remove("text-lightBlue");
        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("text-lightBlue");
        }
    });
}

window.addEventListener("scroll", updateActiveMenu);
window.addEventListener("load", updateActiveMenu);





