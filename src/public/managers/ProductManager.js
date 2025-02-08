import fs from 'fs';

class ProductManager {
	constructor(filename){
		this.filePath = filename;
	}

	readProducts(){
		const data = JSON.parse(fs.readFileSync(this.filePath));
		return data;
	}

	readProduct(pid){
		const products = this.readProducts();
		const foundProduct = products.find(p => p.id === pid.toString());
		return foundProduct;
	}

	createProduct(product){
		try{
			let products = this.readProducts();
			if (products.length == 0) {
				product["id"] = "0";
			}else{
				product["id"] = (Math.max.apply(Math, products.map((product) => product.id))+1).toString()
			}
			product["thumbnails"] = "../public/img/" + product["thumbnails"]
			products.push(product);
			fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
			console.log('Producto creado exitosamente.');
		}catch(error){
			console.error('Error al crear un producto');
		}
	}

	updateProduct(pid,product){
		try{
			let products = this.readProducts()
			const index = products.findIndex(product => product.id === pid.toString());
			if(index === -1){
				return -1
			}else{
				products[index] = { ...products[index], ...product};
				fs.writeFileSync(this.filePath, JSON.stringify(products, null, 2));
				console.log('Producto modificado exitosamente.');
				return 0;
			}
		}catch(error){
			console.error('Error al modificar un producto');
		}
	}

	deleteProduct(pid){
		try{
			let products = this.readProducts();
			const index = products.findIndex(p => p.id === pid.toString())
			if(index === -1){
				console.log("Producto no encontrado.");
				return -1
			}else{
				products.splice(index,1);
				fs.writeFileSync(this.filePath, JSON.stringify(products,null,2));
				console.log('Producto eliminado exitosamente.');
				return 0;
			}
		}catch(error){
			console.error('Error al eliminar un producto');
		}
	}

}

export default ProductManager;