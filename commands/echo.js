module.exports = {
 name: 'echo',
 description:'first command, echos given text',
 usage:'{input}',
 execute(socket, args, io){
   socket.emit('output', args.join(' '));

}}
