const Discord = require('discord.js');
module.exports = {
    name: "purge",
    description: "Eliminar mensajes de forma masiva (Maximo 100 mensajes)",
    usage: "[quantity]",
    async execute(message, args){
        if(!message.guild.me.permissionsIn(message.channel).has('MANAGE_MESSAGES')){
            return message.channel.send('Perdon, pero no tengo permisos para hacer eso');
          }
          
          if(!message.member.permissionsIn(message.channel).has('MANAGE_MESSAGES')){
            return message.channel.send('Perdon, pero no tienes permisos para hacer esto');
          }
          
          if(!args) return message.channel.send('Escriba la cantidad de mensajes a eliminar');
          let cantidad = parseInt(args[0])
          
          if(!cantidad || isNaN(cantidad)) return message.reply('Introduce un numero por favor'); 
          
          if(cantidad > 100){
            message.channel.send('El maximo de mensajes que puedo borrar es 100, por lo tanto lo establecere automaticamente ahi')
            cantidad = 100
          }

          message.delete();
          message.channel.bulkDelete(cantidad).catch(e => {
            message.channel.send('Ocurrio un error y no pude borrar los mensajes')
          })
    },
}