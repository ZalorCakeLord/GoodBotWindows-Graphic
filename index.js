const fs = require('fs');
var express = require('express');
var app = express();
const fetch = require('node-fetch');
var server = require('http').createServer(app);

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
	cmdlist.push(command);
}

//check if valid command
function cmdIsValid(cmd){
  for(let i=0;i<cmdlist.length;i++){
    if(cmd === cmdlist[i].name){return true}
  }
  return(false)
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
            list.shift(); let args = list
            console.log(`commandName:${commandName}\nargs:${args}\nIs a valid command? ${cmdIsValid(commandName)}`)
            if(cmdIsValid(commandName)){
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
