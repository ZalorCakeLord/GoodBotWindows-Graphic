module.exports = {
 name: 'echo',
 description:'first command, echos given text',
 execute(socket, args, io){
   console.log('echoing!'+args.join(' '))
   socket.emit('output', args.join(' '));

}}
