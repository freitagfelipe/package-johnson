const ytdl = require("ytdl-core");
const yts = require("yt-search");
const { MessageEmbed } = require("discord.js");
const sendMusicEmbed = require("../utils/sendMusicEmbed");

module.exports = {
    name: "play",
    description: "Play a song in your voice channel",

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        const PJPermissions = voiceChannel.permissionsFor(message.client.user);
        let song;

        if (!(args.length > 0)) {
            return message.reply("you need to insert a music name or a music link!")
        } else if (!voiceChannel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!PJPermissions.has("CONNECT")) {
            return message.reply("I don't have permissions to connect to the voice channel!");
        } else if (!PJPermissions.has("SPEAK")) {
            return message.reply("I don't have permissions to speak in the channel!")
        } else if (ytdl.validateURL(args[0])) {
            song = args[0];
        } else {
            const { videos } = await yts(args.join(" "));

            if (!videos.length) {
                return message.reply("no songs ware found! Please try again.");
            }

            song = videos[0].url;
        }

        sendMusicEmbed(message, song);

        let connection

        try {
            connection = await voiceChannel.join();
        } catch (error) {
            console.log(`There was an error connecting to the voice channel: ${error}`);
            return message.reply("there was an error connecting to the voice channel!");
        }

        connection.play(ytdl(song, { quality: "highestaudio"}))
            .on("finish", () => {
                voiceChannel.leave();
            })
            .on("error", error => {
                console.log(error);
            })
    }
}