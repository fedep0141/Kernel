module.exports = {
    name: "invite",
    description: "Server invite link",
    modOnly: false,
    execute(message) {
        let voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            message.channel.createInvite({ maxAge: 10 * 60, maxUses: 10 }).then(inv => {
                message.channel.send("Available for 10 min " + inv.url);
            })
        } else {
            voiceChannel.createInvite({ maxAge: 10 * 60, maxUses: 10 }).then(inv => {
                message.channel.send("Available for 10 min " + inv.url);
            })
        }
    }
}