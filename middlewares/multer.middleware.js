import multer from "multer";
import Path from "path";
const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./uploads')
    },
    filename:(req,file,cb) =>{
        cb(null,file.fieldname + '-' + Date.now() + Path.extname(file.originalname))
    }
})
export const upload = multer({storage: storage});