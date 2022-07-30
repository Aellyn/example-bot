module.exports = {
    name: 'ping',
    description: 'Check the bot\'s ping',
    execute: async (message, args) => {
        
        message.reply(client.ws.ping + 'ms')
        
    }}