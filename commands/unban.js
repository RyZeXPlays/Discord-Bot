module.exports = {
    name: "unban",
    description: "Desbanea a una persona que fue baneada por ID",
    usage: "[user]",
    args: true,
    async execute(message, args){
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            return message.channel.send('No tengo permisos para desbanear personas')
        }
          
        if (!message.member.permissions.has('BAN_MEMBERS')) {
            return message.reply('Perdon, pero no tienes el permiso para desbanear personas')
        }
          
        let userID = args[0];
        message.guild.fetchBans().then(bans=> { //Hacemos fetch a los Bans
        if(bans.size == 0) return message.reply("No hay baneos") 
        let bUser = bans.find(b => b.user.id == userID)
        if(!bUser) return message.reply("No existe el usuario")
        message.guild.members.unban(bUser.user)
        message.channel.send("Usuario desbaneado");
    })
    },
}