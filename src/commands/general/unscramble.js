const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const unscramble = require('unscramble');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unscramble")
        .setDescription("Unscramble a word")
        .addStringOption(option =>
            option.setName("word")
                .setDescription('Scrambled word')
                .setRequired(true)),

    async execute(interaction) {
        let embed = new EmbedBuilder()
            .setColor("#ffb400")
            .setDescription("Unscrambled " + interaction.options.get("word").value)
            .addFields({ name: unscramble(interaction.options.get("word").value).join(), value: "\u200b" })
            .setFooter({ text: "by Pyguz.#0456", iconURL: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png" })

        await interaction.reply({
            embeds: [embed]
        });
    }
}