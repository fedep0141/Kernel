const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Ban Hammer")
        .addUserOption(option =>
            option.setName("user")
                .setDescription('User to ban')
                .setRequired(true)),

    async execute(interaction, client) {
        await interaction.reply("**<@" + interaction.options.getUser("user").id + ">** in the tomba **\n<@" + interaction.options.getUser("user").id + ">**.bin");
    }
}