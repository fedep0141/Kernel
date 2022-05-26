module.exports = {
    name: "leave",
    description: "Leave the channel",
    usage: "",
    modOnly: false,
    execute(message) {
        let voiceChannel = message.member.voice.channel;

        if(voiceChannel.members.has(client.user.id)) {
            voiceChannel.leave();
        } else {
            message.channel.send("I'm not in your voice channel");
        }
    }
}