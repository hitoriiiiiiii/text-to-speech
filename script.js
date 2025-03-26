let speech = new SpeechSynthesisUtterance();
let voices = [];

// Select the voice dropdown
let voiceSelect = document.querySelector("select");

// Function to populate voices
const populateVoices = () => {
  voices = window.speechSynthesis.getVoices();

  if (!voices.length) {
    // Retry if voices are not yet available
    setTimeout(populateVoices, 100);
    return;
  }

  speech.voice = voices[0]; // Default voice

  // Clear existing options in the dropdown
  voiceSelect.innerHTML = "";

  // Populate the dropdown with available voices
  voices.forEach((voice, i) => {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });
};

// Event listener for when voices change
window.speechSynthesis.onvoiceschanged = populateVoices;

// Update the voice when a new one is selected
voiceSelect.addEventListener("change", () => {
  speech.voice = voices[voiceSelect.value];
});

// Add click event for the speak button
document.querySelector("#speakButton").addEventListener("click", () => {
  let text = document.querySelector("textarea").value;
  if (!text.trim()) {
    alert("Please enter some text to speak.");
    return;
  }

  // Stop any ongoing speech before starting new
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  speech.text = text; // Text input for conversion
  window.speechSynthesis.speak(speech); // Perform text-to-speech
});

// Add click event for the stop button
document.querySelector("#stopButton").addEventListener("click", () => {
  window.speechSynthesis.cancel(); // Stop any ongoing speech
});

// Trigger voice population on page load
populateVoices();
