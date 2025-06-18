const express = require("express");
const cors = require("cors");
const path = require("path");
const { OpenAI } = require("openai");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  try {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message }]
    });

    const reply = chatCompletion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

