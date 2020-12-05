module.exports = {
    name: "choose",
    description: "option1 option2 ...",
    whatDo: "Choose between options",
    modOnly = false,
    execute(message, args) {
        let index = Math.floor(Math.random() * args.length);

        message.channel.send({embed: {
            color: "#ffb400",
            fields: [{
                name: "I choose",
                value: args[index]
            }
            ],
            footer: {
                text: "by Pyguz.#0456",
                icon_url: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png"
            }
        }
        });
    }
}