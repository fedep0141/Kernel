const translate = require("translate");

module.exports = {
    name: "translate",
    description: "Translate",
    usage: "<languageFrom> <languageTo> <words>",
    modOnly: false,
    execute(message, args) {
        translate.engine = "libre";
        
        if(args.length > 3) {
            for(let i = 3; i < args.length; i++) {
                args[2] += " " + args[i];
            }
        }

        translate(args[2], { from: args[0], to: args[1] }).then(text => {
            message.channel.send(text);
        });
    }
}