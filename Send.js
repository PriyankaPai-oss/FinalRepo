const express=require('express');
const router=express.Router();

router.get('/', function (req, res) {
    res.send((req,res)=>{

        res.status(200).json({
            message:'Yes , its done'
        });
    }); //Output=> like { searchid: 'Array of checked checkbox' }
    
});



router.post('/', function (req, res) {
    res.send(JSON.stringify(req.body)); 
    console.log(req.body)

   
});

module.exports=router;
