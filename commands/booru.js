module.exports = {
name: 'booru',
 description:'Booru Search. Indev.',
 nsfw:true,
 async execute(socket, args, io){
 const site = args[0]
 args.shift()
 const Booru = require('booru')
 var tags = args
 boorus = ['e6', 'e9', 'hh', 'db', 'kc', 'kn', 'yd', 'gb', 'r34', 'sb', 'tb', 'xb', 'rb', 'pa', 'dp', 'atf']
 console.log(tags)
 if(boorus.includes(site) != true && site != 'list'){return socket.emit('output','You must give the two character code referring to the booru you want to search! Do %booru list to see what boorus are available.')}
 if(site === 'list'){return socket.emit('output',`Here is the list of available site codes! ${boorus}`)}

   Booru.search(site, tags, { limit: 1, random: true })
     .then(posts => {
       for (let post of posts)
       if(post.fileUrl.includes('.mp4')||post.fileUrl.includes('.webm')){ //videos
         let fileType = post.fileUrl.substring(post.fileUrl.length - 5);
         fileType = fileType.substring(fileType.indexOf(".") + 1)
         socket.emit('output',`<iframe srcdoc='<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
h1 {text-align: center;}
p {text-align: center;}
div {text-align: center;}
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial;
  font-size: 17px;
}

#myVideo {
  min-width: 60vw;
  min-height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
}



#myBtn {
  width: 200px;
  font-size: 18px;
  padding: 10px;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

#myBtn:hover {
  background: #ddd;
  color: black;
}
</style>
</head>
<body style="background-color:Black;">
<div video>
<video style="display:block; margin: 0 auto;" autoplay loop id="myVideo">
  <source src="${post.fileUrl}" type="video/${fileType}">
  Your browser does not support HTML5 video.
</video>
<a class="button" href="${post.fileUrl}" download="hentai.png">"\\\/ download \\\/"</a>
</div>
<div class="a"><p style="color:DodgerBlue;"> ${post.tags.join(' ')}</p></div>
<button id="myBtn" style="color:DodgerBlue;   margin: 0;
  position: absolute;
  left: 43%;" onclick="myFunction()">Pause</button>

<script>

var video = document.getElementById("myVideo");
var btn = document.getElementById("myBtn");

function myFunction() {
  if (video.paused) {
    video.play();
    btn.innerHTML = "Pause";
  } else {
    video.pause();
    btn.innerHTML = "Play";
  }
}
</script>

</body>
</html>' height="600" width=89% ></iframe>
`)
}else{
       socket.emit('output',`<iframe srcdoc='<html>
         <head>
           <title>BOORUNAV</title>
           <style>
           body {
  font-family: "Trebuchet MS", sans-serif;
}
h1 {text-align: center;}
p {text-align: center;}
div {text-align: center;}

      .box {
        width: 30%;
        height: 200px;
        border: 5px dashed #f7a239;
      }
      img {
        width: 100%;
        height: 100%;
      }
      div {
  width: 95vw;
  border: 1px solid #000000;
}
      div.a {
  word-wrap: break-word;

}
div.img {
  background-image: url("${post.fileUrl}");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 100vw;
  height: 100vh;
  }
    </style>
         </head>
         <body>
         <body style="background-color:Black;">

       		<div class="img"></div>
          <div class="a"><p style="color:DodgerBlue;"> ${post.tags.join(' ')}</p></div>
          <div id="download">

    <a class="button" href="${post.fileUrl}" download="hentai.png">"\\\/ download \\\/"</a>
</div>

         </body></html>' height="600" width=89% ></iframe>`);}
     })


 }}
