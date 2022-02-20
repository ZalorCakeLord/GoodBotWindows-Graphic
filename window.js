var FFI = require('ffi-napi');

function TEXT(text){
   return new Buffer(text, 'ucs2').toString('binary');
}

var user32 = new FFI.Library('user32', {
   'MessageBoxW': [
      'int32', [ 'int32', 'string', 'string', 'int32' ]
   ]
});

var OK_or_Cancel = user32.MessageBoxW(
   0, TEXT('I am Node.JS!'), TEXT('Hello, World!'), 1
);