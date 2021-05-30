
let selectedIndex = -1

function albumLoaded() {
    console.log("Album page body loaded")
    queryAlbumIDs( () => {
        if (selectedIndex >= 0) {
            // query and show all photos
            var selAlbum = document.getElementById("select_albumid");
            setTimeout(displayPhotos(selAlbum.options[selectedIndex].text), 1000);
            //displayPhotos(selAlbum.options[selectedIndex].text)
        }
    })
}

function queryAlbumIDs(callback) {
    var xmlhttp = new XMLHttpRequest()
    xmlhttp.onerror = () => {
        console.log("** An error occurred during queryAlbumIDs")
    }
    xmlhttp.onreadystatechange = () => {
        //   (readyState)
        // 0 UNSENT:	客戶端已被建立，但 open() 方法尚未被呼叫。
        // 1 OPENED:	open() 方法已被呼叫。
        // 2 HEADERS_RECEIVED: send() 方法已被呼叫，而且可取得 header 與狀態。
        // 3 LOADING: 回應資料下載中，此時 responseText 會擁有部分資料。
        // 4 DONE
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let albumids = []
            let rows = JSON.parse(xmlhttp.responseText)
            for (let i=0; i<rows.length; i++ ) {
                if ( !albumids.includes(rows[i].AlbumID) ){
                    albumids.push(rows[i].AlbumID)
                }
            }
            console.log(albumids)

            // insert selection options
            if (albumids.length > 0) {
                let text = ""
                for (let i = 0; i < albumids.length; i++) {
                    text += "<option value='" +  albumids[i] + "'>" + albumids[i] + "</option>"
                }
    
                // update album page selection
                var selAlbum = document.getElementById("select_albumid");
                if (selAlbum != null){
                    selAlbum.innerHTML = text;
    
                    // listen selAlbum event
                    selAlbum.addEventListener("change", function() {
                        //clearData()
                        displayPhotos(selAlbum.options[selAlbum.selectedIndex].text);
                        selectedIndex = selAlbum.selectedIndex;
                    });   
                }
                selectedIndex = 0   // set current selection as first option             
            }
            callback()  // notify completed
        }
    }

    const queryAPI = "/photos/album/api?albumid=all&column=AlbumID"
    const method = 'GET'
    xmlhttp.open(method, queryAPI)
    xmlhttp.send()
}

function displayPhotos(albumid) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onerror = () => {
        console.log("** An error occurred during displayPhotos()")
    }
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            let photoinfos = JSON.parse(xmlhttp.responseText)
            console.log(photoinfos)
            refreshPhotos(photoinfos)
        }
    }

    var queryStmt = "/photos/album/api?albumid=" + albumid;
    const method = 'GET'
    xmlhttp.open(method, queryStmt);
    xmlhttp.send();
}

function refreshPhotos(photoinfos) {
    console.log(photoinfos)
    let text = ""
    let i=0
    for (i = 0; i < photoinfos.length; i++) { 
        if (i%5 === 0 ) {
            text += '<div class="row">'
        }
        text += '<div class="column">'
        text += '<a target="_blank" href="' + photoinfos[i].Path + '">'
        text += '<img class="imgsrc" src="' +  photoinfos[i].Path + '">'
        text += '</a>'
        text += '<div class="caption">' + photoinfos[i].Caption + '</div>'
        text += '</div>'

        if (i%5 === 4 ) {
            text += '</div>'
        }
    }  
    
    // if not yet add the close tag, add it
    if (i%5 != 4 ) {
        text += '</div>'
    }   

    let imgContainer = document.getElementById("imgContainer")
    removeAllChildNodes(imgContainer)
    
    //add new elements
    imgContainer.innerHTML = text;
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
