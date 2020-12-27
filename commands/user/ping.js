module.exports = {
    name: "ping",
    description: "Une commande pour savoir si le bot est en ligne",
    run: async (message, args, client) => {
        message.reply("Pong !");
    }
}