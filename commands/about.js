const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");

module.exports = {
    name: "about",
    description: "Send a message with informations about Package Johnson creation.",
    usage: `${prefix}about`,

    execute(message) {
        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${userAvatar}`
                )
                .setColor(`${embedColor}`)
                .setDescription('Initially, Package Johnson was an inside joke, caused by my confusion around the name package.json, which I misread as "package johnson". But then I saw an opportunity: what if I could make a Bot that would help me learn more about programming and that could honor that joke? With all that in mind, I decided to transform Package Johnson, that was just an inside joke, into a real thing!')
        ] });
    }
}