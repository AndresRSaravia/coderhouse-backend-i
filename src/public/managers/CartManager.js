import fs from 'fs';

class CartManager {
	constructor(filename){
		this.filePath = filename;
	}

	readCarts(){
		const data = JSON.parse(fs.readFileSync(this.filePath))
		return data;
	}

	readCart(cid){
		const carts = this.readCarts();
		const foundCart = carts.find(c => c.id === cid.toString());
		return foundCart;
	}

	async createCart(){
		try{
			let carts = await this.readCarts();
			const newCart = {
				"id": (Math.max.apply(Math, carts.map((cart) => cart.id))+1).toString(),
				"products": []
			};
			carts.push(newCart);
			fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
			console.log('Producto creado exitosamente.');
		}catch(error){
			console.error('Error al crear un carrito');
		}
	}

	updateCart(cid,pid){
		try{
			const carts = this.readCarts()
			const cindex = carts.findIndex(c => c.id === cid.toString());
			if(cindex === -1){
				return -1
			}
			const pindex = carts[cindex].products.findIndex(p => p.id === pid.toString());
			if(pindex === -1){
				const product = {
					"id": pid.toString(),
					"quantity": 1
				};
				(carts[cindex].products).push(product);
			}else{
				carts[cindex].products[pindex].quantity += 1;
			}
			fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
			console.log('Carrito modificado exitosamente.');
			return 0;
		}catch(error){
			console.error('Error al modificar un carrito', error);
		}
	}

	deleteCart(cid){
		try{
			const carts = this.readCarts()
			const index = carts.findIndex(c => c.id === cid.toString());
			if(index === -1){
				return -1;
			}
			carts.splice(index,1);
			fs.writeFileSync(this.filePath, JSON.stringify(carts, null, 2));
			console.log('Carrito eliminado exitosamente.');
			return 0;
		}catch(error){
			console.error('Error al eliminar un carrito',error);
		}
	}

}

export default CartManager;