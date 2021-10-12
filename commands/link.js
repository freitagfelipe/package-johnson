const dotenv = require("dotenv");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

dotenv.config();

module.exports = {
    name: "link",
    description: "Shows the link to add Package Johnson in your discord server.",
    usage: ".pj link",

    execute(message) {
        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    `${message.client.user.username}`,
                    `${message.client.user.displayAvatarURL()}`
                )
                .setColor(`${embedColor}`)
                .setTitle("To add me in your discord server you just need to click on this message!")
                .setURL(`${process.env.LINK}`)
                .addFields(
                    { name: "Created by:", value: "[Felipe Freitag](https://github.com/freitagfelipe)", inline: true },
                    { name: "Link to repository:", value: "[Github](https://github.com/freitagfelipe/package-johnson)", inline: true }
                )
        ] });
    }
}