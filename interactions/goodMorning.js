const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "good morning",

    execute(message) {
        return message.channel.send(new MessageEmbed()
            .setAuthor(
                "Package Johnson",
                "https://i.imgur.com/vDVSu00.png"
            )
            .setColor("#FFFF00")
            .setTitle(`Ohayoooooooooo!`)
            .setImage("https://i.pinimg.com/originals/1d/9b/5e/1d9b5e8047d1ec289bfc698ebb4c64cc.gif")
        );
    }
}