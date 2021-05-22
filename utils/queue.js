const ytdl = require("ytdl-core");
const sendMusicEmbed = require("./sendMusicEmbed");

class Queue {
    constructor(connection) {
        this.musics = [];
        this.connection = connection;
        this.dispatcher;
        this.loopingQueue = false;
        this.loopingMusic = false;
        this.playing = false;
    }

    play() {
        this.playing = true;

        this.dispatcher = this.connection.play(ytdl(this.musics[0].songURL, { quality: "highestaudio"}));
        
        this.dispatcher.on("finish", () => {
            this.next();
        });
    }

    async add(songURL, userMessage) {
        this.musics.push({songURL, user: userMessage.author});

        await sendMusicEmbed(userMessage, this.musics)
        
        if (!this.playing) {
            this.play();
        }
    }

    next() {
        if (!this.loopingQueue && !this.loopingMusic) {
            this.musics.shift();

            if (this.musics.length != 0) {
                this.play();
            } else {
                this.playing = false;

                setTimeout(() => {
                    this.connection.disconnect();
                }, 2000);
            }
        } else if(this.loopingQueue) {
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

        // These next two lines are for avoid a bug in the dispatcher.resume(), because it was only working if the user use another pause/resume
        // If you have any solution please open an issue.
        this.dispatcher.resume();
        this.dispatcher.pause();

        return this.dispatcher.resume();
    }

    clear() {
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
}

module.exports = { Queue };