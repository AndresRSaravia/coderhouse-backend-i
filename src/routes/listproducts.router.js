import {Router} from 'express';
import productModel from '../models/product.model.js'

const router = Router();

// Métodos GET para productos
router.get('/', async (req,res) => {
	console.log('Pedido viewer de listado de productos.');
	try{
		const products = await productModel.find().lean();
		return res.render('products',{products})
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al obtener el listado de productos.'});
	}
});

export default router;