const { REST, Routes } = require("discord.js")

const fs = require("fs")
module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/commands")
        const { commands, commandArray } = client;

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/commands/${folder}`).filter(file => file.endsWith(".js"))
            for (const file of commandFiles) {
                const command = require(`../../commands/${folder}/${file}`)
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON())
            }
        }

        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN)

        try {
            console.log(`Started refreshing ${commandArray.length} application (/) commands.`)
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT, process.env.GUILD),
                { body: commandArray }
            )
            console.log(`Successfully reloaded ${data.length} application (/) commands.`)
        } catch (error) {
            console.error(error)
        }
    }
}