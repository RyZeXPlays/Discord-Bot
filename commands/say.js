module.exports = {
    name: "say",
    description: "Dile al bot que hable",
    usage: "[text]",
    async execute(message,args){
        if (!args) return message.channel.send("No puedo mandar un mensaje vacio");
        let msg = args.join(' ');
        message.delete();
        message.channel.send(msg);
    },
}