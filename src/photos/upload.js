
function uploadLoaded() {
    console.log('uploadLoaded')
}

var loadFile = function (event) {
    document.getElementById('imgsrc').src = URL.createObjectURL(event.target.files[0])

    // create default album-id from Date as 'yy-mm-dd'
    const now = new Date()
    let yy = now.getFullYear() % 100
    let mm = now.getMonth() + 1
    let dd = now.getDate()

    mm = mm < 10 ? '0' + mm.toString() : mm.toString()	// fill 0
    dd = dd < 10 ? '0' + dd.toString() : dd.toString()	// fill 0

    document.getElementById('albumid').value = yy.toString() + '-' + mm.toString() + '-' + dd.toString()

}