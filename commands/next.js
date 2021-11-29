const { prefix } = require("../config.json");

module.exports = {
    name: "next",
    description: "Skip to the next song.",
    aliases: ["skip"],
    usage: `${prefix}next`,

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name === message.member.voice.channel.name)) {
            return message.reply("We aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.id === message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing anything in this server!");
        } else if(queue.musics.length === 1) {
            return message.reply("There was no music to skip!");
        }

        queue.next(true);

        message.channel.send("**Skipped!⏭️**");
    }
}