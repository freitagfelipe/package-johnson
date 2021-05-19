const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const { Queue } = require("../utils/queue")

module.exports = {
    name: "play",
    description: "Play a song in your voice channel.",

    async execute(message, args) {
        const voiceChannel = message.member.voice.channel;
        const PJPermissions = voiceChannel.permissionsFor(message.client.user);
        let songURL;

        if (!(args.length > 0)) {
            return message.reply("you need to insert a music name or a music link!")
        } else if (!voiceChannel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!PJPermissions.has("CONNECT")) {
            return message.reply("I don't have permissions to connect to the voice channel!");
        } else if (!PJPermissions.has("SPEAK")) {
            return message.reply("I don't have permissions to speak in the channel!")
        } else if (ytdl.validateURL(args[0])) {
            songURL = args[0];
        } else {
            const musics = await ytsr(args.join(" "));

            if (!musics.items.length) {
                return message.reply("no songs ware found! Please try again.");
            }

            songURL = musics.items.find(item => item.type == "video").url;
        }

        let connection = await voiceChannel.join();
    
        let queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (queue) {
            queue.add(songURL, message);
        } else {
            queue = new Queue(connection);
            global.queues.push(queue);
            queue.add(songURL, message);
        }

        connection.on("disconnect", () => {
            global.queues = global.queues.filter(obj => obj.connection.channel.guild.id != message.guild.id);
        });
    }
}