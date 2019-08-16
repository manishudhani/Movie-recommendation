const router = require('express').Router();
const Imdb = require('../models/IMDB');

router.get('/',(req,res)=>{
  Imdb.find({},(err,data)=>{
    if(err){ console.log(err); }
    else{
        query_obj = null;
        // console.log(data);
        res.render('home.ejs',{imdb_data:data,query_obj:query_obj});
    }
  });

})

module.exports = router;
