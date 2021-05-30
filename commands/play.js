const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const { Queue } = require("../utils/queue")

module.exports = {
    name: "play",
    description: "Play a song in your voice channel.",
    aliases: ["p"],

    async execute(message, args, wichPlay = 0) {
        const voiceChannel = message.member.voice.channel;
        let songInfo;

        if (!(args.length > 0)) {
            return message.reply("you need to insert a music name or a music link!");
        } else if (!voiceChannel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        }

        const PJPermissions = voiceChannel.permissionsFor(message.client.user);
        
        if (!PJPermissions.has("CONNECT")) {
            return message.reply("I don't have permissions to connect to the voice channel!");
        } else if (!PJPermissions.has("SPEAK")) {
            return message.reply("I don't have permissions to speak in the channel!")
        }

        let searchingMessage;
        
        message.channel.send("**searching your music!**").then(msg => {
            searchingMessage = msg;
        });
        
        if (ytdl.validateURL(args[0])) {
            songInfo = await ytdl.getInfo(args[0]);
        } else {
            const musics = await ytsr(args.join(" "), {page: 1});

            if (!musics.items.length) {
                return message.reply("no songs ware found! Please try again.");
            }

            songInfo = await ytdl.getInfo(musics.items.find(item => item.type == "video").url);
        }

        let connection = await voiceChannel.join();
    
        let queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        searchingMessage.delete();

        if (queue) {
            queue.add(songInfo, message, wichPlay);
        } else {
            queue = new Queue(connection);
            global.queues.push(queue);
            queue.add(songInfo, message, wichPlay);
        }

        connection.on("disconnect", () => {
            global.queues = global.queues.filter(obj => obj.connection.channel.guild.id != message.guild.id);
        });
    }
}