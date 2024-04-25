import React, { useEffect, useState } from 'react';
import './App.scss';
import { GoodsList } from './GoodsList';

import { getAll, get5First, getRedGoods } from './api/goods';
import { Good } from './types/Good';
// or
// import * as goodsAPI from './api/goods';

export const App: React.FC = () => {
  const [goods, setGoods] = useState<Good[]>([]);

  const loadAll = () => {
    getAll().then(setGoods);
  };

  const load5First = () => {
    get5First().then(setGoods);
  };

  const loadRedGoods = () => {
    getRedGoods().then(setGoods);
  };

  useEffect(() => {
    const API_URL_COLORS = `https://localhost: 5000/colors`;
    const API_URL_GOODS = `https://localhost: 5000/goods`;

    Promise.all([fetch(API_URL_COLORS), fetch(API_URL_GOODS)])
      .then(data => Promise.all(data.map(item => item.json())))
      // eslint-disable-next-line no-console
      .then(data =>
        data[1].map((item: Good[]) => ({
          ...item,
          color: data[0].find(color => color.id === item.colord)?.name,
        })),
      )
      // eslint-disable-next-line no-console
      .then(data => console.log(data));
  }, []);

  return (
    <div className="App">
      <h1>Dynamic list of Goods</h1>

      <button type="button" data-cy="all-button" onClick={loadAll}>
        Load all goods
      </button>

      <button type="button" data-cy="first-five-button" onClick={load5First}>
        Load 5 first goods
      </button>

      <button type="button" data-cy="red-button" onClick={loadRedGoods}>
        Load red goods
      </button>

      <GoodsList goods={goods} />
    </div>
  );
};
