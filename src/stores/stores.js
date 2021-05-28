let queryStores = {}
let options = {
    place: -1,
    type: -1,
    budget: -1
}

function bodyLoaded() {
    console.log("bodyLoaded");
    document.getElementById('queryData').onclick = function () {
        let storesList = document.getElementById('storesList')

        removeAllChildNodes(storesList)
       
        getOptionValues()
        queryNTUStores(options, function (queryStores) {
            let element = document.getElementById("total")
            element.textContent = '符合的店家: ' + queryStores.length

            // create all items from queryStores 
            for (i = 0; i < queryStores.length; i++) {
                //console.log(queryStores[i][0])
                //addChildNode(storesList, queryStores[i][0])

                let name = queryStores[i][0]
                let imgSrc = "/res/foods/" +  queryStores[i][12]
                addChildImageNode(storesList, name, imgSrc, (i%2) )

            }
        })
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

    /* tags(ul li) examples:
        <ul id="storesList">
            <li> store1</li>
            <li>store2</li>
        </ul>
    */
    function addChildNode(parent, value) {
        let li = document.createElement("li")
        let text = document.createTextNode(value)
        li.appendChild(text)
        parent.appendChild(li)
   
        li.onclick = function (e) {
            // todo, show detail page
            console.log(e.target.innerText)
        }
    }

    /* tags(div img) examples:
    <div id="storesList">
        <div class="imageItemOdd"><img src="/res/food.png" width="48" height="36">store1 </div>
        <div class="imageItem"><img src="/res/food.png" width="48" height="36">store2 </div>
    </div>
    */
    function addChildImageNode(parent, value, imagePath, even) {
        let div = document.createElement("div")
        let image = document.createElement("img")
        let text = document.createTextNode(value)
        div.appendChild(image)
        div.appendChild(text)
        parent.appendChild(div)
 
        // set attrtibutes
        div.class = even ? "imageItem" : "imageItemOdd"
        image.class = "image-cropper"
        image.src = imagePath
        image.width = 48
        image.height = 36
 
   
        div.onclick = function (e) {
            // todo, show detail page
            let target = e.target.getElementById("imageItem")
            if (!target) {
                target = e.target.getElementById("imageItemOdd")
            }
            console.log(target.innerText)
        }
    }

    function getOptionValues() {
        let element = document.getElementById("places")
        options.place = element.value

        element = document.getElementById("types")
        options.type = element.value

        element = document.getElementById("budgets")
        options.budget = element.value
    }
}

const heroku = false
const API_STORES_URL = heroku ? 'https://ntu-food.herokuapp.com/stores/api' : 'http://localhost:5000/stores/api'

function queryNTUStores(props, callback) {
    let queryString = `?place=${props.place}&type=${props.type}&budget=${props.budget}`
    let url = API_STORES_URL + queryString
    //let url = "http://localhost:5000/stores/api?place=1&type=2&budget=0"

    let xmlhttp = new XMLHttpRequest()
    let method = 'GET'

    xmlhttp.open(method, url)
    xmlhttp.onerror = () => {
        console.log("** An error occurred during the transaction")
    }
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // response are characters data type, convert to json by JSON.parse
            callback(JSON.parse(xmlhttp.responseText))
        }
    }
    xmlhttp.send()
}
