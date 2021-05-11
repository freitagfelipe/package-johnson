const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "good night",

    execute(message) {
        const goodNightEmbed = new MessageEmbed()
            .setAuthor(
                "Package Johnson",
                "https://i.imgur.com/vDVSu00.png"
            )
            .setColor("#FFFF00")
            .setTitle(`Konbanwaaaaaaaaaaaa!`)
            .setImage("https://data.whicdn.com/images/335787701/original.gif")

        return message.channel.send(goodNightEmbed);
    }
}