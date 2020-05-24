import React, { useState, useCallback, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { resolve } from 'url';
import { json } from 'body-parser';
import { response } from 'express';

interface boss{
  id: number,
  name: string
}

const getBoss = async (): Promise<boss[]> => {
  try {
    return axios.get<boss[]>('/api/calculator').then(res => {
      return res.data;
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

const BossCalculator: React.FC = () => {
  const [bosstable, setBoss] = useState<boss[]>([]);

  const f = useCallback(() => {
    getBoss().then((res) => setBoss(res));
  }, [setBoss]);

  useEffect(() => {
    if(bosstable.length === 0) f();
  });
  
  return (
    <div>
      <h2>★보스 결정석 계산기★</h2>
      <p>{JSON.stringify(bosstable)}</p>
    </div>
  );
};

export default BossCalculator;