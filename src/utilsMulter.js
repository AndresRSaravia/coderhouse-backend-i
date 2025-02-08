import multer from 'multer';
import __dirname from './utils.js';

const storage = multer.diskStorage({
    destination: function( req, thumbnails, cb){
        cb(null, __dirname+'/public/img')
    },
    filename: function(req, thumbnails, cb){
        const timestamp = Date.now();
        cb(null, `${timestamp}-${thumbnails.originalname}`)
    }
})

export const uploader = multer({storage});