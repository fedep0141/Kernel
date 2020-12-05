module.exports = {
    name: "ban",
    description: "Move everyone command",
    whatDo: "Ban Hammer",
    modOnly = false,
    execute(message) {
        message.channel.send("**" + message.mentions.members.first().user.username + "** in the tomba **\n" + message.mentions.members.first().user.username + "**.bin");
    }
}