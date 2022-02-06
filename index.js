const fs = require('fs');
var express = require('express');
var app = express();
const fetch = require('node-fetch');
var server = require('http').createServer(app);
const fileexplorer = require('./data/fileexplorer.js');
//command handling



const Discord = require('discord.js');
commands = new Discord.Collection();
cmdlist = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
  commands.set(command.name, command);
	cmdlist.push(command.name);
}

//check if valid command
function cmdIsValid(cmd){
  for(let i=0;i<cmdlist.length;i++){
    if(cmd === cmdlist[i]){return true}
  }
  return(false)
}

function refreshCommands(){
	commands = new Discord.Collection();
	oldcmds = cmdlist
	cmdlist = []
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);

		// set a new item in the Collection
		// with the key as the command name and the value as the exported module
	  commands.set(command.name, command);
		cmdlist.push(command.name);
	}
	let output = []
	let newcmds = []
	for(let i=0;i<cmdlist.length;i++){
		output.push(`<li>${cmdlist[i]}</li>\n`)
		if(!oldcmds.includes(cmdlist[i])){
			let command = commands.get(cmdlist[i])
			let desc = ''
			desc +=`<li><h3>${cmdlist[i]}</h3>\n`
			if (command.aliases) desc+=(`<b>Aliases:</b> ${command.aliases.join(', ')}.\n`);
			if (command.description) desc+=(`<b>Description:</b> ${command.description}\n`);
			if (command.usage) desc+=(`<b>Usage:</b> ${prefix}${command.name} ${command.usage}\n`);
			desc+=`</li>\n`
			newcmds.push(desc)
		}
	}
	return(`<h2>Updated command list:</h2>\n<ul>${output.join('')}</ul>\n
	<h2>New Commands:</h2>\n<ul>${newcmds.join('')}</ul>`)
}

function listCommands(){
	let output = []

	for(let i=0;i<cmdlist.length;i++){
		let command = commands.get(cmdlist[i])
		let desc = ''
		desc +=`<li><b>${cmdlist[i]}</b>\n`
		if (command.aliases) desc+=(`<p><b>Aliases:</b> ${command.aliases.join(', ')}.\n</p>`);
		if (command.description) desc+=(`<p><b>Description:</b> ${command.description}\n</p>`);
		if (command.usage) desc+=(`<p><b>Usage:</b> ${command.name} ${command.usage}\n</p>`);
		desc+=`</li>\n`
		output.push(desc)
	}
	return(`<h2>Command list:</h2>\n<ul>${output.join('')}</ul>`)
}


dir = 'c:/users/'
var	spawn = require('child_process').spawn,
  events = require('events'),
  util = require('util');
app.get('/',function(req, res) {
 res.sendFile(__dirname + '/client/index.html');
});
app.use('/client',express.static(__dirname + '/client'));
var io = require('socket.io')(server);

io.sockets.on('connection', function(socket){
        var socketId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
        console.log(commands)



        console.log('new user!');
        socket.on('start',function(){
            console.log('start')

        });
        socket.on('cmd',function(input){
            let list = input.split(' ')
            let commandName = list[0].toLowerCase()
						if(commandName === 'refresh'){socket.emit('output',refreshCommands())}
						if(commandName === 'list'){socket.emit('output',listCommands())}
            list.shift(); let args = list
            console.log(`commandName:${commandName}\nargs:${args}\nIs a valid command? ${cmdIsValid(commandName)}`)
            if(cmdIsValid(commandName)&&commandName!=='refresh'&&commandName!=='list'){
            const command = commands.get(commandName)
              || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

              try {
              	command.execute(socket, args, io);
              } catch (error) {
              	console.error(error);
              	console.log('there was an error trying to execute that command!');
              }
            }
            if(commandName === 'debug'){socket.emit('output',args.join(' '))}


        });

        socket.on('recieved',function(x){
            console.log(`reciept of ${x} confirmed`)

        });





        socket.on('disconnect',function(){
            console.log(`user disconnected`)


 });

});

server.listen(4142)
console.log('SERVER OPEN PORT 4142')
