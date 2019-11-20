
/**
 * @author Dharmang Solanki
 * @description This file will contain all the middleware methods which will be used to upload photos 
 * 
 */
const multer = require('multer');

const StoreProfileImg = multer.diskStorage({

    destination: (cb) => {cb(null,'./static/images/users');},
    filename:(req,file,cb) => {
                try {
                    let imgName = req.body.email+path.extname(file.originalname);
                    cb(null, imgName);
                }
                catch(err){ 
                    console.error(err); 
                }
            }
});


const UploadProfileImg = multer({storage: StoreProfileImg});