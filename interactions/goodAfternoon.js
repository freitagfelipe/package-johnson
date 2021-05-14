const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "good afternoon",

    execute(message) {
        const goodNightEmbed = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor("#FFFF00")
            .setTitle(`Kon'nichiwaaaaaaaaaaaaaa!`)
            .setImage("https://media1.tenor.com/images/e84edb279472c7ab49e97ec276d4ffda/tenor.gif?itemid=19354838")

        return message.channel.send(goodNightEmbed);
    }
}