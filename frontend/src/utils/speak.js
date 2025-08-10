let selectedVoice = null;

// Load voices when available
window.speechSynthesis.onvoiceschanged = () => {
  const voices = window.speechSynthesis.getVoices();
  selectedVoice =
    voices.find((v) => v.lang === "en-US" && v.name.includes("Google")) ||
    voices.find((v) => v.lang === "en-US") ||
    voices[0];
};

const speak = (text) => {
  if (!text || !window.speechSynthesis) return;

  const utterance = new SpeechSynthesisUtterance(text);

  if (selectedVoice) {
    utterance.voice = selectedVoice;
  }

  utterance.lang = "en-US";
  utterance.pitch = 1;
  utterance.rate = 1;

  window.speechSynthesis.speak(utterance);
};
export  {speak};