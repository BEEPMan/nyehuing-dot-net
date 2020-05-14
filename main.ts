import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import db from "./lib/db";
import template from "./lib/template";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    let html = template.html('메인', `
        <p>하찮았지만 귀찮았던것을 대신 해주는 사이트.</p>
        <h2>녜힁 닷넷</h2>
    `);

    res.send(html);
});

app.get('/nyehuing', (req, res) => {
    let html = template.html('녜힁 제조기', `
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



app.get('/boss', (req, res) => {
    db.query('SELECT * FROM boss_info ORDER BY price DESC', (err, boss) => {
        db.query('SELECT * FROM schedule_list ORDER BY views DESC', (err, fav) => {
            let favoritetemplate = template.favoritetable(boss, fav);
            let bosstemplate = template.bosstable(boss);
            let scripts = `
            boss = document.getElementsByName('chk_boss[]');
            `;
            for(let i = 0; i < fav.length; i++) {
                let first = 1;
                let json = fav[i].data;
                let obj = JSON.parse(json);
                console.log(obj);
                console.log(boss[0]);
                scripts += `document.getElementById('fav_${i + 1}').addEventListener('click',function() {check([`;
                for(let j = 0; j < boss.length; j++) {
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
                for(let i = 0; i < numbers.length; i++) {
                    console.log("hi" + numbers[i]);
                    boss[numbers[i]].checked = true;
                }
            }
            `;
            let html = template.html('보스 계획표', `
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
        let upperboss = {
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
        let post = req.body;
        let sum = 0;
        let limit = 60;
        let idx = 0;
        let daybosslimit = 7;
        console.log(post);
        for(let i = 0; i < post.chk_boss.length; i++) {
            idx = parseInt(post.chk_boss[i]) - 1;
            daybosslimit = 7;
            if(boss[idx].class === '주간') {
                if(boss[idx].name === '노말 윌' && upperboss['윌'] === 1) continue;
                else if(boss[idx].name === '노말 루시드' && upperboss['루시드'] === 1) continue;
                else if(boss[idx].name === '노말 데미안' && upperboss['데미안'] === 1) continue;
                else if(boss[idx].name === '노말 스우' && upperboss['스우'] === 1) continue;
                else if(boss[idx].name === '이지 시그너스' && upperboss['시그너스'] === 1) continue;
                if(post.chk_refill != null) {
                    for(let j = 0; j < post.chk_refill.length; j++) {
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
        let html = template.html('보스 계획표', `
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