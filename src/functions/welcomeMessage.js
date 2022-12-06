const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
    name: "welcomeMessage",
    async execute(member, client) {    
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
    
        const bg_image = await loadImage("./img/welcome_bg.png");
    
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
        const avatar_image = await loadImage(member.user.displayAvatarURL({ extension: 'png' }));

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
    }
}