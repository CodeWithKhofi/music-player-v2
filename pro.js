// The navigation function
function navigateTo(pageId){
    let pageSection = document.querySelectorAll(".page-section");
    pageSection.forEach(section =>{
        section.style.display = "none";
    });
    document.getElementById(pageId).style.display = "flex";
}


const dayNight = document.getElementById("themeToggle");
dayNight.addEventListener("click",() =>{
    document.body.classList.toggle("dark");
})
const audio = new Audio();

const playerWrapper = document.querySelector(".app-wrapper")
// Player Page (Build the PLAYER CONTROLS)
const previousButton = document.getElementById("prevBtn");
const playBtn = document.getElementById('play');
const nextButton = document.getElementById("nextBtn");
let volumeBar = document.getElementById("volumeBar");
let volumeIcon = document.getElementById("volumeIcon");
console.log(volumeIcon);
const backHome = document.getElementById("back-home");
backHome.addEventListener("click",() =>{
    navigateTo("homePage");
});
let mainPlayerIcon = document.getElementById("play-icon");
let miniPlayerPlayIcon = document.getElementById("mini-player-play-btn");

const cover = document.querySelector("#playerAlbumArt");
const title = document.querySelector("#playerSongTitle");
const artiste = document.querySelector("#playerArtistName");

let initialTime = document.getElementById("currentTime");
let totalTime = document.getElementById("duration");


dayNight.addEventListener("click",() =>{
    playerWrapper.classList.toggle("dark");
    dayNight.classList.toggle("dark");
})

allSongs = [
    
    {
    id: 1,
    title:"Ebezina",
    artiste:'Preye',
    src: "music-list/Ebezina.mp3",
    cover: "covers/ebezina.webp"
    },
     {
    id: 2,
    title:"Woara",
    artiste:'Kwesi Arthur',
    src: "music-list/woara.mp3",
    cover: "covers/woara.jpg"
    },
    {
    id: 3,
    title:"Pray 4 Me",
    artiste:'Kwesi Arthur',
    src: "music-list/pray4me.mp3",
    cover: "covers/pray for me.jpg"
    },
    {
    id: 4,
    title:"Kingdom Come",
    artiste:'Tommy Lee Sparta',
    src: "music-list/kingdom come.mp3",
    cover: "covers/kingdom come.jpg"
    },
    {
    id: 5,
    title:"Yaya",
    artiste:'Black Sherif',
    src: "music-list/yaya.mp3",
    cover: "covers/yaya.jpg"
    },
    {
    id: 6,
    title:"Shut Up",
    artiste:'Black Sherif',
    src: "music-list/shutup.mp3",
    cover: "covers/shut up.webp"
    },
];

let currentSongNumber = 0; 

function loadSong(index){
    const song = allSongs[index];
    title.textContent = song.title;
    artiste.textContent = song.artiste;
    audio.src = song.src;
    cover.src = song.cover
    setActiveTrack(index);
    updateMiniPlayer(index);
}


function playSong(currentSongNumber){
    audio.play();
    // togglePlay(mainPlayerIcon);   
    updateMiniPlayer();
    updatePlayIcons()
}

function pauseSong(currentSongNumber){
    audio.pause();
    // togglePlay(mainPlayerIcon);
    updatePlayIcons();
}

// function togglePlay(buttonIcon){
//     if(audio.paused){
//         buttonIcon.classList.add("fa-play");
//         buttonIcon.classList.remove("fa-pause");
//     }else{
//         buttonIcon.classList.remove("fa-play");
//         buttonIcon.classList.add("fa-pause");
//     }
// }

function updatePlayIcons() {
    const icons = [mainPlayerIcon, miniPlayerPlayIcon];
    icons.forEach(icon => {
        if(audio.paused){
            icon.classList.remove("fa-pause");
            icon.classList.add("fa-play");
        }else{
            icon.classList.remove("fa-play");
            icon.classList.add("fa-pause");
        }
    });
}


function nextSong(){
    currentSongNumber ++;
    if(currentSongNumber >= allSongs.length){
        currentSongNumber = 0;
    }
    loadSong(currentSongNumber);
    playSong();
    setActiveTrack(index);
    updateMiniPlayer(index);
}

function previousSong(){
    currentSongNumber --;
    if(currentSongNumber < 0){
        currentSongNumber = allSongs.length - 1;
    }
    loadSong(currentSongNumber);
    playSong();
    updateMiniPlayer(index);
}

// Play button play/pause song when clicked
play.addEventListener("click", () =>{
    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }
});

nextButton.addEventListener("click",() =>{
    nextSong();
});

previousButton.addEventListener("click",() =>{
    previousSong();
});


audio.addEventListener("timeupdate",() =>{
    if(audio.duration){
        let progressPercent = (audio.currentTime / audio.duration)*100;
        progressBar.value = progressPercent;
        

    }
    initialTime.textContent = formatTime(audio.currentTime);
    totalTime.textContent = formatTime(audio.duration);
    
});
console.log(totalTime);

progressBar.addEventListener("input",() =>{
    const seekTime = (progressBar.value/100)*audio.duration;
    audio.currentTime = seekTime;
});

audio.addEventListener("ended",() =>{
    icon.classList.add("fa-play");
    icon.classList.remove("fa-pause");
    nextSong();
})


function formatTime(seconds){
    const mins = Math.floor(seconds/60);
    const secs = Math.floor(seconds%60);
    return `${mins}:${secs < 10 ? "0" + secs:secs}`;
};
   

 let featuredContainer = document.querySelector(".song-list");
//  console.log(featuredContainer);
allSongs.forEach((track,index) => {
    let trackList = document.createElement("li");
    trackList.className = "track";
    let image = document.createElement("img");
    image.className = "cover-img";
    image.src = track.cover;
    let title_artiste_Container = document.createElement("div");
    title_artiste_Container.className = "song_details";
    let t_title = document.createElement("h4");
    t_title.className = "t-title";
    t_title.textContent = track.title;
    let t_artiste = document.createElement("p");
    t_artiste.className = "t-artist";
    t_artiste.textContent = track.artiste;

    title_artiste_Container.appendChild(t_title);
    title_artiste_Container.appendChild(t_artiste);
    trackList.appendChild(image);
    trackList.appendChild(title_artiste_Container);
    
    featuredContainer.appendChild(trackList);

    trackList.addEventListener("click",() =>{
    currentSongNumber = index;
    loadSong(index);
    // navigateTo("playerPage");
    playSong();
    setActiveTrack(index);
    });

    // console.log(trackList);

});

// Mini Player
function updateMiniPlayer(index){
    const miniPlayerSong = allSongs[index];
    let miniPlayerCover = document.getElementById("mini-player-cover").src = miniPlayerSong.cover;
    let miniPlayerTitle = document.getElementById("mini-player-title").textContent = miniPlayerSong.title;
    let miniPlayerArtist = document.getElementById("mini-player-artist").textContent = miniPlayerSong.artiste;
}

let miniPlayerPreviousBtn = document.getElementById("mini-player-backward-btn");
miniPlayerPreviousBtn.addEventListener("click",() =>{
    previousSong();
});
miniPlayerPlayIcon.addEventListener("click",() =>{
    // playSong(currentSongNumber);
    // togglePlay(miniPlayerPlayIcon);
    if(audio.paused){
        playSong();
    }else{
        pauseSong();
    }
});
let miniPlayerNextBtn = document.getElementById("mini-player-forward-btn");
miniPlayerNextBtn.addEventListener("click",() =>{
    nextSong();
});

// Mini Player


// Building the playlist
let playlistContent = document.querySelector(".playlist-content");
allSongs.forEach((track,index) => {
    let songItem = document.createElement("div");
    songItem.className = "song-item";
    let playlistCoverImg = document.createElement("img"); 
    playlistCoverImg.src = track.cover;
    let songInfo = document.createElement("div");
    songInfo.className = "song-info";
    let songTitle = document.createElement("p");
    songTitle.className = "song-title";
    songTitle.textContent = track.title;
    let songArtist = document.createElement("p");
    songArtist.className = "song-artist";
    songArtist.textContent = track.artiste;

songInfo.appendChild(songTitle);
songInfo.appendChild(songArtist);
songItem.appendChild(playlistCoverImg);
songItem.appendChild(songInfo);
playlistContent.appendChild(songItem);

 songItem.addEventListener("click",() =>{
    currentSongNumber = index;
    loadSong(index);
    // navigateTo("playerPage");
    playSong();
    setActiveTrack(index);
    });
});
// Building the playlist

// Playlist Page
const showPlaylist = document.getElementById("show-playlist");
showPlaylist.addEventListener("click", () =>{
    navigateTo("playlistPage");
});

let singleTrack = document.querySelectorAll(".track");
let playlistSingleSong = document.querySelectorAll(".song-item");
console.log(singleTrack);

function setActiveTrack(index) {
            singleTrack.forEach(track => track.classList.remove("active"));
            singleTrack[index].classList.add("active");

            playlistSingleSong.forEach(track => track.classList.remove("active"));
            playlistSingleSong[index].classList.add("active");
}

// Control volume
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
    if (volumeBar.value == 0) {
        volumeIcon.className = "fas fa-volume-mute";
    } else{volumeBar.value > 0 && volumeBar.value <= 0.5
        volumeIcon.className = "fas fa-volume-down";
     }// else {
    //     volumeIcon.className = "fas fa-volume-up";
    // }
});

loadSong(currentSongNumber);