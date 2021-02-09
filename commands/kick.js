module.exports = {
    name: "kick",
    description: "Kickea a un usuario del servidor",
    usage: "[user]",
    async execute(message, args){
        if (!message.guild.me.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('No tengo permisos para kickear personas')
        }

        if (!message.member.permissions.has('KICK_MEMBERS')) {
            return message.channel.send('Perdon, pero no tienes el permiso para kickear personas')
        }

        let persona = message.mentions.members.first() || message.guild.members.resolve(args[0])

        if (!persona) {
            return message.channel.send('Debe mencionar a alguien para kickear')
        } else if(!persona.kickable){
            return message.channel.send('No puedo kickear a esta persona')
        }else if (persona.roles.highest.comparePositionTo(message.member.roles.highest) > 0) {
            return message.channel.send('Esta persona esta en la misma o mayor nivel de jerarquia que tu, no puedes kikcearlo')
        }

        var razon = args.slice(1).join(' ')
        if (!razon) {
            razon = 'Razon no especificada'
        }

        razon += `, Baneado por ${message.author.tag}`

        persona.kick(razon)
            .catch(e => message.reply('Ocurrio un **error** desconocido'))
            .then(() => {
              message.channel.send(`Listo, kicke a **${persona.user.tag}**`)
        })
    },
}