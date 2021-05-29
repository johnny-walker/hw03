//https://www.tutorialsteacher.com/nodejs/expressjs-web-application (webapp's step-by-step tutorial)
//https://www.tutorialspoint.com/http/http_methods.htm  (HTTP request methods)


const express = require('express')
const qs = require('querystring')
const fs = require('fs')
const multer = require('multer')

const {queryStores} = require('./src/app/storesApi.js') 
const {insertPhoto, queryAlbumIds} = require('./src/app/photosApi.js')

// get exproted functions
//const queryStores = storesApi.queryStores
//const insertPhoto = photosApi.insertPhoto
//const queryAlbumIds = photosApi.queryAlbumIds

var app = express()

// HTTP GET method
// the __dirname is the location of index.js
// get web pages 
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

// web pages' GET api
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
// curl -X GET "http://localhost:5000/photos/album/api?albumid=all"
app.get('/photos/album/api', function (req, res) {
    console.log(req.url)
    try {
        const querystr = req.url.replace('/photos/album/api?', '')
        const opts = qs.parse(querystr)
        queryAlbumIds(opts, (response) => {
            console.log(response)
            res.json(response)
        })
    } catch (e) {
        console.error(e)
    }
})

// HTTP POST method for photos
// setup multer
let record = {
    no: -1,                     // is assigned as Date.now()
    albumid: '2021-05-29',      // default ate(), but user can change it while submiting photo
    caption: '',                // given by user
    path: ''                    // file name saved in backend
}

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        let dir =  __dirname + '/database/photos'
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
        // invoke next handler    
        callback(null, dir)
    },

    filename: function (req, file, callback) {
        record.no = Date.now()
        let seperators = file.originalname.split('.') 
        record.path = `${seperators[0]}_${record.no}.${seperators[1]}`  //i.e. 'abc.jpg' as 'abc_67597243572345.jpg"
        // invoke next handler   
        callback(null, record.path)
    }
})
let upload = multer({ storage: storage })

//passing multer as middleware
app.post('/photos/upload', upload.any(), function (req, res) {
    if (req.body) {
        record.albumid = req.body.albumid
        record.caption = req.body.caption
        console.log(`Upload successfully: album id is ${req.body.albumid} , caption is ${req.body.caption}` )
        insertPhoto(record)

        //redirect to album page after upload compeletes
        res.sendFile(__dirname + '/src/photos/' + 'album.html')
    } 
})

// any other get requests (files)
app.get('/*', function (req, res) {
    console.log(req.url);
    res.sendFile(__dirname + '/' + req.url)
})


let server = app.listen(5000, function () {
    console.log('Node server is running..')
})

