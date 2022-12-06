const { EmbedBuilder } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
    name: "scheduledMessages",
    async execute(client) {
        const goodMorning = new schedule.RecurrenceRule();
        goodMorning.hour = 8;
        goodMorning.minute = 0;

        schedule.scheduleJob(goodMorning, async () => {
            let embed = new EmbedBuilder()
                .setColor("#ffb400")
                .setTitle("BUONGIORNO")
                .setFooter({ text: "by Pyguz.#0456", iconURL: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png" })

            client.channels.cache.get("703287991761633392").send({ embeds: [embed] })
        });
    }
}