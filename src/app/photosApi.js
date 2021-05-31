// https://discuss.codecademy.com/t/why-use-db-each-instead-db-all-or-db-get-in-node-sqlite/381382
/* create album.db under shell (sqlite3 album.db), then create following table
CREATE TABLE Albums (
    ID int,
    AlbumID varchar(8),
    Caption varchar(255),
    Path varchar(255)
);
*/

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
            } else {
                console.log('Close the database connection.');
            }
        })
    }
}

function run(sql) {
    openDB()
    db.run(sql, (err) => {
        if (err) {
            console.log(err.message)
        } else {
            //console.log(`run successfully~`)
        }
        closeDB()
    })
}

function run_select(sql, callback) {
    openDB()
    let response = []
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err.message)
        } else {
            for (let i=0; i<rows.length; i++) {
                //console.log(rows[i])
                rows[i].Path = '/database/photos/' + rows[i].Path
                response.push(rows[i])
            }
        }
        callback(response)
        closeDB()
    })
}

//export functions
exports.insertPhoto = function insertPhoto(row) {
    console.log(row)
    let statement = `INSERT INTO Albums VALUES(${row.no}, '${row.albumid}', '${row.caption}', '${row.path}');`
    run(statement)
}

exports.queryAlbumIds = function queryAlbumIds(opts, callback) {
    console.log(opts)
    let statement = `SELECT * FROM Albums`
    if (opts.column) {
        statement = `SELECT ${opts.column} FROM Albums`
    } 

    if (opts.albumid) {
        statement += ` WHERE AlbumID = '${opts.albumid}'`
    }
    statement += ' ORDER BY AlbumID;'

    console.log(statement)
    run_select(statement, (response) => {
        callback(response)
    })
}
