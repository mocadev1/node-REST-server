const express = require('express');
const cors = require('cors');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Middlewares
        this.middlewares();

        // Application routes
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use( cors() );
        
        // Public directory
        this.app.use('/ejemplo', express.static('public') );
    }

    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'get API'
            });
        });

        this.app.put('/', (req, res) => {
            res.json({
                msg: 'put API'
            });
        });

        this.app.post('/', (req, res) => {
            res.json({
                msg: 'post API'
            });
        });

        this.app.delete('/', (req, res) => {
            res.json({
                msg: 'delete API'
            });
        });

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port);
          })
    }

}


module.exports = Server;