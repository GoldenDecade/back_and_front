/**
 * Created by lenovo on 2017/8/30.
 */
var express = require('express')
var apiRoutes = express.Router()
apiRoutes.get('/', function(req, res) {
  res.json({
    errno: 1,
    msg: 'ok'
  })
})

module.exports = apiRoutes
