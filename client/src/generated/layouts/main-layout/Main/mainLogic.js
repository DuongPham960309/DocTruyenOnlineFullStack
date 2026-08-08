import {data, tempData, propsFunction, propsSimpleListOfNovels} from './../../../App/appLogic';

const propsSuggestedNovels = () => {
  let length = Math.ceil(tempData.suggestedNovels.length/3);
  let carousels = new Array(length);

  for (let i = 0; i < length; i++) {
    carousels[i] = {cssCarousel: "carousel-item", novels: []};
  }

  length = tempData.suggestedNovels.length;

  for (let i = 0; i < length; i++) {
    tempData.suggestedNovels[i].image = require("./../../../../assets/images/" + tempData.suggestedNovels[i].image);
    titleNovel(tempData.suggestedNovels[i]);
    carousels[Math.floor(i/3)].novels.push(tempData.suggestedNovels[i]);
  }

  carousels[0].cssCarousel = "carousel-item active";

  data.suggestedNovels = carousels;
}

const titleNovel = novel => {
  novel.title = [novel.before, novel.name, novel.after].filter(Boolean).join(" ");
}

const propsShowNovels = (name) => {
  for (const novel of tempData[name]) {
    novel.image = require(`./../../../../assets/images/${novel.image}`);
    titleNovel(novel);
  }

  data[name] = tempData[name];
}

const propsUpdatedNovels = () => {
  tempData.updatedNovels.forEach(titleNovel);

  let currentTime = new Date("2023-11-11T09:00:00Z");
  let updatedNovels = tempData.updatedNovels;

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

  data.updatedNovels = tempData.updatedNovels;
}

const propsLeftOfShortNovel = () => {
  tempData.leftOfShortNovel.image = require("./../../../../assets/images/" + tempData.leftOfShortNovel.image);
  data.leftOfShortNovel = tempData.leftOfShortNovel;
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

export {propsSuggestedNovels, propsShowNovels, propsUpdatedNovels, propsLeftOfShortNovel, propsRightOfShortNovels};