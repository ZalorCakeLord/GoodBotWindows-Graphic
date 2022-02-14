const fs = require('fs');
var express = require('express');
var app = express();
const fetch = require('node-fetch');
var server = require('http').createServer(app);
let dir = './'
const replitId = process.env.REPL_ID
if(replitId !== undefined){const replit = true}else{const replit = false}
if(replit === true){console.log('running on replit, some commands may not function as intended!')}
function displaydir(){
  let array = fs.readdirSync(dir)
  let max = array.length
  for(let i=0;i<max;i++){
    if(array[i].includes('.mp3')){
      let old = array[i]
      olda = old.replace(/([^'\\]*(?:\\.[^'\\]*)*)'/g, "$1\\'");
      array[i] = `<button style="background-color:##1F85DE;" onclick="setdirect('${olda}')">⏯${old}</button>`
    }
    else if(!array[i].includes('.')){
      let old = array[i]
      olda = old.replace(/([^'\\]*(?:\\.[^'\\]*)*)'/g, "$1\\'");
      array[i] = `<button style="background-color:##1F85DE;" onclick="cddirect('${olda}')">📁${old}</button>`
    }
		else if(array[i].includes('.txt')){
      let old = array[i]
      olda = old.replace(/([^'\\]*(?:\\.[^'\\]*)*)'/g, "$1\\'");
      array[i] = `<button style="background-color:##1F85DE;" onclick="setdirect('${olda}')">📝${old}</button>`
    }

  }



  let aloha = array
  aloha = aloha.join('<br>')
  aloha = `Contents of ${dir}:<br>` + aloha + `<br>End Contents of ${dir}`
  return(aloha)
}


function cd(targ){
  if (fs.existsSync(`${dir}/${targ}`)){
  dir = `${dir}/${targ}`
  cd = targ
  console.log(`Directory is now ${dir}`)
}    else{socket.emit('warn',`${`${dir}/${targ}`} does not exist!`)}
    }

function cdup(){
  dir = dir.substr(0, dir.lastIndexOf('/'));
  console.log(`Directory is now ${dir}`)
}
//compatible file handles check
function isCompatible(file){
	let compatible = ['txt','jpg','png','html']
	let name = file.split('.')
	if(name.length>2){return false}
	return(compatible.includes(name[1]))
}

//command handling my way now, new format, using .gb and the format property
let commands = []
cmdlist = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.gb'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
  if(command.format==="gbweb"){
  commands.push(command);
	cmdlist.push(command.name);
}
}

//check if valid command
function cmdIsValid(cmd){
  for(let i=0;i<cmdlist.length;i++){
    if(cmd === cmdlist[i]){return true}
  }
  return(false)
}

function getCmd(cmd){
  for(let i=0;i<commands.length;i++){
    if(cmd.toLowerCase() === commands[i].name){return i}
  }
  return(false)
}

function refreshCommands(){
	commands = []
	oldcmds = cmdlist
	cmdlist = []
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.gb'));
  for (const file of commandFiles) {
  	const command = require(`./commands/${file}`);
    if(command.format==="gbweb"){
    commands.push(command);
  	cmdlist.push(command.name);
  }
  }
	let output = []
	let newcmds = []
	for(let i=0;i<cmdlist.length;i++){
		output.push(`<li>${cmdlist[i]}</li>\n`)
		if(!oldcmds.includes(cmdlist[i])){
			let command = commands[getCmd(cmdlist[i])]
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
		let command = commands[i]
		let desc = ''
		desc +=`<li><b>${cmdlist[i]}</b>\n`
		if (command.aliases) desc+=(`<p><b>Aliases:</b> ${command.aliases.join(', ')}.\n</p>`);
		if (command.description) desc+=(`<p><b>Description:</b> ${command.description}\n</p>`);
		if (command.usage) desc+=(`<p><b>Usage:</b> ${command.name} ${command.usage}\n</p>`);
    if (replit===true && command.replitCompatible===false) desc+=(`<p style="color:red"><b>THIS COMMAND IS NOT YET COMPATIBLE WITH REPLIT!</b>\n</p>`)
		desc+=`</li>\n`
		output.push(desc)
	}
	return(`<h2>Command list:</h2>\n<ul>${output.join('')}</ul>`)
}

async function doCopy(data){
	await fs.copyFile(`${dir}/${data}`, `./temp/${data}`, (err) => {
if (err) {
	console.log('error in copy: '+err)
	return(false)
}else{
return(true)}
 });
}

function readTxt(file){
	let output = fs.readFileSync(dir+'/'+file).toString()
	output = output.replace(/([^"\\]*(?:\\.[^"\\]*)*)'/g, "$1\\'");
	output = output.replace(/(\r\n|\n|\r)/gm, "<br>");
	output = output.replace(/"/g,"'")
  if(output.includes('"')===true){output = 'Quotation marks in file, output broken. Full output viewable via inspect element.<br>' + output}
	console.log(output)
	return `"${output}"`
}



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
				function dirupdate(){
          socket.emit('dir',[dir,displaydir(dir)])
        }
        //socket handler, index is getting too messy
				socket.onAny((eventName, ...args) => {
					console.log(`SOCKET EVENT: ${eventName}, ${args}`)
					/*const socket = sockets.get(eventName)
						|| socket.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
           //couldn't do this anymore, removing discord.js
						try {
							socket.execute(socket, args, io);
						} catch (error) {
							console.error(error);
							console.log('there was an error trying to execute that command!');
						}*/
        });

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

            if(cmdIsValid(commandName)&&commandName!=='refresh'&&commandName!=='list'){
            let command = commands[getCmd(commandName)]
            if(replit===true&&command.replitCompatible===false){socket.emit('output','<p style="color:red">Sorry, this command is not compatible with Repl.it yet.</p>')}
            else{
              try {
              	command.execute(socket, args, io);
              } catch (error) {
              	console.error(error);
              	console.log('there was an error trying to execute that command!');
              }
            }}
            if(commandName === 'debug'){socket.emit('output',eval(args.join(' ')))}
            if(!cmdIsValid(commandName)&&commandName!=='refresh'&&commandName!=='list'&&commandName!=='debug'){socket.emit('output','Invalid Command!')}


        });










				socket.on('filecmd',function(data){
          let stringform = data
          data = data.toLowerCase().split(' ')
          switch (data[0]) {
            case 'dir':
            socket.emit('dir',[dir,displaydir(dir)])

              break;
            case 'cd':
            if (fs.existsSync(`${dir}/${data[1]}`)){
            dir = `${dir}/${data[1]}`
            dirupdate()
            console.log(`Directory is now ${dir}`)
          }    else{socket.emit('warn',`${`${dir}/${data[1]}`} does not exist!`)}

              break;
            case 'cdtrue':
              if (fs.existsSync(`${data[1]}`)){
              dir = `${data[1]}`
              dirupdate()
            }else(socket.emit('warn','Invalid Directory'))
              break;

            default:
              socket.emit('warn','Invalid Input')
          }


        });
        socket.on('cdup',function(){
            cdup()
            socket.emit('dir',[dir,displaydir(dir)])
        });
        //this baby gettin downright labrynthine
				socket.on('viewfile',function(data){
           console.log('file clicked: ' + data)
					 console.log('is compatible? ' + `${isCompatible(data)}`)
					 if(isCompatible(`${data}`)){
						 let suffix = data.split('.')
						 suffix = suffix[1]
						 if(suffix === 'txt'){
							 let text = readTxt(data)
						 socket.emit('fileview',`<iframe srcdoc=${text} height="600" width=89% ></iframe>`)
					 }
          }
        });

        socket.on('cddirect',function(data){
            if(fs.existsSync(`${dir}/${data}`)){
            dir = `${dir}/${data}`
            dirupdate()}
        });





        socket.on('disconnect',function(){
            console.log(`user disconnected`)


 });

});

server.listen(4142)
console.log('SERVER OPEN PORT 4142')
