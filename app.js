var express = require('express');
var path = require('path');
var url = require('url'); //解析操作url
// var superagent = require('superagent'); //这三个外部依赖不要忘记npm install
var superagent = require('superagent-charset')(require('superagent'));
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var Buffer = require('buffer').Buffer;
var iconv = require("iconv-lite");
var targetUrl = 'http://t66y.com/thread0806.php?fid=15&search=&page=1';
var tUrl = 'http://t66y.com/'
var atext = [];
var app = express();
app.use(express.static(path.join(__dirname, 'public')));
superagent.get(targetUrl)
    .charset('gbk')
    .end(function (err, res) {
      var $ = cheerio.load(res.text,{decodeEntities: false});
      var obj = new Object();
      var surl = [];
      if($(".tr3 td h3")){
        $(".tr3 td h3 a").each(function(idx,element){
          if(element.children[0].type=="text"){
            var $element = $(element);
            var body =  $element.html();
            var href = url.resolve(tUrl, $element.attr('href'));
            obj[href]=body;
            superagent.get(href).end(function(err,res){
              var $ = cheerio.load(res.text);
                var name = new Object();
              $('#main .t2 .tr1 .tpc_content a').each(function(idx,element){
                var $e = $(element);
                if($e.text().indexOf("http://www.rmdown.com/link.php")==0){
                  // console.log(obj[href]);
                  // console.log(href);
                  // console.log($e.text()
                    name.name = obj[href];
                  name.href=$e.text();
                }
              });
                $('#main .t2 .tr1 .tpc_content img').each(function(idx,element){
                    var $i = $(element);
                    if($i.attr("src").indexOf("gif")== -1&&$i.attr("src").indexOf("http://oi65.tinypic.com")==-1){
                        if(idx==0){
                            // console.log($i.attr("src"));
                            name.img =$i.attr("src");
                        }
                    }
                });
                atext.push(name);
            });
          }
        });

      }
    });
app.get('/', function(req, res, next){
    // console.log(atext);
    res.render('default.hbs', {atext:atext});
});
app.listen(3000);
console.log('Server running at http://127.0.0.1:1337/');