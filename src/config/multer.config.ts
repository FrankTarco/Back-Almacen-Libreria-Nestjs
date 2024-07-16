import { existsSync, mkdirSync } from "fs";
import { diskStorage } from "multer";
import { extname } from "path";


const multerOptions = {
    storage: diskStorage({
        destination: (req, file, cb) =>{
            const updateDir = './public/uploads/';
            if(!existsSync(updateDir)){
                mkdirSync(updateDir, {recursive:true});
            }
            cb(null,updateDir)
        },
        filename: (req, file, cb) => {
            const name = file.originalname.split('.')[0];
            const extension = extname(file.originalname);
            const randon = Date.now()

            cb(null, `${name}-${randon}${extension}`);
        },
    }),
};

export default multerOptions;

