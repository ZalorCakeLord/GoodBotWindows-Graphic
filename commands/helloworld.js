module.exports = {
 name: 'helloworld',
 description:'helloworld',
 execute(socket, args, io){
   socket.emit('output', 'HELLO WORLD!');

}}
