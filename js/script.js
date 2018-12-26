// Initialise SpeechSynthesis API
const synth = window.speechSynthesis;

// Grabbing DOM Elements

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-Value");

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

// the voice list is loaded async to the page. An onvoiceschanged event is fired when they are loaded
// check if voices are loaded or not
getVoices();
if (synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}
