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

export type {Home, SectionsStringValue, SectionData, ShortNovelFormat};