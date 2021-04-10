module.exports = {
    name: "8ball",
    description: "Ask to Kernel",
    usage: "<question>",
    modOnly: false,
    execute(message, args) {
        let ball = ["It is certain", "No doubt about it", "No chance", "Maybe, time will tell", "No way", "Concentrate and try again", " As I see it, yes", "Outlook good", "Most likely", "Better not tell you now", "My sources say no", "Signs point to yes", "Yes definitely", "It is decidedly so", "As I see it, yes", "My sources say no", "My sources say no", "Outlook not so good", "Very doubtful"];
   
        message.channel.send({embed: {
            color: "#ffb400",
            fields: [{
                name: "You asked",
                value: args.join(" ")
              },
              {
                  name: "Kernel says",
                  value: ball[Math.floor(Math.random () * ball.length)]
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