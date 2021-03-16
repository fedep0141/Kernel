const unscramble = require('unscramble');

module.exports = {
    name: "unscramble",
    description: "Unscramble a word",
    usage: "<word>",
    modOnly: false,
    execute(message, args) {
        message.channel.send(unscramble(args[0]));
    }
}