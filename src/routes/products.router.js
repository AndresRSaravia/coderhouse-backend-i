import {Router} from 'express';
import productModel from '../models/product.model.js'

const router = Router();

// Métodos GET para productos
router.get('/', async (req,res) => {
	console.log('Pedido de listado de productos.');
	try{
		const products = await productModel.find();
		return res.json({products});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al obtener el listado de productos.'});
	}
	/*{
	status:success/error
payload: Resultado de los productos solicitados
totalPages: Total de páginas
prevPage: Página anterior
nextPage: Página siguiente
page: Página actual
hasPrevPage: Indicador para saber si la página previa existe
hasNextPage: Indicador para saber si la página siguiente existe.
prevLink: Link directo a la página previa (null si hasPrevPage=false)
nextLink: Link directo a la página siguiente (null si hasNextPage=false)
}
*/
});

router.get('/:pid', async (req, res) => {
	console.log('Id del producto a buscar:', req.params.pid);
	try{
		const pid = req.params.pid
		const foundProduct = await productModel.findOne({_id: pid});
		console.log(foundProduct)
		return res.send(foundProduct);
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al obtener el producto.'});
	}
});

// Métodos POST para productos
router.post('/', async (req,res) => {
	console.log('Pedido del creación de producto.');
	console.log('Información del req.body', req.body);
	const incompleteValues1 = !req.body.title||!req.body.description||!req.body.code||(req.body.price == null)
	const incompleteValues2 = (req.body.status == null)||(req.body.stock == null)||!req.body.category||!req.body.thumbnail
	const incompleteValues = incompleteValues1||incompleteValues2
	if(incompleteValues){
		return res.status(400).send({status: 'error', error: 'Valores incompletos.'});
	}
	try{
		const newProduct = new productModel(req.body);
		await newProduct.save();
		return res.json({status: 'success', message: 'Producto agregado exitosamente.'});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al crear un producto.'});
	}
});

// Métodos PUT para productos
router.put('/:pid', async (req,res) => {
	delete req.body._id;
	console.log('Id del producto a actualizar:', req.params.pid);
	try{
		const pid = req.params.pid;
		const updatedProduct = req.body;
		const result = await productModel.updateOne({_id: pid}, updatedProduct);
		return res.send({status:'success', message: 'Producto actualizado.', payload: result});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al actualizar el producto.'});
	}
});

// Métodos DELETE para productos
router.delete('/:pid', async (req,res) => {
	console.log('Id del producto a eliminar:', req.params.pid);
	try{
		const pid = req.params.pid;
		const result = await productModel.deleteOne({_id: pid});
		return res.send({status:'success', message: 'Producto eliminado.', payload: result});
	}catch(error){
		console.log(error)
		return res.status(500).send({status: 'error', error: 'Error al borrar el producto.'});
	}
});

export default router;