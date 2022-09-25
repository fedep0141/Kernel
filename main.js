const Discord = require("discord.js");
const { Collection, GatewayIntentBits, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const roleClaim = require("./reactionRoles/reactionRoles.js");
const FS = require("fs");
require('dotenv').config();

const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [
        "USER",
        "MESSAGE",
        "CHANNEL",
        "REACTION"
    ]
})

const schedule = require('node-schedule');

const rule = new schedule.RecurrenceRule();
rule.hour = 8;
rule.minute = 0;

schedule.scheduleJob(rule, function () {

    let embed = new EmbedBuilder()
        .setColor("#ffb400")
        .setTitle("BUONGIORNO")
        .setFooter({ text: "by Pyguz.#0456", iconURL: "https://cdn.discordapp.com/avatars/484387014725206016/4113368f74bd7056a02b20b03b2995a3.png" })

    client.channels.cache.get("703287991761633392").send({ embeds: [embed] })
});

client.commands = new Collection();
client.commandsArray = [];

const functionFolders = FS.readdirSync(`./functions`);
for (const folder of functionFolders) {
    const functionFiles = FS
        .readdirSync(`./functions/${folder}`)
        .filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleCommands()

client.on("ready", () => {
    console.log("KernelBot is online");

    // client.channels.cache.get("783803736816091156").send({
    //     files: [{
    //         attachment: './img/2560px-Flag_of_the_United_States.svg.png',
    //         name: 'country.png'
    //     }, {
    //         attachment: './cpuorange.png',
    //         name: 'footer.png'
    //     }],
    //     embeds: [
    //         {
    //             type: "rich",
    //             title: "『 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗞𝗘𝗥𝗡𝗘𝗟 』",
    //             description: "We are an Italian gaming community where you can find teammates or you can just have a nice chat.",
    //             color: 0xffb400,
    //             thumbnail: {
    //                 url: "attachment://country.png"
    //             },
    //             fields: [
    //                 {
    //                     name: "𝐇𝐀𝐕𝐄 𝐘𝐎𝐔 𝐉𝐔𝐒𝐓 𝐉𝐎𝐈𝐍𝐄𝐃?",
    //                     value: "Leave a reaction to the message below this one in order to gain the 𝙑𝙚𝙧𝙞𝙛𝙞𝙚𝙙 role. \nIn the <#783803736816091157> chat you can add info about yourself, like your favorite games and hobbies."
    //                 },
    //                 {
    //                     name: "\u200B",
    //                     value: "\u200B"
    //                 },
    //                 {
    //                     name: "𝐑𝐄𝐆𝐎𝐋𝐄",
    //                     value: "<:li:784820126250696734> Keep a respectful behavior towards the other people and the server\n\n<:li:784820126250696734> Don't share personal information without permission\n\n<:li:784820126250696734> Harassment and hateful behavior are not tolerated\n\n<:li:784820126250696734> There is Freedom of speech on any topic\n\n<:li:784820126250696734> Spam of channels or profiles not authorized by the staff is not allowed\n\n\nWARNING: Staff has the freedom to ban in cases where the behavior of one or more people is considered toxic"
    //                 }
    //             ],
    //             footer: {
    //                 text: "by Kernel administration",
    //                 icon_url: "attachment://footer.png"
    //             }
    //         }
    //     ],
    //     components: [
    //         {
    //             type: 1,
    //             components: [
    //                 {
    //                     style: 3,
    //                     label: "Verified",
    //                     custom_id: "verifiedButton",
    //                     disabled: false,
    //                     type: 2
    //                 }
    //             ]
    //         }
    //     ]
    // });
    // client.channels.cache.get("783803736816091156").send({
    //     files: [{
    //         attachment: './img/Flag_of_Italy.svg.png',
    //         name: 'country.png'
    //     }, {
    //         attachment: './cpuorange.png',
    //         name: 'footer.png'
    //     }],
    //     embeds: [
    //         {
    //             type: "rich",
    //             title: "『 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 𝗧𝗢 𝗞𝗘𝗥𝗡𝗘𝗟 』",
    //             description: "Siamo una community di gaming italiana dove troverai compagni con cui giocare oppure fare una semplice chiacchierata.",
    //             color: 0xffb400,
    //             thumbnail: {
    //                 url: "attachment://country.png"
    //             },
    //             fields: [
    //                 {
    //                     name: "𝐒𝐄𝐈 𝐀𝐏𝐏𝐄𝐍𝐀 𝐄𝐍𝐓𝐑𝐀𝐓𝐎?",
    //                     value: "Lascia la reazione qui sotto in modo da ottenere il ruolo 𝙑𝙚𝙧𝙞𝙛𝙞𝙚𝙙.\nIn <#783803736816091157> puoi aggiungere info su te stesso, come i tuoi giochi preferiti e hobby."
    //                 },
    //                 {
    //                     name: "\u200B",
    //                     value: "\u200B"
    //                 },
    //                 {
    //                     name: "𝐑𝐄𝐆𝐎𝐋𝐄",
    //                     value: "<:li:784820126250696734> Mantieni un comportamento rispettoso nei confronti degli altri utenti e del server\n\n<:li:784820126250696734> Non diffondere informazioni personali senza consenso dell'utente preso in causa\n\n<:li:784820126250696734> Non sono tollerati atteggiamenti molesti e di odio\n\n<:li:784820126250696734> C’è piena libertà di espressione su qualsiasi argomento\n\n<:li:784820126250696734> Non è permesso lo spam di canali o profili non autorizzato dallo Staff\n\n\nRICORDIAMO: lo Staff ha la libertà di bannare liberamente nei casi in cui il comportamento di uno o più utenti venga considerato eccessivamente tossico"
    //                 }
    //             ],
    //             footer: {
    //                 text: "by Kernel administration",
    //                 icon_url: "attachment://footer.png"
    //             }
    //         }
    //     ],
    //     components: [
    //         {
    //             type: 1,
    //             components: [
    //                 {
    //                     style: 3,
    //                     label: "Verificati",
    //                     custom_id: "verifiedButton",
    //                     disabled: false,
    //                     type: 2
    //                 }
    //             ]
    //         }
    //     ]
    // });

    roleClaim(client);
});

client.on('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        verifiedID = "784517952145588234"
        if (interaction.customId == "verifiedButton") {
            const epithetsRole = interaction.guild.roles.cache.find(role => role.id === "1016107530843340851");
            const privateRole = interaction.guild.roles.cache.find(role => role.id === "1016331738210893844");
            const interestsRole = interaction.guild.roles.cache.find(role => role.id === "1016341544325881888");
            const gamesRole = interaction.guild.roles.cache.find(role => role.id === "1016104857515597995");
            interaction.member.roles.add(epithetsRole);
            interaction.member.roles.add(privateRole);
            interaction.member.roles.add(interestsRole);
            interaction.member.roles.add(gamesRole);
            interaction.guild.roles.fetch(verifiedID)
                .then(role => interaction.member.roles.add(role))
            interaction.reply({ content: "You got verified", ephemeral: true });
        }
    }
    if (!interaction.isCommand()) return
    const { commands } = client;
    const { commandName } = interaction;
    const command = commands.get(commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error)
        await interaction.reply({
            content: "Error",
            ephemeral: true
        });
    }
});

client.on("guildMemberAdd", async (member) => {
    let counter = client.guilds.cache.get("493128205952221204").memberCount;
    client.channels.cache.get("1016072558019354744").setName("𝗠𝗘𝗠𝗕𝗘𝗥𝗦「 " + counter + " 」");

    const { createCanvas, loadImage, registerFont } = require("canvas");
    registerFont("./fonts/Ubuntu-Regular.ttf", { family: "ubuntu" });
    registerFont("./fonts/Ubuntu-Bold.ttf", { family: "ubuntuBold" });

    const canvasWidth = 1700,
        canvasHeight = 600,
        bg_cover_padding = 70,
        avatar_padding = 50,
        avatar_size = canvasHeight - bg_cover_padding * 2 - avatar_padding * 2,
        text_x_pos_center =
            bg_cover_padding * 2 +
            avatar_padding * 2 +
            avatar_size +
            (canvasWidth -
                (bg_cover_padding * 2 +
                    avatar_padding * 2 +
                    avatar_size +
                    bg_cover_padding)) /
            2,
        text_x_pos_left = bg_cover_padding * 2 + avatar_padding * 2 + avatar_size;

    const welcome_channel_ID = "1016099553843347607";
    const newMessage = `Welcome to KERNEL <@${member.user.id}>!`;
    const canvas = await createCanvas(canvasWidth, canvasHeight);
    const ctx = await canvas.getContext("2d");

    const bg_image = await loadImage(`./img/welcome_bg.png`);

    // Background
    ctx.drawImage(
        bg_image,
        canvas.width / 2 - bg_image.width / 2,
        canvas.height / 2 - bg_image.height / 2
    );

    // Cover
    ctx.filter = "blur(100px)";
    ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
    ctx.fillRect(
        bg_cover_padding,
        bg_cover_padding,
        canvas.width - bg_cover_padding - bg_cover_padding,
        canvas.height - bg_cover_padding - bg_cover_padding
    );

    // Avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(
        bg_cover_padding + avatar_padding + avatar_size / 2,
        canvas.height / 2,
        avatar_size / 2,
        0,
        Math.PI * 2,
        false
    );
    ctx.clip();
    const avatar_image = await loadImage(
        `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}.png`
    );
    ctx.drawImage(
        avatar_image,
        bg_cover_padding + avatar_padding,
        canvas.height / 2 - avatar_size / 2,
        avatar_size,
        avatar_size
    );
    ctx.restore();

    // Welcome
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";

    ctx.font = "90px ubuntu";
    ctx.fillText("Welcome!", text_x_pos_left, (canvas.height / 4) * 1);

    // User tag
    ctx.font = "100px ubuntuBold";
    ctx.fillText(
        member.user.tag.slice(0, 20),
        text_x_pos_left,
        (canvas.height / 4) * 2
    );

    // Member Count
    ctx.font = "60px ubuntu";
    ctx.fillText(
        `${member.guild.memberCount}th member`,
        text_x_pos_left,
        (canvas.height / 4) * 3
    );

    const attachment = new AttachmentBuilder(canvas.toBuffer(), {
        name: "canvas.png",
    });

    const embed = new EmbedBuilder()
        .setImage("attachment://canvas.png")
        .setColor(0xffb400);

    client.channels.cache.get(welcome_channel_ID).send({
        content: newMessage,
        embeds: [embed],
        files: [attachment],
    });
});

client.on("guildMemberRemove", () => {
    let counter = client.guilds.cache.get("493128205952221204").memberCount;
    client.channels.cache.get("1016072558019354744").setName("Members: " + counter);
});

// client.on("message", message => {
//     const PREFIX = "<";
//     const MODCHANNEL = "kernel";

//     if (!message.content.startsWith(PREFIX) && !message.author.bot) {
//         if (message.channel.name == MODCHANNEL) {
//             message.delete();
//             return;
//         } else {
//             return;
//         }
//     }
//     if (message.author.bot) return;

//     let args = message.content.slice(PREFIX.length).split(/ +/);
//     const commandName = args.shift().toLowerCase();

//     try {
//         var command = client.commands.get(commandName);
//         if (command.modOnly) {
//             if (message.channel.name == MODCHANNEL) {
//                 command.execute(message, args, PREFIX, client.commands, client);
//             }
//         } else {
//             command.execute(message, args, PREFIX, client.commands, client);
//         }
//     } catch (error) {
//         console.log(error)
//         if (command != undefined && command.usage) {
//             message.channel.send(PREFIX + commandName + " " + command.usage);
//         }
//     }
// });
client.login(process.env.KERNEL_TOKEN);