const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))

app.post('/test',(req,res)=>{

    //I need to get the content that teh user has selected and send it in the response

    console.log("done");


})


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))