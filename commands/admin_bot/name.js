module.exports = {
    name: "name",
    description: "Une commande pour changer le nom du bot | Résérvé à l'owner du Bot.",
    run: async (message, args, client) => {
        if(client.config.bot_owner !== message.author.id) return message.reply("Vous devez être propriétaire du bot pour changer son nom.");
        if(!args.length >= 1) return message.reply("Vous devez entrer un nom valide");

        client.user.setUsername(args.join(' ')).then(user => {
            return message.reply(`Mon nom à été changé pour ${user.username} !`);
        });
    }
}