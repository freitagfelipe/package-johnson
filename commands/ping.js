module.exports = {
    name: "ping",
    description: "Show your ping and the latency ping.",

    execute(message) {
        return message.reply(`:ping_pong: **Pong!**\n**Latency is**: \`${Date.now() - message.createdTimestamp}ms\`.\n**API Latency is**: \`${Math.round(message.client.ws.ping)}ms\`.`);
    }
}