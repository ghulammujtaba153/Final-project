"use client";
import React, { useState, useRef } from "react";

interface ChatMessage {
  role: "user" | "ai";
  text: string;
}

const RecommendMedicineForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [formData, setFormData] = useState<string>("");
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.trim()) return; // Ignore empty submissions

    const newMessages = [...messages, { role: "user", text: formData }];
    setMessages(newMessages);
    setLoading(true);
    setError(null);
    setFormData("");

    try {
      const response = await fetch("http://localhost:8000/recommend_medicine_or_query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch medical response.");
      }

      const data = await response.json();
      const aiResponse = data.response;

      setMessages([...newMessages, { role: "ai", text: aiResponse }]);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Scroll to the bottom of the chat
  React.useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  return (
    <div className=" p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Medical Chat</h2>

      {/* Chat container */}
      <div className="h-80 overflow-y-scroll p-4 bg-gray-100 rounded-lg mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-3 rounded-lg w-fit ${
              message.role === "user"
                ? "bg-blue-100 text-blue-700 self-end"
                : "bg-gray-200 text-gray-800"
            }`}
            style={{
              alignSelf: message.role === "user" ? "flex-end" : "flex-start",
              maxWidth: "70%",
            }}
          >
             {message.text}
          </div>
        ))}
        {loading && (
          <div className="flex items-center space-x-2 p-3 bg-gray-200 rounded-lg max-w-fit self-start">
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-200"></div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Error message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {/* Input form */}
      <form className="flex gap-2 items-center" onSubmit={handleSubmit}>
        <textarea
          className="flex-1 p-2 border border-gray-300 outline-none rounded-md"
          placeholder="Ask a medical question or request a medicine recommendation..."
          value={formData}
          onChange={(e) => setFormData(e.target.value)}
          rows={2}
        />
        <button
          type="submit"
          className="py-4 px-6 bg-secondary text-white rounded-md disabled:bg-orange-300"
          disabled={loading}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RecommendMedicineForm;
