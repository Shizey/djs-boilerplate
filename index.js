const log = require('fancylog');

log.info("Lancement du Bot Discord...")

const path = require('path');

const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database/db.json')
const db = low(adapter)

db.defaults({ prefix: undefined }).write()

const config = require('./config.json');
client.config = config;
client.commands = new Discord.Collection();
client.commandList = {};
client.cooldowns = new Discord.Collection();

client.clean = async (client, text) => {
    if (text && text.constructor.name == "Promise")
        text = await text;
    if (typeof text !== "string")
        text = require("util").inspect(text, { depth: 1 });

    text = text
        .replace(/`/g, "`" + String.fromCharCode(8203))
        .replace(/@/g, "@" + String.fromCharCode(8203))
        .replace(client.token, "|TOKEN|");

    return text;
};


fs.readdir(path.join(__dirname, 'events'), (err, files) => {
    if (err) {
        return console.error(err);
    }
    files.forEach(file => {
        if (file.endsWith(".js")) {
            const event = require(path.join(__dirname, `events/${file}`));
            let eventName = file.split(".")[0];
            log.info(`Event ${eventName} chargé.`)
            client.on(eventName, event.bind(null, client, db));
        }
    });
});


fs.readdir(path.join(__dirname, 'commands'), (err, files) => {
    files.forEach(file => {
        const group = file
        fs.readdir(path.join(__dirname, `commands/${group}`), (err, files) => {
            files.forEach(file => {
                if (file.endsWith(".js")) {
                    const command = require(`./commands/${group}/${file}`)
                    if (client.commandList[group]) {
                        client.commandList[group].push({
                            name: command.name,
                            description: command.description
                        });
                    } else {
                        client.commandList[group] = [{
                            name: command.name,
                            description: command.description
                        }]
                    }
                    client.commands.set(file.split(".")[0], command);
                    log.info(`Commande ${command.name} de la catégorie ${group} chargé.`)
                }
            });
        });
    });
});
client.login(config.token)