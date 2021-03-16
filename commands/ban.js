module.exports = {
    name: "ban",
    description: "Ban Hammer",
    usage: "<@user>",
    modOnly: false,
    execute(message) {
        message.channel.send("**" + message.mentions.members.first().user.username + "** in the tomba **\n" + message.mentions.members.first().user.username + "**.bin");
    }
}