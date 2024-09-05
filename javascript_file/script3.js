const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const durationTime = document.getElementById('durationTime');
const songTitle = document.getElementById('songTitle');
const songArtist = document.getElementById('songArtist');
const songItems = document.querySelectorAll('.song-item');
const ratingStars = document.querySelectorAll('.rating-star');

let audio = new Audio();
let isPlaying = false;
let currentSongIndex = 0;
let isShuffling = false;
let isRepeating = false;


const songs = [
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/Admirin' You Ft. Preston Pablo (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/Bachke Bachke Ft.Yarah (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/Champion's Anthem (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/Girl I Love You (Euro's Intro) (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/Jee Ni Lagda (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/Softly (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/Try Me (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/What (DJJOhAL.Com).mp3", duration: "3:34" },
    { title: "Girl, I Love You (Euro's Intro)", artist: "Karan Aujla, Ikky", src: "music_file/Making_Memories/You (DJJOhAL.Com).mp3", duration: "3:34" },
];

function loadSong(songIndex) {
    audio.src = songs[songIndex].src;
    songTitle.textContent = songs[songIndex].title;
    songArtist.textContent = songs[songIndex].artist;
    durationTime.textContent = songs[songIndex].duration;
    audio.load();
}

function playPauseSong() {
    if (isPlaying) {
        audio.pause();
        playBtn.textContent = '▶️';
    } else {
        audio.play();
        playBtn.textContent = '⏸️';
    }
    isPlaying = !isPlaying;
}

function updateProgressBar() {
    progressBar.value = (audio.currentTime / audio.duration) * 100;
    currentTime.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function setProgress(e) {
    const width = progressBar.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    playPauseSong();
}

function nextSong() {
    if (isShuffling) {
        shuffleSong();
    } else {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
    }
    loadSong(currentSongIndex);
    playPauseSong();
}

function shuffleSong() {
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === currentSongIndex);
    currentSongIndex = randomIndex;
    loadSong(currentSongIndex);
    playPauseSong();
}

function toggleShuffle() {
    isShuffling = !isShuffling;
    shuffleBtn.classList.toggle('active');
}

function toggleRepeat() {
    isRepeating = !isRepeating;
    repeatBtn.classList.toggle('active');
    audio.loop = isRepeating;
}

function rateSong(rating) {
    ratingStars.forEach((star, index) => {
        star.textContent = index < rating ? '★' : '☆';
    });
}

playBtn.addEventListener('click', playPauseSong);
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
shuffleBtn.addEventListener('click', toggleShuffle);
repeatBtn.addEventListener('click', toggleRepeat);
audio.addEventListener('timeupdate', updateProgressBar);
progressBar.addEventListener('click', setProgress);

songItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(index);
        playPauseSong();
    });
});

ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        rateSong(index + 1);
    });
});

// Load the first song by default
loadSong(currentSongIndex);
