import loadSecretKey from '../../assets/wasm/SecretKey';
import {propsSuggestedNovels, propsShowNovels, propsUpdatedNovels, propsLeftOfShortNovel, propsRightOfShortNovels} from 
'../layouts/main-layout/Main/mainLogic';
import {propsReviewNovels, propsNovelsList} from '../layouts/main-layout/Aside/asideLogic';
import {propsTrendNovelsInMonth} from '../layouts/main-layout/Footer/footerLogic';

let tempData: any = {};
let lastUpdatedTime: any = {};

let setLastUpdatedTime: any = {
  suggestedNovels: "", selectedTranslationNovels: "", updatedNovels: "", fullNovels: "", leftOfShortNovel: "", rightOfShortNovels: "", 
  reviewNovels: "", topGoodNovels: "", newUpdateNovels: "", trendNovelsInMonth: ""
};

const propsFunction: any = {
  suggestedNovels: propsSuggestedNovels, selectedTranslationNovels: propsShowNovels, updatedNovels: propsUpdatedNovels, 
  fullNovels: propsShowNovels, leftOfShortNovel: propsLeftOfShortNovel, rightOfShortNovels: propsRightOfShortNovels, 
  reviewNovels: propsReviewNovels, topGoodNovels: propsNovelsList, newUpdateNovels: propsNovelsList, 
  trendNovelsInMonth: propsTrendNovelsInMonth
};

const secretKeyInstance: any = await loadSecretKey();

const getKey = (): string => {
  return secretKeyInstance.UTF8ToString(secretKeyInstance._createSecretKey());
}

let count = 1;//create to check update data, it will be delete when app is deployed
const requestData = () => {
  fetch("http://localhost:4000/data", {
    method:'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'x-key': getKey()
    },
    body: JSON.stringify(lastUpdatedTime)
  })
  .then(response => response.json())
  .then(json => {
    const updatedTime = json.lastUpdatedTime;

    for (let section in json.lastUpdatedTime) {//create to check update data, it will be delete when app is deployed
      json.lastUpdatedTime[section] = json.lastUpdatedTime[section] + (++count);
    }

    tempData = json.data;

    for (let section in updatedTime) {
      if (updatedTime[section] !== lastUpdatedTime[section]) {
        propsFunction[section](tempData[section], section);
        setLastUpdatedTime[section](updatedTime[section]);
      }
    }

    lastUpdatedTime = json.lastUpdatedTime;
    setTimeout(requestData, 5000);
  });
}

{
  const request = new XMLHttpRequest();
  request.open("GET", "http://localhost:4000/data", false);
  request.setRequestHeader('x-key', getKey());
  request.send();

  const text = request.responseText;
  const json = JSON.parse(text);

  tempData = json.data;

  for (let section in json.lastUpdatedTime) {
    propsFunction[section](tempData[section], section);
  }

  for (let section in json.lastUpdatedTime) {//create to check update data, it will be delete when app is deployed
    json.lastUpdatedTime[section] = json.lastUpdatedTime[section] + (++count);
  }

  lastUpdatedTime = json.lastUpdatedTime;
}

setTimeout(requestData, 10000);

export {tempData, lastUpdatedTime, setLastUpdatedTime, propsFunction};