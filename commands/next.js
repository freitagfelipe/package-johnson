module.exports = {
    name: "next",
    description: "Skip to the next song.",
    aliases: ["skip"],
    usage: ".pj next",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("we aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.connection.channel.guild.id == message.guild.id);

        if (!queue) {
            return message.reply("I'm not playing anything in this server!");
        }

        if (queue.musics.length == 1) {
            message.reply("there was no music to skip!");
        } else {
            queue.next(true);

            return message.channel.send("**Skipped!⏭️**");
        }
    }
}