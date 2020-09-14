import multer from 'multer';
import path from 'path';
import crypto from 'crypto';


module.exports={
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..','..','tmp','upload'),
        filename: (req, file, cb) =>{
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        },
    }),
}