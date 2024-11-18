const express = require('express');
const PDFMerger = require('pdf-merger-js');
const fomidable = require('formidable');
const fs = require('fs');

const path = require('path');
// const { triggerAsyncId } = require('async_hooks');
const app = express();
// const multer  = require('multer')
// const upload = multer({dest: 'uploads/' });
const port = 3000;

app.use(express.json())

// const merger = new PDFMerger();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.send('Welcome');
    // console.log(multer({dest: 'uploads/'}).array('pdfs',2));    
    res.render('index')
})
// app.post('/merge' , (req, res)=>   {
//     try {
        
//         res.set('Content-Type', 'application/json');
//         let form = new fomidable.IncomingForm();
//         // console.log(form)
//         // console.log(req.headers['content-length'])
//         form.parse(req, (err, filds, files)=>{
//             console.log(files.fileupload[0]);
//             let oldPath = files.fileupload[0].filepath;
//             fs.copyFile(oldPath, path.join(__dirname, `uploads/${files.fileupload[0].originalFilename}`),(err)=>{

//                 res.send({success: true})
//             })
    
//         })
//     } catch (error) {
//         res.send(error)
//     }
    
   
// })
app.post('/merge' , (req, res)=>   {
    try {
        
        res.set('Content-Type', 'application/json');
        let form = new fomidable.IncomingForm();
        const merger = new PDFMerger();
        // console.log(form)
        // console.log(req.headers['content-length'])
        form.parse(req, async(err, filds, files)=>{
            console.log(files.fileupload[0]);
            let oldPath = files.fileupload[0].filepath;
            let mergeName = "";
            for (const file of files.fileupload) {
                
                await merger.add(file.filepath);
                mergeName += file.originalFilename.split(".")[0];
                // console.log(file.originalFilename.split(".")[0])
            }
            mergeName += ".pdf";
          
            
            // console.log(mergeName);
           const save =  await merger.save(mergeName);
           
           console.log(save)

    
        })
    } catch (error) {
        res.send(error)
    }
    
   
})



app.listen(port, () =>{
    console.log(`app listening on port http://localhost:${port}`);
})