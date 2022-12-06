const scheduledMessages = require("../../functions/scheduledMessages")
const roleClaim = require("../../functions/reactionRoles/reactionRoles.js")

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        await scheduledMessages.execute(client)
        await roleClaim(client);
        console.log(`${client.user.tag} is online.`)
    }
}