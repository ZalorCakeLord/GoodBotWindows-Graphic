module.exports = {
 name: 'fs',
 description:'Experimental full function file explorer',
 async execute(socket, args, io){
   const fileexplorer = require('./data/fileexplorer.js');

   socket.emit('output','<iframe src="http://localhost:4141" height="600" width=89% ></iframe>')


 }
}
