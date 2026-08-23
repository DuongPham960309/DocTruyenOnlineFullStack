import {getImageUrl} from '../../../App/appLogic';

type TTableRowOfList = {
  type: string, 
  title: string, 
  cssTd: string, 
  colSpan: number, 
  cssLink: string, 
  cssIcon: string, 
  cssType: string
}[][];

interface SectionDeclaration {
  sectionName: string,
  nameUpdateTime: string
}

type TSimpleNovels = SimpleNovel[];

interface SimpleNovel {
  title: string,
  image: string
};

const getSimpleListOfNovels = (novels: TSimpleNovels): TSimpleNovels => {
  for (const novel of novels) {
    novel.image = getImageUrl(novel.image);
  }

  return novels;
}

export type {TTableRowOfList, SectionDeclaration, TSimpleNovels, SimpleNovel};
export {getSimpleListOfNovels};