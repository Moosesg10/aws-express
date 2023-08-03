import express from "express"
import fileUpload from "express-fileupload"
import {downloadfile, getFile, getFileURL, getFiles, uploadsFile} from './s3.js'


const app = express()


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir: './uploads'
}))

app.get('/files', async (req, res) =>{
      const response =  await getFiles()
    res.json(response.Contents)
})

app.get('/files/:fileName', async (req, res) =>{
    console.log(req.params.fileName)
  const response = await getFileURL(req.params.fileName)
    res.json({url: response})
})

app.get('/downloadfile/:fileName' , async (req,res) => {
   await downloadfile(req.params.fileName)
    res.json({message: "archivo descargado"})
})

app.post('/files', async (req, res) =>{
const response =  await  uploadsFile(req.files.file)
    res.json({response})
})



app.use(express.static('images'))

app.listen(3000)
console.log('server on port 3000')