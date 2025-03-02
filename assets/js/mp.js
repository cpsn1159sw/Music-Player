

const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const player = $('.player')
const cd = $('.cd')
const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const lyrics = $('#lyrics')
const playBtn = $('.btn-toggle-play')
const progress = document.querySelector('.progress');


// 🎵 Cập nhật progress khi audio chạy
audio.addEventListener('timeupdate', function () {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
        requestAnimationFrame(() => updateProgressColor(progressPercent)); // 🔥 Giúp mượt hơn
    }
});

// 🎚 Khi kéo thanh -> Cập nhật màu ngay lập tức
progress.addEventListener('input', function () {
    updateProgressColor(this.value);
});

// 🕹 Khi thả thanh -> Tua đến vị trí mới
progress.addEventListener('change', function () {
    const seekTime = (this.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

// 🎨 Cập nhật màu progress bằng linear-gradient
function updateProgressColor(value) {
    if (value < 20)
        progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${value+0.5}%, #d3d3d3 ${value+0.5}%, #d3d3d3 100%)`;
    else
        progress.style.background = `linear-gradient(to right, var(--primary-color) 0%, var(--primary-color) ${value}%, #d3d3d3 ${value}%, #d3d3d3 100%)`;
}

const app = {
    currentIndex: 0,
    isPlaying: false,
    isMuted: false,
    volume: 0.5,

    songs: [
        {
            id: 1,
            name: 'Nỗi đau đính kèm',
            singer: 'Anh Tú Atus (ft. Rhyder)',
            lyrics: 'Lời bài hát 1',
            path: './assets/music/song1.mp3',
            image: './assets/img/song1.jpg'
        },
        {
            id: 2,
            name: 'Shut up my moms calling',
            singer: 'Hotel Ugly',
            lyrics: 'Lời bài hát 2',
            path: './assets/music/song2.mp3',
            image: './assets/img/song2.jpg'
        },
        {
            id: 3,
            name: 'Like him',
            singer: 'Tyler',
            lyrics: 'Lời bài hát 3',
            path: './assets/music/song3.mp3',
            image: './assets/img/song3.jpg'
        },
        {
            id: 4,
            name: 'Cà phê',
            singer: 'Min',
            lyrics: 'Lời bài hát 4',
            path: './assets/music/song4.mp3',
            image: './assets/img/song4.jpg'
        },
    ],

    render: function() {
        const htmls = this.songs.map(song => {
            return `<div class="song">
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
            </div>`
        })
        $('.playlist').innerHTML = htmls.join('')
    },

    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            },
            set: function(value) {
                this.currentIndex = this.songs.indexOf(value)
                this.renderCurrentSong()
            }
        })
    },

    handleEvents: function() {
        const cdWidth = cd.offsetWidth

        // Thumb
        document.onscroll = function() {
            const scrollTop = window.scrollY || document.documentElement.scrollTop 
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth/cdWidth 
           
        }

        // Play/pause
        playBtn.addEventListener('click', function() {
            if (app.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        })
        audio.onplay = function() {
            app.isPlaying = true
            player.classList.add('playing')
        }
        audio.onpause = function() {
            app.isPlaying = false
            player.classList.remove('playing')
        }


    },

    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
        lyrics.textContent = this.currentSong.lyrics

    },

    start: function() {
        this.defineProperties() // Đỉnh nghĩa thuộc tính Object
        this.loadCurrentSong() // Khởi tạo bài hát đang phát
        this.handleEvents() // Lắng nghe sự kiện
        this.render() // Tạo playlist
    }
}

app.start()

