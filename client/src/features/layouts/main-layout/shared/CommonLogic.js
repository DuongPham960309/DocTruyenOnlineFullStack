import {useState} from 'react';

import {tempData, lastUpdatedTime, setLastUpdatedTime} from './../../../App/appLogic';

let data = {};

const useUpdate = name => {
  [, setLastUpdatedTime[name]] = useState(lastUpdatedTime[name]);
}

const propsSimpleListOfNovels = (name, cssContainer) => {
  const novels = tempData[name];

  for (const novel of novels) {
    novel.image = require(`./../../../../assets/images/${novel.image}`);
    novel.cssContainer = cssContainer;
  }

  data[name] = novels;
}

export {data, useUpdate, propsSimpleListOfNovels};