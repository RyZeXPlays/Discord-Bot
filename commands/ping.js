module.exports = {
	name: 'ping',
    description: 'Ping!',
    cooldown: 5,
	async execute(message, args) {
		let ping = Math.floor(message.client.ws.ping);
        message.channel.send('Pong :ping_pong:, ' + ping + 'ms');
	},
};