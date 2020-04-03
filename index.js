const Discord = require("discord.js");
const client = new Discord.Client();

// Defaults
const config = require("./config.json");
const SETTINGS = {
	'MINUTES': 30,
	'INTERVAL': 1
};
const prefix = "s+";

// Ready! Set! Go!
client.on("ready", () => {
	console.log("I am ready!");
});

// Keeping that ear open
client.on("message", (message) => {

	// Check que to respond
	if(!message.content.startsWith(prefix) || message.author.bot) {
		return;
	} else {
		console.log("@sonmi-450 can hear you!");
	}

	// Okay they're talking to me!
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	switch (command) {
		case "ping" :
			ping(message);
			break;
		case "foo" :
			foo(message);
			break;
		case "say":
			say(message, args);
			break;
		case "spam":
			spam(message, args);
			break;
		default:
			noCommand(message);
	}
});

// Bot Commands

const ping = (message) => {
	return message.channel.send('Pong!');
};

const foo = (message) => {
	return message.channel.send('bar!');
};

const say = (message, args) => {
	const [param] = args;
	if(param && param.toLowerCase() === 'hi') {
		return message.channel.send(`Hi ${message.author.username}!`);
	} else {
		noCommand(message);
		return;
	}
};

const spam = (message, args) => {
	let minutes = args[0] || SETTINGS.MINUTES,
		interval = args[1] || SETTINGS.INTERVAL;

	return message.channel.send(
		`Going to say something for ${minutes} minutes,` +
		`every ${interval} minute, to keep you awake ` +
		`${message.author.username}, mate!`
	);
};

const noCommand = (message) => {
	return message.reply("sorry! I don't understand.");
};

client.login(config.token);
