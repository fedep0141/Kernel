module.exports = {
    name: "pat",
    description: "Pat the mention",
    usage: "<@user>",
    modOnly: false,
    execute(message) {
        let menzione = message.mentions.members.first();

        if(menzione) {
            if(menzione.user.username == message.author.username) {
                message.channel.send({embed: {
                    color: "#ffb400",
                    description: "Damn",
                    image: {
                        url: "https://i.kym-cdn.com/entries/icons/original/000/030/329/cover1.jpg"
                    },
                    footer: {
                        text: "by Pyguz.#0456",
                        icon_url: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png"
                    }
                  }
                });
            } else {
                message.channel.send({embed: {
                    color: "#ffb400",
                    fields: [{
                        name: "Pat pat",
                        value: "**" + menzione.user.username + "**"
                      }
                    ],
                    footer: {
                        text: "by Pyguz.#0456",
                        icon_url: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png"
                    }
                  }
                });
            }
        } else {
            message.channel.send("Mention the user!!");
        }
    }
}