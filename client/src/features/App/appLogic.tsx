import {useState} from 'react';

import loadSecretKey from '../../assets/wasm/SecretKey';

const secretKeyInstance: any = await loadSecretKey();
let tempData: any = {};
let lastUpdatedTime: any = {};
const reRender: any = {};

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
        reRender[section]((prev: boolean) => !prev);
      }
    }

    lastUpdatedTime = json.lastUpdatedTime;
    setTimeout(requestData, 5000);
  });
}

const getKey = (): string => {
  return secretKeyInstance.UTF8ToString(secretKeyInstance._createSecretKey());
}

const useUpdate = (name: string, getFunction: any): any => {
  // Không xóa dòng: const data: any = structuredClone(tempData[name]); (deep copy)
  // React (development) dùng Strict Mode nên sẽ render 2 lần.
  // Nếu tham chiếu đến 1 vùng dữ liệu và sửa dữ liệu đó 2 lần có thể gây ra lỗi.
  // Ví dụ: a = 0; a = a + 1; => a = 2, thực tế a = 3.
  const data: any = structuredClone(tempData[name]);

  [, reRender[name]] = useState(false);

  return getFunction(data);
}

const getImageUrl = (imageName: string): string => {
  return `http://localhost:4000/assets/${imageName}?x-key=${getKey()}`;
}

{
  const request = new XMLHttpRequest();

  request.open("GET", "http://localhost:4000/data", false);
  request.setRequestHeader('x-key', getKey());
  request.send();

  const text = request.responseText;
  const json = JSON.parse(text);

  tempData = json.data;

  for (let section in json.lastUpdatedTime) {//create to check update data, it will be delete when app is deployed
    json.lastUpdatedTime[section] = json.lastUpdatedTime[section] + (++count);
  }

  lastUpdatedTime = json.lastUpdatedTime;
}

setTimeout(requestData, 5000);

export {useUpdate, getImageUrl};