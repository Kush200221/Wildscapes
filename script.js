const ambientAudioElement = document.createElement("audio");
const atmosphereAudioElement = document.createElement("audio");
const playPauseButton = document.getElementById("play-pause-btn");

const ambientSelect = document.getElementById("ambient-select");
const rainCheckbox = document.getElementById("rain");
const fireCheckbox = document.getElementById("fire");
const oceanCheckbox = document.getElementById("ocean");
const forestCheckbox = document.getElementById("forest");

ambientAudioElement.loop = true; // Add the loop attribute


const atmosphereSounds = {
  rain: "sounds/raining.wav",
  fire: "sounds/fire crackling.wav",
  ocean: "sounds/ocean.wav",
  forest: "sounds/forest.wav",
};

atmosphereAudioElement.loop = true;

let isPlaying = false; // Flag to track playback state (combined)
let selectedAtmosphere = null; // Variable to store the selected atmosphere sound

function updateAmbientAudio() {
  const selectedSoundValue = ambientSelect.value;
  ambientAudioElement.src = `sounds/${selectedSoundValue}.wav`;
}

function togglePlayPause() { 
  if (isPlaying) {
    ambientAudioElement.pause();
    atmosphereAudioElement.pause();
    playPauseButton.textContent = "Play";
  } else {
    // Play selected ambient sound
    updateAmbientAudio();
    ambientAudioElement.play();
    
    // Play atmosphere sound if checkbox is checked
    if (selectedAtmosphere && rainCheckbox.checked) {
      atmosphereAudioElement.src = atmosphereSounds.rain;
      atmosphereAudioElement.play();
    } else if (selectedAtmosphere && fireCheckbox.checked) {
      atmosphereAudioElement.src = atmosphereSounds.fire;
      atmosphereAudioElement.play();
    }
    else if (selectedAtmosphere && oceanCheckbox.checked) {
      atmosphereAudioElement.src = atmosphereSounds.ocean;
      atmosphereAudioElement.play();
    }
    else if (selectedAtmosphere && forestCheckbox.checked) {
      atmosphereAudioElement.src = atmosphereSounds.forest;
      atmosphereAudioElement.play();
    }
    playPauseButton.textContent = "Pause";
  }
  isPlaying = !isPlaying;
}

function toggleAtmosphere(sound) {
  selectedAtmosphere = sound.checked ? sound.value : null;
  if (selectedAtmosphere && isPlaying) {
    if (rainCheckbox.checked) {
      atmosphereAudioElement.src = atmosphereSounds.rain;
      atmosphereAudioElement.play();
    } else if (fireCheckbox.checked) {
      atmosphereAudioElement.src = atmosphereSounds.fire;
      atmosphereAudioElement.play();
    } else if (sound === oceanCheckbox) { // Check for new sounds
      atmosphereAudioElement.src = atmosphereSounds.ocean;
      atmosphereAudioElement.play();
    } else if (sound === forestCheckbox) { // Add checks for wind and birds
      atmosphereAudioElement.src = atmosphereSounds.forest;
      atmosphereAudioElement.play();
    }else {
      atmosphereAudioElement.pause();
    }
  } else {
    atmosphereAudioElement.pause();
  }
}

rainCheckbox.addEventListener("change", () => toggleAtmosphere(rainCheckbox));
fireCheckbox.addEventListener("change", () => toggleAtmosphere(fireCheckbox));
oceanCheckbox.addEventListener("change", () => toggleAtmosphere(oceanCheckbox));
forestCheckbox.addEventListener("change", () => toggleAtmosphere(forestCheckbox));

// Update audio source but don't play on initial load
updateAmbientAudio();

playPauseButton.addEventListener("click", togglePlayPause);
