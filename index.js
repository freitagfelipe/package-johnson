const { Client, Collection } = require("discord.js");
const { prefix } = require("./config.json");
const { connect } = require("./database/connect");
const dotenv = require("dotenv");
const fileSystem = require("fs");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });

dotenv.config();

global.queues = [];

client.on("ready", async () => {
    console.log("I'm Package Johnson and I'm ready!");

    global.pgClient = await connect();

    changeStatus();

    client.commands = new Collection();
    client.interactions = new Collection();

    const commandFiles = fileSystem.readdirSync("./commands").filter(file => file.endsWith(".js"));
    const interactionFiles = fileSystem.readdirSync("./interactions").filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    for (const file of interactionFiles) {
        const interaction = require(`./interactions/${file}`);
        client.interactions.set(interaction.name, interaction);
    }
});

client.on("messageCreate", message => {
    if (message.author.id !== client.user.id && message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

        try {
            command.execute(message, args);
        } catch (error) {
            console.log(error);
            
            message.reply("An error occurred while trying to execute your command, please try again!");
        }

    } else if(message.author.id !== client.user.id && message.mentions.users.first() && message.mentions.users.first().id === client.user.id) {
        const interactionName = message.content.split(" ");
        interactionName.pop();

        const interaction = client.interactions.get(interactionName.join(" "));

        try {
            interaction.execute(message);
        } catch (error) {
            console.log(error);

            message.reply("An error occurred while trying to execute the interaction, please try again!");
        }
    }
});

client.login(process.env.TOKEN);

module.exports = client;
require("./events/guildCreate");
const { changeStatus } = require("./events/changeStatus");