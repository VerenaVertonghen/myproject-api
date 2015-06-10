# API

## Intro
The api for Cosy Care.

## Setup
```sh
$ npm install
```

```sh
//run Node Inspector 
$ node-debug server.js
```

## MongoDB

### Install MongoDB
```sh
// update your packages
$ brew update
```

```sh
// install mongoDB
$ brew install mongodb
$ brew install mongodb --with-openssl
$ brew install mongodb --devel
```

```sh
//create the data directory
$ sudo chown -R `id -u` /data/db
```

### Run MongoDB
```sh
//run MongoDB service
$ mongod
```

```sh
//connect to the MongoDB service
$ mongo
```

## Node
### Run Node
```sh
$ node main.js
```

## Resources
* [node.js] - evented I/O for the backend
* [Express] - fast node.js network app framework [@tjholowaychuk]
* [Passportjs] - authentication middleware for Node.js
* [MongoDB] - an open-source document database, and the leading NoSQL database
* [Mongoose] - elegant mongodb object modeling for node.js

## Routes
* /
* /categories
* /notifications
* /users
* /states
* /messages

[node.js]:http://nodejs.org
[express]:http://expressjs.com
[Passportjs]:http://passportjs.org/
[Mongoose]:http://mongoosejs.com/
[MongoDB]:http://www.mongodb.org/