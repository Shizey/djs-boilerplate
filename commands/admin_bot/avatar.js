module.exports = {
    name: "avatar",
    description: "Une commande pour changer la photo de profile du bot.",
    run: async (message, args, client) => {
        if(client.config.bot_owner !== message.author.id) return message.reply("Vous devez être propriétaire du bot pour changer son nom.");

        if (message.attachments.size > 0) {
                message.client.user.setAvatar(message.attachments.first().url).then(user => {
                    return message.reply('Vous venez de changer la photo de profil du bot pour cela ' + message.attachments.first().url)
                }).catch(console.error);
        } else {
            return message.reply('Vous devez me fournir une image pour changer la photo de profil du bot.')
        }
    }
}