//  database columns definition
//  0: store (餐廳名字)
//  1: place (區域, 公館、118、學餐、溫州街...)
//  2: address (詳細地址)
//  3: price (價位: 平均數)
//  4: budget(預算, $:0-100 $$:101-200 $$$:201-300 $$$$:301-500 $$$$$:501+)
//  5: type (菜色類別: 中式、日式、韓式...)
//  6: staple (主食, 飯、麵、水餃)
//  7: dishes (菜色： 米食、麵食、鍋物、排餐、輕食...)
//  8: meat (葷/有提供素食/全素)  
//  9: seat (有無內用座位: 有/無) 
// 10: capacity (可容納人數數字，很多的話就寫10+))
// 11: time (營業時間)
// 12: image (示意圖檔)
// 13: suggestion (天氣冷熱)

const csv = require('csv')
const fs = require('fs')

// handle stores/API : read db, parse the GET api parameters and filter data
const allStores = []
let filterStores = []
const fsPromises = fs.promises

async function readDatabase() {
    try {
        // STEP 1: 讀取 CSV 檔
        // __dirname = /Volumes/programming/hw03/src/app, finding domain home by removing '/src/app'
        let domain_home = __dirname.replace('/src/app', '')
        const inputFile = domain_home + '/database/ntufoods.csv'
        
        const input = await fsPromises.readFile(inputFile)

        // STEP 2：建立讀出 CSV 用的陣列和 parser
        const parser = csv.parse({
            delimiter: ','
        })

        // STEP 3-1：建立對應事件 - 讀取資料
        parser.on('readable', function () {
            while ((record = parser.read())) {
                allStores.push(record);
            }
        })

        // STEP 3-2：錯誤處理
        parser.on('error', function (err) {
            console.error(err.message);
        })

        // STEP 3-3：取得最後 output 的結果
        parser.on('end', function () {
            console.log('total stores from database:', allStores.length)
        })

        // STEP 4：放入預備讀取的內容
        parser.write(input);

        // STEP 5：關閉 readable stream
        parser.end()
    } catch (error) {
        console.log('error', error)
    }
}
readDatabase()

// filter: look-up table at column-1 (places), column-5 (types), column-4 (budgets)
const place_list = ["水源市場到師大分部", "水源市場到正門", "正門到台電大樓", "溫州街", "118", "台大學餐", "台科大學餐", "長興"]
const types_list = ["中式", "西式", "台式", "美式", "港式", "韓式", "日式", "東南亞料理", "南洋料理", "中東料理", "雲南料理"]
const budgets_list = ["$", "$$", "$$$", "$$$$", "$$$$$"]

function filterPlaces(opt) {
    let selection = place_list[parseInt(opt)]
    return filterStores.filter(store => store[1] === selection)
}

function isTypeAccpeted(store, selection) {
    let res = false
    const items = store[5].split(' ')
    for (i=0; i< items.length; i++) {
      if (items[i] ===  selection) {
        res = true
        break
      }
    }
    return res
  }

function filterTypes(opt) {
  let selection = types_list[parseInt(opt)]
  return filterStores.filter(store => isTypeAccpeted(store, selection))
}

function isBudgetAccpeted(store, selection) {
  let res = false
  const items = store[4].split(' ')
  for (i=0; i< items.length; i++) {
    if (items[i] ===  selection) {
      res = true
      break
    }
  }
  return res
}

function filterBudgets(opt) {
  let selection = budgets_list[parseInt(opt)]
  return filterStores.filter(store => isBudgetAccpeted(store, selection))
}

//export function to query stores 
module.exports = function queryStores(opts) {

    filterStores = [...allStores]

    if (opts.place && opts.place >= 0) {
        filterStores = filterPlaces(opts.place)
    }
    if (opts.type && opts.type >= 0) {
        filterStores = filterTypes(opts.type)
    }
    if (opts.budget && opts.budget >= 0) {
        filterStores = filterBudgets(opts.budget)
    }

    console.log("query stores:", filterStores.length)
    return filterStores
}