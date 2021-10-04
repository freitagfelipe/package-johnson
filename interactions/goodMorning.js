const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "good morning",

    execute(message) {
        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    "Package Johnson",
                    "https://i.imgur.com/vDVSu00.png"
                )
                .setColor(`${embedColor}`)
                .setTitle(`Ohayoooooooooo!`)
                .setImage("https://i.pinimg.com/originals/1d/9b/5e/1d9b5e8047d1ec289bfc698ebb4c64cc.gif")
        ] });
    }
}