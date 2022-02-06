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


//const boblib = require('./functions.js');
module.exports = { displaydir , cd, cdup }
