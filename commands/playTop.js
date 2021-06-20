const { execute } = require("./play");

module.exports = {
    name: "play-top",
    description: "Add a song on the top of the queue.",
    aliases: ["pt", "playtop"],
    usage: ".pj play-top <music name or music link>",

    execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue) {
            return message.reply("you need to have a queue to add a song on the top of it!");
        }

        execute(message, args, 1);
    }
}