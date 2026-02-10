const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");
const timerDisplay = document.getElementById("timer");
const bgVideo = document.getElementById("bg-video");
const clickSound = document.getElementById("click-sound");

let totalTime = 25 * 60;
let timer = null;
let isRunning = false;

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

timerDisplay.textContent = formatTime(totalTime);

startBtn.addEventListener("click", () => {
  clickSound.play();
  if (isRunning) return;
  isRunning = true;
  if (bgVideo.paused) bgVideo.play();
  timer = setInterval(() => {
    if (totalTime > 0) {
      totalTime--;
      timerDisplay.textContent = formatTime(totalTime);
    } else {
      clearInterval(timer);
      isRunning = false;
      bgVideo.pause();
      bgVideo.currentTime = 0;
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  clickSound.play();
  if (!isRunning) return;
  clearInterval(timer);
  isRunning = false;
  bgVideo.pause();
});

resetBtn.addEventListener("click", () => {
  clickSound.play();
  clearInterval(timer);
  isRunning = false;
  totalTime = 25 * 60;
  timerDisplay.textContent = formatTime(totalTime);
  bgVideo.pause();
  bgVideo.currentTime = 0;
});

const bgMusic = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause");
const nextBtn = document.getElementById("next-song");
const prevBtn = document.getElementById("prev-song");
const songName = document.getElementById("song-name");

bgMusic.volume = 0.5;
let isMusicPlaying = false;

const songs = [
  { name: "Curious Light", src: "assets/10-curious-light.mp3" },
  { name: "Chill Study", src: "assets/desifreemusic-chill-study-desk-focus-amp-concentration-lofi-451181.mp3" },
  { name: "Sky in the Night", src: "assets/musiqo-sky-in-the-night-slow-ambient-music-minecraft-music-231465.mp3" }
];

let currentSong = 0;

function loadSong(i) {
  bgMusic.pause();
  bgMusic.currentTime = 0;
  bgMusic.src = songs[i].src;
  songName.textContent = songs[i].name;
}

loadSong(currentSong);

playPauseBtn.addEventListener("click", () => {
  if (!isMusicPlaying) {
    bgMusic.play();
    isMusicPlaying = true;
    playPauseBtn.textContent = "⏸️";
  } else {
    bgMusic.pause();
    isMusicPlaying = false;
    playPauseBtn.textContent = "▶️";
  }
});

nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  bgMusic.play();
  isMusicPlaying = true;
  playPauseBtn.textContent = "⏸️";
});

prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  bgMusic.play();
  isMusicPlaying = true;
  playPauseBtn.textContent = "⏸️";
});
