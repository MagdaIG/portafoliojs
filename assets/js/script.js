// Typewriter effect when the block becomes visible
function runTypedAnimation(block) {
  const fullText = block.getAttribute("data-fulltext");
  block.textContent = "";
  let i = 0;

  const typeChar = () => {
    if (i < fullText.length) {
      block.textContent += fullText[i];
      i++;
      setTimeout(typeChar, 25);
    }
  };

  typeChar();
}

// On page load
document.addEventListener("DOMContentLoaded", () => {
  const typedBlocks = document.querySelectorAll(".typed-code");

  // Store original text in a custom attribute and clear the content
  typedBlocks.forEach((block) => {
    block.setAttribute("data-fulltext", block.textContent.trim());
    block.textContent = "";
  });

  // Observer triggers typewriter effect when block enters viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.classList.contains("typed-done")) {
          entry.target.classList.add("typed-done");
          runTypedAnimation(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  typedBlocks.forEach((block) => observer.observe(block));
});

// Contact form validation and feedback modal
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const message = document.getElementById("message");
  const modalBody = document.getElementById("feedbackModalBody");
  const modal = new bootstrap.Modal(document.getElementById("feedbackModal"));

  if (
    name.value.trim() === "" ||
    email.value.trim() === "" ||
    message.value.trim() === ""
  ) {
    modalBody.innerHTML = `<p class="text-danger fw-bold">Please complete all fields.</p>`;
    modal.show();
    return;
  }

  modalBody.innerHTML = `
    <p><strong>Name:</strong> ${name.value}</p>
    <p><strong>Email:</strong> ${email.value}</p>
    <p><strong>Message:</strong> ${message.value}</p>
    <p class="text-success fw-bold mt-3">Message sent successfully!</p>
  `;
  modal.show();
  this.reset();
});
