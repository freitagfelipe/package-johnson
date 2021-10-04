const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "good night",

    execute(message) {
        return message.channel.send({ embeds: [
            new MessageEmbed()
                .setAuthor(
                    "Package Johnson",
                    "https://i.imgur.com/vDVSu00.png"
                )
                .setColor(`${embedColor}`)
                .setTitle(`Konbanwaaaaaaaaaaaa!`)
                .setImage("https://data.whicdn.com/images/335787701/original.gif")
        ] });
    }
}