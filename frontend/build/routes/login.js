/**
 * Created by lenovo on 2017/8/22.
 */
var pool = require('../../../backend/node_mysql')
var express = require('express')
var apiRoutes = express.Router()

// 这里只处理请求数据的逻辑，不使用express进行渲染页面，把渲染页面的工作交给vue-router
apiRoutes.post('/', function(req, res) {
  let username = req.body.username;
  let psd = req.body.psd;
  pool.getConnection(function(err, connection) {
    if(err) {
      throw err;
    }
    let $sql = 'select * from students where username=?';
    connection.query($sql, [username], function(error, result) {
      if(error) {
        throw error;
      }
      if(result.length === 0) {
        let response = {
          code: 300,
          msg: '该账号不存在'
        }
        res.json(response)
        connection.release()
      }else {
        let query_psd = result[0].psd
        console.log('query_psd::'+query_psd);
        if(query_psd === psd) {
          let response = {
            code: 200,
            msg: '密码正确'
          }
          res.json(response)
        }else {
          let response = {
            code: 400,
            msg: '密码错误'
          };
          res.json(response) // 以json形式，把操作结果返回给前台页面
        }
        connection.release() // 释放连接
      }
    })
  })
})

module.exports = apiRoutes
