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
    <input type = "button" value = "보스 계산기" onclick = "location.href = '/boss'">
</div>
<div class = "body">
    ${body}
</div>
</body>
</html>
`;

const bosstable = (list: any) => {
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
                <td>${list[i].type}</td>
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
                <td>${list[i + 1].type}</td>
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
                <td>${list[i].type}</td>
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
};

export default { html, bosstable };