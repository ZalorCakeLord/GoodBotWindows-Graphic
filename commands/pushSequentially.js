module.exports = {
	name: 'pushSequentially',
	description: "adds a number to an array",
	execute(socket, args, io) {
    return socket.emit('output','INCOMPLETE')
    function sortPush(array,x){

      let output=[]
      if(isNaN(x)||x==undefined){return array}
      if(x<=array[0]){output=array;output.unshift(x)}
      for(let i=1;i<array.length;i++){
        let spot = 0
        if(x>array[i]){spot=i}
      }
    }


  }
}
