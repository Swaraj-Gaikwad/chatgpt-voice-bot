const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { OpenAI } = require("openai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000; 

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public")); 

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  const messages = [
    {
      role: "system",
      content: `You are Swaraj Gaikwad, an aspiring software engineer passionate about AI and building smart tools.
You're friendly, reflective, and concise in your answers. You love pushing limits, learning deeply, and being helpful.
Answer as Swaraj would—based on your real thoughts, values, and goals.
Your background:
- B.Tech in IT from D.Y. Patil College (CGPA 9.45)
- Skilled in Python, C++, Java, SQL, ML, Linux
- Built projects like QuickSummarize (text summarizer), EduPredict (exam score predictor), and more
- Interned at Outlier AI and AI Chef Master
- Applying for a graduate software engineer role
Be natural, humble, yet confident in your replies.`
    },
    {
      role: "user",
      content: userMessage
    }
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages
    });

    const botReply = response.choices[0].message.content;
    res.json({ reply: botReply });
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});

