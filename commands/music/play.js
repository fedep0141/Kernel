const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");

module.exports = {
    name: "play",
    description: "Play music",
    usage: "<link or keywords>",
    modOnly: false,
    async execute(message, args) {
        let song = {}
        let voiceChannel = message.member.voice.channel;

        if (ytdl.validateURL(args[0])) {
            let songInfo = await ytdl.getInfo(args[0])
            song = { title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url }
        } else {
            const videoFinder = async (query) => {
                const videoResult = ytSearch(query);
                return (videoResult.videos.Length > 1) ? videoResult.videos[0] : null;
            }
            const video = videoFinder(args.join(' _ '));
            if (video) song = { title: video.title, url: video.url }
            else message.channel.send("Error finding video")
        }

        if (song && args.length) {
            if (voiceChannel != null) {
                voiceChannel.join().then(connection => {
                    let dispatcher = connection.play(ytdl(song.url, { filter: 'audioonly' }));
                    dispatcher.on("finish", () => {
                        voiceChannel.leave();
                    });
                });

                message.channel.send({
                    embed: {
                        color: "#ffb400",
                        fields: [{
                            name: "Playing",
                            value: song.title
                        }
                        ],
                        footer: {
                            text: "by Pyguz.#0456",
                            icon_url: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png"
                        }
                    }
                });
            } else {
                message.channel.send("You are not in a channel");
            }
        } else {
            throw new Error;
        }
    }
}