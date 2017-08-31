/**
 * Created by lenovo on 2017/8/31.
 */
/**
 * Created by lenovo on 2017/8/22.
 */
var pool = require('../../backend/node_mysql')
var express = require('express')
var apiRoutes = express.Router()
var app = express()

// 这里只处理请求数据的逻辑，不使用express进行渲染页面，把渲染页面的工作交给vue-router
// 发送draw表示第几次请求，start表示起点，length表示请求数据量；
// 返回draw表示第几次相应，total表示总量， data表示检索出的数据
apiRoutes.post('/', function(req, res) {
  let draw = req.body.draw;
  let start = req.body.start;
  let length = req.body.length;
  let sql_length = 0;
  pool.getConnection(function(err, connection) {
    if(err) {
      throw err;
    }
    let $sql_length = 'select * from students_info';
    connection.query($sql_length, function(error, result) {
      if(error) {
        throw error;
      }
      sql_length = result.length;
    });
    let $sql = 'select * from students_info limit ?, ?';
    connection.query($sql, [start, length], function(error, result) {
      if(error) {
        throw error;
      }
      if(result.length === 0) {
        let response = {
          code: 300,
          msg: '未查询到数据'
        }
        res.json(response)
        connection.release()
      }else {
        let response = {
          code: 200,
          draw: draw,
          data: result,
          total: sql_length
        }
        res.json(response)
        connection.release() // 释放连接
      }
    })
  })
})

module.exports = apiRoutes
