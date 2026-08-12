import {useState, useRef} from 'react';

import {tempData, lastUpdatedTime, setLastUpdatedTime} from './../../../App/appLogic';

let data = {};

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
    novel.image = require(`./../../../../assets/images/${novel.image}`);
    novel.cssContainer = cssContainer;
  }

  data[name] = novels;
}

export {data, useUpdate, propsSimpleListOfNovels};