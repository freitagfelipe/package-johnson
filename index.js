const { Client, Collection, MessageEmbed } = require("discord.js");
const { prefix, embedColor } = require("./config.json");
const { connect } = require("./database/connect");
const { changeStatus } = require("./utils/changeStatus");
const dotenv = require("dotenv");
const fileSystem = require("fs");

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGE_REACTIONS", "GUILD_MESSAGES", "GUILD_VOICE_STATES"] });

dotenv.config();

client.on("ready", async () => {
    console.log("I'm Package Johnson and I'm ready!");

    global.pgClient = await connect();
    global.client = client;
    global.queues = [];

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
    if (message.author.id === client.user.id || message.author.bot) {
        return;
    }

    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName) || client.commands.find(command => command.aliases && command.aliases.includes(commandName));

        if (command === undefined) {
            message.reply(`I don't have this command! To see all my commands use ${prefix}commands.`);

            return;
        }

        try {
            command.execute(message, args);
        } catch (error) {
            console.log(error);
            
            message.reply("An error occurred while trying to execute your command, please try again!");
        }

    } else if(message.mentions.users.first() && message.mentions.users.first().id === client.user.id) {
        const interactionName = message.content.split(" ");
        interactionName.pop();

        const interaction = client.interactions.get(interactionName.join(" "));

        if (interaction === undefined) {
            message.reply("I don't have this interaction! To see all my interactions go in https://github.com/freitagfelipe/package-johnson-discord and check my README.");

            return;
        }

        try {
            interaction.execute(message);
        } catch (error) {
            console.log(error);

            message.reply("An error occurred while trying to execute the interaction, please try again!");
        }
    }
});

client.on('guildCreate', async guild => {
    let channelMessageVerification = true;

    guild.channels.cache.forEach(channel => {
        if (channelMessageVerification && channel.type === "GUILD_TEXT" && channel.name === "general") {
            channel.send({ embeds: [
                new MessageEmbed()
                    .setAuthor(
                        `${client.user.username}`,
                    )
                    .setColor(`${embedColor}`)
                    .setDescription(`Thanks for adding me to your server, my prefix is: \`${prefix}\` !`)
                    .setThumbnail(`${client.user.avatarURL()}`)
            ] });
            
            channelMessageVerification = false;
        }
    });

    guild.roles.create({
        name: "Package Johnson",
        color: `${embedColor}`
    }).then(role => {
        guild.me.roles.add(role);
        role.setHoist(true);
    });

    const owner = await guild.members.fetch(guild.ownerId);

    return owner.send({ embeds: [
        new MessageEmbed()
            .setAuthor(
                `${client.user.username}`,
                `${client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle(`Acknowledgments and informations.`)
            .setDescription(`Hiiii, ${owner.user.username}! Thank you for add me in your discord server and if you want to see my command list you just need to click on this link: [Package Johnson repository](https://github.com/freitagfelipe/package-johnson-discord)!`)
            .setImage(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
            .setTimestamp()
    ] });
});

client.login(process.env.TOKEN);