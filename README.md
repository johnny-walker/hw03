# Homework03
### improvement (export function)
add a new module (i.e. storesApi.js) and move the api codes inside it <br/>

### SQL database (SQLite3)
learning SQL (relational database) <br/>
https://www.w3schools.com/sql/sql_intro.asp <br/>
CREATE TABLE Albums (
    ID int,
    AlbumID varchar(8),
    Caption varchar(255),
    Path varchar(255)
);

### create Photo Upload Page
npm install multer <br/>
https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E4%BD%BF%E7%94%A8-multer-%E5%AF%A6%E4%BD%9C%E5%A4%A7%E9%A0%AD%E8%B2%BC%E4%B8%8A%E5%82%B3-ee5bf1683113 <br>
create photos/upload pages (html/js/css) <br/>
update app(backend) code to support (HTTP POST) <br/>
upload photo with albumid/title by form (HTTP POST) <br/>

### save upload data in database
create SQLite3 database & table schema(id, albumid, caption, path) using sqlite3 on shell<br/>
save uploaded photos in db (SQLite)

### create Photo Album Page
create photos album pages (html/js/css) <br/>
query uploaded albumid/photos from db (SQLite3) <br/>
update app(backend) code to support (HTTP GET) <br/>
display photo album <br/>
https://www.w3schools.com/howto/howto_css_images_side_by_side.asp <br/>

