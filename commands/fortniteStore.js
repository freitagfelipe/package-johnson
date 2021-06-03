const fetch = require("node-fetch");
const dotenv = require("dotenv");
const pagination = require("discord.js-pagination");
const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

dotenv.config();

module.exports = {
    name: "fortnite-store",
    description: "Shows current fortnite store",
    aliases: ["fnstore", "fn-store", "store"],

    async execute(message) {
        const getStore = async () => {
            try {
                const response = await fetch("https://api.fortnitetracker.com/v1/store", {
                    headers: {
                        "TRN-Api-Key": `${process.env.TRN}`
                    }
                });

                if (response.ok) {
                    const jsonResponse = await response.json();

                    return jsonResponse;
                } else {
                    throw new Error("Request failed!");
                }
            } catch(error) {
                console.log(error);
                return message.reply("An error occurred while trying to execute your command, please try again!");
            }
            
        }

        const store = await getStore();
        const pages = [];
        let descriptionText = "";
        let currentPage = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTitle("You can click on the link to see the item image!")
            .setTimestamp();

        for (let i = 0; i < store.length; i++) {
            descriptionText += `[${store[i].name}](${store[i].imageUrl}) | \`vBucks: ${store[i].vBucks == 0 ? "please look the store!" : store[i].vBucks}\`\n`;

            if ((i + 1) % 10 == 0 || i == store.length - 1) {
                currentPage.setDescription(descriptionText);
                pages.push(currentPage);
                currentPage = new MessageEmbed()
                    .setAuthor(
                        `${message.client.user.username}`,
                        `${message.client.user.displayAvatarURL()}`
                    )
                    .setColor(embedColor)
                    .setTitle("You can click on the link to see the item image!")
                    .setTimestamp();
            }
        }

        return pagination(message, pages, ['⏪', '⏩'], "60000");
    }
}