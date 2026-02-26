const audio = document.getElementById("player");
const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const btnText = document.getElementById("btnText");
const btnIcon = document.getElementById("btnIcon");

const streamURL = "https://ice8.securenetsystems.net/WXAN";
const adURL = "https://wxan1039.github.io/wxan-player/commercial.mp3";   // upload this to GitHub

let playing = false;
let playedAd = false;

function setUI(state, message) {
  playing = state;
  statusEl.textContent = message;
  btnText.textContent = state ? "Pause" : "Listen Live";
  btnIcon.textContent = state ? "⏸" : "▶";
}

btn.addEventListener("click", async () => {
  try {
    if (!playing) {

      if (!playedAd) {
        playedAd = true;
        audio.src = adURL;
        statusEl.textContent = "Playing sponsor message…";
      } else {
        audio.src = streamURL;
        statusEl.textContent = "Connecting to WXAN…";
      }

      await audio.play();
      setUI(true, "Playing");

    } else {
      audio.pause();
      setUI(false, "Paused");
    }
  } catch (e) {
    console.error(e);
    setUI(false, "Tap again to start");
  }
});

audio.addEventListener("ended", async () => {
  if (playedAd && audio.src.includes("commercial.mp3")) {
    audio.src = streamURL;
    await audio.play();
    setUI(true, "Playing");
  }
});