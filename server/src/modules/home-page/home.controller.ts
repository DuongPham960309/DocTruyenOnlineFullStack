import type {Request, Response} from 'express';

import {getHomePageData, postHomePageData} from './home.service.js';

const getHomePage = async (request: Request, response: Response) => {
  const queriedData = await getHomePageData();

  response.json(queriedData);
}

const postHomePage = async (request: Request, response: Response) => {
  const queriedData = await postHomePageData(request.body);

  response.json(queriedData);
}

export {getHomePage, postHomePage};