const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "good morning",

    execute(message) {
        message.channel.send({embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(`${embedColor}`)
                .setTitle(`Ohayoooooooooo!`)
                .setImage("https://raw.githubusercontent.com/freitagfelipe/package-johnson-discord/main/medias/goodMorning.gif")
        ]});
    }
}