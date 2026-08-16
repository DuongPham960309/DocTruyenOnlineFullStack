import {tempData, propsFunction} from '../../../App/appLogic';
import {data, propsSimpleListOfNovels} from '../shared/CommonLogic';

interface IShowNovels extends IDescriptionNovels {
  sectionName: string, 
  haveTypeNovels: number, 
}

interface IDescriptionNovels {
  novels: INovel[], 
  nameUpdateTime: string
}

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

type ICarousels = {cssCarousel: string, novels: INovel[]}[];

const propsSuggestedNovels = () => {
  const suggestedNovels = tempData.suggestedNovels;
  let length = Math.ceil(suggestedNovels.length/3);
  const carousels = new Array(length) as ICarousels;

  for (let i = 0; i < length; i++) {
    carousels[i] = {cssCarousel: "carousel-item", novels: []};
  }

  length = suggestedNovels.length;

  for (let i = 0; i < length; i++) {
    suggestedNovels[i].image = require(`./../../../../assets/images/${suggestedNovels[i].image}`);
    titleNovel(suggestedNovels[i]);
    carousels[Math.floor(i/3)].novels.push(suggestedNovels[i]);
  }

  carousels[0].cssCarousel = "carousel-item active";

  data.suggestedNovels = carousels;
}

const titleNovel = (novel: INovel): void => {
  novel.title = [novel.before, novel.name, novel.after].filter(Boolean).join(" ");
}

const propsShowNovels = (name: string) => {
  for (const novel of tempData[name]) {
    novel.image = require(`./../../../../assets/images/${novel.image}`);
    titleNovel(novel);
  }

  data[name] = tempData[name];
}

const propsUpdatedNovels = () => {
  const updatedNovels = tempData.updatedNovels;
  updatedNovels.forEach(titleNovel);

  const currentTime = new Date("2023-11-11T09:00:00Z");

  for (const updatedNovel of updatedNovels)
  {
    let lastTime = new Date(updatedNovel.last_time);
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

  data.updatedNovels = updatedNovels;
}

const propsLeftOfShortNovel = () => {
  const leftOfShortNovel = tempData.leftOfShortNovel;

  leftOfShortNovel.image = require(`./../../../../assets/images/${leftOfShortNovel.image}`);
  data.leftOfShortNovel = leftOfShortNovel;
}

const propsRightOfShortNovels = () => {
  propsSimpleListOfNovels("rightOfShortNovels", "d-flex pb-short-novel");
}

// propsFunction.suggestedNovels = propsSuggestedNovels;
// propsFunction.selectedTranslationNovels = propsShowNovels;
// propsFunction.updatedNovels = propsUpdatedNovels;
// propsFunction.fullNovels = propsShowNovels;
// propsFunction.leftOfShortNovel = propsLeftOfShortNovel;
// propsFunction.rightOfShortNovels = propsRightOfShortNovels;

export type {IShowNovels, IDescriptionNovels, INovel, ICarousels};
export {propsSuggestedNovels, propsShowNovels, propsUpdatedNovels, propsLeftOfShortNovel, propsRightOfShortNovels};