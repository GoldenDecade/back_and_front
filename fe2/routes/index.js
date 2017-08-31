/**
 * Created by lenovo on 2017/8/22.
 */

var express = require('express')
var app = express()
var bodyParser=require('body-parser')
//  for parsing application/json
app.use(bodyParser.json())
//  for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))


var login = require('./login')
var register = require('./register')
var test = require('./test')

app.use('/api/login', login)
app.use('/api/register', register)
app.use('/avi/test', test)

app.listen(1234,function(){
  console.log("1234端口开启成功");
});
