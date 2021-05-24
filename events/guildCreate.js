const client = require("../package-johnson");
const { MessageEmbed } = require("discord.js");
const { prefix, embedColor } = require("../config.json");

client.on('guildCreate', guild => {
    let channelMessageVerification = true;

    guild.channels.cache.forEach(channel => {
        if (channel.type === "text" && channel.permissionsFor(guild.me).has("SEND_MESSAGES") && channelMessageVerification) {
            channel.send(new MessageEmbed()
                .setAuthor(
                    `${client.user.username}`,
                )
                .setColor(`${embedColor}`)
                .setDescription(`Thanks for adding me in to your server, my prefix is: \`${prefix}\`!`)
                .setThumbnail(`${client.user.avatarURL()}`)
            )
            
            channelMessageVerification = false;
        }
    });

    guild.roles.create({
        data: {
            name: "Package Johnson",
            color: `${embedColor}`
        }
    }).then(role => {
        guild.member(client.user).roles.add(role)
        role.setHoist(true);
    });

    guild.members.fetch(guild.ownerID).then(owner => {
        owner.send(new MessageEmbed()
            .setAuthor(
                `${client.user.username}`,
                `${client.user.displayAvatarURL()}`
            )
            .setColor(`${embedColor}`)
            .setTitle(`Acknowledgments and information.`)
            .setDescription(`Hiiii, ${guild.owner.user.username}! Thank you for add me in your discord server and if you want to see my comand list you just need to click on this link: http://gg.gg/package-johnson-discord-commands`)
            .setImage(client.user.displayAvatarURL({ dynamic: true, format: "png", size: 1024}))
            .setTimestamp()
        );
    });
});