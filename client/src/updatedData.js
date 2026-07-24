import { useState, useRef } from 'react';
import loadSecretKey from "./wasm/SecretKey.js";

let data = {};
let tempData = {};
let lastUpdatedTime = {};

let setLastUpdatedTime = {
    suggestedNovels: "", selectedTranslationNovels: "", updatedNovels: "", fullNovels: "", leftOfShortNovel: "", rightOfShortNovels: "", 
    reviewNovels: "", topGoodNovels: "", newUpdateNovels: "", trendNovelsInMonth: ""
};

const secretKeyInstance = await loadSecretKey();

const getKey = () => {
    return secretKeyInstance.UTF8ToString(secretKeyInstance._createSecretKey());
}

const useUpdate = name => {
    let setUpdatedTime = useState(lastUpdatedTime[name])[1];
    let setUp = useRef(false);

    if (setUp.current === false) {
        setLastUpdatedTime[name] = setUpdatedTime;
        setUp.current = true;
    }
}

const propsSuggestedNovels = () => {
    let length = Math.ceil(tempData.suggestedNovels.length/3);
    let carousels = new Array(length);

    for (let i = 0; i < length; i++) {
        carousels[i] = {cssCarousel: "carousel-item", novels: []};
    }

    length = tempData.suggestedNovels.length;

    for (let i = 0; i < length; i++) {
        tempData.suggestedNovels[i].image = require("./images/" + tempData.suggestedNovels[i].image);
        titleNovel_(tempData.suggestedNovels[i]);
        carousels[Math.floor(i/3)].novels.push(tempData.suggestedNovels[i]);
    }

    carousels[0].cssCarousel = "carousel-item active";

    data.suggestedNovels = carousels;
}

const propsShowNovels = (name) => {
    for (let i = 0; i < tempData[name].length; i++) {
        tempData[name][i].image = require("./images/" + tempData[name][i].image);
    }

    tempData[name].forEach(titleNovel_);

    data[name] = tempData[name];
}

const propsUpdatedNovels = () => {
    tempData.updatedNovels.forEach(titleNovel_);

    let currentTime = new Date("2023-11-11T09:00:00Z");
    let updatedNovels = tempData.updatedNovels;

    for (let i = 0; i < updatedNovels.length; i++)
    {
        let lastTime = new Date(updatedNovels[i].last_time);
        let millisecondsDelta = currentTime.getTime() - lastTime.getTime();
        let time = Math.floor(millisecondsDelta/86400000);

        if (time > 0) {
            updatedNovels[i].time = time + " ngày trước";
        } else {
            time = Math.floor(millisecondsDelta/3600000);

            if (time > 0) {
                updatedNovels[i].time = time + " giờ trước";
            } else {
                time = Math.floor(millisecondsDelta/60000);

                if (time > 0) {
                    updatedNovels[i].time = time + " phút trước";
                } else {
                    updatedNovels[i].time = "mới cập nhật";
                }
            }
        }
    }

    data.updatedNovels = tempData.updatedNovels;
}

const titleNovel_ = novel => {
    novel.title = [novel.before, novel.name, novel.after].filter(Boolean).join(" ");
}

const propsLeftOfShortNovel = () => {
    tempData.leftOfShortNovel.image = require("./images/" + tempData.leftOfShortNovel.image);
    data.leftOfShortNovel = tempData.leftOfShortNovel;
}

const propsRightOfShortNovels = () => {
    propsSimpleListOfNovels("rightOfShortNovels", "d-flex pb-short-novel");
}

const propsReviewNovels = () => {
    propsSimpleListOfNovels("reviewNovels", "d-flex p-short-novel");
}

const propsSimpleListOfNovels = (name, cssContainer) => {
    for (let i = 0; i < tempData[name].length; i++) {
        tempData[name][i].image = require("./images/" + tempData[name][i].image);
        tempData[name][i].cssContainer = cssContainer;
    }

    data[name] = tempData[name];
}

const propsNovelsList = (name) => {
    let numberNovels = tempData[name].length;
    let count = numberNovels.toString().length;
    let novel;

    for (let i = 0; i < numberNovels; i++) {
        novel = tempData[name][i];
        novel.rank = (i + 1) + "";
        novel.rank = novel.rank.padStart(count, "0");
        novel.cssRank = "rank text-under-r-3";
    }

    tempData[name][0].cssRank = "rank text-r-1";
    tempData[name][1].cssRank = "rank text-r-2";
    tempData[name][2].cssRank = "rank text-r-3";

    data[name] = tempData[name];
}

const propsTrendNovelsInMonth = () => {
    data.trendNovelsInMonth = tempData.trendNovelsInMonth;
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
        let updatedTime = json.lastUpdatedTime;

        for (let section in json.lastUpdatedTime) {//create to check update data, it will be delete when app is deployed
            json.lastUpdatedTime[section] = json.lastUpdatedTime[section] + (++count);
        }

        tempData = json.data;

        for (let section in updatedTime) {
            if (updatedTime[section] !== lastUpdatedTime[section]) {
                propsFunction[section](section);
                setLastUpdatedTime[section](updatedTime[section]);
            }
        }

        lastUpdatedTime = json.lastUpdatedTime;
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
    request.setRequestHeader('x-key', getKey());
    request.send();

    let text = request.responseText;
    let json = JSON.parse(text);

    tempData = json.data;

    for (let section in json.lastUpdatedTime) {
        propsFunction[section](section);
    }

    for (let section in json.lastUpdatedTime) {//create to check update data, it will be delete when app is deployed
        json.lastUpdatedTime[section] = json.lastUpdatedTime[section] + (++count);
    }

    lastUpdatedTime = json.lastUpdatedTime;
}

setTimeout(requestData, 10000);

export {data, useUpdate};