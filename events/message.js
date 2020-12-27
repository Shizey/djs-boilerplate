module.exports = async(client, db, message) => {

    const log = require('fancylog');

    if (message.author.bot) {
        return;
    }
    if (message.channel.type === "dm") {
        log.info(`${message.author.tag} viens d'envoyer un message privé au Bot.`)
        return message.channel.send("Désolé, ce bot ne supporte pas les commandes par message privé.");
    }

    const dbPrefix = db.get("prefix").value();
    const prefix = dbPrefix ? dbPrefix : client.config.prefix;
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if (message.content.startsWith(prefix)) {
        const commandFile = client.commands.get(cmd.slice(prefix.length));
        if (commandFile) {
            log.info(`${message.author.tag} execute la commande ${commandFile.name}.`);
            commandFile.run(message, args, client, db);
        }
    }
}