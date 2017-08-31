var pool = require('../../backend/node_mysql')
var express = require('express')
var apiRoutes = express.Router()
var app = express()
var bodyParser=require('body-parser');
var multer = require('multer');
//  for parsing application/json
app.use(bodyParser.json());
//  for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
// for parsing multipart/form-data
/*app.use(multer());*/

console.log('register');
// 这里只处理请求数据的逻辑，不使用express进行渲染页面，把渲染页面的工作交给vue-router
apiRoutes.post('/', function(req, res, next) {
  console.log(req.body);
  let username = req.body.username;
  let psd = req.body.psd;
  let phone = req.body.phone;
  pool.getConnection(function(err, connection) {
    if(err) {
      console.log('register err');
      throw err;
    }
    let $sql = 'select * from students where username=?';
    connection.query($sql, [username], function(error, result) {
      if(error) {
        console.log('register error');
        throw error;
      }
      console.log('register::'+result);
      if(result.length !== 0) {
        let response = {
          code: 400,
          msg: '该账号已经存在'
        }
        res.json(response)
        connection.release()
      }else {
        let $sql = 'insert into students(username, psd, phone) values(?,?,?)'
        connection.query($sql, [username, psd, phone], function(error, result) {
          if(error) {
            console.log('register error');
            throw error;
          }
          console.log("register::"+result);
          if(result) {
            let response = {
              code: 200,
              msg: "注册成功"
            }
            res.json(response)
          }else {
            let response = {
              code: 400,
              msg: "注册失败"
            }
            res.json(response)
          }
          connection.release()
        })
      }
    })
  })
})
module.exports = apiRoutes
