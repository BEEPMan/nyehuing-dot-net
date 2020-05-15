import React from 'react';
import './public/Style.css';

function NyehuingMain() {
  return (
    <div>
      <script type="text/javascript" src="/nyehuing_maker.js"></script>
      <h2>★랜덤 녜힁 제조기★</h2>
      <input type="button" id="output" value="여기에 녜힁 출력"></input>
      <p>
        <input type="number" id="length" min="1" max="9" value="2"></input>
          글자의 닉네임을 생성!
        <input type='button' className='button' value='Go'></input>
      </p>
      <p>
        (!) 닉네임을 클릭시 자동으로 복사가 됩니다.(일부 브라우저 제외)
      </p>
    </div>

  );
}

export default NyehuingMain;