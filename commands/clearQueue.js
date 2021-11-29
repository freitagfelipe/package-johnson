const { prefix } = require("../config.json");

module.exports = {
    name: "clear-queue",
    description: "Clear the current server music queue.",
    aliases: ["cq", "clearqueue"],
    usage: `${prefix}clear-queue`,

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name === message.member.voice.channel.name)) {
            return message.reply("We aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.id === message.guild.id);

        if (queue.musics.length < 2) {
            return message.reply("Your queue doesn't have enough musics to clean!");
        }

        queue.clearQueue();

        message.channel.send("**Cleaned your queue!🚮**");
    }
}