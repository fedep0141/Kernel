const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("choose")
        .setDescription("Choose between options")
        .addStringOption(option =>
            option.setName("option1")
                .setDescription("First option")
                .setRequired(true))
        .addStringOption(option =>
            option.setName("option2")
                .setDescription("Second option")
                .setRequired(true)),

    async execute(interaction, client) {
        let index = Math.floor(Math.random() * interaction.options._hoistedOptions.length);

        let embed = new EmbedBuilder()
            .setColor("#ffb400")
            .addFields({ name: "I choose", value: interaction.options._hoistedOptions[index].value })
            .setFooter({ text: "by Pyguz.#0456", iconURL: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png" })

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}