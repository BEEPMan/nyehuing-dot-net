const express = require('express');
const db = require('./lib/db');
var app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    var html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>녜힁.NET</title>
        <meta charset = "utf-8">
        <link rel = "stylesheet" href = "/style.css">
    </head>
    <body>
    <div class = "header">
        <a href="/"><h1><img src = "/image/icon.png">녜힁 닷넷</h1></a>
    </div>
    <div class = "menu">
        <input type = "button" value = "녜힁 제조기" onclick = "location.href = '/nyehuing'">
        <input type = "button" value = "코인 계획표" onclick = "location.href = '/coin'">
    </div>
    <div class = "body">
        <p>하찮았지만 귀찮았던것을 대신 해주는 사이트.</p>
        <h2>녜힁 닷넷</h2>
    </div>
    </body>
    </html>
    `;

    res.send(html);
});

app.get('/nyehuing', (req, res) => {
    var html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>녜힁 제조기</title>
        <meta charset = "utf-8">
        <link rel = "stylesheet" href = "style.css">
        <script type="text/javascript" src="nyehuing_maker.js"></script>
    </head>
    <body>
    <div class = "header">
        <a href="/"><h1><img src = "/image/icon.png">녜힁 닷넷</h1></a>
    </div>
    <div class = "menu">
        <input type = "button" value = "녜힁 제조기" onclick = "location.href = '/nyehuing'">
        <input type = "button" value = "코인 계획표" onclick = "location.href = '/coin'">
    </div>
    <div class = "body">
        <h2>★랜덤 녜힁 제조기★</h2>
        <input type = "button" id = "output" value = "여기에 녜힁 출력" onclick="copy()">
        <p>
        <input type = "text" id = "length" maxlength = "1" value = "2" style = "width:20px;text-align:center;">
        글자의 닉네임을 생성!
        <input type = "button" id = "button" onclick = "makeNyehuing(document.getElementById('length').value)" value = "Go">
        </p>
        <p style = "line-height: 250%;font-size: 14px;">(!) 닉네임을 클릭시 자동으로 복사가 됩니다.(일부 브라우저 제외)</p>
    </div>
    </body>
    </html>
    `;

    res.send(html);
});

app.get('/coin', (req, res) => {
    db.query('SELECT * FROM glory_level', (err, levels) => {
        db.query('SELECT * FROM glory_itemlist', (err, list) => {
            var levelselect = `<select name = "levelselect">`;
            var levellist = `
            <table>
            <tr>
                <td>등급</td>
                <td>승급비용</td>
                <td>일일 코인 제한량</td>
                <td>승급 기간</td>
            </tr>
            `;
            for(var i = 0; i < levels.length; i++){
                levelselect += `<option value = "${levels[i].id}">${levels[i].name}</option>`;
                var t = levels[i].date.split(/[- :]/);
                var date = `${t[0]}년 ${t[1]}월 ${t[2]}일`;
                levellist += `
                <tr>
                    <td>${levels[i].name}</td>
                    <td>${levels[i].cost}</td>
                    <td>${levels[i].maximum}</td>
                    <td>${date}</td>
                </tr>
                `;
            }
            levelselect += `</select>`;
            levellist += `</table>`;
            var refill;
            var quantity;
            var itemlist = `
            <table>
                <tr>
                    <td>아이템</td>
                    <td>품명</td>
                    <td>가격</td>
                    <td>수량</td>
                    <td>리필여부</td>
                </tr>
            `;
            for(var i = 0; i < list.length; i++){
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
                    <td><img src = "/image/item/${list[i].id}.png"></td>
                    <td>${list[i].name}</td>
                    <td>${list[i].price}</td>
                    <td>${quantity}</td>
                    <td>${refill}</td>
                </tr>
                `;
            }
            itemlist += `</table>`;
            var html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>녜힁.NET</title>
                <meta charset = "utf-8">
                <link rel = "stylesheet" href = "style.css">
            </head>
            <body>
            <div class = "header">
                <a href="/"><h1><img src = "/image/icon.png">녜힁 닷넷</h1></a>
            </div>
            <div class = "menu">
                <input type = "button" value = "녜힁 제조기" onclick = "location.href = '/nyehuing'">
                <input type = "button" value = "코인 계획표" onclick = "location.href = '/coin'">
            </div>
            <div class = "body">
                <h2>지금은 글로리 시즌!</h2>
                <div id = "grid">
                    <div class = "level">
                        <p>여기에 등급업 요구 개수</p>
                        ${levellist}
                        <p>
                        현재 나의 등급은?  
                        ${levelselect}
                        </p>
                        <p>
                        현재 나의 코인 개수는?  
                        <input type = "text" name = "coin" value = "0">
                        </p>
                    </div>
                    <div class = "item">
                        <p>여기에 아이템 목록</p>
                        ${itemlist}
                    </div>
                </div>
                
            </div>
            </body>
            </html>
            `;
            res.send(html);
        });
    });
});

app.listen(3000, () => {
    console.log("Server started!");
});