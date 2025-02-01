setTimeout(() => {
  try {
    if (parent.document.querySelector(".frameWeb") || window.frameElement?.id === "gameFrame") {
      window.location.href = "/static/404.html";
    }
  } catch (error) {
    console.error("Error accessing iframe:", error);
  }
}, 100);
