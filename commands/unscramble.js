const unscramble = require('unscramble');

module.exports = {
    name: "unscramble",
    description: "Unscramble a word",
    usage: "<word>",
    modOnly: false,
    execute(message, args) {
        message.channel.send({embed: {
            color: "#ffb400",
            description: "Unscrambled " + args[0],
            fields: [{
                name: unscramble(args[0]),
                value: "\u200b"
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