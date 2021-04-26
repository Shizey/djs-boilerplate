module.exports = {
    name: "reverse",
    description: "Une commande qui permet de renverser le texte que vous souhaitez",
    usage: "reverse <text>",
    aliases: ["rev"],
    guildOnly: true,
    cooldown: 5,
    run: async (message, args, client) => {
        if (args.length !== 0) {
            const toReverse = args.join(' ');
            message.channel.send(`Voici votre message renversé : \r\n**${toReverse.split('').reverse().join('')}**`)
        } else {
            message.reply("Vous devez entrer un texte à renverser.")
        }
    }
}