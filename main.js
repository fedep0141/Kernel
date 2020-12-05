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
            return;

        case "ban":
            client.commands.get("ban").execute(message);
            return;
        
        case "pat":
            client.commands.get("pat").execute(message);
            return;

        case "scarponi":
            client.commands.get("scarponi").execute(message);
            return;

        case "choose":
            client.commands.get("choose").execute(message, args);
            const channel = message.guild.channels.cache.find(channel => channel.name === "rules");
            const bru = message.guild.members.cache.find(member => member.id == "325676665009340436");
            const li = message.guild.emojis.cache.find(emoji => emoji.name == 'li').toString();
    
            const embed = new Discord.MessageEmbed()
            .setTitle("RULES")
            .setColor("#ffb400")
            .setDescription(`Follow the rules or **PEW PEW PEW**\n\n\n ${li} @Bru and @Pyguz. are the **OWNERS** \n -consider them as gods\n\n \:li: If you want to joke that's fine but **stop** means **stops**`)
            .addField(bru.toString(), "@Bru and @Pyguz")
            .addField()
            .setFooter("by KERNEL administration", "https://pngimg.com/uploads/shrek/shrek_PNG3.png");
            channel.send(embed);
            return;
    }

    if(message.channel.name != MODCHANNEL) {
        message.channel.send("You can't use this command");
    } else {
        switch (command) {
            case "ping":
                client.commands.get("ping").execute(message, client);
                break;

            case "modhelp":
                client.commands.get("modhelp").execute(message, PREFIX, client.commands);
                break;
            
            // case "embed":
            //     client.commands.get("embed").execute(message);
            //     break;
        }
    }
});

client.login(process.env.TOKEN);