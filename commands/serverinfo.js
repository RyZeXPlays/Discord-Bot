const Discord = require('discord.js');
module.exports = {
    name: "serverinfo",
    description: "Muestra la informacion del servidor en el que se ejecuto el comando",
    cooldown: 20,
    async execute(message, args){
        var server = message.guild; 
        let guild = message.guild;
          region = {
            europe: "Europa :flag_eu:",
            brazil: "Brasil :flag_br: ",
            hongkong: "Hong Kong :flag_hk:",
            japan: "Japón :flag_jp:",
            russia: "Rusia :flag_ru:",
            singapore: "Singapur :flag_sg:",
            southafrica: "Sudáfrica :flag_za:",
            sydney: "Sydney :flag_au:",
            "us-central": "Central US :flag_us:",
            "us-east": "Este US :flag_us:",
            "us-south": "Sur US :flag_us:",
            "us-west": "Oeste US :flag_us:",
            "vip-us-east": "VIP US Este :flag_us:",
            "eu-central": "Europa Central :flag_eu:",
            "eu-west": "Europa Oeste :flag_eu:",
            london: "London :flag_gb:",
            amsterdam: "Amsterdam :flag_nl:",
            india: "India :flag_in:"
          };
        const embed = new Discord.MessageEmbed()
          .setThumbnail(guild.iconURL())
          .setTimestamp()
          .setAuthor(server.name, guild.iconURL())
          .setDescription(
            `_Servidor creado el_ **_${
              guild.createdAt.toDateString().split(" ")[2]
            }/${guild.createdAt.toDateString().split(" ")[1]}/${
              guild.createdAt.toDateString().split(" ")[3]
            }_**`
          )
          .addField(
            "_Dueño del Servidor_",
            "**" +
              server.owner.user.username +
              "#" +
              server.owner.user.discriminator +
              "**",
            true
          )
          .addField("_ID_:", "**" + server.id + "**")
          .addField(`_Region_:`, `**${region[guild.region]}**`, true)
          .addField("_Miembros_", "**" + server.memberCount + "**", true)
          .addField("_Roles_:", "**" + server.roles.cache.size + "**", true)
          .addField(
            `_Nivel de verificación_:`,
            `**${server.verificationLevel}**`,
            true
          )
          .setFooter(`Información del servidor ${server}`)
          .setColor("PURPLE");
          
    
        message.channel.send({ embed });
    },
}