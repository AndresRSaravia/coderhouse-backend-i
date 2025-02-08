import express from 'express';
import __dirname from './utils.js';
import handlebars from 'express-handlebars';
import startRouter from './public/routes/start.router.js'
import cartRouter from './public/routes/carts.router.js'
import productRouter from './public/routes/products.router.js'
import viewsproductRouter from './public/routes/index.router.js'
import path from 'path'

const app = express();

// Archivos estáticos
app.use('/static',express.static(path.join(__dirname,'/public')))

app.engine('handlebars', handlebars.engine())
app.set('views',path.join(__dirname,'/public/views'))
app.set('view engine', 'handlebars')

// Habilitar lectura de archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Router
app.use('/',startRouter); // página inicial
app.use('/api/carts',cartRouter);
app.use('/api/products',productRouter);
app.use('/products',viewsproductRouter);

// Inicialización del servidor
app.listen(8080, () => {
	console.log("Servidor inicializado. Escuchando.");
});
