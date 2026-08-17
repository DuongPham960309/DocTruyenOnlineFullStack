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

type SimpleListName = keyof ISimpleNovelsData;

interface ISimpleNovelsData {reviewNovels: simpleNovels, rightOfShortNovels: simpleNovels};

type simpleNovels = {
  title: string,
  cssContainer: string,
  image: any
}[];

const simpleNovelsData = {reviewNovels: {}, rightOfShortNovels: {}} as ISimpleNovelsData;

const useUpdate = (name: string): void => {
  [, setLastUpdatedTime[name]] = useState(lastUpdatedTime[name]);
}

const propsSimpleListOfNovels = (name: SimpleListName, cssContainer: string): void => {
  const novels = tempData[name] as simpleNovels;

  for (const novel of novels) {
    novel.image = require(`../../assets/images/${novel.image}`);
    novel.cssContainer = cssContainer;
  }

  simpleNovelsData[name] = novels;
}

export type {TTableRowOfList, SimpleListName};
export {simpleNovelsData, useUpdate, propsSimpleListOfNovels};