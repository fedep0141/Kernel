const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Ping command")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction, client) {
        let embed = new EmbedBuilder()
            .setColor("#ffb400")
            .setDescription("Show bot ping")
            .addFields({ name: "Ping", value: String(client.ws.ping) })
            .setFooter({ text: "by Pyguz.#0456", iconURL: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png" })

        await interaction.reply({
            embeds: [embed],
            ephemeral: true
        });
    }
}