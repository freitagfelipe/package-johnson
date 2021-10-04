const client = require("../index");
const { MessageEmbed } = require("discord.js");
const { prefix, embedColor } = require("../config.json");

client.on('guildCreate', async guild => {
    let channelMessageVerification = true;

    guild.channels.cache.forEach(channel => {
        if (channel.type === "GUILD_TEXT" && channel.name === "general") {
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