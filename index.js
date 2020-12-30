const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
     console.log(`Bot is ready as ${client.user.tag}, conectado en ${client.guilds.cache.size} servidores, con ${client.users.cache.size} usuarios en total`);
     client.user.setPresence( {
        activity: {
            name: `/help | Estoy en ${client.guilds.cache.size} servidores, genial no?.`,
            type: "WATCHING"
        },
        status: "online"
     });
});

client.on('message', message => {

    //Receiving the message
    if (message.content === '/ping'){
        let ping = Math.floor(message.client.ws.ping);
        message.channel.send('Pong, ' + ping + 'ms');
    }

    if (message.content === '/hola'){
        message.channel.send(`Hola ${message.author}`);
    }

    if (message.content === '/informe'){
            message.channel.send(`Acá laburando para levantar el pais en ${client.guilds.cache.size} servers, con ${client.users.cache.size} usuarios`);
    }   

    //Contador
    if (message.content.startsWith('/contador')){
        //Tomamos el los caracteres despues del comando y el espacio
        timeToWait = message.content.slice(10);
        //Comprobamos con isNan si no es un numero
        if (isNaN(timeToWait) == true){
            message.reply('Porfavor introduzca solo numeros luego del comando');
        }
        else{
            setTimeout(contador,timeToWait);
            message.channel.send('Contador iniciado');
        }
    }

    function contador() {
        message.reply('Ya puedes tirar de la ruleta'); 
    }
     
    //Comando ayuda
    if (message.content === '/help'){
        const embedDatos = new Discord.MessageEmbed() 
              .setTitle("Ayuda")
              .setColor(0x00AE86)
              .setFooter("Cualquier duda o problema contactarse con RyZe", client.user.avatarURL())
              .setThumbnail(message.author.displayAvatarURL())
              .setTimestamp()
              .addField("Comandos", "/contador* tiempo * : ,iniciar contador en minutos\n/equivalencias: lista de equivalencias y formula de milisegundos a minutos")
    
        message.channel.send({ embed: embedDatos });
    }

    //Lista de Milisegundos a Minutos
    if (message.content === '/equivalencias'){
        const embedDatos = new Discord.MessageEmbed() 
              .setTitle("Tabla de equivalencias")
              .setColor(0x00AE86)
              .setFooter("Cualquier duda o problema contactarse con RyZe", client.user.avatarURL())
              .setThumbnail(message.author.displayAvatarURL())
              .setTimestamp()
              .addField("Equivalencias", "1 minuto = 60000\n10 minutos = 600000\n30 minutos = 1800000\n45 minutos = 2700000\n60 minutos = 3600000\n3 horas = 10800000\nCulaquier otro minuto hagan, X * 60000")
    
        message.channel.send({ embed: embedDatos });
    }
});

client.login('NzkzMzMyMjk5NjUwMzAxOTYz.X-quRw.FjjIpt4ClmEiTuuh3lXRveX5KT4');
