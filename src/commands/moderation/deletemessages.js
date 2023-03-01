const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deletemessages")
        .setDescription("Delete all messages")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel messages\' to delete')
                .setRequired(true))
        .addUserOption(option =>
            option.setName("user")
                .setDescription('User messages\' to delete'))
        .addStringOption(option =>
            option.setName("userstring")
                .setDescription("First option")),

    async execute(interaction, client) {
        let user
        if (interaction.options.getUser("user")) user = interaction.options.getUser("user")
        else user = interaction.options.get("userstring").value
        const channel = interaction.options.getChannel("channel")
        messages = await channel.messages.fetch({ limit: 100 })

        const botMessages = [];
        messages.filter(message => message.author.id === user || message.author === user).forEach(msg => botMessages.push(msg))
        await channel.bulkDelete(botMessages)

        await interaction.reply("Done");
    }
}