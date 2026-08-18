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

interface ISimpleNovelsData {reviewNovels: TSimpleNovels, rightOfShortNovels: TSimpleNovels};

type TSimpleNovels = {
  title: string,
  cssContainer: string,
  image: any
}[];

const simpleNovelsData = {reviewNovels: {}, rightOfShortNovels: {}} as ISimpleNovelsData;

const useUpdate = (name: string): void => {
  [, setLastUpdatedTime[name]] = useState(lastUpdatedTime[name]);
}

const propsSimpleListOfNovels = (tempData: TSimpleNovels, name: SimpleListName, cssContainer: string): void => {
  for (const novel of tempData) {
    novel.image = require(`../../assets/images/${novel.image}`);
    novel.cssContainer = cssContainer;
  }

  simpleNovelsData[name] = tempData;
}

export type {TTableRowOfList, SimpleListName, TSimpleNovels};
export {simpleNovelsData, useUpdate, propsSimpleListOfNovels};