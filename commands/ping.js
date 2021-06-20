module.exports = {
    name: "ping",
    description: "Shows your ping and the latency ping.",
    usage: ".pj ping",

    execute(message) {
        return message.reply(`:ping_pong: **Pong!**\n**Latency is**: \`${Date.now() - message.createdTimestamp}ms\`.\n**API Latency is**: \`${Math.round(message.client.ws.ping)}ms\`.`);
    }
}