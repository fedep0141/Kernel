const Discord = require("discord.js");
const FS = require("fs");

module.exports = {
    name: "voice",
    description: "Play our voices",
    usage: "<name>",
    modOnly: true,
    execute(message, args) {
        if(args[0] == "list") {
            let voices = FS.readdirSync("./voices/");
            let embed = new Discord.MessageEmbed()
            .setColor("#ffb400")
            .setDescription("Voices")
            .setFooter("by Pyguz.#0456", "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png");
            for (const file of voices) {
                embed.addField(file.split(' ').slice(1).join(' ').split(".")[0], file.split(' ')[0], true);             
            }
            message.channel.send(embed);
        } else {
            let voiceChannel = message.member.voice.channel;
            args = args.join(" ");
    
            const voices = FS.readdirSync("./voices/").filter(file => file.endsWith(args + ".mp3") || file.endsWith(args + ".m4a"));
            if(voices.length != 0) {
                if(voiceChannel != null) {
                    voiceChannel.join().then(connection => {
                        let dispatcher = connection.play(require("path").join(__dirname, "../voices/" + voices));
                        dispatcher.on("finish", () => {
                            voiceChannel.leave();
                        });
                    });
                } else {
                    message.channel.send("You are not in a channel");
                }
            } else {
                throw new Error;
            }
        }
    }
}