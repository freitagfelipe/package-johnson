const client = require("../package-johnson");
const pagination = require("@freitagfelipe/discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "commands",
    description: "Shows the name of all commands.",
    usage: ".pj commands",

    execute(message) {
        const commandsName = [];
        const pages = [];
        const endPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setDescription("**Timeout!⌛**");
        let descriptionText = "";
        let currentPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTimestamp();

        for (object of client.commands) {
            commandsName.push(object[1].name);
        }

        for (let i = 0; i < commandsName.length; i++) {
            descriptionText += `- \`${commandsName[i]}\`\n`;

            if (((i + 1) % 10 == 0 && i != 0) || i == commandsName.length - 1) {
                currentPage.setDescription(descriptionText).addField("\u200B", `<@${message.author.id}>, if you have any questions about a command use:\n \`!help <command name>!\``);
                pages.push(currentPage);
                descriptionText = "";
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTimestamp();
            }
        }

        return pagination(message, pages, 60000, ['⏪', '⏩'], false, endPage);
    }
}