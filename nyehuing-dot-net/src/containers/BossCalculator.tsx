import React, { useState } from 'react';
import axios from 'axios';

const getBoss = async () => {
  try {
    return await axios.get('http://127.0.0.1:3010/calculator');
  } catch (error) {
    console.error(error);
  }
};

const countBreeds = async () => {
  const boss = await getBoss();
  if(boss?.data) {
    console.log(boss);
  }
};

const BossCalculator: React.FC = () => {
  countBreeds();
  return (
    <div>
      <h2>★보스 결정석 계산기★</h2>
    </div>
  );
};

export default BossCalculator;