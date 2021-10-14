const axios = require("axios").default;
const { MessageEmbed } = require("discord.js");
const { embedColor, prefix } = require("../config.json");
const { shuffleArray } = require("../utils/shuffleArray");

module.exports = {
    name: "quiz",
    description: "Package Johnson will send a question in the channel.",
    usage: `${prefix}quiz`,

    async execute(message) {
        const pgClient = global.pgClient;

        const getQuestions = async () => {
            const response = await axios.get("https://opentdb.com/api.php?amount=50&type=multiple");

            try {
                if (response.status === 200) {
                    const results = await response.data.results;

                    let verifyQuestion;

                    while(true) {
                        verifyQuestion = results[Math.floor(Math.random() * 50)];
                        isGood = true;

                        for (let i = 0; i < verifyQuestion.question.length; i++) {
                            if (verifyQuestion.question[i] === "&") {
                                isGood = false;
                            }
                        }

                        for (let i = 0; i < verifyQuestion.correct_answer.length; i++) {
                            if (verifyQuestion.correct_answer[i] === "&") {
                                isGood = false;
                            }
                        }

                        for (let i = 0; i < 3; i++) {
                            for (let j = 0; j < verifyQuestion.incorrect_answers[i].length; j++) {
                                if (verifyQuestion.incorrect_answers[i][j] === "&") {
                                    isGood = false;
                                }
                            }
                        }

                        if (isGood) {
                            break;
                        }
                    }

                    return verifyQuestion;
                } else {
                    throw new Error("Request failed!");
                }
            } catch(error) {
                console.log(error);

                return message.reply("An error occurred while trying to execute your command, please try again!");
            }
        }

        const question = await getQuestions();

        let answers = question.incorrect_answers.slice(0, question.incorrect_answers.length);

        answers.push(question.correct_answer);
        shuffleArray(answers);

        const page = new MessageEmbed()
            .setAuthor(
                `${message.client.user.username}`,
                `${message.client.user.displayAvatarURL()}`
            )
            .setColor(embedColor)
            .setTitle("React with the number from 1️⃣ to 4️⃣ corresponding to the answer you think is correct!")
            .addField(`${question.question}`, `1) ${answers[0]}\n2) ${answers[1]}\n3) ${answers[2]}\n 4) ${answers[3]}`)
            .addField("\u200B", `${message.author.username} have one minute to answer the question or it will be deleted! You just have one chance.`)
            .setTimestamp();

        const msg = await message.channel.send({ embeds: [page]});

        const collector = msg.createReactionCollector({ time: 60000 });
        let answered = false;

        collector.on("collect", async (reaction, user) => {
            let isCorrect;

            reaction.users.remove(user);

            if(user.id !== message.author.id) {
                return;
            }

            switch (reaction.emoji.name) {
                case "1️⃣":
                    answers[0] === question.correct_answer ? isCorrect = true : isCorrect = false;

                    break;
                case "2️⃣":
                    answers[1] === question.correct_answer ? isCorrect = true : isCorrect = false;

                    break;
                case "3️⃣":
                    answers[2] === question.correct_answer ? isCorrect = true : isCorrect = false;

                    break;
                case "4️⃣":
                    answers[3] === question.correct_answer ? isCorrect = true : isCorrect = false;

                    break;
            }

            if (isCorrect !== undefined) {
                if (isCorrect) {
                    if (!msg.deleted) {
                        msg.edit({ embeds: [
                            new MessageEmbed()
                                .setAuthor(
                                    `${message.client.user.username}`,
                                    `${message.client.user.displayAvatarURL()}`
                                )
                                .setColor(`${embedColor}`)
                                .setDescription(`**<@${message.author.id}>, correct answer!✅**`)
                        ] });
                    }

                    let player = await pgClient.query("SELECT * FROM scores WHERE id = $1", [message.author.id]);

                    if (player.rowCount === 0) {
                        await pgClient.query("INSERT INTO scores (id, score) VALUES ($1, $2)", [message.author.id, 1]);
                    } else {
                        await pgClient.query("UPDATE scores SET score = $1 WHERE id = $2", [player.rows[0].id + 1, message.author.id]);
                    }
                } else {
                    if (!msg.deleted) {
                        msg.edit({ embeds: [
                            new MessageEmbed()
                                .setAuthor(
                                    `${message.client.user.username}`,
                                    `${message.client.user.displayAvatarURL()}`
                                )
                                .setColor(`${embedColor}`)
                                .setDescription(`**<@${message.author.id}>, incorrect answer!❎**`)
                        ] });
                    }
                }

                return answered = true;
            } else {
                return message.channel.send("There is no answer with the number you reacted, please react with another number!")
            }
        });

        collector.on('end', () => {
            if (!msg.reactions.message.deleted && !answered) {
                msg.edit({ embeds: [
                    new MessageEmbed()
                        .setAuthor(
                            `${message.client.user.username}`,
                            `${message.client.user.displayAvatarURL()}`
                        )
                        .setColor(`${embedColor}`)
                        .setDescription("**Timeout!⌛**")
                ] });
            }
        });
    }
}