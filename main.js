const Discord = require("discord.js");
const FS = require("fs");

const client = new Discord.Client();
client.commands = new Discord.Collection();
const COMMANDFILES = FS.readdirSync("./commands/").filter(file => file.endsWith(".js"));
for(let file of COMMANDFILES) {
    let command = require("./commands/" + file);
    client.commands.set(command.name, command)
}

client.on("ready", () => {
    console.log("KernelBot is online");
});

client.on("message", message => {
    const PREFIX = "<";
    const MODCHANNEL = "kernel";

    if(!message.content.startsWith(PREFIX) && !message.author.bot) {
        if(message.channel.name == MODCHANNEL) {
            message.delete();
        } else {
            return;
        }
    }
    if(message.author.bot) return;

    let args = message.content.slice(PREFIX.length).split(/ +/);
    const command = args.shift().toLowerCase();

    //Global command
    switch (command) {
        case "aiut":
        case "help":
            client.commands.get("help").execute(message, PREFIX, client.commands);
            break;

        case "ban":
            client.commands.get("ban").execute(message);
            break;
        
        case "pat":
            client.commands.get("pat").execute(message);
            break;

        case "scarponi":
            client.commands.get("scarponi").execute(message);
            break;
    }

    if(message.channel.name != MODCHANNEL) {
        message.channel.send("You can't use this command");
    } else {
        switch (command) {
            case "ping":
                client.commands.get("ping").execute(message, client);
                break;
        }
    }
});

client.login(process.env.TOKEN);