var express = require('express');
var config = require('./config')
var port = process.env.port || 80;

var app = express();
var router = express.Router();

router.get('/',function(req,res,next){
    req.url = './index.html';
    next();
})
app.use(router);
let appData = require('./data.json')
let seller = appData.seller
let goods = appData.goods
let ratings = appData.ratings
let apiRoutes = express.Router()

apiRoutes.get('/api/seller',(req,res)=>{
    res.json({
      erron:0,
      data:seller
    }) 
  })
  apiRoutes.get('/api/goods',(req,res)=>{
    res.json({
      erron:0,
      data:goods
    })
  })
  apiRoutes.get('/api/ratings',(req,res)=>{
    res.json({
      erron:0,
      data:ratings
    })
  })
app.use('/api',apiRoutes)

app.use(express.static('./dist'))

module.exports = app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return
    }
    console.log('Listening at  http://loclahost:'+port+'\n');
})
