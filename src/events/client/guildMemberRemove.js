module.exports = {
    name: "guildMemberRemove",
    async execute(member) {
        let counter = member.client.guilds.cache.get("493128205952221204").memberCount;
        member.client.channels.cache.get("1016072558019354744").setName("𝗠𝗘𝗠𝗕𝗘𝗥𝗦「 " + counter + " 」");
    }
}