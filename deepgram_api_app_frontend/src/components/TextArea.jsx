import axios from "axios";
import React, { useState, useRef } from "react";

const TextArea = () => {
  // State to store the text input by the user
  const [text, setText] = useState("");
  
  // State to keep track of the current word being displayed
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Split the text input into individual words
  const words = text.split(" ");

  // A ref to hold the audio element for reference during playback
  const audioRef = useRef(null);

  // Handler for changes in the textarea input
  const handleChange = (e) => {
    setText(e.target.value); // Update the text state
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setCurrentWordIndex(0); // Reset the word index to the beginning
    await playAudio(); // Call the function to play audio based on the input text
  };

  // Function to handle text-to-speech conversion and audio playback
  const playAudio = async () => {
    try {
      // Send the input text to the backend API and expect an audio response as an array buffer
      const response = await axios.post(
        "https://text-speech-conversion.vercel.app/api/convert-to-speech",
        { text },
        { responseType: "arraybuffer" } // Array buffer for binary audio data
      );

      // Convert the received array buffer into a Blob in the "audio/wav" format
      const audioBlob = new Blob([response.data], { type: "audio/wav" });

      // Create an object URL for the audio Blob and instantiate a new Audio element
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      // Store the created audio element in the ref
      audioRef.current = audio;

      // Add an event listener to sync word display with the progress of the audio playback
      audio.addEventListener("timeupdate", syncWordsWithAudio);

      // Play the audio
      audio.play();
    } catch (error) {
      // Handle any errors during the process
      console.error("Error playing audio:", error);
    }
  };

  // Function to sync the word display with the audio playback timing
  const syncWordsWithAudio = () => {
    // Calculate how long each word should be displayed, adjusting for faster playback
    const wordDuration = audioRef.current.duration / words.length / 1.5; // Speed adjustment factor of 1.5
    const currentWord = Math.floor(audioRef.current.currentTime / wordDuration); // Determine the current word index
    setCurrentWordIndex(currentWord); // Update the current word index in state
  };

  return (
    <div className="p-10">
      {/* Hidden label for accessibility */}
      <label htmlFor="OrderNotes" className="sr-only">
        Order notes
      </label>

      {/* Container for the text input area */}
      <div className="p-5 overflow-hidden rounded-lg border outline-none focus:border-none border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 dark:border-gray-700">
        {/* Textarea for input */}
        <textarea
          id="OrderNotes"
          className="w-full outline-none resize-y border-none align-top sm:text-sm dark:bg-gray-800 dark:text-white"
          rows="4"
          placeholder="Enter your text here..."
          value={text}
          onChange={handleChange} // Call handleChange on text input
        ></textarea>

        {/* Submit button */}
        <div className="flex items-center justify-end gap-2 bg-white p-3 dark:bg-gray-800">
          <button
            type="button"
            className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
            onClick={handleSubmit} // Call handleSubmit on button click
          >
            Submit
          </button>
        </div>
      </div>

      {/* Display the words being synced with the audio playback */}
      <div style={{ marginTop: "20px", fontSize: "24px", color: "white" }}>
        {words.slice(0, currentWordIndex + 1).join(" ")} {/* Display the current word with others */}
      </div>
    </div>
  );
};

export default TextArea;
