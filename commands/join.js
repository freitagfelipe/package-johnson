const { Queue } = require("../utils/queue");
const { prefix } = require("../config.json");

module.exports = {
    name: "join",
    description: "Package Johnson will join in your current voice channel.",
    aliases: ["connect", "summon"],
    usage: `${prefix}join`,

    execute(message) {
        const channel = message.member.voice.channel;

        if (!message.member.voice.channel) {
            return message.reply("You need to be in a voice channel to execute this command!");
        } else if (message.guild.me.voice.channel && message.guild.me.voice.channel.name === message.member.voice.channel.name) {
            return message.reply("I'm already in the same channel as you!");
        } else if (message.guild.me.voice.channel && !(message.guild.me.voice.channel.name === message.member.voice.channel.name)) {
            return message.reply("I'm already on another voice channel in this server!");
        }

        const queue = global.queues.find(obj => obj.id === message.guild.id);

        if(!queue) {
            queue = new Queue(channel, message.guild.id);
            global.queues.push(queue);

            return message.channel.send("Successfully connected!✅");
        }
    }
}