const heroku = false
const PHOTO_ALBUM_URL = heroku ? 'https://ntu-food.herokuapp.com/photos/album' : 'http://localhost:5000/photos/album'

var loadFile = function(event) {
	var image = document.getElementById('imgsrc')
	image.src = URL.createObjectURL(event.target.files[0])
}

var uploadFile = function() {
    window.location.href = PHOTO_ALBUM_URL
}