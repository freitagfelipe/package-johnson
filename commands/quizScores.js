const { MessageEmbed } = require("discord.js");
const { embedColor } = require("../config.json");

module.exports = {
    name: "quiz-scores",
    description: "Shows the top 10 quiz scores.",
    aliases: ["qs", "quizscores"],
    
    execute(message) {
        const scores = global.quizScores.sort((a, b) => b[0] - a[0]);
        const playerScore = global.quizScores.find(player => message.author.username == player[1]);
        let descriptionText = "";

        if (scores.length == 0) {
            return message.reply("it looks like I don't have a top yet!");
        }

        for (let i = 0; i < 10 && i < scores.length; i++) {
            if (scores[i][0] > 0) {
                descriptionText += `${i + 1}°) \`${scores[i][1]}\` | \`Points: ${scores[i][0]}\`\n`;
            }
        }

        if (!descriptionText) {
            return message.reply("it looks like I don't have a top yet!");
        }

        let pontuationEmbed = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setDescription(descriptionText)
            .setTimestamp()

        if (playerScore) {
            pontuationEmbed.addField("\u200B", `Your stats: \`${playerScore[1]}\` | \`Points: ${playerScore[0]}\`\nCongratulations to everyone!`);
        } else {
            pontuationEmbed.addField("\u200B", "Congratulations to everyone!");
        }
        

        return message.channel.send(pontuationEmbed);
    }
}