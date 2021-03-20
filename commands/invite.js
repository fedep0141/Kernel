module.exports = {
    name: "invite",
    description: "Server invite link",
    modOnly: false,
    execute(message) {
        message.channel.createInvite({ maxAge: 10 * 60, maxUses: 10 }).then(inv => {
            message.channel.send("Available for 10 min " + inv.url);
        })
    }
}