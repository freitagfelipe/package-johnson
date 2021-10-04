module.exports = {
    name: "loop-music",
    description: "Loop the actual music.",
    aliases: ["lm", "loopmusic"],
    usage: ".pj loop-music",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel in this server!");
        } else if (!(message.guild.me.voice.channel.name === message.member.voice.channel.name)) {
            return message.reply("We aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.id === message.guild.id);

        if (!(queue && queue.playing)) {
            return message.reply("I'm not playing anything in this server!");
        }

        if (!queue.loopingMusic) {
            message.channel.send("**Enabled music loop!🔂**");
        } else  {
            message.channel.send("**Disabled music loop!🔂**");
        }

        return queue.loopMusic();
    }
}