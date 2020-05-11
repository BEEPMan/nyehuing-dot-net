const express = require('express');
const bodyParser = require('body-parser');
const db = require('./lib/db');
const template = require('./lib/template');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    var html = template.html('메인', `
        <p>하찮았지만 귀찮았던것을 대신 해주는 사이트.</p>
        <h2>녜힁 닷넷</h2>
    `);

    res.send(html);
});

app.get('/nyehuing', (req, res) => {
    var html = template.html('녜힁 제조기', `
        <script type="text/javascript" src="/nyehuing_maker.js"></script>
        <h2>★랜덤 녜힁 제조기★</h2>
        <input type = "button" id = "output" value = "여기에 녜힁 출력" onclick="copy()">
        <p>
        <input type = "number" id = "length" min = "1" max = "9" value = "2" style = "width:20px;text-align:center;">
        글자의 닉네임을 생성!
        <input type = "button" class = "button" onclick = "makeNyehuing(document.getElementById('length').value)" value = "Go">
        </p>
        <p style = "line-height: 250%;font-size: 14px;">(!) 닉네임을 클릭시 자동으로 복사가 됩니다.(일부 브라우저 제외)</p>
    `);

    res.send(html);
});

app.get('/coin', (req, res) => {
    db.query('SELECT * FROM event_info', (err, event) => {
        var st = event[0].start_date.split(/[- :]/);
        var et = event[0].end_date.split(/[- :]/);
        var eventdate = `${st[0]}년 ${st[1]}월 ${st[2]}일 ${st[3]}시 ~ ${et[0]}년 ${et[1]}월 ${et[2]}일 ${et[3]}시`;
        db.query('SELECT * FROM glory_level', (err, levels) => {
            db.query('SELECT * FROM glory_itemlist', (err, list) => {
                var leveltemplate;
                var itemtemplate;
                if(event[0].level_available === 0) {
                    leveltemplate = '<p>현재 이벤트는 등급이 존재하지 않습니다...</p>';
                }
                else {
                    leveltemplate = template.leveltable(levels);
                }
                if(event[0].item_available === 0) {
                    itemtemplate = '<p>현재 이벤트는 아이템을 판매하지 않습니다...</p>';
                }
                else {
                    itemtemplate = template.itemtable(list);
                }
                var html = template.html('코인 계획표', `
                    <h2>★<img src = "/image/coin/${event[0].name}.png">지금은 ${event[0].event_name} 시즌★</h2>
                    <h4>${eventdate}</h4>
                    <div class = "discription">
                        <ul>
                            <li>현재 자신의 정보를 입력하고 원하는 품목을 선택하면 하루에 코인을 얼마나 모아야할지 알려준다!</li>
                            <li>리필이 가능한 아이템은 리필이 되었을때 해당 수량만큼 이벤트 기간이 끝날때까지 구매하는 것으로 가정한다!</li>
                            <li>수량이 무제한인 아이템은 1을 넣도록 하자!</li>
                        </ul>
                    </div>
                    <form action = '/coin/process' method = 'post'>
                        <input type = "submit" class = "button" value = "계산하기">
                        <p></p>
                        <div id = "grid">
                            <div class = "level">
                                ${leveltemplate}
                            </div>
                            <div class = "item">
                                ${itemtemplate}
                            </div>
                        </div>
                    </form>
                `);
                res.send(html);
            });
        });
    });
});

app.post('/coin/process', (req, res) => {
    db.query('SELECT * FROM event_info', (err, event) => {
        db.query('SELECT * FROM glory_level', (err, levels) => {
            db.query('SELECT * FROM glory_itemlist', (err, list) => {
                var post = req.body;
                var levelupdate = [];
                var enddate;
                var daysum = [];
                var weeksum = [];
                var othersum = 0;
                var needcoin = 0;
                var curdate = new Date("2019-06-22");
                curdate.setHours(0);
                curdate.setMinutes(0);
                curdate.setSeconds(0);
                curdate.setMilliseconds(0);
                var coin = parseInt(post.coin);
                var daycoin;
                var date;
                var day;
                for(var i = 0; i <= levels.length; i++) {
                    daysum[i] = 0;
                    weeksum[i] = 0;
                }
                for(var i = 0; i < post.quantity.length; i++) {
                    if(list[i].refill === 'day') {
                        daysum[list[i].level] += parseInt(post.quantity[i]) * parseInt(list[i].price);
                    }
                    else if(list[i].refill === 'week') {
                        weeksum[list[i].level] += parseInt(post.quantity[i]) * parseInt(list[i].price);
                    }
                    else {
                        othersum += parseInt(post.quantity[i]) * parseInt(list[i].price);
                    }
                }
                for(var i = 1; i <= levels.length; i++) {
                    daysum[i] += daysum[i - 1];
                    weeksum[i] += weeksum[i - 1];
                }
                levelupdate.push('');
                for(var i = 0; i < levels.length; i++) {
                    date = levels[i].date.split(/[- :]/);
                    levelupdate.push(new Date(date[0], date[1] - 1, date[2]));
                }
                date = event[0].end_date.split(/[- :]/);
                enddate = new Date(date[0], date[1] - 1, date[2]);
                for(var i = parseInt(post.levelselect); i < levels.length; i++) {
                    day = (levelupdate[i + 1].getTime() - curdate.getTime())/86400000;
                    var j = 0;
                    while(coin < levels[i].cost) {
                        coin += parseInt(levels[i - 1].maximum);
                        needcoin += daysum[i];
                        if(curdate.getDay() === 0) {
                            needcoin += weeksum[i];
                        }
                        curdate.setDate(curdate.getDate() + 1);
                        j++;
                    }
                    while(j < day) {
                        coin += parseInt(levels[i - 1].maximum);
                        needcoin += daysum[i];
                        if(curdate.getDay() === 0) {
                            needcoin += weeksum[i];
                        }
                        curdate.setDate(curdate.getDate() + 1);
                        j++;
                    }
                    coin -= levels[i].cost;
                }
                day = (enddate.getTime() - curdate.getTime())/86400000;
                coin += parseInt(levels[levels.length - 1].maximum) * parseInt(day);
                while(enddate.getTime() - curdate.getTime() >= 0) {
                    needcoin += daysum[levels.length];
                    if(curdate.getDay() === 0) {
                        needcoin += weeksum[i];
                    }
                    console.log(needcoin);
                    curdate.setDate(curdate.getDate() + 1);
                }
                console.log(daysum);
                console.log(levels.length);
                needcoin += othersum;

                var html = template.html('코인 계산기', `
                <h2>★계산 결과★</h2>
                <p>앞으로 이벤트에 참여했을때 총 코인 : ${coin}, 날짜 : ${curdate}</p><p>요구 코인 : ${needcoin}</p>
                `);

                res.send(html);
            });
        });
    });
});

app.get('/boss', (req, res) => {
    db.query('SELECT * FROM boss_info ORDER BY price DESC', (err, boss) => {
        db.query('SELECT * FROM schedule_list ORDER BY views DESC', (err, fav) => {
            var json = '';
            var obj = '';
            var first = 1;
            var favoritetemplate = '';
            var bosstemplate = '';
            var scripts = '';
            favoritetemplate = template.favoritetable(boss, fav);
            bosstemplate = template.bosstable(boss);
            scripts += `
            boss = document.getElementsByName('chk_boss[]');
            `;
            for(var i = 0; i < fav.length; i++) {
                first = 1;
                json = fav[i].data;
                obj = JSON.parse(json);
                scripts += `document.getElementById('fav_${i + 1}').addEventListener('click',function() {check([`;
                for(var j = 0; j < boss.length; j++) {
                    if(obj[boss[j].id.toString()] === true) {
                        if(first === 1) {
                            scripts += `${boss[j].id - 1}`;
                            first = 0;
                        }
                        else {
                            scripts += `, ${boss[j].id - 1}`;
                        }
                    }
                }
                scripts += `]);});`;
            }
            scripts += `
            function check(numbers) {
                for(var i = 0; i < numbers.length; i++) {
                    console.log("hi" + numbers[i]);
                    boss[numbers[i]].checked = true;
                }
            }
            `;
            var html = template.html('보스 계획표', `
            <h2>★보스 주간 수입 계산기★</h2>
            <div class = "discription">
                <ul>
                    <li>자신이 잡을 수 있는 모든 보스들을 체크하기만 하면 준비 끝!</li>
                    <li>사람들이 자주 사용하는 세팅은 좌측 리스트에 모아놓았다! 클릭만 하면 세팅 완료!</li>
                </ul>
            </div>
            <form action = '/boss/result' method = 'post'>
                <input type = "submit" class = "button" value = "계산하기">
                <p></p>
                <div id = "grid">
                    <div class = "favorite">
                        ${favoritetemplate}
                    </div>
                    <div class = "bosslist">
                        ${bosstemplate}
                    </div>
                </div>
            </form>
            <script>
                ${scripts}
            </script>
            `);
            res.send(html);
        });
    });
});

app.post('/boss/result', (req, res) => {
    db.query('SELECT * FROM boss_info ORDER BY price DESC', (err, boss) => {
        var upperboss = {
            '윌': 0,
            '루시드': 0,
            '데미안': 0,
            '스우': 0,
            '시그너스': 0,
            '핑크빈': 0,
            '파풀라투스': 0,
            '매그너스': 0,
            '아카이럼': 0,
            '반 레온': 0,
            '혼테일': 0,
            '자쿰': 0
        }
        var post = req.body;
        var sum = 0;
        var limit = 60;
        var idx = 0;
        var daybosslimit = 7;
        console.log(post);
        for(var i = 0; i < post.chk_boss.length; i++) {
            idx = parseInt(post.chk_boss[i]) - 1;
            daybosslimit = 7;
            if(boss[idx].class === '주간') {
                if(boss[idx].name === '노말 윌' && upperboss['윌'] === 1) continue;
                else if(boss[idx].name === '노말 루시드' && upperboss['루시드'] === 1) continue;
                else if(boss[idx].name === '노말 데미안' && upperboss['데미안'] === 1) continue;
                else if(boss[idx].name === '노말 스우' && upperboss['스우'] === 1) continue;
                else if(boss[idx].name === '이지 시그너스' && upperboss['시그너스'] === 1) continue;
                if(post.chk_refill != null) {
                    for(var j = 0; j < post.chk_refill.length; j++) {
                        if(post.chk_refill[j] === post.chk_boss[i]) {
                            sum += Math.floor(boss[idx].price / post.num_party[idx]);
                            limit--;
                            break;
                        }
                    }
                }
                sum += Math.floor(boss[idx].price / post.num_party[idx]);
                limit--;
            }
            else {
                if(boss[idx].name === '노말 핑크빈' && upperboss['핑크빈'] === 1) daybosslimit = 6;
                else if(boss[idx].name === '이지 파풀라투스' && upperboss['파풀라투스'] === 1) continue;
                else if(boss[idx].name === '이지 매그너스' && upperboss['매그너스'] === 1) continue;
                else if(boss[idx].name === '이지 아카이럼' && upperboss['아카이럼'] === 1) continue;
                else if((boss[idx].name === '이지 반 레온' || boss[idx].name === '노말 반 레온') && upperboss['반 레온'] === 1) continue;
                else if((boss[idx].name === '이지 혼테일' || boss[idx].name === '노말 혼테일') && upperboss['혼테일'] === 1) continue;
                else if(boss[idx].name === '이지 자쿰' && upperboss['자쿰'] === 1) continue;
                if(limit >= daybosslimit) {
                    sum += Math.floor(boss[idx].price / post.num_party[idx]) * daybosslimit;
                    limit -= daybosslimit;
                    console.log(sum);
                    console.log(limit);
                }
                else {
                    sum += Math.floor(boss[idx].price / post.num_party[idx]) * limit;
                    limit = 0;
                }
            }
            if(limit === 0) {
                break;
            }
            if(boss[idx].id === 2) {
                upperboss['윌'] = 1;
            }
            else if(boss[idx].id === 3) {
                upperboss['루시드'] = 1;
            }
            else if(boss[idx].id === 4) {
                upperboss['데미안'] = 1;
            }
            else if(boss[idx].id === 5) {
                upperboss['스우'] = 1;
            }
            else if(boss[idx].id === 19) {
                upperboss['시그너스'] = 1;
            }
            else if(boss[idx].id === 20) {
                upperboss['핑크빈'] = 1;
            }
            else if(boss[idx].id === 23) {
                upperboss['파풀라투스'] = 1;
            }
            else if(boss[idx].id === 24) {
                upperboss['매그너스'] = 1;
            }
            else if(boss[idx].id === 25) {
                upperboss['아카이럼'] = 1;
            }
            else if(boss[idx].id === 26 || boss[idx].id === 27) {
                upperboss['반 레온'] = 1;
            }
            else if(boss[idx].id === 29 || boss[idx].id === 33) {
                upperboss['혼테일'] = 1;
            }
            else if(boss[idx].id === 42) {
                upperboss['자쿰'] = 1;
            }
        }
        var html = template.html('보스 계획표', `
            <h2>★보스 주간 수입 계산기★</h2>
            <div id = "grid">
                ${sum}
            </div>
        `);
            res.send(html);
    });
});

app.listen(3000, () => {
    console.log("Server started!");
});