const firstmessage = require("./firstMessage");

module.exports = async (client) => {
    const channelID = "783803736816091157";

    const games = require("./gamesRoles.json");
    const gamesReactions = [];
    let gamesText = "Click on the reaction to get the corresponding role\n\n";
    let hobbiesText = "\u200B\n";
    let epithetsText = "\u200B\n";
    for(let key in games) {
        let emoji = getEmoji(key);
        gamesReactions.push(emoji);

        let roleID = client.guilds.cache.get("493128205952221204").roles.cache.find(role => role.name === games[key]);
        gamesText += `${emoji} - ${roleID}\n`;
    }    
    const hobbies = require("./hobbiesRoles.json");
    const hobbiesReactions = [];
    for(let key in hobbies) {
        let emoji = getEmoji(key);
        hobbiesReactions.push(emoji);

        let roleID = client.guilds.cache.get("493128205952221204").roles.cache.find(role => role.name === hobbies[key]);
        hobbiesText += `${emoji} - ${roleID}\n`;
    }    
    const epithets = require("./epithetsRoles.json");
    const epithetsReactions = [];
    for(let key in epithets) {
        let emoji = getEmoji(key);
        epithetsReactions.push(emoji);

        let roleID = client.guilds.cache.get("493128205952221204").roles.cache.find(role => role.name === epithets[key]);
        epithetsText += `${emoji} - ${roleID}\n`;
    }

    await firstmessage(client, channelID, gamesText, gamesReactions, 1);
    await firstmessage(client, channelID, hobbiesText, hobbiesReactions, 2);
    await firstmessage(client, channelID, epithetsText, epithetsReactions, 3);

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
        const prova = {...games, ...hobbies, ...epithets};
        const roleName = prova[emoji];
        if(!roleName) return;

        const role = guild.roles.cache.find(role => role.name === roleName);
        const member = guild.members.cache.find((member) => member.id === user.id);

        if(add) {
            if(!member.roles.cache.some(role => role.name === "Owner")) {
                member.roles.add(role);
            }
        } else {
        	if(role.name != "Verified") member.roles.remove(role);
        }
        
        // if(member.roles.cache.some(role => role.name === "Feccia")) member.roles.remove(verified);
    }
}
