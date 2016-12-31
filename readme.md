Use external blocks of code within a Node.js service.
Allows for some of the logic to be centrally located.

* Execute VM scripts fetched from a remote location, e.g. gist.
* Support for private GitHub repositories.

Define a remote function using a URL.
```js
var remoteMethod = vm.define( 'some-url-of-js' );
```

Execute remote function, passing in some new data.
```js
remoteMethod.call({ myData: true });
```

Flush cached method.

```js
remoteMethod.refresh();
```