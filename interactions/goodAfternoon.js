const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "good afternoon",

    execute(message) {
        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(`${embedColor}`)
                .setTitle(`Kon'nichiwaaaaaaaaaaaaaa!`)
                .setImage("https://raw.githubusercontent.com/freitagfelipe/package-johnson-discord/main/medias/goodAfternoon.gif")
        ] });
    }
}