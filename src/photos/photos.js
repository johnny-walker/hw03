const heroku = false
const PHOTO_ALBUM_URL = heroku ? 'https://ntu-food.herokuapp.com/photos/album' : 'http://localhost:5000/photos/album'

var loadFile = function(event) {
	document.getElementById('imgsrc').src = URL.createObjectURL(event.target.files[0])
	
	// create default album-id from Date as yy-mm-dd
	const now = new Date()
	let yy = now.getFullYear() % 100
	let mm = now.getMonth()
	let dd = now.getDate()

	mm = mm < 10 ? '0' + mm.toString() :  mm.toString()	// fill 0
	dd = dd < 10 ? '0' + dd.toString() :  dd.toString()	// fill 0

	document.getElementById('albumid').value = yy.toString() + '-' + mm.toString() + '-' + dd.toString()
}

var uploadFile = function() {
    window.location.href = PHOTO_ALBUM_URL
}