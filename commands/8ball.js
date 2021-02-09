const Discord = require('discord.js');
module.exports = {
    name: "8ball",
    description: "Bola mágica que responde tu pregunta",
    colldown: 0.1,
    usage: "[question]",
    async execute(message, args){
        if (!args){
            message.channel.send(":x: | Falta la pregunta.");
            return;
        }
        
        var rpts = ["Si­", "No", "Tal Vez", "Nunca", "No lo se", "Muy poco probable", "Ambos sabemos que no", "100.000% seguro que si", "Te diría que no pero la verdad es que si"]; // Las Respuestas
        let question = args.join(' ');

        const embed = new Discord.MessageEmbed() 
            .setTitle(':8ball: Command | 8Ball')
            .setThumbnail(message.author.avatarURL())
            .setTimestamp()
            .setDescription(`**Su pregunta es:** \n${question}`)
            .addField("Mi respuesta: ", `${rpts[Math.floor(Math.random() * rpts.length)]}`)
            .setColor("PURPLE")

        message.channel.send(embed);
    },
}