//https://www.tutorialsteacher.com/nodejs/expressjs-web-application (webapp's step-by-step tutorial)
//https://www.tutorialspoint.com/http/http_methods.htm  (HTTP request methods)
//  database columns definition
//  0: store (餐廳名字)
//  1: place (區域, 公館、118、學餐、溫州街...)
//  2: address (詳細地址)
//  3: price (價位: 平均數)
//  4: budget(預算, $:0-100 $$:101-200 $$$:201-300 $$$$:301-500 $$$$$:501+)
//  5: type (菜色類別: 中式、日式、韓式...)
//  6: staple (主食, 飯、麵、水餃)
//  7: dishes (菜色： 米食、麵食、鍋物、排餐、輕食...)
//  8: meat (葷/有提供素食/全素)  
//  9: seat (有無內用座位: 有/無) 
// 10: capacity (可容納人數數字，很多的話就寫10+))
// 11: time (營業時間)
// 12: image (示意圖檔)
// 13: suggestion (天氣冷熱)

const express = require('express')
const qs = require('querystring')
const queryStores = require('./storesApi.js')

var app = express()

// the __dirname is the current directory from where the script is running
app.get('/', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/' + 'index.html')
})

app.get('/todo/', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/src/todo/' + 'todo.html')
})

app.get('/stores/', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/src/stores/' + 'stores.html')
})

app.get('/photos/', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/src/photos/' + 'photos.html')
})


// curl -X GET "http://localhost:5000/stores/api?place=2&type=2&budget=0"
app.get("/stores/api", (req, res, next) => {
    console.log(req.url)
    try {
        const querystr = req.url.replace('/stores/api?', '')
        const opts = qs.parse(querystr)
        res.json(queryStores(opts))
    } catch (e) {
        console.error(e)
    }
})

app.get('/*', function (req, res) {
    console.log(req.url);
    res.sendFile(__dirname + '/' + req.url)
})

let server = app.listen(5000, function () {
    console.log('Node server is running..')
})

