const Discord = require('discord.js');
module.exports = {
    name: "userinfo",
    description: "Muestra informacion del usuario mencionado",
    cooldown: 15,
    async execute(message, args){
        let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member; 

        let status; 
        switch (user.presence.status) {//Presencia
            case "online":
                status = ":green_circle:  En linea";
                break;
            case "dnd":
                status = "⛔ No molestar";
                break;
            case "idle":
                status = "🌙 Ausente";
                break;
            case "offline":
                status = "⚪ Desconectado";
                break;
        }

        const embed = new Discord.MessageEmbed() 
            .setTitle(`Informacion del usuario ${user.user.username}`)
            .setColor(`PURPLE`)
            .setThumbnail(user.user.displayAvatarURL({dynamic : true}))
            .addFields(
                {
                    name: "Apodo: ",
                    value: message.member.nickname ? message.member.nickname : "No tiene apodo", 
                    inline: true 
                },
                {
                    name: "#️⃣ Tag: ",
                    value: `#${user.user.discriminator}`,
                    inline: true
                },
                {
                    name: "🆔 ID: ",
                    value: user.user.id,
                },
                {
                    name: "Reciente Actividad: ",
                    value: status,
                    inline: true
                },
                {
                    name: "Estado: ",
                    value: user.presence.activities[0] ? user.presence.activities[0].state : "Sin estado",
                    inline: true
                },
                {
                    name: 'Avatar link: ',
                    value: `[Pinche Aquí](${user.user.displayAvatarURL()})`,// Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
                },
                {
                    name: 'Fecha de creación: ',
                    value: user.user.createdAt.toLocaleDateString("es-pe"),// Del "user" obtenemos su Fecha de creacion y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
                    inline: true
                },
                {
                    name: 'Fecha de entrada al Servidor: ',
                    value: user.joinedAt.toLocaleDateString("es-pe"),
                    inline: true
                },
                {
                    name: 'Roles del usuario: ',
                    value: user.roles.cache.map(role => role.toString()).join(" "),
                    inline: true
                }
            )

        await message.channel.send(embed);
    },
}