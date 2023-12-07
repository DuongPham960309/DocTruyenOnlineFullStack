import { useState, useRef } from 'react';

//check the existence of window.data, if window.data exists, it will be renamed, this codes will be deleted when web is deployed
//kiểm tra sự tồn tại của window.data, nếu window.data tồn tại, nó sẽ được đổi tên, đoạn code này sẽ được xóa khi web được triển khai
if (window.data !== undefined) {
    console.log("data has been defined in window object");
}
window.data = {};

if (window.tempData !== undefined) {
    console.log("data has been defined in window object");
}
window.tempData = {};

if (window.lastUpdatedTime !== undefined) {
    console.log("lastUpdatedTime has been defined in window object");
}
window.lastUpdatedTime = {};

if (window.setLastUpdatedTime !== undefined) {
    console.log("setLastUpdatedTime has been defined in window object");
}
window.setLastUpdatedTime = {
    suggestedNovels: "", selectedTranslationNovels: "", updatedNovels: "", fullNovels: "", leftOfShortNovel: "", rightOfShortNovels: "", 
    reviewNovels: "", topGoodNovels: "", newUpdateNovels: "", trendNovelsInMonth: ""
};

export const useUpdate = name => {
    let setUpdatedTime = useState(window.lastUpdatedTime[name])[1];
    let setUp = useRef(false);

    if (setUp.current === false) {
        window.setLastUpdatedTime[name] = setUpdatedTime;
        setUp.current = true;
    }
}

const propsSuggestedNovels = () => {
    let length = Math.ceil(window.tempData.suggestedNovels.length/3);
    let carousels = new Array(length);

    for (let i = 0; i < length; i++) {
        carousels[i] = {cssCarousel: "carousel-item", novels: []};
    }

    length = window.tempData.suggestedNovels.length;

    for (let i = 0; i < length; i++) {
        window.tempData.suggestedNovels[i].image = require("./images/" + window.tempData.suggestedNovels[i].image);
        titleNovel_(window.tempData.suggestedNovels[i]);
        carousels[Math.floor(i/3)].novels.push(window.tempData.suggestedNovels[i]);
    }

    carousels[0].cssCarousel = "carousel-item active";

    window.data.suggestedNovels = carousels;
}

const propsShowNovels = (name) => {
    for (let i = 0; i < window.tempData[name].length; i++) {
        window.tempData[name][i].image = require("./images/" + window.tempData[name][i].image);
    }

    window.tempData[name].forEach(titleNovel_);

    window.data[name] = window.tempData[name];
}

const propsUpdatedNovels = () => {
    window.tempData.updatedNovels.forEach(titleNovel_);

    window.data.updatedNovels = window.tempData.updatedNovels;
}

const titleNovel_ = novel => {
    novel.title = (novel.before !== "") ? (novel.before + " " + novel.name) : novel.name;
    novel.title = (novel.after !== "") ? (novel.title + " " + novel.after) : novel.title;
}

const propsLeftOfShortNovel = () => {
    window.tempData.leftOfShortNovel.image = require("./images/" + window.tempData.leftOfShortNovel.image);
    window.data.leftOfShortNovel = window.tempData.leftOfShortNovel;
}

const propsRightOfShortNovels = () => {
    propsSimpleListOfNovels("rightOfShortNovels", "d-flex pb-short-novel");
}

const propsReviewNovels = () => {
    propsSimpleListOfNovels("reviewNovels", "d-flex p-short-novel");
}

const propsSimpleListOfNovels = (name, cssContainer) => {
    for (let i = 0; i < window.tempData[name].length; i++) {
        window.tempData[name][i].image = require("./images/" + window.tempData[name][i].image);
        window.tempData[name][i].cssContainer = cssContainer;
    }

    window.data[name] = window.tempData[name];
}

const propsNovelsList = (name) => {
    let numberNovels = window.tempData[name].length;
    let count = numberNovels.toString().length;
    let novel;

    for (let i = 0; i < numberNovels; i++) {
        novel = window.tempData[name][i];
        novel.rank = (i + 1) + "";
        novel.rank = novel.rank.padStart(count, "0");
        novel.cssRank = "rank text-under-r-3";
    }

    window.tempData[name][0].cssRank = "rank text-r-1";
    window.tempData[name][1].cssRank = "rank text-r-2";
    window.tempData[name][2].cssRank = "rank text-r-3";

    window.data[name] = window.tempData[name];
}

const propsTrendNovelsInMonth = () => {
    window.data.trendNovelsInMonth = window.tempData.trendNovelsInMonth;
}

let count = 1;//create to check update data, it will be delete when app is deployed
const requestData = () => {
    fetch("http://localhost:4000/data", {
        method:'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(window.lastUpdatedTime)
    })
    .then(response => response.json())
    .then(json => {
        let updatedTime = json.lastUpdatedTime;

        for (let section in json.lastUpdatedTime) {//create to check update data, it will be delete when app is deployed
            json.lastUpdatedTime[section] = json.lastUpdatedTime[section] + (++count);
        }

        window.tempData = json.data;

        for (let section in updatedTime) {
            if (updatedTime[section] !== window.lastUpdatedTime[section]) {
                propsFunction[section](section);
                window.setLastUpdatedTime[section](updatedTime[section]);
            }
        }

        window.lastUpdatedTime = json.lastUpdatedTime;
        setTimeout(requestData, 5000);
    });
}

const propsFunction = {
    suggestedNovels: propsSuggestedNovels, selectedTranslationNovels: propsShowNovels, updatedNovels: propsUpdatedNovels, 
    fullNovels: propsShowNovels, leftOfShortNovel: propsLeftOfShortNovel, rightOfShortNovels: propsRightOfShortNovels, 
    reviewNovels: propsReviewNovels, topGoodNovels: propsNovelsList, newUpdateNovels: propsNovelsList, 
    trendNovelsInMonth: propsTrendNovelsInMonth
};

{
    let request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4000/data", false);//data.json is located in public folder
    request.send();

    let text = request.responseText;
    let json = JSON.parse(text);

    window.tempData = json.data;

    for (let section in json.lastUpdatedTime) {
        propsFunction[section](section);
    }

    for (let section in json.lastUpdatedTime) {//create to check update data, it will be delete when app is deployed
        json.lastUpdatedTime[section] = json.lastUpdatedTime[section] + (++count);
    }

    window.lastUpdatedTime = json.lastUpdatedTime;
}

setTimeout(requestData, 10000);