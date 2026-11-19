// Mobile Navigation Toggle
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    primaryNav.classList.toggle("is-open", !isExpanded);
  });

  primaryNav.addEventListener("click", (event) => {
    if (event.target.closest("a") && window.matchMedia("(max-width: 768px)").matches) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      primaryNav.classList.remove("is-open");
    }
  });
}

// Dynamic Copyright Year
document.querySelectorAll("[data-year]").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

// Interactive RSVP Form Handler
const connectForm = document.querySelector("[data-connect-form]");
if (connectForm) {
  connectForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameInput = document.getElementById("full-name");
    const phoneInput = document.getElementById("phone-number");
    const serviceSelect = document.getElementById("service-choice");
    const notesInput = document.getElementById("notes");
    const note = document.querySelector("[data-form-note]");

    const attendeeName = nameInput ? nameInput.value.trim() : "Friend";
    const serviceText = serviceSelect && serviceSelect.options[serviceSelect.selectedIndex] ? serviceSelect.options[serviceSelect.selectedIndex].text : "Upcoming Service";
    const phoneText = phoneInput ? phoneInput.value.trim() : "";
    const notesText = notesInput ? notesInput.value.trim() : "";

    // Build WhatsApp pre-filled message
    let waMessage = `Hello Church4All Zimbabwe! My name is ${attendeeName}. I would like to RSVP for ${serviceText}.`;
    if (phoneText) {
      waMessage += ` My phone is ${phoneText}.`;
    }
    if (notesText) {
      waMessage += ` Notes: ${notesText}`;
    }
    const waUrl = `https://wa.me/263773494539?text=${encodeURIComponent(waMessage)}`;

    if (note) {
      note.innerHTML = `
        <span style="color: #fed976; font-weight: 700; display: block; font-size: 13px; margin-bottom: 6px;">
          ✓ Thank you, ${attendeeName}! Your RSVP has been received.
        </span>
        We look forward to welcoming you at Barclays House!
        <a href="${waUrl}" target="_blank" rel="noreferrer" style="display: inline-block; margin-top: 10px; color: #25d366; font-weight: 700; border-bottom: 1px solid #25d366;">
          Tap here to also send your confirmation directly to WhatsApp ↗
        </a>
      `;
    }

    connectForm.reset();
  });
}
