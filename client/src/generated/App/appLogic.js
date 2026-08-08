import { useState, useRef } from 'react';

import loadSecretKey from './../../assets/wasm/SecretKey';
import {propsSuggestedNovels, propsShowNovels, propsUpdatedNovels, propsLeftOfShortNovel, propsRightOfShortNovels} from 
'./../layouts/main-layout/Main/mainLogic';
import {propsReviewNovels, propsNovelsList} from './../layouts/main-layout/Aside/asideLogic';
import {propsTrendNovelsInMonth} from './../layouts/main-layout/Footer/footerLogic';

let data = {};
let tempData = {};
let lastUpdatedTime = {};

let setLastUpdatedTime = {
    suggestedNovels: "", selectedTranslationNovels: "", updatedNovels: "", fullNovels: "", leftOfShortNovel: "", rightOfShortNovels: "", 
    reviewNovels: "", topGoodNovels: "", newUpdateNovels: "", trendNovelsInMonth: ""
};

const propsFunction = {
    suggestedNovels: propsSuggestedNovels, selectedTranslationNovels: propsShowNovels, updatedNovels: propsUpdatedNovels, 
    fullNovels: propsShowNovels, leftOfShortNovel: propsLeftOfShortNovel, rightOfShortNovels: propsRightOfShortNovels, 
    reviewNovels: propsReviewNovels, topGoodNovels: propsNovelsList, newUpdateNovels: propsNovelsList, 
    trendNovelsInMonth: propsTrendNovelsInMonth
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

const propsSimpleListOfNovels = (name, cssContainer) => {
    const novels = tempData[name];

    for (const novel of novels) {
        novel.image = require(`./../../assets/images/${novel.image}`);
        novel.cssContainer = cssContainer;
    }

    data[name] = novels;
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
                propsFunction[section](section);
                setLastUpdatedTime[section](updatedTime[section]);
            }
        }

        lastUpdatedTime = json.lastUpdatedTime;
        setTimeout(requestData, 5000);
    });
}

{
    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:4000/data", false);//data.json is located in public folder
    request.setRequestHeader('x-key', getKey());
    request.send();

    const text = request.responseText;
    const json = JSON.parse(text);

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

export {data, tempData, propsFunction, propsSimpleListOfNovels, useUpdate};