const voiceDiscord = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const { sendMusicEmbed, sendQueueEmbed, sendNowPlayingMusicEmbed } = require("./musicEmbeds");
const { shuffleArray } = require("./shuffleArray");

class Queue {
    constructor(channel, guildId) {
        this.musics = [];
        this.channel = channel;
        this.loopingQueue = false;
        this.loopingMusic = false;
        this.playing = false;
        this.volume = 100;
        this.id = guildId;
        this.player = voiceDiscord.createAudioPlayer();
        this.connection = this.join();
        this.resource;
        this.connection.subscribe(this.player);
        this.connection.on("disconnected", () => {
            this.leave();
        });
    }

    play() {
        this.playing = true;

        this.resource = voiceDiscord.createAudioResource(ytdl.downloadFromInfo(this.musics[0].songInfo, { quality: "highestaudio"}), { inlineVolume: true });
        this.player.play(this.resource);

        this.player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
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
                    this.connection.destroy();
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

        this.player.pause();
    }

    resume() {
        this.playing = true;

        this.player.unpause();
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
        sendQueueEmbed(message, this.musics, this.loopingMusic, this.loopingQueue);
    }

    showNowPlaying(message) {
        sendNowPlayingMusicEmbed(message, this.musics[0], this.player);
    }

    removeMusic(musicNumber) {
        this.musics.splice(musicNumber, 1);
    }

    jump(musicNumber) {
        this.loopingMusic = false;

        const removedMusics = this.musics.splice(0, musicNumber);

        if (this.loopingQueue) {
            for (const music of removedMusics) {
                this.musics.push(music);
            }
        }

        this.play();
    }

    setVolume(volumeNumber) {
        this.volume = volumeNumber;

        this.resource.volume.setVolume(volumeNumber / 100);
    }

    shuffleQueue() {
        const nowPlaying = this.musics.shift();

        shuffleArray(this.musics);

        this.musics.unshift(nowPlaying);
    }

    leave() {
        global.queues = global.queues.filter(obj => obj.id != this.id);

        this.connection.destroy();
    }

    join() {
        return voiceDiscord.joinVoiceChannel({
            channelId: this.channel.id,
            guildId: this.channel.guildId,
            adapterCreator: this.channel.guild.voiceAdapterCreator
        });
    }
}

module.exports = { Queue };