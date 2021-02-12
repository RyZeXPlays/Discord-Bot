const Discord = require('discord.js');
const ms = require('ms');
module.exports = {
    name: "mute",
    description: "Mutea a un miembro mencionandolo por X tiempo",
    usage: "[user] [time]",
    cooldown: 0.1,
    async execute(message, args){
        if (!message.member.permissions.has('BAN_MEMBERS') || !message.member.permissions.has('KICK_MEMBERS')) {
            return message.reply('Perdon, pero no tienes el permiso para mutear personas personas')
        }

        let muteRole = message.guild.roles.cache.get('808754972514582549');
        let channel = message.guild.channels.resolve('808529006176895020');
    
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) 
          return message.reply('Porfavor mencione el usuario a mutear');
        if (member === message.member)
          return message.reply('No puedes mutearte a ti mismo');
        if (member === message.guild.me) return message.channel.send('No puedes mutearme a mi');
        if (member.roles.highest.position >= message.member.roles.highest.position)
          return message.channel.send('No puedes mutear a alguien que este en el mismo o mayor nivel de jerarquia que tu');
        if (!args[1])
          return message.reply('Ingrese un período de tiempo de 14 días o menos (1s/m/h/d)');
        let time = ms(args[1]);
        if (!time || time > 1209600000) // Maximo de 14 dias
          return message.reply('Ingrese un período de tiempo de 14 días o menos (1s/m/h/d)');
    
        let reason = args.slice(2).join(' ');
        if (!reason) reason = '`Razon no proveida`';
        if (reason.length > 1024) reason = reason.slice(0, 1021) + '...';
    
        if (member.roles.cache.has(muteRole))
          return message.channel.send('El miembro proveido ya esta muteado');
    
        // Mute member
        try {
          await member.roles.add(muteRole);
        } catch (err) {
          console.log(err)
          return message.channel.send('Please check the role hierarchy', err.message);
        }
        const muteEmbed = new Discord.MessageEmbed()
          .setTitle('Miembro muteado')
          .setDescription(`${member} fue muteado por **${ms(time, { long: true })}**.`)
          .addField('Moderador: ', message.member, true)
          .addField('Miembro: ', member, true)
          .addField('Tiempo: ', `\`${ms(time)}\``, true)
          .addField('Razón ', reason)
          .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor("PURPLE");
        channel.send(muteEmbed);
    
        // Unmute member
        member.timeout = message.client.setTimeout(async () => {
          try {
            await member.roles.remove(muteRole);
            const unmuteEmbed = new Discord.MessageEmbed()
              .setTitle('Miembro desmuteado')
              .setDescription(`${member} fue desmuteado.`)
              .setTimestamp()
              .setColor("PURPLE");
            channel.send(unmuteEmbed);
          } catch (err) {
            console.log(err)
            return message.channel.send('Please check the role hierarchy', err.message);
          }
        }, time);
    },
}