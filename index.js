const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

//Filtra los archivos de la carpeta commands como comandos
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();


//Cuando se inicia el cliente
client.on('ready', () => {
    console.log(`Bot is ready as ${client.user.tag}, conectado en ${client.guilds.cache.size} servidores, con ${client.users.cache.size} usuarios utilizandome en total`);
    client.user.setPresence( {
       activity: {
           name: `/help | Estoy en ${client.guilds.cache.size} servidores, genial no?.`,
           type: "WATCHING"
       },
       status: "online"
    });
});

//Bienvenida al servidor
client.on("guildMemberAdd", member => {
    let channel = client.channels.cache.get('808555753921052682');
    channel.send(`Bienvenido ${member.user} al servidor ${member.guild.name}, que la pases bien!`);
});

//Al recibir mensajes
client.on('message', message => {
	if (message.author.bot) return;
    
/*    //Filtro de palabras
    let words = ["hola", "chau"]
    
    let messageContent = message.content.toLowerCase();
    if(words.some(word => messageContent.includes(word))) {
        if (message.author.id === '473855828844216320') return;
        message.delete()
        .then(() => message.channel.send(`${message.author} con esa boquita le hablas a tu mama?`))
        return;
    }*/
    
    //Comienzo de Commands 
    if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
    if (!command) return;

    //Comandos con permisos
    if (command.permissions) {
        const authorPerms = message.channel.permissionsFor(message.author);
        if (!authorPerms || !authorPerms.has(command.permissions)) {
         	return message.reply('No tienes permisos para hacer esto!');
        }
    }

    //Para comandos con argumentos, te dice cual es el uso adecuado
    if (command.args && !args.length) {
        let reply = `No proporcionaste ningún argumento, ${message.author}!`;

		if (command.usage) {
			reply += `\nEl uso adecuado sería: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

    //Cooldown
    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

	    if (now < expirationTime) {
		    const timeLeft = (expirationTime - now) / 1000;
		    return message.reply(`Profavor espere ${timeLeft.toFixed(1)} segundos mas antes de volver a utilizar el comando \`${command.name}\` :stopwatch: `);
	    }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
	    command.execute(message, args);
    } 
    catch (error) {
	    console.error(error);
	    message.reply('Hubo un error ejecutando ese comando');
    }
});

//Log para un canal determinado, cuando eliminan un mensaje
client.on("messageDelete", async message => {
    if (message.author.bot) return;
    if (!message.guild) return;
	const fetchedLogs = await message.guild.fetchAuditLogs({
		limit: 1,
		type: 'MESSAGE_DELETE',
	});

    const deletionLog = fetchedLogs.entries.first();
    const { executor, target } = deletionLog;
    let guild = message.guild;
    let canal = guild.channels.cache.get('808529006176895020'); 

    try{
        if (target.id === message.author.id) {
		    canal.send(`Un mensaje hecho por **${message.author.tag}** con el contenido: \`${message}\` fue eliminado por **${executor.tag}**.`);
	    }else {
		    canal.send(`Un mensaje hecho por **${message.author.tag}** con el contenido: \`${message}\` fue eliminado por mi o por el autor del mensaje`);
	    }
    }catch(e){
        console.log("No existe ese canal");
    }
});

client.login(token);
