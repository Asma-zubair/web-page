const API_KEY = 'f9ecbc52f9be4724b6f5d0d599f580b7';  // Replace with a secure method in production
const API_URL = 'https://api.aimlapi.com/v1/chat/completions';

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.action === "ask_highlight") {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek/deepseek-chat",
                    messages: [
                        { role: "system", content: "You are an AI that helps answer questions based on user-selected text." },
                        { role: "user", content: `Context: ${message.selectedText}\n\nQuestion: ${message.question}` }
                    ],
                    temperature: 0.7
                })
            });

            const data = await response.json();
            const answer = data.choices[0]?.message?.content || "No answer found.";

            chrome.tabs.sendMessage(sender.tab.id, { action: "show_answer", answer });
        } catch (error) {
            console.error("API Error:", error);
            chrome.tabs.sendMessage(sender.tab.id, { action: "show_answer", answer: "Error fetching response. Try again." });
        }
    }
});
