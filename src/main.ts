import { config } from 'dotenv';
config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dbInit from './db';
import template from './lib/template';
import BossInfo from './db/BossInfo';
import ScheduleList from './db/ScheduleList';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.send(template.html('메인', `
  <p>하찮았지만 귀찮았던것을 대신 해주는 사이트.</p>
  <h2>녜힁 닷넷</h2>
  `))
});

app.get('/boss', async (req, res) => {
  const bosses = await BossInfo.findAll({
    order: [
      ['price', 'DESC'],
    ],
  });
  const schedule = await ScheduleList.findAll({
    order: [
      ['views', 'DESC'],
    ],
  });
  const favoritetemplate = template.favoritetable(bosses, schedule);
  const bosstemplate = template.bosstable(bosses);
  let script = 'boss = document.getElementsByName(\'chk_boss[]\');';
  schedule.forEach((sche, idx) => {
    let first = 1;
    script += `document.getElementById('fav_${idx + 1}').addEventListener('click', () => { check([`;
    const addScript = [] as string[];
    bosses.forEach((boss) => {
      if (sche.data[boss.id.toString()]) {
        addScript.push(`${boss.id.toString()}`);
      }
    });
    script += addScript.join(', ') + ']);});';
  });
  script += `
  const check = (numbers) => {
    numbers.forEach((numb) => {
      console.log("hi" + numb);
      boss[numb].checked = true;
    });
  };
  `;
  const html = template.html('보스 계획표', `
  <h2>★보스 주간 수입 계산기★</h2>
  <div class = "discription">
      <ul>
          <li>자신이 잡을 수 있는 모든 보스들을 체크하기만 하면 준비 끝!</li>
          <li>사람들이 자주 사용하는 세팅은 좌측 리스트에 모아놓았다! 클릭만 하면 세팅 완료!</li>
      </ul>
  </div>
  <form action = '/boss/result' method = 'body'>
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
      ${script}
  </script>
  `);
  res.send(html);
});

app.post<any, any, {
  chk_boss: number[],
  chk_refill: number[] | null,
  num_party: number[],
}>('/boss/result', (req, res) => {
  BossInfo.findAll({
    order: [
      ['price', 'DESC'],
    ],
  }).then((boss) => {
    const upperBoss = new Set<string>();
    const { body } = req;
    let limit = 60;
    let dayBossLimit = 7;
    let sum = 0;
    body.chk_boss.forEach((idx) => {
      if (limit === 0) return;
      dayBossLimit = 7;
      if (boss[idx].class === '주간') {
        if (boss[idx].name === '노말 윌' && upperBoss.has('윌')) return;
        else if (boss[idx].name === '노말 루시드' && upperBoss.has('루시드')) return;
        else if (boss[idx].name === '노말 데미안' && upperBoss.has('데미안')) return;
        else if (boss[idx].name === '노말 스우' && upperBoss.has('스우')) return;
        else if (boss[idx].name === '이지 시그너스' && upperBoss.has('시그너스')) return;
        if (body.chk_refill != null) {
          for (var j = 0; j < body.chk_refill.length; j++) {
            if (body.chk_refill[j] === idx) {
              sum += Math.floor(boss[idx].price / body.num_party[idx]);
              limit--;
              break;
            }
          }
        }
        sum += Math.floor(boss[idx].price / body.num_party[idx]);
        limit--;
      }
      else {
        if (boss[idx].name === '노말 핑크빈' && upperBoss.has('핑크빈')) dayBossLimit = 6;
        else if (boss[idx].name === '이지 파풀라투스' && upperBoss.has('파풀라투스')) return;
        else if (boss[idx].name === '이지 매그너스' && upperBoss.has('매그너스')) return;
        else if (boss[idx].name === '이지 아카이럼' && upperBoss.has('아카이럼')) return;
        else if ((boss[idx].name === '이지 반 레온' || boss[idx].name === '노말 반 레온') && upperBoss.has('반 레온')) return;
        else if ((boss[idx].name === '이지 혼테일' || boss[idx].name === '노말 혼테일') && upperBoss.has('혼테일')) return;
        else if (boss[idx].name === '이지 자쿰' && upperBoss.has('자쿰')) return;
        if (limit >= dayBossLimit) {
          sum += Math.floor(boss[idx].price / body.num_party[idx]) * dayBossLimit;
          limit -= dayBossLimit;
          console.log(sum);
          console.log(limit);
        }
        else {
          sum += Math.floor(boss[idx].price / body.num_party[idx]) * limit;
          limit = 0;
        }
      }
      if (limit === 0) {
        return;
      }
      if (boss[idx].id === 2) {
        upperBoss.add('윌');
      }
      else if (boss[idx].id === 3) {
        upperBoss.add('루시드');
      }
      else if (boss[idx].id === 4) {
        upperBoss.add('데미안');
      }
      else if (boss[idx].id === 5) {
        upperBoss.add('스우');
      }
      else if (boss[idx].id === 19) {
        upperBoss.add('시그너스');
      }
      else if (boss[idx].id === 20) {
        upperBoss.add('핑크빈');
      }
      else if (boss[idx].id === 23) {
        upperBoss.add('파풀라투스');
      }
      else if (boss[idx].id === 24) {
        upperBoss.add('매그너스');
      }
      else if (boss[idx].id === 25) {
        upperBoss.add('아카이럼');
      }
      else if (boss[idx].id === 26 || boss[idx].id === 27) {
        upperBoss.add('반 레온');
      }
      else if (boss[idx].id === 29 || boss[idx].id === 33) {
        upperBoss.add('혼테일');
      }
      else if (boss[idx].id === 42) {
        upperBoss.add('자쿰');
      }
    });
    const html = template.html('보스 계획표', `
    <h2>★보스 주간 수입 계산기★</h2>
    <div id="grid">${sum}</div>
    `);
    res.send(html);
  });
});

dbInit();

app.listen(3010, () => {
  console.log('Server start on port: 3010');
});