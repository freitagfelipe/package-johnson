const { prefix } = require("../config.json");

module.exports = {
    name: "ping",
    description: "Shows your ping and the API latency.",
    usage: `${prefix}ping`,

    execute(message) {
        message.reply(`:ping_pong: **Pong!**\n**Your ping is**: \`${Date.now() - message.createdTimestamp}ms\`.\n**API latency is**: \`${Math.round(message.client.ws.ping)}ms\`.`);
    }
}