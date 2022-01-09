const body = document.querySelector('body');
const container = document.querySelector('.container');
const songTitle = document.querySelector('.song-title');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const progressBar = document.querySelector('.progressBar');
const currentProgress = document.querySelector('.currentprogress');
const playBtn = document.querySelector('.playpause-btn');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const playedTimes = document.querySelector('.playedTimes');
const totalSongTime = document.querySelector('.totalSongTime');
const choosephotoscontainer = document.querySelector('.choosephotoscontainer');
const createTag = document.querySelector('.create');
const cross = document.querySelector('#cross');
const errorAudio = document.querySelector('#error-audio');


let array = ['bridge', 'newyear', 'oldcity', 'pcph', 'streetsnow', 'w&m'];
let id = 0
function selected(e) {
    let bg = e.target.src;
    console.log(bg);
    body.style.backgroundImage = `url(${bg})`;
}

const looped = () => {
    array.forEach(ele => {
        const img = document.createElement('img');
        img.src = `${ele}.jpg`;
        img.classList.add('created');
        img.id = ++id;
        choosephotoscontainer.append(img);
        img.addEventListener('click', selected);
    });
}
createTag.addEventListener('click', () => { 
         errorAudio.play();
    looped();
    choosephotoscontainer.classList.add('startTransition');
    createTag.style.visibility = 'hidden';
    choosephotoscontainer.style.visibility = 'visible';
    cross.style.display = 'block';
});

cross.addEventListener('click', () => { 
    choosephotoscontainer.innerHTML = '';
    createTag.style.visibility = 'visible';
    choosephotoscontainer.style.visibility = 'hidden';
    choosephotoscontainer.classList.remove('startTransition');
    cross.style.display = 'none';
});





//song titles
const songs = ['American_Folk', 'Dream_It_Possible_', 'Country_Road', 'Nayan', 'Sennen_No_Inori'];
//keep track songs
let songIndex = 2;

//initial load song ingo DOM
loadSong(songs[songIndex]);

//update song details
function loadSong (song) {
    songTitle.innerText = song;
    audio.src = `${song}.mp3`;
    cover.src = `${song}.jpg`;
}

//play pause funtctions
const faicon = document.querySelector('.fa-play');
const play = () => {
    container.classList.add('play');
    faicon.classList.remove('fa-play');
    faicon.classList.add('fa-pause');

    audio.play();
}

const pause = () => {
    container.classList.remove('play');
    faicon.classList.remove('fa-pause');
    faicon.classList.add('fa-play');

    audio.pause();
}

//change events functions
const prevSong = () => {
    songIndex--;
    //oooh! I have been missed this stage///
    if (songIndex < 0) {
        songIndex = songs.length - 1
    };
    loadSong(songs[songIndex]);
    play();
}

const nextSong = () => {
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;
    loadSong(songs[songIndex]);
    play();
}

//progress bar function
const progress = (e) => {
    // console.log(e.srcElement.duration);
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    currentProgress.style.width = `${progressPercent}%`;

    const currentTimes = Math.floor(currentTime);
    const minutes = Math.floor(currentTimes / 60);
    const seconds = currentTimes % 60;
    const minutesText = minutes < 10 ? '0' + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? '0' + seconds.toString() : seconds;
    playedTimes.textContent = `${minutesText}:${secondsText}`;
}

//set progress
function setProgress (e) {
    const width = this.clientWidth; // 223
    const clickX = e.offsetX; //22 32 34 44 221
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
    // console.log(audio.currentTime);
}

//button listiner
playBtn.addEventListener('click', () => { 
    const isPlaying = container.classList.contains('play');
    if (isPlaying) {
        pause();
    } else {
        play();
    }
});

//change Events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//progress bar
audio.addEventListener('loadeddata', () => {
    const duration = Math.floor(audio.duration);
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    // console.log(minutes,seconds);
    const minutesText = minutes < 10 ? '0' + minutes.toString() : minutes;
    const secondsText = seconds < 10 ? '0' + seconds.toString() : seconds;
    totalSongTime.textContent = `${minutesText}:${secondsText}`;
});

audio.addEventListener('timeupdate', progress);
progressBar.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);


// body.style.backgroundImage = 'url(pcph.jpg)';