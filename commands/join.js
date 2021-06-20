module.exports = {
    name: "join",
    description: "Package Johnson will join in your current voice channel.",
    aliases: ["connect", "summon"],
    usage: ".pj join",

    execute(message) {
        if (!message.member.voice.channel) {
            return message.reply("you need to be in a voice channel to execute this command!");
        } else if (message.guild.me.voice.channel && message.guild.me.voice.channel.name == message.member.voice.channel.name) {
            return message.reply("I'm already in the same channel as you!");
        } else if (message.guild.me.voice.channel && !(message.guild.me.voice.channel.name == message.member.voice.channel.name)) {
            return message.reply("I'm already on another voice channel in this server!");
        }

        message.member.voice.channel.join();

        return message.channel.send("Successfully connected!✅");
    }
}