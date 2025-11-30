const express = require('express')
const fs = require('fs')
const path = require('path')
const { json } = require('stream/consumers')
const app = express()


const LevelPath = path.join(__dirname,'public','Mapdata')
const CustomPath = path.join(__dirname,'public','CustomMap')


app.connection = function(){}

app.get('/api/count/level',(req,res) => {

    try{

        console.log(LevelPath)
        const files = fs.readdirSync(LevelPath)

        const data = files.filter(filename => filename.endsWith('.json'))
        const Maxlevel = data.length;
        console.log(Maxlevel)
        res.json({maxlevel : Maxlevel})
    }
    catch(err){
        console.error(err)
        res.status(500).json({error : err.message})
    }
})
app.get('/api/levels/:id',(req,res) => {
    const levelId = req.params.id;
    const filename = `level${levelId}.json`;
    const filePath = path.join(LevelPath, filename);
    try {
        console.log(`[API Request] Reading map file: ${filePath}`);

        // 2. JSON 파일을 동기적으로 읽어와 문자열로 저장합니다.
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // 3. JSON 문자열을 JavaScript 객체로 변환합니다.
        const mapData = JSON.parse(fileContent);

        // 4. JavaScript 객체를 Express가 다시 JSON 응답으로 변환하여 전송합니다.
        res.json(mapData);

    } catch (error) {


        // 파일 시스템 접근 오류 (ENOENT: 파일 없음) 처리
        if (error.code === 'ENOENT') {
            console.warn(`[API Error] Level file not found: ${filePath}`);
            return res.status(404).json({ 
                error: `Level ${levelId} map file not found.`,
                details: error.message
            });
        }
        
        // JSON 파싱 오류 또는 기타 서버 오류 처리
        console.error(`[API Error] Internal error processing level ${levelId}:`, error.message);
        return res.status(500).json({ 
            error: `Error processing map data for level ${levelId}.`,
            details: error.message 
        });
    }
})
app.get('/api/count/customlevel',(req,res) => {
    try{
        const files = fs.readdirSync(CustomPath)
        const data = files.filter(filename => filename.endsWith('.json'))

        return data;
    }catch{

    }
})
app.use(express.static('public'))

app.listen(52273,()=>{
    console.log('Sever is running at http://127.0.0.1:52273')
})