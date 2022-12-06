module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (interaction.isButton()) {
            if (interaction.customId == "verifiedButton") {
                const verifiedRoles = {
                    verifiedRole: "784517952145588234",
                    epithetsBanner: "1016107530843340851",
                    privateBanner: "1016331738210893844",
                    interestsBanner: "1016341544325881888",
                    gamesBanner: "1016104857515597995"
                }
                for (const role in verifiedRoles) {
                    await interaction.member.roles.add(verifiedRoles[role])
                }
                interaction.reply({ content: "You got verified", ephemeral: true })
            }
        }
        if (!interaction.isCommand()) return
        const { commands } = client
        const { commandName } = interaction;
        const command = commands.get(commandName)
        if (!command) return;
        try {
            await command.execute(interaction, client)
        } catch (error) {
            console.error(error)
            await interaction.reply({
                content: "Error while executing the command",
                ephemeral: true
            });
        }
    }
}