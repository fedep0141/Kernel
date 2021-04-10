module.exports = {
    name: "poke",
    description: "Poke someone",
    usage: "<@user>",
    modOnly: false,
    execute(message, args) {
        for (let i in args) {
            let mention = message.mentions.users.first(i);
            if(mention) {
                let user = message.guild.member(mention);
                user.send("You got a poke from " + message.author.username + " in " + message.channel.name);
            }
        }
    }
}