"use strict";
const error = document.getElementById("uv-error");
const errorCode = document.getElementById("uv-error-code");
const registerButton = document.getElementById("register-proxy");
const page = window.location.pathname;

let historyStack = JSON.parse(sessionStorage.getItem("historyStack")) || [];
historyStack.push(page);
if (historyStack.length > 2) historyStack.shift();
sessionStorage.setItem("historyStack", JSON.stringify(historyStack));

if (sessionStorage.getItem("returnToPage")) {
  const returnTo = sessionStorage.getItem("returnToPage");
  sessionStorage.removeItem("returnToPage"); 
  window.location.href = returnTo; 
}

if (registerButton) {
  registerButton.addEventListener("click", async () => {
    try {
      
      const historyStack = JSON.parse(sessionStorage.getItem("historyStack")) || [];
      const returnToPage = historyStack.length > 1 ? historyStack[0] : page;
      sessionStorage.setItem("returnToPage", returnToPage); 

      await registerSW();
      location.reload();
    } catch (err) {
      error.textContent = "Failed to register service worker.";
      errorCode.textContent = err.toString();
      registerButton.classList.remove("show");
    }
  });
};
