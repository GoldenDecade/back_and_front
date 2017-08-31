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
var studentsInfo = require('./students_info')

app.use('/api/login', login)
app.use('/api/register', register)
app.use('/avi/test', test)
app.use('/api/studentsInfo', studentsInfo)

app.listen(1234,function(){
  console.log("1234端口开启成功");
});
