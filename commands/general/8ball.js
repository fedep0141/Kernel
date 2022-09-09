const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("8ball")
        .setDescription("Ask to Kernel")
        .addStringOption(option =>
            option.setName("question")
                .setDescription('Question to ask')
                .setRequired(true)),

    async execute(interaction, client) {
        let ball = ["It is certain", "No doubt about it", "No chance", "Maybe, time will tell", "No way", "Concentrate and try again", " As I see it, yes", "Outlook good", "Most likely", "Better not tell you now", "My sources say no", "Signs point to yes", "Yes definitely", "It is decidedly so", "As I see it, yes", "My sources say no", "My sources say no", "Outlook not so good", "Very doubtful"];

        let embed = new EmbedBuilder()
            .setColor("#ffb400")
            .addFields({ name: "You asked", value: interaction.options.get("question").value })
            .addFields({ name: "Kernel says", value: ball[Math.floor(Math.random() * ball.length)] })
            .setFooter({ text: "by Pyguz.#0456", iconURL: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png" })

        await interaction.reply({
            embeds: [embed]
        });
    }
}