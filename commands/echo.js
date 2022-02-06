module.exports = {
 name: 'echo',
 description:'first command, echos given text',
 usage:'{input}',
 execute(socket, args, io){
   console.log('echoing!'+args.join(' '))
   socket.emit('output', args.join(' '));

}}
