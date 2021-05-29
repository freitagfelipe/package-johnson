const { execute } = require("./play");

module.exports = {
    name: "play-top",
    description: "Add a song in the top of the queue.",
    aliases: ["pt", "playtop"],

    execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be on a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not on any voice channel on this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue) {
            return message.reply("you need to have a queue to add a song on the top of it!");
        }

        execute(message, args, 1)
    }
}