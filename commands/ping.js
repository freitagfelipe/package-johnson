module.exports = {
    name: "ping",
    description: "Show your ping and the latency ping",

    execute(message) {
        message.reply(`:ping_pong: Pong!\nLatency is ${Date.now() - message.createdTimestamp}ms.\nAPI Latency is ${Math.round(message.client.ws.ping)}ms.`);
    }
}