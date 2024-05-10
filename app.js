const playBtn = document.getElementById("play");
const audioEl = document.getElementById("audio");
const coverEl = document.getElementById("cover");
const wrapperEl = document.querySelector(".wrapper");
const playBntToggle = document.querySelector("#play-btn-toggle");
const changeVolume = document.getElementById("changeVolume");
const backwordEl = document.getElementById("backword");
const forwordEl = document.querySelector(".forword");
const moodEl = document.getElementById("mood");
const titleEl = document.getElementById('title')
const progressContainerEl = document.getElementById('progress-container')
const timeContainerEl = document.getElementById('time-container');
const body = document.querySelector('body')
const progressEl = document.getElementById('progress')
const startSpan = document.getElementById('startSpan')
const timeSpan = document.getElementById("timeSpan")

const tracks = [
  "Konsta-Insonlar",
  "I-Got-Love",
  "Люби-меня",
  "Fire-Man",
  "Miyagi-Captain",
  "Konsta-Odamlar-nima-deydi",

];

let currentTrack = 0;

const changeTrack = (i) => {
  titleEl.textContent = `${tracks[i]}`
  audioEl.src = `/music/${tracks[i]}.mp3`;
  coverEl.src = `/img/${tracks[i]}.jpg`;
  body.style.backgroundImage = `/img/${tracks[i]}.jpg`
  body.style.backgroundImage = `url('/img/${tracks[i]}.jpg')`;
};
changeTrack(currentTrack);

playBtn.addEventListener("click", () => {
  if (wrapperEl.classList.contains("play")) {
    wrapperEl.classList.remove("play");
    playBntToggle.classList = "fa-solid fa-play";
    audioEl.pause();
  } else {
    wrapperEl.classList.add("play");
    playBntToggle.classList = "fa-solid fa-pause";
    audioEl.play();
  }
});
changeVolume.addEventListener("input", (e) => {
  audioEl.volume = e.target.value;
});

forwordEl.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  changeTrack(currentTrack);
  if(wrapperEl.classList.contains('play')){
     audioEl.play()
  }
  else{
    audioEl.pause()
  }
});

backwordEl.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length;
  changeTrack(currentTrack);
  audioEl.play()
});

let truthy = true;
moodEl.addEventListener("click", () => {
  if (truthy) {
    wrapperEl.style.backgroundColor = "black";
  } else {
    wrapperEl.style.backgroundColor = "rgb(99, 175, 169)";
  }
  truthy = !truthy
});

const progress = (e) => {
  const {duration, currentTime} = e.target;
  const widthTime = (currentTime * 100) / duration
  progressContainerEl.style.width = `${widthTime}%`

}
audioEl.addEventListener('timeupdate', progress)

audioEl.addEventListener('ended', () => {
  currentTrack = (currentTrack + 1) % tracks.length;
  changeTrack(currentTrack);
  audioEl.play();
});

progressEl.addEventListener('click', (e) => {
  const clickX = e.offsetX; // Click bo'lgan joyning X koordinatasi progressElning ichida
  const containerWidth = progressEl.clientWidth; // Containerning umumiy eni
  const duration = audioEl.duration; // Musiqa davomiyligi
  const newTime = (clickX / containerWidth) * duration; 
  audioEl.currentTime = newTime;
});


const updateTime = (currentTime, duration) => {
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);

  const currentTimeString = `${currentMinutes < 10 ? '0' : ''}${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  const durationTimeString = `${durationMinutes < 10 ? '0' : ''}${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;

  timeContainerEl.children[0].textContent = currentTimeString;
  timeContainerEl.children[1].textContent = durationTimeString;
};

audioEl.addEventListener('timeupdate', () => {
  const { currentTime, duration } = audioEl;
  updateTime(currentTime, duration);
});

body.style.backgroundRepeat = 'no-repeat';
body.style.backgroundImage = `url('/img/${tracks[currentTrack]}.jpg')`;
body.style.backgroundSize = "cover"; // Rasmni to'g'ri miqyosda o'lchash
body.style.backgroundRepeat = "repeat"; // Rasmni qayta qayta takrorlanmasligi
body.style.backgroundPosition = "center"; // 
body.style.backgroundOrigin = "0.7"
body.style.backgroundColor = "rgba(10, 20, 19, 0.7)"

function updateTimer(currentTime, duration) {
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  
  let times;
  if (isNaN(duration)) {
      timeSpan.textContent = '00:00';
  } else {
      times = `${durationMinutes.toString().padStart(2, '0')}:${durationSeconds.toString().padStart(2, '0')}`;
      timeSpan.textContent = times;
      startSpan.textContent = currentTimeString;
  }

  startSpan.textContent = currentTimeString;
}
