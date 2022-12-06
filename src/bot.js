const { Client, Collection, GatewayIntentBits } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates]
});

client.commands = new Collection();
client.commandArray = [];
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
    if (folder.endsWith(".js")) continue
    if (folder == "reactionRoles") continue
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles)
        require(`./functions/${folder}/${file}`)(client);
}

client.handleEvents();
client.handleCommands();
client.login(process.env.TOKEN);