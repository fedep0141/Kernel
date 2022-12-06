const welcomeMessage = require("../../functions/welcomeMessage");

module.exports = {
    name: "guildMemberAdd",
    async execute(member) {
        let counter = member.client.guilds.cache.get(process.env.GUILD).memberCount;
        member.client.channels.cache.get("1016072558019354744").setName("𝗠𝗘𝗠𝗕𝗘𝗥𝗦「 " + counter + " 」");

        welcomeMessage.execute(member, member.client)
    }
}