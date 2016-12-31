/**
 * DEBUG=* node examples/gist.js
 */
var vm = require( '../lib/index' );

var extendWithTitle = vm.define( 'https://gist.githubusercontent.com/andypotanin/2b09c3162c86cfe8ac460f5e73adc131/raw/extend-with-title.js' );

// call our function that uses the remote code every second
setInterval(useFunction, 1000 )

// every 5 seconds force library to fetch updated code
setInterval(extendWithTitle.refresh, 3000 )

// basic example calling remote function, having it manipulate an object.
function useFunction() {
  console.log( "Running code." );

  var someObject ={
    "test": 1
  };
    
  var response = extendWithTitle.call( someObject );

  console.log( ' - response', response );
  console.log( ' - someObject', someObject );
  
}




//useFunction();