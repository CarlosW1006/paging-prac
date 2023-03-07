
async function getData(){
    const response = await fetch('https://raw.githubusercontent.com/hsiangfeng/JSHomeWork/master/JSON/datastore_search.json');
    // console.log(response);
    const data = await response.json();
    console.log(data);
    // 取得資料長度
    const dataTotal = data.result.records.length;
    // 取得資料陣列
    dataArray = data.result.records;
    console.log(dataArray);

    // 要顯示在畫面上的資料數量，預設每一頁只顯示五筆資料
    let perpage = 5;

    // page 按鈕總數量公式，總資料數量 / 每一頁要顯示的資料
    // 這邊要注意，因為有可能會出現餘數，所以要無條件進位
    // Math.ceil 取出最大整數
    const pageTotal = Math.ceil(dataTotal / perpage);
    console.log(`全部資料:${dataTotal} 每一頁顯示:${perpage}筆 總頁數:${pageTotal}`);

    // Get buttonContainer item from page.html
    const buttonsContainer = document.getElementById("buttonsContainer");

    // 前頁按鈕
    const prevButton = document.createElement("button");
    prevButton.innerText = "Prev";
    prevButton.addEventListener("click", function(){
        let currentPage = parseInt(sessionStorage.getItem('currentPage'));
        if(currentPage > 1){
            sessionStorage.setItem('currentPage', currentPage-1);
            location.reload();
        }
    })
    buttonsContainer.appendChild(prevButton);

    // 分頁按鈕
    for(p=1; p<=pageTotal; p++){
        // sessionStorage.setItem('currentPage', 1);
        const button = document.createElement("button");
        button.innerText = p;
        button.addEventListener("click", function(){
            sessionStorage.setItem('currentPage', button.innerText);
            location.reload();
        })
        buttonsContainer.appendChild(button);
    }
    console.log('當前頁面:' + sessionStorage.getItem('currentPage'));

    // 後頁按鈕
    const nextButton = document.createElement("button");
    nextButton.innerText = "Next";
    nextButton.addEventListener("click", function(){
        let currentPage = parseInt(sessionStorage.getItem('currentPage'));
        if(currentPage < pageTotal){
            sessionStorage.setItem('currentPage', currentPage+1);
            location.reload();
        }
    })
    buttonsContainer.appendChild(nextButton);

    // 控制分頁數量
    let currentPage = sessionStorage.getItem('currentPage');
    if(currentPage > pageTotal){
        currentPage = pageTotal;
    }

    // get data id 0~4
    let minData = (currentPage * perpage) - perpage;
    let maxData = currentPage * perpage - 1;

    const arrayB = [];
    console.log(arrayB);
    for(i=0; i<=dataArray.length; i++){
        if(i>=minData && i<=maxData){
            const item = dataArray[i];
            arrayB.push(item);
        }
    }

    // 印出五筆資料
    const datasContainer = document.getElementById("datasContainer");
    for(i=0; i<arrayB.length; i++){
        const datas = document.createElement("p");
        const item = arrayB[i].Px;
        // const item = JSON.stringify(arrayB[i]);
        datas.innerText = item;
        datasContainer.appendChild(datas);
    }
}
getData();
