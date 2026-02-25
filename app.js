const audio = document.getElementById("player");
const btn = document.getElementById("btn");
const statusEl = document.getElementById("status");
const btnText = document.getElementById("btnText");
const btnIcon = document.getElementById("btnIcon");

let playing = false;

function setUI(state, message) {
  playing = state;
  statusEl.textContent = message;
  btnText.textContent = state ? "Pause" : "Listen Live";
  btnIcon.textContent = state ? "⏸" : "▶";
}

btn.addEventListener("click", async () => {
  try {
    if (!playing) {
      // iOS requires this to be initiated by a user gesture (the button click counts)
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

audio.addEventListener("waiting", () => setUI(true, "Buffering…"));
audio.addEventListener("playing", () => setUI(true, "Playing"));
audio.addEventListener("pause", () => setUI(false, "Paused"));
audio.addEventListener("error", () => setUI(false, "Stream error"));

// Register service worker (for installability + caching shell)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}