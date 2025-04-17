const buttons = document.querySelectorAll(".toggle-btn");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetContent = button.nextElementSibling;
    const targetIcon = button.querySelector(".accordion-icon");

    // First, close any other open accordion content:
    document.querySelectorAll(".accordion-content").forEach((content) => {
      if (content !== targetContent) {
        content.style.maxHeight = "0px";
        const icon =
          content.previousElementSibling.querySelector(".accordion-icon");
        if (icon.classList.contains("rotate-180")) {
          icon.classList.remove("rotate-180");
        }
      }
    });

    // Toggle target accordion:
    if (
      targetContent.style.maxHeight &&
      targetContent.style.maxHeight !== "0px"
    ) {
      // If it's already open, then close it:
      targetContent.style.maxHeight = "0px";
      targetIcon.classList.remove("rotate-180");
    } else {
      // Open it by setting maxHeight to its scrollHeight:
      targetContent.style.maxHeight = targetContent.scrollHeight + "px";
      targetIcon.classList.add("rotate-180");
    }
  });
});
