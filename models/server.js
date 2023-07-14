const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // DB Connection
        this.connectDB();

        // Middlewares
        this.middlewares();

        // Application routes
        this.routes();
    }

    async connectDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Reading and parsing the request body
        this.app.use( express.json() );
        
        // Public directory
        this.app.use(express.static('public') );
    }

    routes() {
        this.app.use( this.usersPath, require('../routes/users') );
        this.app.use( this.authPath, require( '../routes/auth') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
          })
    }

}


module.exports = Server;