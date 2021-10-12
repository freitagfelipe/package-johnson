const { execute } = require("./play");

module.exports = {
    name: "next-play",
    description: "Add a song on the top of the queue and skip the current song.",
    aliases: ["skip-play", "sp"],
    usage: ".pj next-play <music name or music link>",

    async execute(message, args) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name === message.member.voice.channel.name)) {
            return message.reply("We aren't at the same voice channel!");
        } else if (args.length === 0) {
            return message.reply("You need to insert a music name or a music link!");
        }

        const queue = global.queues.find(obj => obj.id === message.guild.id);

        if (!queue) {
            return message.reply("You need to have a queue!");
        }

        await execute(message, args, 2);

        return queue.next();
    }
}