import {useState} from 'react';

import {tempData, lastUpdatedTime, setLastUpdatedTime} from '../../../App/appLogic';

type TTableRowOfList = {
  type: string, 
  title: string, 
  cssTd: string, 
  colSpan: number, 
  cssLink: string, 
  cssIcon: string, 
  cssType: string
}[][];

interface ISimpleListOfNovels {
  novels: {
    title: string,
    cssContainer: string,
    image: any
  }[],
  nameUpdateTime: string
}

let data: any = {};

const useUpdate = (name: string): void => {
  [, setLastUpdatedTime[name]] = useState(lastUpdatedTime[name]);
}

const propsSimpleListOfNovels = (name: string, cssContainer: string): void => {
  const novels = tempData[name];

  for (const novel of novels) {
    novel.image = require(`../../assets/images/${novel.image}`);
    novel.cssContainer = cssContainer;
  }

  data[name] = novels;
}

export type {TTableRowOfList, ISimpleListOfNovels};
export {data, useUpdate, propsSimpleListOfNovels};