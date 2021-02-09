const Discord = require('discord.js');
const client = new Discord.Client();
module.exports = {
    name: "suggest",
    description: "Manda una sugerencia a los administradores o soportes del server",
    usage: "[suggest]",
    cooldown: 60,
    async execute(message, args){
        if (!args[0]) return message.channel.reply("Falta la sugerencia");
        let channel = message.guild.channels.resolve('808538641813995571');
        let sugerencia = args.join(' ');

        const embed = new Discord.MessageEmbed() 
        .setTitle(':envelope_with_arrow: Command | Suggest')
        .setThumbnail(message.author.avatarURL())
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTimestamp()
        .setDescription(`Sugerencia:\n${sugerencia}`)
        .setColor("PURPLE")

    channel.send(embed);
    },
}