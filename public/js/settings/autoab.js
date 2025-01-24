// True Fact: This SHI TOOK ME 4 STRAIGHT HOURS OF TORTURE TO FINALLY GET IT TO WORK!
    let aboutBlankOpened = false;

    function isAboutBlankEnabled() {
        return localStorage.getItem("aboutBlank") === "enabled";
    }

    function toggleAboutBlankSetting() {
        if (isAboutBlankEnabled()) {
            localStorage.setItem("aboutBlank", "disabled");
            window.location.href = "/index.html";  
        } else {
            localStorage.setItem("aboutBlank", "enabled");
            openAboutBlank();
        }
    }

    function openAboutBlank() {
        
        if (aboutBlankOpened || window.location.href === "about:blank" || window !== window.top) return;
        
        aboutBlankOpened = true;

        window.open("https://mail.google.com", "_blank");

        const popup = open("about:blank", "_blank");
        if (!popup || popup.closed) {
            alert("Failed to cloak this site. Allow popups and try again.");
        } else {
            const doc = popup.document;
            const iframe = doc.createElement("iframe");
            iframe.src = location.href;
            Object.assign(iframe.style, {
                position: "fixed",
                top: "0", left: "0", width: "100%", height: "100%",
                border: "none", margin: "0", padding: "0", overflow: "hidden"
            });
            doc.body.appendChild(iframe);
            location.replace("about:blank");
        }
    }

    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && event.key === "a") {
            document.addEventListener("keydown", function(eventB) {
                if (eventB.key === "b") {
                    toggleAboutBlankSetting();
                }
            }, { once: true });
        }
    });

    if (isAboutBlankEnabled()) {
        openAboutBlank();
        document.getElementById("autoAboutBlankToggle").checked = true; 
    }
