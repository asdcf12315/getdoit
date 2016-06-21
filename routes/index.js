var express = require('express');
var router = express.Router();
'use strict';
var express = require('express');
var url = require('url'); //解析操作url
// var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var superagent = require('superagent-charset')(require('superagent'));
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var Buffer = require('buffer').Buffer;
var iconv = require("iconv-lite");
var targetUrl = 'http://t66y.com/thread0806.php?fid=15&search=&page=2';
var tUrl = 'http://t66y.com/'

/* GET home page. */
router.get('/', function(req, res, next) {
 

  res.render('index', { title: 'Express' });
});

module.exports = router;
