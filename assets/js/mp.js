// Phát triển dự án theo hướng sau: dark mode, volume, favorite list, thêm nhạc,...

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PlAYER_STORAGE_KEY = "SW_PLAYER";

const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const lyrics = $("#lyrics");
const playBtn = $(".btn-toggle-play");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const progress = $(".progress");
const start = $(".start");
const end = $(".end");
const playList = $(".playlist");

// Xử lý cd-thumb quay và dừng
const cdThumbAnimate = cdThumb.animate(
  [
    {
      transform: "rotate(360deg)",
    },
  ],
  {
    duration: 30000,
    iterations: Infinity,
  }
);

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const secondsRemaining = Math.floor(value % 60);
  return `${minutes}:${secondsRemaining < 10 ? "0" : ""}${secondsRemaining}`;
}

// Hàm bắt đầu kéo
function startSeek() {
  isSeeking = true;
}

// Hàm kết thúc kéo và cập nhật thời gian phát
function endSeek() {
  isSeeking = false;
  const seekTime = (progress.value / 100) * audio.duration;
  audio.currentTime = seekTime;
}

const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || { favoriteSongs: [] },

  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PlAYER_STORAGE_KEY, JSON.stringify(this.config));
  },

  songs: [
    {
      id: 1,
      name: "Nỗi đau đính kèm",
      singer: "Anh Tú Atus (ft. Rhyder)",
      lyrics: "Lời bài hát 1",
      path: "./assets/music/song1.mp3",
      image: "./assets/img/song1.jpg",
    },
    {
      id: 2,
      name: "Shut up My Moms Calling",
      singer: "Hotel Ugly",
      lyrics: "Lời bài hát 2",
      path: "./assets/music/song2.mp3",
      image: "./assets/img/song2.jpg",
    },
    {
      id: 3,
      name: "Like Him",
      singer: "Tyler",
      lyrics: "Lời bài hát 3",
      path: "./assets/music/song3.mp3",
      image: "./assets/img/song3.jpg",
    },
    {
      id: 4,
      name: "Cà phê",
      singer: "Min",
      lyrics: "Lời bài hát 4",
      path: "./assets/music/song4.mp3",
      image: "./assets/img/song4.jpg",
    },
    {
      id: 5,
      name: "WILDFLOWER",
      singer: "Billie Eilish",
      lyrics: "Lời bài hát 5",
      path: "./assets/music/song5.mp3",
      image: "./assets/img/song5.jpg",
    },
    {
      id: 6,
      name: "Mình đừng quên nhau nhé",
      singer: "Anh Tú Atus",
      lyrics: "Lời bài hát 6",
      path: "./assets/music/song6.mp3",
      image: "./assets/img/song6.jpg",
    },
    {
      id: 7,
      name: "Masshiro (pure white)",
      singer: "Fujii Kaze",
      lyrics: "Lời bài hát 7",
      path: "./assets/music/song7.mp3",
      image: "./assets/img/song7.jpg",
    },
    {
      id: 8,
      name: "Crashing",
      singer: "d4vd (with Kali Uchis)",
      lyrics: "Lời bài hát 8",
      path: "./assets/music/song8.mp3",
      image: "./assets/img/song8.jpg",
    },
    {
      id: 9,
      name: "We can't be friends (wait for your love)",
      singer: "Ariana Grande",
      lyrics: "Lời bài hát 9",
      path: "./assets/music/song9.mp3",
      image: "./assets/img/song9.jpg",
    },
    {
      id: 10,
      name: "Call out my name",
      singer: "The Weeknd",
      lyrics: "Lời bài hát 10",
      path: "./assets/music/song10.mp3",
      image: "./assets/img/song10.jpg",
    },
    {
      id: 11,
      name: "The Hills",
      singer: "The Weeknd",
      lyrics: "Lời bài hát 11",
      path: "./assets/music/song11.mp3",
      image: "./assets/img/song11.jpg",
    },
    {
      id: 12,
      name: "One of The Girls",
      singer: "The Weeknd, JENNIE & Lily Rose Depp",
      lyrics: "Lời bài hát 12",
      path: "./assets/music/song12.mp3",
      image: "./assets/img/song12.jpg",
    },
    {
      id: 13,
      name: "One More Dance",
      singer: "d4vd",
      lyrics: "Lời bài hát 13",
      path: "./assets/music/song13.mp3",
      image: "./assets/img/song13.jpg",
    },
    {
      id: 14,
      name: "No One Noticed",
      singer: "The Marias",
      lyrics: "Lời bài hát 14",
      path: "./assets/music/song14.mp3",
      image: "./assets/img/song14.jpg",
    },
    {
      id: 15,
      name: "thế giới thần tiên",
      singer: "tlinh",
      lyrics: "Lời bài hát 15",
      path: "./assets/music/song15.mp3",
      image: "./assets/img/song15.jpg",
    },
    {
      id: 16,
      name: "YÊU EM 2 NGÀY",
      singer: "Dương Domic",
      lyrics: "Lời bài hát 16",
      path: "./assets/music/song16.mp3",
      image: "./assets/img/song16.jpg",
    },
    {
      id: 17,
      name: "A ĐẾN Ă",
      singer: "Dương Domic",
      lyrics: "Lời bài hát 17",
      path: "./assets/music/song17.mp3",
      image: "./assets/img/song17.jpg",
    },
    {
      id: 18,
      name: "Kiss Me More",
      singer: "Doja Cat (ft. SZA)",
      lyrics: "Lời bài hát 18",
      path: "./assets/music/song18.mp3",
      image: "./assets/img/song18.jpg",
    },
  ],

  render: function () {
    const htmls = this.songs.map((song, index) => {
    return `<div class="song ${Array.isArray(this.config.favoriteSongs) && this.config.favoriteSongs.includes(index) ? "favorite" : ""}" data-index="${index}">
                <div class="thumb"
                    style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`;
    });
    $(".playlist").innerHTML = htmls.join("");
  },  

  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },

  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;
    isSeeking = false;

    // Thumb
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCdWidth = cdWidth - scrollTop;

      cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
      cd.style.opacity = newCdWidth / cdWidth;
    };

    //* Xử lý các nút các vụ của audio
    // Play/pause
    playBtn.addEventListener("click", function () {
      if (app.isPlaying) {
        audio.pause();
        cdThumbAnimate.pause();
      } else {
        audio.play();
        cdThumbAnimate.play();
      }
    });
    audio.onplay = function () {
      app.isPlaying = true;
      player.classList.add("playing");
      _this.setConfig("isPlaying", _this.isPlaying);
    };
    audio.onpause = function () {
      app.isPlaying = false;
      app.isSeeking = true;
      player.classList.remove("playing");
      _this.setConfig("isPlaying", _this.isPlaying);
    };

    // Next audio player
    nextBtn.addEventListener("click", function () {
      if (_this.isRandom) {
        cdThumbAnimate.cancel();
        _this.randomSong();
      } else {
        cdThumbAnimate.cancel();
        _this.nextSong();
      }
      _this.setConfig("currentIndex", _this.currentIndex);
    });
    // Previous audio player
    prevBtn.addEventListener("click", function () {
      cdThumbAnimate.cancel();
      _this.prevSong();
      _this.setConfig("currentIndex", _this.currentIndex);
    });
    // Volume control

    // On/Off volume

    // Audio ended
    audio.addEventListener("ended", function () {
      if (_this.isRepeat) {
        cdThumbAnimate.cancel();
        audio.play();
        cdThumbAnimate.play();
      } else {
        nextBtn.click();
        audio.play();
        cdThumbAnimate.play();
      }
    });
    //* end of audio ended

    // On/Off random audio
    randomBtn.addEventListener("click", function () {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    });
    // On/Off repeat audio
    repeatBtn.addEventListener("click", function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    });
    //* end of audio player button click

    //* Xử lý thanh progress
    {
      // Khi bắt đầu kéo thanh
      progress.addEventListener("mousedown", function () {
        isSeeking = true; // Bật cờ để ngăn timeupdate thay đổi thanh tiến trình
      });
      // Khi kéo thanh (chỉ thay đổi giao diện, không thay đổi thời gian)
      progress.addEventListener("input", function () {
        const seekTime = (this.value / 100) * audio.duration;
        start.textContent = formatTime(seekTime); // Cập nhật hiển thị thời gian kéo
        progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${this.value}%, #d3d3d3 ${this.value}%, #d3d3d3 100%)`;
      });
      // Khi thả chuột -> Cập nhật audio.currentTime & bật lại cập nhật progress
      progress.addEventListener("mouseup", function () {
        isSeeking = false;
        const seekTime = (progress.value / 100) * audio.duration;
        audio.currentTime = seekTime; // Cập nhật thời gian phát của audio
      });
      // Khi audio chạy, chỉ cập nhật thanh nếu không kéo
      audio.addEventListener("timeupdate", function () {
        if (isSeeking === false) {
          const progressPercent = Math.floor(
            (audio.currentTime / audio.duration) * 100
          );
          progress.value = 0;
          if (progressPercent >= 0) {
            progress.value = progressPercent;
            progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${progressPercent}%, #d3d3d3 ${progressPercent}%, #d3d3d3 100%)`;
          }
          start.textContent = formatTime(audio.currentTime);

          _this.setConfig("currentTime", audio.currentTime);
        }
      });

      progress.addEventListener("mousedown", startSeek);
      progress.addEventListener("touchstart", startSeek); // Hỗ trợ cảm ứng
      // Khi thả chuột hoặc ngón tay -> Cập nhật audio.currentTime
      progress.addEventListener("mouseup", endSeek);
      progress.addEventListener("touchend", endSeek); // Hỗ trợ cảm ứng
    }
    //* end progress

    if (this.config.currentTime) {
      audio.currentTime = this.config.currentTime;
    }
    if (this.config.isPlaying) {
      audio.play();
      cdThumbAnimate.play();
    } else {
      cdThumbAnimate.pause();
    }
    // Lắng nghe hành vi click vào playlist
    // Listen to playlist clicks
    playList.addEventListener("click", function (e) {
      const songNode = e.target.closest(".song:not(.active)");
    
      if (songNode && !e.target.closest(".option")) {
        cdThumbAnimate.cancel();
        _this.currentIndex = Number(songNode.dataset.index);
        _this.render();
        _this.loadCurrentSong();
        cdThumbAnimate.play();
        audio.play();
        _this.setConfig("currentIndex", _this.currentIndex);
      }
    
      // Xử lý click vào option (dấu ba chấm)
      if (e.target.closest(".option")) {
        e.stopPropagation(); // Ngăn chặn sự kiện lan ra ngoài
    
        // Xóa tất cả menu trước đó
        document.querySelectorAll(".menu").forEach(menu => menu.remove());
    
        let option = e.target.closest(".option");
        let song = option.closest(".song");
    
        if (!song) return; // Nếu không tìm thấy bài hát, thoát
    
        let songIndex = Number(song.dataset.index);
        let isFavorite = _this.config.favoriteSongs.includes(songIndex);
    
        let menu = document.createElement("ul");
        menu.classList.add("menu");
        menu.innerHTML = `
          <li class="btn-favorite">
            <i class="fas fa-heart" style="color: ${isFavorite ? "red" : "#999"}"></i> 
            ${isFavorite ? "Bỏ yêu thích" : "Thêm yêu thích"}
          </li>
          <li class="btn-remove"><i class="fas fa-trash"></i> Xóa khỏi playlist</li>
        `;
    
        // Thêm menu vào DOM
        option.appendChild(menu);
    
        let favoriteBtn = menu.querySelector(".btn-favorite");
        let removeBtn = menu.querySelector(".btn-remove");
    
        // Xử lý thêm vào yêu thích
        favoriteBtn.onclick = function (event) {
          event.stopPropagation();
    
          let icon = favoriteBtn.querySelector("i");
          let isFavNow = !song.classList.contains("favorite");
    
          // Cập nhật giao diện
          song.classList.toggle("favorite", isFavNow);
          icon.style.color = isFavNow ? "red" : "#999";
          favoriteBtn.innerHTML = `<i class="fas fa-heart" style="color: ${isFavNow ? "red" : "#999"}"></i> ${isFavNow ? "Bỏ yêu thích" : "Thêm yêu thích"}`;
    
          // Cập nhật danh sách yêu thích
          if (isFavNow) {
            if (!_this.config.favoriteSongs.includes(songIndex)) {
              _this.config.favoriteSongs.push(songIndex);
            }
          } else {
            _this.config.favoriteSongs = _this.config.favoriteSongs.filter(index => index !== songIndex);
          }
    
          // Lưu vào config
          _this.setConfig("favoriteSongs", _this.config.favoriteSongs);
        };
    
        // Xử lý xóa khỏi playlist
        removeBtn.addEventListener("click", function (e) {
          e.stopPropagation();
          song.remove();
          menu.remove(); // Xóa menu sau khi xóa bài hát
        });
      }
    });    
  },

  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
    if (this.isPlaying === true) {
      audio.play();
      cdThumbAnimate.play();
    }
  },
  prevSong: function () {
    this.playedIndexes = this.playedIndexes || [];
    this.historyIndex = this.historyIndex ?? this.playedIndexes.length;

    if (this.isRandom) {
      if (this.historyIndex > 0) {
        // Quay lại bài trước trong lịch sử
        this.currentIndex = this.playedIndexes[--this.historyIndex];
      } else {
        // Phát bài mới chưa có trong danh sách
        let newIndex;
        const availableSongs = this.songs
          .map((_, i) => i)
          .filter((i) => !this.playedIndexes.includes(i));
        if (availableSongs.length > 0) {
          newIndex =
            availableSongs[Math.floor(Math.random() * availableSongs.length)];
        } else {
          newIndex = Math.floor(Math.random() * this.songs.length); // Trường hợp tất cả đã phát
          this.playedIndexes = [];
        }
        this.currentIndex = newIndex;
        this.playedIndexes.push(newIndex);

        if (this.playedIndexes.length > this.songs.length) {
          this.playedIndexes.shift();
        }
      }
    } else {
      // Chế độ phát tuần tự
      this.currentIndex =
        (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    }

    this.loadCurrentSong();
    if (this.isPlaying) {
      audio.play();
      cdThumbAnimate.play();
    }
  },
  randomSong: function () {
    if (!this.playedIndexes) this.playedIndexes = []; // Lưu danh sách bài đã phát
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (
      this.playedIndexes.includes(newIndex) &&
      this.playedIndexes.length < this.songs.length
    );

    this.currentIndex = newIndex;
    this.playedIndexes.push(newIndex);
    this.historyIndex = this.playedIndexes.length - 1; // Cập nhật con trỏ vị trí lịch sử
    this.loadCurrentSong();
    if (this.isPlaying) {
      audio.play();
      cdThumbAnimate.play();
    }
  },

  scrollToSong: function () {
    const songElements = document.querySelectorAll('.song');
    const songElement = songElements[this.currentIndex]; // Chọn bài hát hiện tại

    // Cuộn bài hát vào giữa màn hình
    songElement.scrollIntoView({
      behavior: 'smooth', // Cuộn mượt mà
      block: 'center' // Đưa bài hát vào giữa
    });
  },

  loadCurrentSong: function () {
    if (this.currentIndex === undefined || this.currentIndex < 0) {
      this.currentIndex = 0; // Mặc định về bài đầu tiên
    }
    
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    lyrics.textContent = this.currentSong.lyrics;
    start.textContent = "0:00";

    audio.addEventListener("loadedmetadata", function () {
      end.textContent = formatTime(audio.duration);
    });

    audio.volume = 0.5;

    progress.value = 0;
    progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) 0%, #d3d3d3 0%, #d3d3d3 100%)`;

    const songs = $$(".song");
    songs.forEach((list) => list.classList.remove("active"));
    songs[this.currentIndex]?.classList.add("active");

    this.scrollToSong();
  },

  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
    this.currentIndex = this.config.currentIndex;
    this.currentTime = this.config.currentTime;
    this.favoriteSongs = this.config.favoriteSongs;
  },

  start: function () {
    this.loadConfig();
    this.defineProperties(); // Định nghĩa thuộc tính Object
    this.render(); // Tạo playlist trước
    this.loadCurrentSong(); // Khởi tạo bài hát đang phát
    this.handleEvents(); // Lắng nghe sự kiện
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};

app.start();
