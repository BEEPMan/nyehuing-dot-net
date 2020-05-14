export default {
    html: (title: string, body: string) => {
        return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>녜힁.NET - ${title}</title>
            <meta charset = "utf-8">
            <link rel = "stylesheet" href = "/style.css">
        </head>
        <body>
        <div class = "header">
            <a href="/"><h1><img src = "/image/icon.png" id = "icon">녜힁 닷넷</h1></a>
        </div>
        <div class = "menu">
            <input type = "button" value = "녜힁 제조기" onclick = "location.href = '/nyehuing'">
            <input type = "button" value = "코인 계획표" onclick = "location.href = '/coin'">
            <input type = "button" value = "보스 계산기" onclick = "location.href = '/boss'">
        </div>
        <div class = "body">
            ${body}
        </div>
        </body>
        </html>
        `;
    },
    leveltable: (levels: any) => {
        let levellist = '';
        let levelselect = '';
        for(let i = 0; i < levels.length; i++){
            levelselect += `<option value = "${levels[i].id}">${levels[i].name}</option>`;
            let t = levels[i].date.split(/[- :]/);
            let date = `${t[0]}년 ${t[1]}월 ${t[2]}일`;
            if(t[0] === '1900') date = '-';
            levellist += `
            <tr>
                <td>${levels[i].name}</td>
                <td>${levels[i].cost}</td>
                <td>${levels[i].maximum}</td>
                <td>${date}</td>
            </tr>
            `;
        }
        return `
        <p>여기에 등급별 정보</p>
        <table>
            <tr>
                <td>등급</td>
                <td>승급비용</td>
                <td>일일 코인 제한량</td>
                <td>승급 기간</td>
            </tr>
            ${levellist}
        </table>
        <p>
            현재 나의 등급은?  
            <select name = "levelselect">
                ${levelselect}
            </select>
        </p>
        <p>
            현재(오늘 수급한 코인 제외) 나의 코인 개수는?(0~99999)  
            <input type = "number" name = "coin" min = "0" max = "99999" value = "0">
        </p>
        `;
    },
    itemtable: (list: any) => {
        let itemlist = '';
        let refill = '';
        let quantity = '';
        for(let i = 0; i < list.length; i++){
            if(list[i].refill === 'day'){
                refill = '매일';
                quantity = list[i].quantity;
            }
            else if(list[i].refill === 'week'){
                refill = '매주';
                quantity = list[i].quantity;
            }
            else if(list[i].refill === 'inf'){
                refill = '-';
                quantity = '무제한';
            }
            else{
                refill = '-';
                quantity = list[i].quantity;
            }
            itemlist += `
            <tr>
                <td>
                    <img src = "/image/item/${list[i].id}.png">
                </td>
                <td>${list[i].name}</td>
                <td>${list[i].price}</td>
                <td>${quantity}</td>
                <td>${refill}</td>
                <td>
                    <input type = "number" name = "quantity[]" class = "quantity" min = "0" max = "${parseInt(list[i].quantity)}" value = "0">
                </td>
            </tr>
            `;
        }
        return `
        <p>여기에 아이템 목록</p>
        <table>
            <tr>
                <td>아이템</td>
                <td>품명</td>
                <td>가격</td>
                <td>수량</td>
                <td>리필여부</td>
                <td>구매수량</td>
            </tr>
            ${itemlist}
        </table>
        `;
    },
    favoritetable: (boss: any, list: any) => {
        let favoritelist = `<div class = "btn-favorite">`;
        for(let i = 0; i < list.length; i++) {
            favoritelist += `<button type = "button" class = "favorite" id = "fav_${i + 1}">`;
            let json = list[i].data;
            let obj = JSON.parse(json);
            for(let j = 0; j < boss.length; j++) {
                if(obj[boss[j].id.toString()] === true) {
                    //favoritelist += `<img src = "/image/boss/${boss[j].id}.png" width = "51.5" height = "52.5"></img>`;
                    favoritelist += `${boss[j].name} `;
                }
            }
            favoritelist += `</button>`;
        }
        favoritelist += `</div>`;
        return `
        <p>즐겨찾기</p>
        ${favoritelist}
        `;
    },
    bosstable: (list: any) => {
        let bosslist = '';
        let refill1 = '';
        let refill2 = '';
        for(let i = 0; i < list.length; i+=2) {
            refill1 = '';
            refill2 = '';
            if(list[i].refill === 1) {
                refill1 = `<input type="checkbox" name="chk_refill[]" value="${list[i].id}">`;
            }
            if(i + 1 < list.length) {
                if(list[i + 1].refill === 1) {
                    refill2 = `<input type="checkbox" name="chk_refill[]" value="${list[i + 1].id}">`;
                }
                bosslist += `
                <tr>
                    <td>
                        <img src = "/image/boss/${list[i].id}.png" width = "51.5" height = "52.5">
                    </td>
                    <td>${list[i].name}</td>
                    <td>${list[i].class}</td>
                    <td>${list[i].price}</td>
                    <td><input type="number" name="num_party[]" min="1" max="6" value=1></td>
                    <td>${refill1}</td>
                    <td>
                        <input type="checkbox" name="chk_boss[]" value="${list[i].id}">
                    </td>
                    <td>
                        <img src = "/image/boss/${list[i + 1].id}.png" width = "51.5" height = "52.5">
                    </td>
                    <td>${list[i + 1].name}</td>
                    <td>${list[i + 1].class}</td>
                    <td>${list[i + 1].price}</td>
                    <td><input type="number" name="num_party[]" min="1" max="6" value=1></td>
                    <td>${refill2}</td>
                    <td>
                        <input type="checkbox" name="chk_boss[]" value="${list[i + 1].id}">
                    </td>
                </tr>
                `;
            }
            else {
                bosslist += `
                <tr>
                    <td>
                        <img src = "/image/boss/${list[i].id}.png" width = "51.5" height = "52.5">
                    </td>
                    <td>${list[i].name}</td>
                    <td>${list[i].class}</td>
                    <td>${list[i].price}</td>
                    <td><input type="number" name="num_party[]" min="1" max="6" value=1></td>
                    <td>${refill1}</td>
                    <td>
                        <input type="checkbox" name="chk_boss[]" value="${list[i].id}">
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
                `;
            }
        }
        return `
        <p>보스 목록</p>
        <table>
            <tr>
                <td></td>
                <td>이름</td>
                <td>분류</td>
                <td>결정석 가격</td>
                <td>파티인원</td>
                <td>초기화</td>
                <td></td>
                <td></td>
                <td>이름</td>
                <td>분류</td>
                <td>결정석 가격</td>
                <td>파티인원</td>
                <td>초기화</td>
                <td></td>
            </tr>
            ${bosslist}
        </table>
        `;
    }
};