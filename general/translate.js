const translate = require('@vitalets/google-translate-api');
const langs = require("../../utils/langs.json");
const Discord = require("discord.js");

module.exports = {
    name: "translate",
    description: "Translate",
    usage: "<languageFrom> <languageTo> <words>",
    modOnly: false,
    execute(message, args) {

        if(args.length == 1 && args[0] == "language") {
            let embed = new Discord.MessageEmbed()
            .setColor("#ffb400")
            .setDescription("Languages")
            .setFooter("by Pyguz.#0456", "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png");
            for (const key in langs) {
                embed.addField(langs[key], key, true);             
            }
            message.channel.send(embed);

        } else {
            if(args.length > 3) {
                for(let i = 3; i < args.length; i++) {
                    args[2] += " " + args[i];
                }
            }
    
            translate(args[2], { from: args[0], to: args[1] }).then(res => {
                for(iso in langs) {
                    if(args[1] == iso) var to = langs[iso];
                    if(res.from.language.iso == iso) var from = langs[iso];
                }
                let embed = new Discord.MessageEmbed()
                .setColor("#ffb400")
                .setFooter("by Pyguz.#0456", "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png")
                .addField("From", from, true)
                .addField("To", to, true)
                .addField(res.text, "\u200b");

                res.from.text.autoCorrected ? embed.setDescription("Translated: " + res.from.text.value) : embed.setDescription("Translated: " + args[2]);
                message.channel.send(embed);
            });
        }
    }
}