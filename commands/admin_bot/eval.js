module.exports = {
    name: "eval",
    description: "Une commande pour evaluer du code JS",
    run: async (message, args, client) => {
        if (client.config.bot_owner !== message.author.id) return message.reply("Vous devez être propriétaire du bot pour utiliser la commande eval.");
        const content = message.content.split(" ").slice(1).join(" ");
        const result = new Promise((resolve) => resolve(eval(content)));

        return result.then((output) => {
            if (typeof output !== "string") {
                output = require("util").inspect(output, { depth: 0 });
            }
            if (output.includes(message.client.token)) {
                output = output.replace(message.client.token, "T0K3N");
            }
            message.channel.send(output, {
                code: "js"
            });
        }).catch((err) => {
            err = err.toString();
            if (err.includes(message.client.token)) {
                err = err.replace(message.client.token, "T0K3N");
            }
            message.channel.send(err, {
                code: "js"
            });
        });
    }
}