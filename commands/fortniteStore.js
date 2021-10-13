const axios = require("axios").default;
const dotenv = require("dotenv");
const pagination = require("@freitagfelipe/discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");

dotenv.config();

module.exports = {
    name: "fortnite-store",
    description: "Shows the current fortnite store.",
    aliases: ["fnstore", "fn-store", "store"],
    usage: `${prefix}fortnite-store`,

    async execute(message) {
        const getStore = async () => {
            try {
                const response = await axios.get("https://api.fortnitetracker.com/v1/store", {
                    headers: {
                        "TRN-Api-Key": `${process.env.TRN}`
                    }
                });

                if (response.status === 200) {
                    const data = await response.data;

                    return data.sort((a, b) => b.vBucks - a.vBucks);
                } else {
                    throw new Error("Request failed!");
                }
            } catch(error) {
                console.log(error);
                
                return message.reply("An error occurred while trying to execute your command, please try again!");
            }
        };

        const store = await getStore();
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
            .setTitle("You can click on the link to see the skin image!")
            .setTimestamp();

        for (let i = 0; i < store.length; i++) {
            descriptionText += `[${store[i].name}](${store[i].imageUrl}) | \`vBucks: ${store[i].vBucks === 0 ? "please look the store!" : store[i].vBucks}\`\n`;

            if ((i + 1) % 10 === 0 || i === store.length - 1) {
                currentPage.setDescription(descriptionText);
                pages.push(currentPage);
                descriptionText = "";
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle("You can click on the link to see the skin image!")
                    .setTimestamp();
            }
        }

        return pagination(message, pages, 60000, ['⏪', '⏩'], false, endPage);
    }
}