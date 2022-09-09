const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Help with commands",
    modOnly: false,
    execute(message, {}, prefix, commands) {
      
      let embed = new Discord.MessageEmbed()
      .setColor("#ffb400")
      .setDescription("Command list")
      .setFooter("by Pyguz.#0456", "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png");
      Array.from(commands.keys()).forEach(key => {
        if(!commands.get(key).modOnly) {
          embed.addField(prefix + key, commands.get(key).description, true);
        }
      });
      
      message.channel.send(embed);
    }
}