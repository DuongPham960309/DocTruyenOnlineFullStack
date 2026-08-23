import {getImageUrl} from '../../../App/appLogic';
import {SectionDeclaration, SimpleNovel} from '../shared/CommonLogic';

type TCarousels = {cssCarousel: string, novels: TNovels}[];

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

interface IShowNovels extends SectionDeclaration {
  haveNovelTypes: boolean
}

const getCarousels = (novels: TNovels): TCarousels => {
  let length = Math.ceil(novels.length/3);
  const carousels: TCarousels = new Array(length);

  for (let i = 0; i < length; i++) {
    carousels[i] = {cssCarousel: "carousel-item", novels: []};
  }

  length = novels.length;

  for (let i = 0; i < length; i++) {
    novels[i].image = getImageUrl(novels[i].image);
    novelTitle(novels[i]);
    carousels[Math.floor(i/3)].novels.push(novels[i]);
  }

  carousels[0].cssCarousel = "carousel-item active";

  return carousels;
}

const novelTitle = (novel: INovel): void => {
  novel.title = [novel.before, novel.name, novel.after].filter(Boolean).join(" ");
}

const getDescriptionNovels = (novels: TNovels): TNovels => {
  for (const novel of novels) {
    novel.image = getImageUrl(novel.image);
    novelTitle(novel);
  }

  return novels;
}

const getUpdatedNovelsList = (novels: TNovels): TNovels => {
  let millisecondsDelta: number;
  const currentTime = new Date("2023-11-11T09:00:00Z");
  let time: number;

  for (const novel of novels)
  {
    let lastTime = new Date((novel as any).last_time);
    millisecondsDelta = currentTime.getTime() - lastTime.getTime();
    time = Math.floor(millisecondsDelta/86400000);

    if (time > 0) {
      novel.time = time + " ngày trước";
    } else {
      time = Math.floor(millisecondsDelta/3600000);

      if (time > 0) {
        novel.time = time + " giờ trước";
      } else {
        time = Math.floor(millisecondsDelta/60000);

        if (time > 0) {
          novel.time = time + " phút trước";
        } else {
          novel.time = "mới cập nhật";
        }
      }
    }

    novelTitle(novel);
  }

  return novels;
}

const getLeftOfShortNovel = (novel: SimpleNovel): SimpleNovel => {
  novel.image = getImageUrl(novel.image);

  return novel;
}

export type {TCarousels, IShowNovels, TNovels, INovel};
export {getCarousels, getDescriptionNovels, getUpdatedNovelsList, getLeftOfShortNovel};