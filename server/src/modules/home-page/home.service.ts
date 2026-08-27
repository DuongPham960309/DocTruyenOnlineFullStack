import pool from '../../config/db.js';

interface Home {lastUpdatedTime: SectionsStringValue, data: SectionData};

type SectionsStringValue = Sections<string, string, string, string, string, string, string, string, string, string>;

interface Sections<
  _SuggestedNovels, 
  _SelectedTranslationNovels,
  _UpdatedNovels,
  _FullNovels,
  _LeftOfShortNovel,
  _RightOfShortNovels,
  _ReviewNovels,
  _TopGoodNovels,
  _NewUpdateNovels,
  _TrendNovelsInMonth
> {
  suggestedNovels: _SuggestedNovels,
  selectedTranslationNovels: _SelectedTranslationNovels,
  updatedNovels: _UpdatedNovels,
  fullNovels: _FullNovels,
  leftOfShortNovel: _LeftOfShortNovel,
  rightOfShortNovels: _RightOfShortNovels,
  reviewNovels: _ReviewNovels,
  topGoodNovels: _TopGoodNovels,
  newUpdateNovels: _NewUpdateNovels,
  trendNovelsInMonth: _TrendNovelsInMonth
};

type SectionData = Sections<
  FullNovelInfo,
  FullNovelInfo,
  NovelInfo,
  FullNovelInfo,
  ShortNovelFormat,
  ShortNovelFormatArray,
  ShortNovelFormatArray,
  NovelsListFormatArray,
  NovelsListFormatArray,
  string[]
>;

type FullNovelInfo = ({
  image: string,
  note: string,
  time: string
} & NovelInfo)[];

interface NovelInfo {
  before: string, 
  name: string, 
  after: string, 
  chapter: string
};

interface ShortNovelFormat {image: string, title: string};

type ShortNovelFormatArray = ShortNovelFormat[];

type NovelsListFormatArray = {title: string, view: string}[];

const queryString: SectionsStringValue = {
  suggestedNovels: `SELECT novels.name, novels.before, novels.after, novels.image, suggested_novels.chapter FROM suggested_novels JOIN 
  novels ON suggested_novels.name = novels.name ORDER BY id`,
  selectedTranslationNovels: `SELECT novels.name, novels.before, novels.after, novels.image, selected_translation_novels.chapter FROM 
  selected_translation_novels JOIN novels ON selected_translation_novels.name = novels.name ORDER BY id`,
  updatedNovels: `SELECT name, novels.before, after, note, current_chapter AS chapter, last_time FROM novels WHERE first_time != last_time 
  ORDER BY last_time DESC LIMIT 25`,
  fullNovels: `SELECT novels.name, novels.before, novels.after, novels.image, novels.current_chapter AS chapter FROM full_novels JOIN 
  novels ON full_novels.name = novels.name ORDER BY id`,
  leftOfShortNovel: `SELECT image, title FROM short_novels WHERE short_novels.group = 'leftOfShortNovel'`,
  rightOfShortNovels: `SELECT image, title FROM short_novels WHERE short_novels.group = 'rightOfShortNovels' ORDER BY id`,
  reviewNovels: `SELECT image, title FROM review_novels ORDER BY id`,
  topGoodNovels: `SELECT name AS title, view FROM novels ORDER BY view DESC LIMIT 10`,
  newUpdateNovels: `SELECT name AS title, view FROM novels WHERE first_time = last_time ORDER BY first_time DESC LIMIT 10`,
  trendNovelsInMonth: `SELECT name FROM trend_novels_in_month ORDER BY id`
};

const sectionNames = Object.keys(queryString) as (keyof SectionsStringValue)[];

const getHomePageData = async (): Promise<Home> => {
  const queriedData = {lastUpdatedTime: {}, data: {}} as Home;
  const data = queriedData.data;

  await getLastUpdatedTime(queriedData.lastUpdatedTime);
  await Promise.all(sectionNames.map(sectionName => queryOfGetMethod(data, sectionName)));

  data.leftOfShortNovel = (data.leftOfShortNovel as unknown as [ShortNovelFormat])[0];
  data.trendNovelsInMonth = (data.trendNovelsInMonth as unknown as {name: string}[]).map(row => row.name);

  return queriedData;
}

const getLastUpdatedTime = async (lastUpdatedTime: SectionsStringValue): Promise<void> => {
  try {
    const [rows] = (await pool.query(`SELECT * FROM last_updated_time`)) as unknown as [
      {section: keyof SectionsStringValue, time: string}[]
    ];
    
    for (const row of rows) {
      lastUpdatedTime[row.section] = row.time;
    }
  } catch (error) {
    console.error(`\x1b[31m lastUpdatedTime: ${error}\x1b[0m`);
  }
}

const queryOfGetMethod = async <SectionName extends keyof SectionData>(data: SectionData, property: SectionName) => {
  try {
    [data[property]] = (await pool.query(queryString[property])) as unknown as [SectionData[SectionName]];
  } catch (error) {
    console.error(`\x1b[31m ${property}: ${error}\x1b[0m`);
  }
}

const postHomePageData = async (updatedTime: SectionsStringValue): Promise<Home> => {
  const queriedData = {lastUpdatedTime: {}, data: {}} as Home;
  const data = queriedData.data;
  let lastUpdatedTime = queriedData.lastUpdatedTime;

  await getLastUpdatedTime(queriedData.lastUpdatedTime);
  await Promise.allSettled(sectionNames.map(sectionName => queryOfPostMethod(updatedTime, sectionName, queriedData)));

  if (updatedTime.leftOfShortNovel !== lastUpdatedTime.leftOfShortNovel) {
    data.leftOfShortNovel = (data.leftOfShortNovel as unknown as [ShortNovelFormat])[0];
  }

  if (updatedTime.trendNovelsInMonth !== lastUpdatedTime.trendNovelsInMonth) {
    data.trendNovelsInMonth = (data.trendNovelsInMonth as unknown as {name: string}[]).map(row => row.name);
  }

  return queriedData;
}

const queryOfPostMethod = async <SectionName extends keyof SectionsStringValue>(
  updatedTime: SectionsStringValue, property: SectionName, queriedData: Home
) => {
  if (updatedTime[property] !== queriedData.lastUpdatedTime[property]) {
    try {
      [queriedData.data[property]] = (await pool.query(queryString[property])) as unknown as [SectionData[SectionName]];
    } catch (error) {
      console.error(`\x1b[31m ${property}: ${error}\x1b[0m`);
      queriedData.lastUpdatedTime[property] = updatedTime[property];
    }
  }
}

export {getHomePageData, postHomePageData};