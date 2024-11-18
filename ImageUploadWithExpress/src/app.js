const express = require('express');
const path = require('path');
const fomidable = require('formidable')
const fs = require('fs');

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname,"../css")));
app.set("view engine", "ejs");

app.get("/", (req, res)=>{
    res.render('index',{title : "hitesh"});
})

app.post("/upload", (req,res) =>{
    res.set('Content-Type', 'application/json');
    try {
        
        let form = new fomidable.IncomingForm();
        console.log(req.headers)
        
        form.parse(req, (err, fields ,files) =>{
            // console.log(files)
            // let oldPath = files.filetoupload[0].originalFilename;
            let oldPath;
            // console.log(Object.keys(files).length == 0)
            // console.log(files == {})
            if((Object.keys(files).length > 0)){
                oldPath = files.filetoupload[0].filepath;
            }
            // console.log(fields.name[0]);
             
            if(oldPath){
    
                let newPath = path.join(__dirname, `../image/${files.filetoupload[0].originalFilename}`);
                fs.copyFile(oldPath, newPath,(err)=>{
        
                    if(err){
                        return res.send(err)
                    }
                    res.send({msg: "success"});
                });
            }
            // console.log(files.filetoupload[0]);
    
        })
    } catch (error) {
        res.json({msg: "error"})
    }
    
   
})
app.listen(3001,() =>{
    console.log("listening on http://localhost:3000")
})