const addReactions = (message, reactions) => {
    message.react(reactions[0]);
    reactions.shift();
    if (reactions.length > 0) {
        addReactions(message, reactions);
    }
}

module.exports = async (client, id, text, reactions = [], numero) => {
    const channel = await client.channels.fetch(id);

    channel.messages.fetch().then((messages) => {
        if (messages.size < 3) {
            channel.send(text).then((message) => {
                addReactions(message, reactions);
            });
        } else {
            let c = 4
            messages.forEach((message, id) => {
                c--
                if (numero == c) {
                    message.edit(text);
                    addReactions(message, reactions);
                }
            })
        }
    });
}