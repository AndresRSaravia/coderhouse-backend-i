import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import startRouter from './routes/start.router.js';
import cartRouter from './routes/carts.router.js';
import productRouter from './routes/products.router.js';
import viewsProductRouter from './routes/index.router.js';
import realTimeProductsRouter from './routes/views.router.js';
import path from 'path';
import {Server} from 'socket.io';

const app = express();
const httpServer = app.listen(8080, () => {
    console.log("Servidor inicializado. Escuchando."); //Servidor HTTP
})

// Configurar el motor de plantillas handlebars
app.engine('handlebars',handlebars.engine())
app.set('views',path.join(__dirname,'/views'))
app.set('view engine', 'handlebars')

// Archivos estáticos
app.use(express.static(path.join(__dirname,'/public')))

// Habilitar lectura de archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Router
app.use('/',startRouter); // página inicial
app.use('/api/carts',cartRouter);
app.use('/api/products',productRouter);
app.use('/products',viewsProductRouter);
app.use('/realtimeproducts',realTimeProductsRouter);

const messages = [];
const socketServer = new Server(httpServer);
socketServer.on('connection', (socket) => {
	console.log('Nueva conexión.')

    socket.on('message', data  => {
        console.log(data);
    });

    socket.emit('loadMessages', messages);

    socket.on('newMessage', (message) => {
        const newMessage = { socketid: socket.id, message }
        messages.push(newMessage);
        //console.log(messages);
        socketServer.emit('newMessage', newMessage);
    })
})