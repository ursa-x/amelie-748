const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
	console.log("I am ready!");
});

client.on("message", (message) => {
	if (message.content.startsWith("ping")) {
		message.channel.send("pong!");
	}
});

client.login("Njk1MzE0OTY3MjU5NTEyODUy.Xoc2EQ.LvrIHkDtgYSAuN5zDNgdartjYps");
