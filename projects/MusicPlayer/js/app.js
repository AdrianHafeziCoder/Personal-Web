const musics = [
  {
    id: 1,
    title: "Chasing Sunset",
    src: "public/audios/1.mp3",
    singer: "Golden Dream",
  },
  {
    id: 2,
    title: "Midnight Rain",
    src: "public/audios/2.mp3",
    singer: "Neon Lights",
  },
  {
    id: 3,
    title: "Ocean Waves",
    src: "public/audios/3.mp3",
    singer: "Deep Blue",
  },
  {
    id: 4,
    title: "Starry Night",
    src: "public/audios/4.mp3",
    singer: "Synth Wave",
  },
  {
    id: 5,
    title: "Electric Dreams",
    src: "public/audios/5.mp3",
    singer: "Synth Wave",
  },
];
function showMusics() {
  let maineMusicIndex = 0;

  const favoriteMusics = [];
  // controlse
  const music = document.querySelector("audio");
  const playIcon = document.querySelector(".play-icon");
  const playMusic = document.querySelector("#playBtn");
  const prevBtn = document.querySelector("#prevBtn");
  const nextBtn = document.querySelector("#nextBtn");
  //volume
  const volume_card = document.querySelector(".volume-bar");
  const volume = document.querySelector(".volume-fill");
  const volumeIcon = document.querySelector(".volumeIcon");
  // title
  const music_name = document.querySelector(".song-title");
  const artist = document.querySelector(".artist-name");
  // Forward and backward 10sec
  const playForwardTenSec = document.querySelector("#forwardTenSec");
  const playBackTenSec = document.querySelector("#backTenSec");
  //currentTime
  const progressBarElem = document.querySelector(".progress-bar");
  const progressFillElem = document.querySelector(".progress-fill");
  const currentTimeTXT = document.querySelector("#currentTimeTXT");
  const durationTXT = document.querySelector("#durationTXT");
  //trackList
  const trackList = document.querySelector("#trackList");
  // add to favorite
  const likeBtn = document.querySelector("#addToFavorite");
  const noItem = document.querySelector(".noItem");
  const favoritesList = document.querySelector("#favoritesList");
  // play music
  function playMusics() {
    if (playIcon.className.includes("fa-play")) {
      playIcon.classList.remove("fa-play");
      playIcon.classList.add("fa-pause");
      music.play();
    } else {
      playIcon.classList.remove("fa-pause");
      playIcon.classList.add("fa-play");
      music.pause();
    }
  }
  playMusic.addEventListener("click", playMusics);

  volume_card.addEventListener("click", function (event) {
    music.volume = event.offsetX / 100;
    volume.style.width = `${event.offsetX}px`;
  });
  // Forward and backward
  function forwardHandeler() {
    maineMusicIndex++;
    if (maineMusicIndex >= musics.length) {
      maineMusicIndex = 0;
    }

    setActiveTrack(maineMusicIndex);
  }
  function backForwardHandeler() {
    maineMusicIndex--;
    if (maineMusicIndex < 0) {
      maineMusicIndex = 5;
    }

    setActiveTrack(maineMusicIndex);
  }
  nextBtn.addEventListener("click", forwardHandeler);
  prevBtn.addEventListener("click", backForwardHandeler);
  // volume
  function muteOrUp() {
    if (volumeIcon.className.includes("fa-volume-up")) {
      volumeIcon.classList.remove("fa-volume-up");
      volumeIcon.classList.add("fa-volume-mute");
      volume.style.width = `0%`;
      music.volume = 0;
    } else {
      volumeIcon.classList.remove("fa-volume-mute");
      volumeIcon.classList.add("fa-volume-up");
      volume.style.width = `100%`;
      music.volume = 1;
    }
  }
  // ten sec
  function ForwardTenSec() {
    music.currentTime += 10;
  }
  function BackTenSec() {
    music.currentTime -= 10;
  }
  volumeIcon.addEventListener("click", muteOrUp);
  playForwardTenSec.addEventListener("click", ForwardTenSec);
  playBackTenSec.addEventListener("click", BackTenSec);

  function addToPlaylist(musicID) {
    const isInPlaylist = playList.some(function (music) {
      return music.id === musicID;
    });
    if (!isInPlaylist) {
      const mainMusic = musics.find(function (musicObj) {
        return musicObj.id === musicID;
      });
      playList.push(mainMusic);
      showPlaylist();
    }
  }
  //currentTime bar
  progressBarElem.addEventListener("click", (e) => {
    const ClickPosition = e.offsetX;
    const barWidth = progressBarElem.clientWidth;
    const percent = ClickPosition / barWidth;
    music.currentTime = percent * music.duration;
    currentTimeTXT.textContent = formatTime(music.currentTime);
  });

  music.addEventListener("timeupdate", () => {
    if (!music.duration) return;
    const progres = 100 * (music.currentTime / music.duration);
    progressFillElem.style.width = `${progres}%`;
    if (progres === 100) {
      forwardHandeler();
    }
    currentTimeTXT.textContent = formatTime(music.currentTime);
  });
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }
  function showTimeOfMusic() {
    durationTXT.textContent = formatTime(music.duration);
  }
  music.addEventListener("loadeddata", showTimeOfMusic);
  //trackList
  trackList.addEventListener("click", (event) => {
    const trackItem = event.target.closest(".track-item");
    if (!trackItem) return;
    document.querySelectorAll(".track-item").forEach(function (item) {
      item.classList.remove("active");
    });
    trackItem.classList.add("active");
    const src = trackItem.dataset.src;
    if (!src) return;

    const selectedMusic = musics.find((m) => m.src === src);

    if (!selectedMusic) return;

    music.src = selectedMusic.src;
    music_name.innerHTML = selectedMusic.title;
    artist.innerHTML = selectedMusic.singer;

    maineMusicIndex = musics.findIndex((m) => m.src === src);

    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    music.play();
  });
  function setActiveTrack(index) {
    const musicData = musics[index];

    music.src = musicData.src;
    music_name.textContent = musicData.title;
    artist.textContent = musicData.singer;

    document.querySelectorAll(".track-item").forEach((item) => {
      item.classList.remove("active");
    });
    const activeItem = document.querySelector(
      `.track-item[data-src="${musicData.src}"]`,
    );
    if (activeItem) {
      activeItem.classList.add("active");
    }
    maineMusicIndex = index;
    playIcon.classList.remove("fa-play");
    playIcon.classList.add("fa-pause");
    music.play();
  }
  //tracks
  function showPlaylist() {
    const playlistContainer = document.querySelector(".playlist");

    playlistContainer.innerHTML = "";

    playList.forEach(function (music) {
      playlistContainer.insertAdjacentHTML(
        "afterend",
        `
      <article class="music-card">
        <header>
          <img src="${music.cover}" alt="کاور موزیک" />
          <div class="play-music">
            <button class="play-music-btn play-btn" data-src="${music.src}">
              <i class="fa fa-play"></i>
            </button>
          </div>
        </header>
        <main>
          <p>${music.title} - ${music.singer}</p>
        </main>
        <footer>
          <button class="bookmark">
            <i class="fa-regular fa-bookmark"></i>
          </button>
        </footer>
      </article>
      `,
      );
    });
  }
  // favorite list

  likeBtn.addEventListener("click", () => {
    const currentMusic = musics[maineMusicIndex];
    noItem.style.display = "none";
    const exists = favoriteMusics.some((music) => {
      return music.id === currentMusic.id;
    });

    if (!exists) {
      favoriteMusics.push(currentMusic);
      showFavorites();
    }
  });

  function showFavorites() {
    favoritesList.innerHTML = "";

    favoriteMusics.forEach((music) => {
      favoritesList.insertAdjacentHTML(
        "beforeend",
        `
      <div class="favorites-item" data-src="${music.src}">
        <div class="favorites-item-info">
          <span class="favorites-item-title">${music.title}</span>
          <span class="favorites-item-artist">${music.singer}</span>
        </div>
      </div>
      `,
      );
    });
  }

  favoritesList.addEventListener("click", (event) => {
    const favoriteItem = event.target.closest(".favorites-item");

    if (!favoriteItem) return;

    const src = favoriteItem.dataset.src;

    const selectedMusic = musics.find((music) => {
      return music.src === src;
    });

    if (!selectedMusic) return;

    music.src = selectedMusic.src;
    music_name.textContent = selectedMusic.title;
    artist.textContent = selectedMusic.singer;

    maineMusicIndex = musics.findIndex((music) => {
      return music.id === selectedMusic.id;
    });

    music.play();
  });
}
