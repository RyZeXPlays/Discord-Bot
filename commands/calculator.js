const math = require("math-expression-evaluator");
module.exports = {
    name: "calculator",
    aliases: ["calc", "math"],
    description: "Realiza una operación matematica",
    cooldown: 0.1,
    usage: "[number] [operation] [number],etc",
    async execute(message, args){
        if (!args[0]){
            message.reply("Porfavor ingrese una expresión valida.");
            message.channel.send(`El uso adecuado sería: \`${prefix}${command.name} ${command.usage}\``);
            return;
        }
        let resultado = await math.eval(args.join(' '));
        message.channel.send(resultado);
    },
}