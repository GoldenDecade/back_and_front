/**
 * Created by lenovo on 2017/8/22.
 */
let mysql = require('mysql')
let config = require('./config')
//创建连接
let pool = mysql.createPool(config.mysql)

// 连接是否成功
pool.getConnection(function(err, connection) {
    if(err) throw err;
    console.log('connection success');
    /*let $sql = "select * from students where name='wq2'";
    connection.query($sql,  function(err, res) {
        let resultJSON = res;
        console.log(resultJSON);
    });*/

})

module.exports = pool



