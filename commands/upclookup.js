module.exports = {
	name: 'upclookup',
	description: "Another API handling test.",
	async execute(socket, args, io) {
		if(args[0] === undefined){return socket.emit('output','please input a barcode!')}
    var barcode = args[0]
    const fetch = require('node-fetch');
	const read = await fetch(`https://api.upcitemdb.com/prod/trial/lookup?upc=${barcode}`).then(response => response.json()).catch(error => {return message.channel.send(`There was a problem! Are you sure your upc code was entered correctly? If so, I'm afraid I can't find it. I'm sorry ${message.author} `)})
    if (read.items[0] === undefined){return socket.emit('output',"Item not found, sorry!")}

    if (read.items[0].offers !== undefined){
    var price = read.items[0].offers[0].price}
    if (price === null){var readprice = "`price not found`"}


    else {var readprice = price}

		socket.emit('output',`<p>Your upc was ${barcode}!</p>
<p>The corresponding item is ${read.items[0].title}!</p>
<p>It can be bought at ${read.items[0].offers[0].merchant} for ${readprice}!</p>
<p><img src="${read.items[0].images[0]}" height=auto max-width=100% alt="" /></p>`)










        }}
