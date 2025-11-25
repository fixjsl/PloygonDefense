const express = require('express')
const fs = require('fs')
const path = require('path')
const { json } = require('stream/consumers')
const app = express()


const LevelPath = path.join(__dirname,'Mapdata')
const CustomPath = path.join(__dirname,'CustomMap')
app.get('/api/count/level',(req,res) => {
    try{
        const files = fs.readdirSync(LevelPath)

        const data = files.filter(filename => filename.endsWith('.json'))
        const Maxlevel = data.length;

        res.json({maxlevel : Maxlevel})
    }
    catch{

    }
})

app.use(express.static('public'))

app.listen(52273,()=>{
    console.log('Sever is running at http://127.0.0.1:52273')
})