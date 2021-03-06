# pg-objects



### Dependencies
    npm install pg



### Installation
    npm install pg-objects



## Quickstart
`pg-objects` exposes a couple of helper methods for using JS objects with [pg](https://github.com/brianc/node-postgres) queries. This is a **very** simple implementation, but one that has worked for me. So far.


```javascript
var pg = require('pg')
  , pgobj = require('pg-objects')
  ;

pg.connect(connectionString, function(err, client) {

  if (err) throw err;

  var prepped = pgobj.insert({ email: 'yums@tasty.com', password: 'apassword' });

  client.query(
    "INSERT INTO users (" + prepped.fields + ") VALUES (" + prepped.params + ")",
    // "INSERT INTO users (email, password) VALUES ($1, $2)"

    prepped.values,
    // ['yums@tasty.com', 'apassword']

    function(err, result) {
      // Your logic.
    }
  );

});
```


## Methods
* insert
* update
* hash


### insert
    var prepped = pgobj.insert({ email: 'yums@tasty.com', password: 'apassword' });

    client.query(
      "INSERT INTO users (" + prepped.fields + ") VALUES (" + prepped.params + ")",
      // "INSERT INTO users (email, password) VALUES ($1, $2)"

      prepped.values,
      // ['yums@tasty.com', 'apassword']


### update
    var prepped = pgobj.update({ password: 'newpassword', lastactive: new Date() });

    client.query(
      "UPDATE users SET " + prepped.fields,
      // "UPDATE users SET password=$1, lastactive=$2"

      prepped.values,
      // ['newpassword', *a Date value*]


### hash(string [, salt [, hash]])
Each parameter is of type String.



## Caveat
`pgobj.(insert/update).fields` is **NOT** character escaped so ensure that your object keys are safe!



## License
Copyright (C) 2012 Emilio Testa

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
