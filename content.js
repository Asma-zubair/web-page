chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "show_answer") {
        const notification = document.createElement("div");
        notification.className = "answer-notification";
        notification.innerHTML = `<strong>Answer:</strong> ${message.answer}`;
        document.body.appendChild(notification);

        notification.style.position = "fixed";
        notification.style.bottom = "20px";
        notification.style.right = "20px";
        notification.style.background = "#fff";
        notification.style.padding = "10px";
        notification.style.border = "1px solid #ccc";
        notification.style.borderRadius = "8px";
        notification.style.boxShadow = "0px 4px 10px rgba(0, 0, 0, 0.2)";
        notification.style.zIndex = "9999";
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 5000);
    }
});
