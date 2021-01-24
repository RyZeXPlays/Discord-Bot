const Discord = require('discord.js');
const BombSweeper = require("bombsweeper.js");
const client = new Discord.Client();


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
              .addField("Comandos", "/contador ´tiempo´: iniciar contador en milisegundos.\n/equivalencias: lista de equivalencias y formula de milisegundos a minutos.\n/8ball ´Pregunta´: Haga una pregunta y el bot respondera.\n/random: genera un numero aleatorio comprendido entre 0 y 100.\n/say ´Texto´: manda un mensaje utilizando al bot como emisor de este.")
    
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
    
    //Comando 8ball
    if (message.content.startsWith("/8ball")){
        var rpts = ["Si­", "No", "Tal Vez", "Nunca", "No lo se", "Muy poco probable", "Ambos sabemos que no", "100.000% seguro que si", "Te diría que no pero la verdad es que si"]; // Las Respuestas
        let question = message.content;

        let pregunt = question.slice(6); //Si falta la pregunta
        if(!pregunt) return message.channel.send(':x: | Falta la pregunta.');
            
        const embed = new Discord.MessageEmbed() //Creamos el embed
            .setTitle(':8ball: Command | 8Ball')
            .setThumbnail(message.author.avatarURL)
            .addField('Su Pregunta:', pregunt)
            .addField('Mi respuesta es:', rpts[Math.floor(Math.random() * rpts.length)])

        message.channel.send(embed);
    }

    if (message.content === "/random"){
        let randomN = numero_al_azar(0,100);
        message.channel.send(`El numero es ${randomN}`);
    }

    if (message.content.startsWith("/say ")){
        let msg = message.content.slice(5)
        message.channel.send(msg);
        message.delete();
    }

    
/*if (message.content === "/play Buscaminas" || message.content === "/play buscaminas"){
        Asnwered = false;
        AsnweredDificult = false;
        
        message.channel.send("Estas listo? Responde con `yes` o `no`")
        const filter = m => m.content === 'yes' || m.content === 'no' && m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector(filter, { time: 15000 });
        
        collector.on('collect', m => {
            if (m.content === 'yes'){
                Asnwered = true;
                
                message.channel.send("Elige la dificultad: `facil`, `medio`, `dificil`")
                const filter = i => i.content === 'facil' || i.content === 'medio' || i.content === 'dificil' && i.author.id === message.author.id;
                const collector = message.channel.createMessageCollector(filter, { time: 15000 }); 
                
                collector.on('collect', i =>{
                    if (i.content === 'facil'){
                        //Tablero
                        let filas = 10;
                        let cols = 10;
                        const bombsweeper = new BombSweeper(filas, cols);
                        //Bombas
                        let bombas = 10;
                        bombsweeper.PlaceBombs(bombas);
                        
                        let tablero = bombsweeper.board;
                    
                        for (let j = 0; j<10; j++){
                            for (let i = 0; i<10; i++){
                                tablero[i][j] = emojis[tablero[i][j]];
                            }
                        }
                        //Juego listo
                        bombsweeper.start();
                    }
                    else if (i.content === 'medio'){
                        //Tablero
                        let filas = 14;
                        let cols = 18;
                        const bombsweeper = new BombSweeper(filas, cols);
                        //Bombas
                        let bombas = 40;
                        bombsweeper.PlaceBombs(bombas);

                        let tablero = bombsweeper.board;
                    
                        for (let j = 0; j<10; j++){
                            for (let i = 0; i<10; i++){
                                tablero[i][j] = emojis[tablero[i][j]];
                            }
                        }
                        //Juego listo
                        message.channel.send(tablero);
                    }
                    else if (i.content === 'dificil'){
                        //Tablero
                        let filas = 20;
                        let cols = 24;
                        const bombsweeper = new BombSweeper(filas, cols);
                        //Bombas
                        let bombas = 99;
                        bombsweeper.PlaceBombs(bombas);

                        let tablero = bombsweeper.board;
                    
                        for (let j = 0; j<10; j++){
                            for (let i = 0; i<10; i++){
                                tablero[i][j] = emojis[tablero[i][j]];
                            }
                        }
                        //Juego listo
                        message.channel.send(tablero);
                    }
                    AsnweredDificult = true;
                });

                collector.on('end', collected =>{
                   if (AsnweredDificult == true){
                       return;
                   }
                   else(message.reply("Se acabó el tiempo"))
                })
            }
            else if (m.content === 'no'){
                Asnwered = true;
                message.reply("Se cancelo el juego");
            }
        });
        
        collector.on('end', collected => {
            if (Asnwered == true){
                return;
            }
            else{message.reply("Se acabó el tiempo")}
        });
    }*/
}); 

client.login('NzkzMzMyMjk5NjUwMzAxOTYz.X-quRw.FjjIpt4ClmEiTuuh3lXRveX5KT4');