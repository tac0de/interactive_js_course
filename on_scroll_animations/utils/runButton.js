export function initRunButton() {
  document.querySelectorAll(".run-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const code = button.closest(".lesson").dataset.code;
      try {
        new Function(code)();
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
  });
}
