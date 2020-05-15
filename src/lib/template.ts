import BossInfo from "src/db/BossInfo";
import ScheduleList from "src/db/ScheduleList";

const html = (title: string, body: string) =>
`
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

const bosstable = (bosses: BossInfo[]) => {
  let bosslist = '';
  bosses.forEach((boss, idx) => {
    let refill1 = '';
    let refill2 = '';
    if (boss.refill) {
      refill1 = `<input type="checkbox" name="chk_refill[]" value="${boss.id}">`;
    }
    if (idx + 1 < bosses.length) {
      if (bosses[idx + 1].refill) {
        refill2 = `<input type="checkbox" name="chk_refill[]" value="${bosses[idx + 1].id}">`;
      }
      bosslist +=
      `
      <tr>
        <td>
          <img src = "/image/boss/${boss.id}.png" width = "51.5" height = "52.5">
        </td>
        <td>${boss.name}</td>
        <td>${boss.class}</td>
        <td>${boss.price}</td>
        <td><input type="number" name="num_party[]" min="1" max="6" value=1></td>
        <td>${refill1}</td>
        <td>
          <input type="checkbox" name="chk_boss[]" value="${boss.id}">
        </td>
        <td>
          <img src = "/image/boss/${bosses[idx + 1].id}.png" width = "51.5" height = "52.5">
        </td>
        <td>${bosses[idx + 1].name}</td>
        <td>${bosses[idx + 1].class}</td>
        <td>${bosses[idx + 1].price}</td>
        <td><input type="number" name="num_party[]" min="1" max="6" value=1></td>
        <td>${refill2}</td>
        <td>
          <input type="checkbox" name="chk_boss[]" value="${bosses[idx + 1].id}">
        </td>
    </tr>
      `
    } else {
      bosslist +=
      `
        <tr>
          <td>
            <img src = "/image/boss/${boss.id}.png" width = "51.5" height = "52.5">
          </td>
          <td>${boss.name}</td>
          <td>${boss.class}</td>
          <td>${boss.price}</td>
          <td><input type="number" name="num_party[]" min="1" max="6" value=1></td>
          <td>${refill1}</td>
          <td>
            <input type="checkbox" name="chk_boss[]" value="${boss.id}">
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
  });
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
};

const favoritetable = (boss: BossInfo[], list: ScheduleList[]) => {
  let html = '<div class="btn-favorite">';
  list.forEach((schedule, idx) => {
    html += `<button type="button" class="favorite" id="fav_${idx + 1}">`;
    boss.forEach((nowBoss) => {
      if (schedule.data[nowBoss.id.toString()] === true) {
        html += `${nowBoss.name} `;
      }
    });
    html += '</button>';
  });
  html += '</div>';
  return '<p>즐겨찾기</p>' + html;
};

export default {
  html,
  favoritetable,
  bosstable,
};