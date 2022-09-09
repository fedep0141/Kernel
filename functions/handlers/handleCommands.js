const FS = require("fs");
const { Routes } = require('discord.js');
const { REST } = require("@discordjs/rest");
module.exports = (client) => {
    client.handleCommands = async () => {
        const { commands, commandsArray } = client;
        const commandsFolder = FS.readdirSync("./commands");
        for (const folder of commandsFolder) {
            const commandsFiles = FS.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(".js"));
            for (const file of commandsFiles) {
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command)
                commandsArray.push(command.data.toJSON());
            }
        }

        const CLIENTID = "784548261624545280", GUILDID = "493128205952221204";
        const rest = new REST({ version: '10' }).setToken(process.env.KERNEL_TOKEN);

        (async () => {
            try {
                console.log(`Started refreshing ${commands.length} application (/) commands.`);

                const data = await rest.put(Routes.applicationGuildCommands(CLIENTID, GUILDID), {
                    body: commandsArray,
                });

                console.log(`Successfully reloaded ${data.length} application (/) commands.`);
            } catch (error) {
                console.error(error);
            }
        })();
    }
}