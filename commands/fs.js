module.exports = {
 name: 'fs',
 description:'Experimental full function file explorer',
 async execute(socket, args, io){


   socket.emit('output','<iframe src="client/fileexplorer.html" height="600" width=89% ></iframe>')


 }
}
