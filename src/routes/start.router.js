import {Router} from 'express';

const router = Router();

router.get('/',(req,res) => {
	res.send('Este es el servidor router.');
});

router.get('/about',(req,res) => {
	res.send('Sobre algo');
});

export default router;