let queryStores = {}
let options = {
    place: -1,
    type: -1,
    budget: -1
}

function bodyLoaded() {
    console.log("Stores page body loaded")
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

                let imgSrc = "/res/foods/" + queryStores[i][12]
                addChildImageNode(storesList, queryStores[i][0], queryStores[i][2], imgSrc, (i % 2))
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
    <div1 class="imageItemOdd" >
        <div2 class="column"><img class="image-cropper" src="/res/food.png" width="46" height="46"> </div>
        <div3 class="column">
            <div4>store</div>
            <div5>location</div>
        </div>
    </div>
    <div1 class="imageItem">
        <div2 class="column"><img class="image-cropper" src="/res/food.png" width="46" height="46"> </div>
        <div3 class="column">
            <div4>store</div>
            <div5">location</div>
        </div>
    </div>
    */
    function addChildImageNode(parent, store, location, imagePath, even) {
        let div1 = document.createElement("div")
        let div2 = document.createElement("div")
        let div3 = document.createElement("div")
        let div4 = document.createElement("div")
        let div5 = document.createElement("div")
        let image = document.createElement("img")

        let text1 = document.createTextNode(store)
        let text2 = document.createTextNode(location)
        parent.appendChild(div1)
        div1.appendChild(div2)
        div1.appendChild(div3)
        div2.appendChild(image)
        div3.appendChild(div4)
        div3.appendChild(div5)
        div4.appendChild(text1)
        div5.appendChild(text2)

        // set attrtibutes
        div1.className = even ? "imageItem" : "imageItemOdd"
        div2.className = "column"
        div3.className = "column"
        image.className = "image-cropper"
        image.src = imagePath
        image.width = 48
        image.height = 48

        div1.onclick = function (e) {
            // todo, show detail page
            let target = e.target
            console.log(target.innerText)
            window.location.href = '/'
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

const API_STORES_URL = '/stores/api'

function queryNTUStores(props, callback) {
    let xmlhttp = new XMLHttpRequest()
    xmlhttp.onerror = () => {
        console.log("** An error occurred during queryNTUStores")
    }
    xmlhttp.onreadystatechange = () => {
        //   (readyState)
        // 0 UNSENT:	客戶端已被建立，但 open() 方法尚未被呼叫。
        // 1 OPENED:	open() 方法已被呼叫。
        // 2 HEADERS_RECEIVED: send() 方法已被呼叫，而且可取得 header 與狀態。
        // 3 LOADING: 回應資料下載中，此時 responseText 會擁有部分資料。
        // 4 DONE
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            // response are characters data type, convert to json by JSON.parse
            callback(JSON.parse(xmlhttp.responseText))
        }
    }

    let queryString = `?place=${props.place}&type=${props.type}&budget=${props.budget}`
    let url = API_STORES_URL + queryString
    //let url = "/stores/api?place=1&type=2&budget=0"

    let method = 'GET'
    xmlhttp.open(method, url)
    xmlhttp.send()
}
