const ytdl = require("ytdl-core");

const { sendMusicEmbed } = require("./sendMusicEmbed");
const { sendQueueEmbed } = require("./sendQueueEmbed");
const { sendNowPlayingMusicEmbed } = require("./sendNowPlayingMusicEmbed");
const { shuffleArray } = require("./shuffleArray");

class Queue {
    constructor(connection) {
        this.musics = [];
        this.connection = connection;
        this.dispatcher;
        this.loopingQueue = false;
        this.loopingMusic = false;
        this.playing = false;
        this.volume = 100;
    }

    play() {
        this.playing = true;

        this.dispatcher = this.connection.play(ytdl.downloadFromInfo(this.musics[0].songInfo, { quality: "highestaudio"}));
        
        this.dispatcher.on("finish", () => {
            this.next();
        });
    }

    async add(songInfo, userMessage, wichPlay) {
        if (!wichPlay) {
            this.musics.push({songInfo, user: userMessage.author});
        } else if(wichPlay) {
            this.musics.splice(1, 0, {songInfo, user: userMessage.author});
        }

        await sendMusicEmbed(userMessage, this.musics, songInfo, wichPlay);
        
        if (this.musics.length == 1) {
            this.play();
        }
    }

    next(isUserCommand) {
        if (!this.loopingQueue && !this.loopingMusic || isUserCommand) {
            this.loopingMusic = false;
            this.musics.shift();

            if (this.musics.length != 0) {
                this.play();
            } else {
                this.playing = false;

                setTimeout(() => {
                    this.connection.disconnect();
                }, 2000);
            }
        } else if(this.loopingQueue && !this.loopingMusic) {
            const removed = this.musics.shift();

            this.musics.push(removed);

            this.play();
        } else {
            this.play();
        }
    }

    pause() {
        this.playing = false;

        return this.dispatcher.pause();
    }

    resume() {
        this.playing = true;

        return this.dispatcher.resume();
    }

    clearQueue() {
        this.musics = [this.musics[0]];
    }

    loopQueue() {
        if (!this.loopingQueue) {
            this.loopingQueue = true;
        } else {
            this.loopingQueue = false;
        }
    }

    loopMusic() {
        if (!this.loopingMusic) {
            this.loopingMusic = true;
        } else {
            this.loopingMusic = false;
        }
    }

    showQueue(message) {
        return sendQueueEmbed(message, this.musics, this.loopingMusic, this.loopingQueue);
    }

    showNowPlaying(message) {
        return sendNowPlayingMusicEmbed(message, this.musics[0], this.dispatcher);
    }

    removeMusic(musicNumber) {
        this.musics.splice(musicNumber, 1);
    }

    jump(musicNumber) {
        this.musics[0] = this.musics[musicNumber];
        this.musics.splice(1, musicNumber);
        this.loopingMusic = false;

        this.play()
    }

    setVolume(volumeNumber) {
        this.volume = volumeNumber;

        this.dispatcher.setVolumeLogarithmic(this.volume / 100);
    }

    shuffleQueue() {
        const nowPlaying = this.musics.shift();
        shuffleArray(this.musics);
        this.musics.unshift(nowPlaying);
    }
}

module.exports = { Queue };
