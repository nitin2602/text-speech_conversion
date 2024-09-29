require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const cors = require("cors"); // Import cors
const { createClient } = require("@deepgram/sdk"); // Import Deepgram SDK
const fs = require("fs"); // For writing files if needed

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

app.post("/api/convert-to-speech", async (req, res) => {
  const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
  const { text } = req.body; // Extract text from the request body

  // STEP 1: Create a Deepgram client with the API key
  const deepgram = createClient(deepgramApiKey);

  try {
    // STEP 2: Make a request to convert the text to speech
    const response = await deepgram.speak.request(
      { text }, // Text to be converted to speech
      {
        model: "aura-angus-en", // Model for the speech
        encoding: "linear16", // Audio encoding format
        container: "wav", // Audio container format
      }
    );

    // STEP 3: Get the audio stream and headers from the response
    const stream = await response.getStream();

    if (stream) {
      // Convert the stream into a buffer
      const buffer = await getAudioBuffer(stream);

      // Send the audio buffer as the response
      res.set({
        "Content-Type": "audio/wav",
        "Content-Disposition": 'attachment; filename="output.wav"',
      });
      res.send(buffer);
    } else {
      res.status(500).send("Error generating audio stream.");
    }
  } catch (error) {
    console.error("Error converting text to speech:", error);
    res.status(500).send("An error occurred while converting text to speech.");
  }
});

// Helper function to convert the stream into a buffer
const getAudioBuffer = async (stream) => {
  const reader = stream.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );

  return Buffer.from(dataArray.buffer);
};

app.get("/", (req, res) => {
  res.send("Hey there");
});

const PORT = process.env.PORT || 3000; // Use the PORT from .env or default to 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
