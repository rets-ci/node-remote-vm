var debug = require( 'debug' )('vm-remote');
var vm = require('vm');
var lodash = require( 'lodash' );
var request = require( 'request' );

module._cache = [];

module.exports.define = function( url, options ) {

  function fetchCode() {
    debug( 'fetchCode', url );
    
    request.get( url, { headers: { 'cache-control': 'no-cache', 'pragma': 'no-cache' } }, function haveCode( error, resp, body ) {
      debug( 'haveCode', resp.statusCode )

      if( resp.statusCode !== 200 ) {

        module._cache[ url ] = {
          body: '(function(doc, require, _) {return true;})',
          url: url
        };

        return;

      }
      
      
      // failure to load and no cache
      if( error && !module._cache[ url ] ) {
        console.error( 'Unable to fetch [%s].', url );
      }
            
      if( !module._cache[ url ] ) {
        debug( 'haveCode', 'code installed.' )        
        
      } else if ( module._cache[ url ].body !== body ) {
        debug( 'haveCode', 'code changed.' )
      } else {
        debug( 'haveCode', 'not changed.' )
      }
      
      module._cache[ url ] = {
        body: body,
        url: url
      };    
    
    });
  
  }
  
  module._cache[ url ] = null;

  fetchCode();

  return {
    call: function( data ) {
      
      if( !module._cache[ url ] ) {
        console.error( 'not ready' );
        return null;
      }      

      return vm.runInThisContext( module._cache[ url ].body )( data, require, lodash );
      
      
    },
    refresh: function() {
      debug( 'refreshing' )
      fetchCode();          
      
    }
  }
  
}
