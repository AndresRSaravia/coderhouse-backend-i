import express from 'express';
import indexRouter from './routes/index.router.js'
import cartRouter from './routes/carts.router.js'
import productRouter from './routes/products.router.js'

const app = express();

// Habilitar lectura de archivos JSON
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Inicialización del servidor
app.listen(8080, () => {
	console.log("Servidor inicializado. Escuchando.");
});

// Router
app.use('/',indexRouter); // página inicial
app.use('/api/carts',cartRouter);
app.use('/api/products',productRouter);
