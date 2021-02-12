module.exports = {
    name: "random",
    description: "Numero random comprendido entre 1 y 100",
    async execute(message, args){
        if(args[0]) return;
        let randomN = Math.floor(Math.random() * (1 - 100 + 1) + 100);;
        message.channel.send(`El numero es ${randomN}`);
    },
}