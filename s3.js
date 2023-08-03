import {S3Client,PutObjectCommand, ListObjectsCommand, GetObjectCommand} from "@aws-sdk/client-s3"
import {  AWS_BUKECT_NAME, AWS_BUKECT_REGION, AWS_KEY_PUBLIC, AWS_KEY_SECRET } from "./config.js"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import fs from 'fs'

const client = new S3Client({
    region:AWS_BUKECT_REGION,
    credentials: {
        accessKeyId:AWS_KEY_PUBLIC,
        secretAccessKey:AWS_KEY_SECRET
    }
})

export async function uploadsFile(file){
    const stream = fs.createReadStream(file.tempFilePath)
    const upLoadParams = {
        Bucket: AWS_BUKECT_NAME,
        Key : file.name,
        Body: stream
    }
  const command =  new PutObjectCommand(upLoadParams)
   const results = await client.send(command)
   return results
}

export async function getFiles(){
  const command = new ListObjectsCommand({
        Bucket:AWS_BUKECT_NAME
    })
   const results = await client.send(command)

 return results
}

export async function getFile(filename){
    const command = new GetObjectCommand({
        Bucket:AWS_BUKECT_NAME,
        Key: filename
    })
    const results = await client.send(command)
return results
}

export async function downloadfile(filename){
    const command = new GetObjectCommand({
        Bucket:AWS_BUKECT_NAME,
        Key: filename
    })
    const results = await client.send(command)
    results.Body.pipe(fs.createWriteStream(`./images/${filename}`))
}

export async function getFileURL(filename){
    const command = new GetObjectCommand({
        Bucket:AWS_BUKECT_NAME,
        Key: filename
    })
    const results = await getSignedUrl(client,command , { expiresIn: 3600 })
return results
}
