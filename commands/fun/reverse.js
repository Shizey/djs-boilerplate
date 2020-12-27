module.exports = {
    name: "reverse",
    description: "Une commande qui permet de renverser le texte que vous souhaitez | Usage : reverse <text>",
    run: async (message, args, client) => {
        if(args.length !== 0){
            const toReverse = args.join(' ');
            message.channel.send(`Voici votre message renversé : \r\n**${toReverse.split('').reverse().join('')}**`)
        }else{
            message.reply("Vous devez entrer un texte à renverser.")
        }
    }
}