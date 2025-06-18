const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, ".")));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are ChatGPT, a friendly and insightful voice assistant.",
        },
        { role: "user", content: userMessage },
      ],
    });

    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).send("Something went wrong!");
  }
});

app.listen(3000, () => {
  console.log("✅ Server running on port 3000");
});
