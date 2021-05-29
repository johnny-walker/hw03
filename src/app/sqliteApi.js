` 
create album.db under shell (sqlite3 album.db), then create following table

CREATE TABLE Albums (
    ID int,
    AlbumID int,
    Caption varchar(255),
    Path varchar(255)
);
`
var sqlite3 = require('sqlite3').verbose()
let db = null
let dbRecord = 0

function openDB() {
    // 讀取 .db 檔
    // __dirname = /Volumes/programming/hw03/src/app, finding domain_home by removing '/src/app'
    let domain_home = __dirname.replace('/src/app', '')
    const dbPath = domain_home + '/database/album.db'

    db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log('Connected to the album database.');
        }
    })
}

function closeDB() {
    if (db) {
        db.close((err) => {
            if (err) {
                console.error(err.message);
            }
            console.log('Close the database connection.');
        })
    }
}

function run(statement) {
    openDB()
    db.run(statement, function (err) {
        if (err) {
            console.log(err.message)
        } else {
            //console.log(`run successfully~`)
        }
    })
    closeDB()
}

//export function 
module.exports = function insertPhotos(row) {
    console.log(row)
    let statement = `insert into albums values(${row.no}, '${row.albumid}', '${row.caption}', '${row.path}');`
    run(statement)
}
