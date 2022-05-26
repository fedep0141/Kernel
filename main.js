const Discord = require("discord.js");
const roleClaim = require("./reactionRoles/reactionRoles.js");
const FS = require("fs");
require('dotenv').config();

const client = new Discord.Client();
client.commands = new Discord.Collection();
const COMMANDFILES = FS.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(let file of COMMANDFILES) {
    let command = require("./commands/" + file);
    client.commands.set(command.name, command)
}
const MUSICFILES = FS.readdirSync("./commands/music/").filter(file => file.endsWith(".js"));
for(let file of MUSICFILES) {
    let command = require("./commands/music/" + file);
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log("KernelBot is online");
    roleClaim(client);
});

client.on("message", message => {
    const PREFIX = "<";
    const MODCHANNEL = "kernel";

    if(!message.content.startsWith(PREFIX) && !message.author.bot) {
        if(message.channel.name == MODCHANNEL) {
            message.delete();
            return;
        } else {
            return;
        }
    }
    if(message.author.bot) return;

    let args = message.content.slice(PREFIX.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    try {
        var command = client.commands.get(commandName);
        if(command.modOnly) {
            if(message.channel.name == MODCHANNEL) {
                command.execute(message, args, PREFIX, client.commands, client);
            }
        } else {
            command.execute(message, args, PREFIX, client.commands, client);
        }
    } catch(error) {
        console.log(error)
        if(command != undefined && command.usage) {
            message.channel.send(PREFIX + commandName + " " + command.usage);
        }
    }
});
client.login(process.env.KERNEL_TOKEN);