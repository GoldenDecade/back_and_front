/**
 * Created by lenovo on 2017/8/22.
 */
var pool = require('../../../backend/node_mysql')
var express = require('express')
var apiRoutes = express.Router()

apiRoutes.get('/', function(req, res) {
  res.json({
    errno: 0,
    data: [1,2,3]
  })
})
module.exports = apiRoutes
