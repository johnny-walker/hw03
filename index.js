//https://www.tutorialsteacher.com/nodejs/expressjs-web-application (webapp's step-by-step tutorial)
//https://www.tutorialspoint.com/http/http_methods.htm  (HTTP request methods)


const express = require('express')
const qs = require('querystring')
const multer = require('multer')

const queryStores = require('./storesApi.js')

var app = express()

// HTTP GET method
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

app.get('/photos/upload', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/src/photos/' + 'upload.html')
})

app.get('/photos/album', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/src/photos/' + 'album.html')
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

// HTTP POST method
// setup multer
let uploadfile = null

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/database')
    },
    filename: function (req, file, callback) {
        console.log(`filename callback: ${file.fieldname}`)
        uploadfile = file.fieldname + '-' + Date.now()
        callback(null, uploadfile)
    }
})
let upload = multer({ storage: storage })

//passing multer as middleware
app.post('/photos/upload', upload.any(), function (req, res) {
    if (req.body) {
        res.send('Upload successfully, caption is:' + req.body.caption )
    } 
})

let server = app.listen(5000, function () {
    console.log('Node server is running..')
})

