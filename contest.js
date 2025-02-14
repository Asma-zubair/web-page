document.addEventListener("mouseup", () => {
    const selectedText = window.getSelection().toString().trim();
    
    if (selectedText) {
        const popup = document.createElement("div");
        popup.id = "highlight-popup";
        popup.innerHTML = `
            <div class="popup-container">
                <p>Ask a question about: "<strong>${selectedText}</strong>"</p>
                <input type="text" id="highlight-question" placeholder="Type your question...">
                <button id="ask-highlight-btn">Ask</button>
            </div>
        `;
        document.body.appendChild(popup);

        // Center the popup
        popup.style.position = "fixed";
        popup.style.bottom = "20px";
        popup.style.right = "20px";
        popup.style.background = "#fff";
        popup.style.padding = "10px";
        popup.style.border = "1px solid #ccc";
        popup.style.borderRadius = "8px";
        popup.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
        popup.style.zIndex = "9999";

        document.getElementById("ask-highlight-btn").addEventListener("click", () => {
            const question = document.getElementById("highlight-question").value.trim();
            if (!question) return alert("Please enter a question!");

            // Send request to background.js
            chrome.runtime.sendMessage({
                action: "ask_highlight",
                selectedText,
                question
            });

            document.body.removeChild(popup);
        });
    }
});
