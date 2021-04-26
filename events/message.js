const { MessageEmbed, Collection } = require('discord.js')

module.exports = async (client, db, message) => {

    const log = require('fancylog');

    const { cooldowns } = client;

    if (message.author.bot) {
        return;
    }

    const dbPrefix = db.get("prefix").value();
    const prefix = dbPrefix ? dbPrefix : client.config.prefix;
    const messageArray = message.content.split(" ");
    const cmd = messageArray[0];
    const args = messageArray.slice(1);

    if (message.content.startsWith(prefix)) {
        const commandName = cmd.slice(prefix.length);
        const commandFile = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (commandFile) {

            if (commandFile.guildOnly && message.channel.type === 'dm') {
                return message.reply("Désolé, ce bot ne supporte pas cette commande par message privé.");
            }

            if (!cooldowns.has(commandFile.name)) {
                cooldowns.set(commandFile.name, new Collection());
            }

            const now = Date.now();
            const timestamps = cooldowns.get(commandFile.name);
            const cooldownAmount = (commandFile.cooldown || 3) * 1000;

            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    message.channel.send(new MessageEmbed().setDescription(`Veuillez attendre ${Math.round(timeLeft)} seconde(s) avant de refaire cette commande`).setTimestamp().setColor('#303136')).then(msg => msg.delete({timeout : expirationTime - now}));
                    return;
                }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            log.info(`${message.author.tag} execute la commande ${commandFile.name}.`);
            commandFile.run(message, args, client, db);
        }
    }
}