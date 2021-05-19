const ytdl = require("ytdl-core");
const sendMusicEmbed = require("./sendMusicEmbed");

class Queue {
    constructor(connection) {
        this.musics = [];
        this.connection = connection;
        this.dispatcher;
        this.loop = false;
        this.playing = false;
    }

    play() {
        this.playing = true;

        this.dispatcher = this.connection.play(ytdl(this.musics[0].songURL, { quality: "highestaudio"}))
        
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
        if (!this.loop) {
            this.musics.shift();

            if (this.musics.length != 0) {
                this.play();
            } else {
                this.playing = false;

                setTimeout(() => {
                    console.log("dentro")

                    this.connection.disconnect();
                }, 1000);
            }
        } else {
            const removed = this.musics.shift();

            this.musics.push(removed);

            this.play();
        }
    }

    pause() {
        this.playing = false;

        return this.dispatcher.pause()
    }

    resume() {
        this.play = true;

        return this.dispatcher.resume();
    }

    clear() {
        this.musics = [this.musics[0]];
    }

    loop() {

    }
}

module.exports = { Queue };