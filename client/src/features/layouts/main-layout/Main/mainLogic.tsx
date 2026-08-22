import {propsFunction, getImageUrl} from '../../../App/appLogic';
import {SimpleNovels} from '../shared/CommonLogic';

interface IShowNovels {
  sectionName: string, 
  haveTypeNovels: number, 
  nameUpdateTime: TShowNovelsName
}

type TShowNovelsName = keyof IDescriptionNovelsData;

interface IDescriptionNovelsData {selectedTranslationNovels: TNovels, fullNovels: TNovels};

type TNovels = INovel[];

interface INovel {
  image: string,
  title: string,
  before: string,
  name: string,
  after: string,
  note: string,
  chapter: string,
  time: string
}

let carouselsData: {cssCarousel: string, novels: TNovels}[];
const descriptionNovelsData = {selectedTranslationNovels: {}, fullNovels: {}} as IDescriptionNovelsData;
let updatedNovelsListData: TNovels;
let leftOfShortNovelData: SimpleNovels;

const propsSuggestedNovels = (suggestedNovels: TNovels): void => {
  let length = Math.ceil(suggestedNovels.length/3);
  carouselsData = new Array(length);

  for (let i = 0; i < length; i++) {
    carouselsData[i] = {cssCarousel: "carousel-item", novels: []};
  }

  length = suggestedNovels.length;

  for (let i = 0; i < length; i++) {
    suggestedNovels[i].image = getImageUrl(suggestedNovels[i].image);
    titleNovel(suggestedNovels[i]);
    carouselsData[Math.floor(i/3)].novels.push(suggestedNovels[i]);
  }

  carouselsData[0].cssCarousel = "carousel-item active";
}

const titleNovel = (novel: INovel): void => {
  novel.title = [novel.before, novel.name, novel.after].filter(Boolean).join(" ");
}

const propsShowNovels = (novels: TNovels, name: TShowNovelsName): void => {
  for (const novel of novels) {
    novel.image = getImageUrl(novel.image);
    titleNovel(novel);
  }

  descriptionNovelsData[name] = novels;
}

const propsUpdatedNovels = (updatedNovelsList: TNovels): void => {
  updatedNovelsListData = updatedNovelsList;
  updatedNovelsListData.forEach(titleNovel);

  const currentTime = new Date("2023-11-11T09:00:00Z");

  for (const updatedNovel of updatedNovelsListData)
  {
    let lastTime = new Date((updatedNovel as any).last_time);
    let millisecondsDelta = currentTime.getTime() - lastTime.getTime();
    let time = Math.floor(millisecondsDelta/86400000);

    if (time > 0) {
      updatedNovel.time = time + " ngày trước";
    } else {
      time = Math.floor(millisecondsDelta/3600000);

      if (time > 0) {
        updatedNovel.time = time + " giờ trước";
      } else {
        time = Math.floor(millisecondsDelta/60000);

        if (time > 0) {
          updatedNovel.time = time + " phút trước";
        } else {
          updatedNovel.time = "mới cập nhật";
        }
      }
    }
  }
}

const propsLeftOfShortNovel = (leftOfShortNovel: SimpleNovels): void => {
  leftOfShortNovelData = leftOfShortNovel;

  leftOfShortNovelData.image = getImageUrl(leftOfShortNovelData.image);
}

// propsFunction.suggestedNovels = propsSuggestedNovels;
// propsFunction.selectedTranslationNovels = propsShowNovels;
// propsFunction.updatedNovels = propsUpdatedNovels;
// propsFunction.fullNovels = propsShowNovels;
// propsFunction.leftOfShortNovel = propsLeftOfShortNovel;
// propsFunction.rightOfShortNovels = propsRightOfShortNovels;

export type {IShowNovels, TShowNovelsName, INovel};
export {
  carouselsData, 
  descriptionNovelsData, 
  updatedNovelsListData, 
  leftOfShortNovelData, 
  propsSuggestedNovels, 
  propsShowNovels, 
  propsUpdatedNovels, 
  propsLeftOfShortNovel
};