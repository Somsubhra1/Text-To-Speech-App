// Initialise SpeechSynthesis API
const synth = window.speechSynthesis;

// Grabbing DOM Elements
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const button = document.querySelector("#speakbtn");

// event listeners
// form submit
textForm.addEventListener("submit", event => {
  event.preventDefault();
  speak();
});
// rate change
rate.addEventListener("change", event => (rateValue.textContent = rate.value));
// pitch change
pitch.addEventListener(
  "change",
  event => (pitchValue.textContent = pitch.value)
);
// after voice selection start speaking automatically
voiceSelect.addEventListener("change", event => speak());

// Initialise voices array
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();
  // console.log(voices);
  // add voices to select list
  voices.forEach(voice => {
    // create options in select list
    const option = document.createElement("option");
    // console.log(`${voice.name} (${voice.lang})`);
    // adding options to list
    option.textContent = `${voice.name} (${voice.lang})`;

    // set attributes to options
    option.setAttribute("data-lang", voice.lang);
    option.setAttribute("data-name", voice.name);

    voiceSelect.appendChild(option);
  });
};

getVoices();
// the voice list is loaded async to the page. An onvoiceschanged event is fired when they are loaded
// check if voices are loaded or not
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// speak function
const speak = () => {
  // check if already speaking
  if (synth.speaking) {
    console.error("Already speaking...");
    return;
  }
  if (textInput.value !== "") {
    // disabling textInput and button when speaking
    document.getElementById("text-input").readOnly = true;
    document.getElementById("speakbtn").disabled = true;

    window.utterances = [];
    // initialising SpeechSynthesisUtterance object
    var speakText = new SpeechSynthesisUtterance(textInput.value);
    // adding to utterances array to prevent garbage values
    utterances.push(speakText);

    // after speaking is done
    speakText.onend = event => {
      console.log("Speaking complete...");
      // enabling textInput and button after speech completion
      document.getElementById("text-input").readOnly = false;
      document.getElementById("speakbtn").disabled = false;
    };
    // speak error
    speakText.onerror = event => {
      console.error("Something went wrong....");
    };

    // voice selection
    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute(
      "data-name"
    );
    voices.forEach(voice => {
      if (voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });
    // setting rate and pitch
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;

    // speak
    synth.speak(speakText);
  }
};

const browserCheck = () => {
  if (
    navigator.userAgent.indexOf("Chrome") === -1 &&
    navigator.userAgent.indexOf("Safari") === -1 &&
    navigator.userAgent.indexOf("Firefox") === -1
  ) {
    document.getElementById("alertBox").style.display = "block";
  }
};
