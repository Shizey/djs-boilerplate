module.exports = {
    name: "prefix",
    description: "Permet à l'owner de changer le préfix du bot.",
    run: async(message, args, client, db) => {
        if (client.config.bot_owner !== message.author.id) return message.reply("Vous devez être propriétaire du bot pour changer son prefix.");
        if (args.length !== 1) return message.reply("Tu dois entrer un prefix valide !");
        db.set("prefix", args[0]).write()
        return message.reply("Vous venez de changer le préfix pour `" + `${args[0]}` + "`.")
    }
}