const multer = require("multer");
// multer ka kaam ye hai ki ye req sai file lega or pane local folder mai store kara dega
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const upload = multer({storage});
module.exports = upload;