const { prefix } = require("../config.json");

module.exports = {
    name: "leave",
    description: "Forces Package Johnson to leave the voice channel.",
    aliases: ["disconnect", "dc", "lv"],
    usage: `${prefix}leave`,

    execute(message) {
        const userVoiceChannel = message.member.voice.channel;

        if (!userVoiceChannel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (!message.guild.me.voice.channel) {
            return message.reply("I'm not in any voice channel!");
        } else if (!(message.guild.me.voice.channel.name === userVoiceChannel.name)) {
            return message.reply("We aren't at the same voice channel!");
        }

        const queue = global.queues.find(obj => obj.id === message.guild.id);

        queue.leave();

        message.channel.send("Successfully disconnected!✅");
    }
}