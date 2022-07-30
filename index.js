const fs = require('fs');
const { prefix , TOKEN } = require('./config');

// Global Variables
global.Discord = require('azrael-djs')
// Create the client and request required intents
global.client = new Discord.Client({
            intents: ["GUILDS", "GUILD_MESSAGES", "MESSAGE_CONTENT"]
        })
global.ms = require('ms')
global.chalk = require('chalk')

fs.readdir("./events/", (err, files) => {
    if (err) return console.log(err);
    files.forEach(file => {
        require(`./events/${file}`);
    });
});

//Making the bot able to go to commands folder
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("ready", function () {
    console.log('################################');
    console.log(`Logged in as ${client.user.tag}`);
    console.log('################################');
})


client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
})


//Bot starting
client.login(TOKEN)