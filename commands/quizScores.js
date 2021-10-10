const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "quiz-scores",
    description: "Shows the top 10 quiz scores.",
    aliases: ["qs", "quizscores"],
    usage: ".pj quiz-scores",
    
    async execute(message) {
        const pgClient = global.pgClient;
        const scores = await pgClient.query("SELECT * FROM scores");
        const playerScore = await pgClient.query("SELECT score FROM scores WHERE id = $1", [message.author.id]);
        let descriptionText = "";

        if (scores.rowCount === 0) {
            return message.reply("It looks like I don't have a ranking yet!");
        }

        for (let i = 0; i < 10 && i < scores.rowCount; i++) {
            if (scores.rows[i].score > 0) {
                descriptionText += `${i + 1}°) <@${scores.rows[i].id}> | Points: ${scores.rows[i].score}\n`;
            }
        }

        if (!descriptionText) {
            return message.reply("It looks like I don't have a top yet!");
        }

        let pontuationEmbed = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setDescription(descriptionText)
            .setTimestamp()

        if (playerScore.rowsCount !== 0) {
            pontuationEmbed.addField("\u200B", `Your stats: <@${message.author.id}> | Points: ${playerScore.rows[0].score}\nCongratulations to everyone!`);
        } else {
            pontuationEmbed.addField("\u200B", "Congratulations to everyone!");
        }

        return message.channel.send({ embeds: [pontuationEmbed] });
    }
}