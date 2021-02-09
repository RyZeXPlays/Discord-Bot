const Discord = require('discord.js');
const { prefix } = require('../config.json');
module.exports = {
    name: "help",
    description: "Lista de todos mis comandos",
    usage: "[command name]",
    aliases: ['commands', 'info'],
    cooldown: 15,
    async execute(message, args){
        const data = [];
        const { commands } = message.client;

        if (!args.length){
            data.push(commands.map(command => command.name).join(', '));

            const embed = new Discord.MessageEmbed() 
            .setTitle(':book:  Command | Help')
            .setThumbnail(message.author.avatarURL())
            .setAuthor(message.author.username, message.author.avatarURL())
            .setTimestamp()
            .setDescription(`Aquí una lista de todos mis comandos:\n\n\`${data}\`\n\nPuedes mandar \`${prefix}help [command name]\` para tener informacion sobre un comando en específico!`)
            .setColor("PURPLE")

        message.channel.send(embed);
        }

        const name = args.shift().toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
	        return message.reply('Ese no es un comando válido!');
        }

        data.push(`**Nombre:** ${command.name}`);

        if (command.aliases) data.push(`\n**Alias:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`\n**Descripción:** ${command.description}`);
        if (command.usage) data.push(`\n**Uso:** ${prefix}${command.name} ${command.usage}`);

        data.push(`\n**Cooldown:** ${command.cooldown || 3} segundos`);

        let a = data.join('  ');

        const embeda = new Discord.MessageEmbed() 
        .setTitle(':book:  Command | Help')
        .setThumbnail(message.author.avatarURL())
        .setAuthor(message.author.username, message.author.avatarURL())
        .setTimestamp()
        .setDescription(`${a}`)
        .setColor("PURPLE")

    message.channel.send(embeda);
    }
}