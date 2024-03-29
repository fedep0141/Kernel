const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("invite")
        .setDescription("Server invite link"),

    async execute(interaction, client) {
        let member = await client.guilds.cache.get(interaction.guild.id).members.cache.get(interaction.user.id)
        let invite;

        if (!member.voice.channel) {
            invite = await interaction.guild.invites.create(interaction.channel, { maxAge: 10 * 60, maxUses: 10 })
        } else {
            invite = await interaction.guild.invites.create(member.voice.channel, { maxAge: 10 * 60, maxUses: 10 })
        }

        await interaction.reply("Available for 10 min " + invite.url);
    }
}