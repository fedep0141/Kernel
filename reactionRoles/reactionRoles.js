const firstmessage = require("./firstMessage");

module.exports = (client) => {
    const channelID = "783803736816091157";
    const emojis = require("./emojiRoles.json");
    const reactions = [];
    let emojiText = "Click on the reaction to get the corresponding role\n\n";
    for(let key in emojis) {
        const emoji = getEmoji(key);
        reactions.push(emoji);

        let roleID = client.guilds.cache.get("493128205952221204").roles.cache.find(role => role.name === emojis[key]);
        emojiText += `${emoji} - ${roleID}\n`;
    }

    firstmessage(client, channelID, emojiText, reactions);

    client.on("messageReactionAdd", (reaction, user) => {
        if(reaction.message.channel.id === channelID) handleReaction(reaction, user, true);
    });

    client.on("messageReactionRemove", (reaction, user) => {
        if(reaction.message.channel.id === channelID) handleReaction(reaction, user, false);
    });

    function getEmoji(emojiName) {
        return client.emojis.cache.find(emoji => emoji.name === emojiName);
    }

    function handleReaction(reaction, user, add) {
        if(user.bot) return;

        const emoji = reaction._emoji.name;
        const { guild } = reaction.message;
        const roleName = emojis[emoji];
        if(!roleName) return;

        const role = guild.roles.cache.find(role => role.name === roleName);
        const verified = guild.roles.cache.find(role => role.name === "Verified");
        const member = guild.members.cache.find((member) => member.id === user.id);

        if(add) {
            if(!member.roles.cache.some(role => role.name === "Owner")) {
                member.roles.add(role);
                if(!member.roles.cache.some(role => role.name === "Verified" || role.name === "Adminchia" || role.name === "Moderatroie" || role.name === "Feccia")) {
                    member.roles.add(verified);
                }
            }
        } else {
        	if(role.name != "Verified") member.roles.remove(role);
        }
        
        if(member.roles.cache.some(role => role.name === "Feccia")) member.roles.remove(verified);
    }
}
