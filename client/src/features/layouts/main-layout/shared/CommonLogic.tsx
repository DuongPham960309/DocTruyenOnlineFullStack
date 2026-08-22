import {useState, useEffect} from 'react';

import {tempData, setLastUpdatedTime, getImageUrl} from '../../../App/appLogic';

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

type TSimpleNovels = SimpleNovels[];

interface SimpleNovels {
  title: string,
  image: string
};

const simpleNovelsData = {reviewNovels: {}, rightOfShortNovels: {}} as ISimpleNovelsData;

const useUpdate = (name: string): void => {
  const [, setChangeStatus] = useState(false);

  useEffect(() => {
    setLastUpdatedTime[name] = () => setChangeStatus(prev => !prev);
  }, []);
}

const propsSimpleListOfNovels = (tempData: TSimpleNovels, name: SimpleListName): void => {
  for (const novel of tempData) {
    novel.image = getImageUrl(novel.image);
  }

  simpleNovelsData[name] = tempData;
}

export type {TTableRowOfList, SimpleListName, TSimpleNovels, SimpleNovels};
export {simpleNovelsData, useUpdate, propsSimpleListOfNovels};