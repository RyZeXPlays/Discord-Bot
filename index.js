const Discord = require('discord.js');
const client = new Discord.Client();
const config = require("./config.json");

const dadosImage = ["https://cdn.discordapp.com/attachments/684757256658747451/794277079243685888/dado-1.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277107537805332/dado-2.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277142800105483/dado-3.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277176592826368/dado-4.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277207619010590/dado-5.png", "https://cdn.discordapp.com/attachments/684757256658747451/794277245157113866/dado-6.png"]

let prefix = config.prefix;

function numero_al_azar(minimo,maximo){
    return Math.floor(Math.random() * (maximo - minimo + 1) + minimo); 
}

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


client.on('message', (message) => {
    //Evitar la respuestas entre bots
    if (!message.content.startsWith(prefix)) return; 
    if (message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/g);
    const command = args.shift().toLowerCase();

    //Roles
    let rol = message.guild.roles.cache.find(r => r.name === "BotDeveloper");
    let permiso = message.member.hasPermission("ADMINISTRATOR");
    //Rol admin en el server Ghouls
    let rolAdmin = message.guild.roles.cache.find(r => r.name === "Admin")

    if (command === "informe"){
        if (rol || permiso || rolAdmin){
            message.channel.send(`Acá laburando para levantar el pais en ${client.guilds.cache.size} servers, con ${client.users.cache.size} usuarios`);
        }
    }

    //Eliminacion masiva de mensajes
    if (command === "purge"){
        if (rol || permiso || rolAdmin){
            let cantidad = parseInt(args[0]);
            message.channel.bulkDelete(cantidad);
            if (!cantidad){message.channel.send("No ingresó la cantidad")}
        }
    }

    //Comprobar respuesta y tiempo de respuesta del bot
    if(command === "ping"){
        let ping = Math.floor(message.client.ws.ping);
        message.channel.send('Pong :ping_pong:, ' + ping + 'ms');
    }

    //Contador
    if (command === "contador"){
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
    if (command === "help"){
        const embedDatos = new Discord.MessageEmbed() 
              .setTitle("Ayuda")
              .setColor("RANDOM")
              .setFooter("Cualquier duda o problema contactarse con RyZe", client.user.avatarURL())
              .setThumbnail(message.author.displayAvatarURL())
              .setTimestamp()
              .setDescription("Agregue el prefijo `/` antes de cualquier comando")
              .addField("Comandos", "`contador 'tiempo':` iniciar contador en milisegundos.\n`equivalencias:` lista de equivalencias y formula de milisegundos a minutos.\n`8ball: 'Pregunta':` Haga una pregunta y el bot respondera.\n`random:` genera un numero aleatorio comprendido entre 0 y 100.\n`say 'Texto'`: manda un mensaje utilizando al bot como emisor de este.\n`dice:` Tira un dado de 6 caras")
    
        message.channel.send({ embed: embedDatos });
    }

    //Lista de Milisegundos a Minutos
    if (command === "equivalencias"){
        const embedDatos = new Discord.MessageEmbed() 
              .setTitle("Tabla de equivalencias")
              .setColor("RANDOM")
              .setFooter("Cualquier duda o problema contactarse con RyZe", client.user.avatarURL())
              .setThumbnail(message.author.displayAvatarURL())
              .setTimestamp()
              .addField("Equivalencias", "1 minuto = 60000\n10 minutos = 600000\n30 minutos = 1800000\n45 minutos = 2700000\n60 minutos = 3600000\n3 horas = 10800000\nCulaquier otro minuto hagan, X * 60000")
    
        message.channel.send({ embed: embedDatos });
    }
    
    //Comando 8ball
    if (command === "8ball"){
        var rpts = ["Si­", "No", "Tal Vez", "Nunca", "No lo se", "Muy poco probable", "Ambos sabemos que no", "100.000% seguro que si", "Te diría que no pero la verdad es que si"]; // Las Respuestas
        let question = message.content;

        let pregunt = question.slice(6); //Si falta la pregunta
        if(!pregunt) return message.channel.send(':x: | Falta la pregunta.');
            
        const embed = new Discord.MessageEmbed() //Creamos el embed
            .setTitle(':8ball: Command | 8Ball')
            .setThumbnail(message.author.avatarURL)
            .addField('Su Pregunta:', pregunt)
            .addField('Mi respuesta es:', rpts[Math.floor(Math.random() * rpts.length)])
            .setColor("RANDOM")

        message.channel.send(embed);
    }

    //Numero aleatorio
    if (command === "random"){
        let randomN = numero_al_azar(0,100);
        message.channel.send(`El numero es ${randomN}`);
    }

    //Say
    if (command === "say"){
        let msg = message.content.slice(5)
        message.channel.send(msg);
        message.delete();
    }

    //Tirar dados
    if (command === "dice"){
        var dado = dadosImage[Math.floor(Math.random() * dadosImage.length)]
        const embedDice = new Discord.MessageEmbed()
        .setTitle(`${message.author.username} ha tirado el dado.`)
        .setDescription("El dado a caido en:")
        .setImage(dado)
        .setColor("RANDOM")
        message.channel.send(embedDice);
    }
});

client.login(config.token);










    
/* Ejemplo de collector

        const filter = m => m.content === 'yes' || m.content === 'no' && m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });
        
        collector.on('collect', m => {
            if (m.content === 'yes'){
                Asnwered = true;
        
        collector.on('end', collected => {
            if (Asnwered == true){
                return;
            }
            else{message.reply("Se acabó el tiempo")}
        });
    }*/