import { useState } from "react";

export default function ChatBox() {
    console.log("chatbox loaded");
    
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: data.response || "No response" },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error connecting to server" },
      ]);
    }

    setLoading(false);
  };

  return (
    

    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
            // console.log("messages mapped");
            
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#DCF8C6" : "#F1F0F0",
            }}
          >
            {msg.text}
          </div>
        ))}

        {loading && <div style={styles.loading}>Bot is typing...</div>}
      </div>

      <div style={styles.inputBox}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
    
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    fontFamily: "Arial",
    backgroundColor: "#f5f5f5", // Optional: Light gray background for the whole container
  },
  chatBox: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    backgroundColor: "#ffffff", // Ensure white background for message area
  },
  message: {
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "60%",
  },
  inputBox: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ddd",
    backgroundColor: "#ffffff", // White background for input area
  },
  input: {
    flex: 1,
    padding: "10px",
    backgroundColor: "#ffffff", // White background for input field
    border: "1px solid #ccc", // Add border for visibility
    borderRadius: "5px",
  },
  button: {
    padding: "10px 15px",
    marginLeft: "10px",
    cursor: "pointer",
    backgroundColor: "#007bff", // Blue background for button
    color: "#ffffff", // White text
    border: "none",
    borderRadius: "5px",
  },
  loading: {
    fontStyle: "italic",
    color: "gray",
  },
};