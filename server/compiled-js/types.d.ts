type Home = {
    lastUpdatedTime: SectionsStringValue;
    data: SectionData;
};
type SectionsStringValue = Sections<string, string, string, string, string, string, string, string, string, string>;
type Sections<_SuggestedNovels, _SelectedTranslationNovels, _UpdatedNovels, _FullNovels, _LeftOfShortNovel, _RightOfShortNovels, _ReviewNovels, _TopGoodNovels, _NewUpdateNovels, _TrendNovelsInMonth> = {
    suggestedNovels: _SuggestedNovels;
    selectedTranslationNovels: _SelectedTranslationNovels;
    updatedNovels: _UpdatedNovels;
    fullNovels: _FullNovels;
    leftOfShortNovel: _LeftOfShortNovel;
    rightOfShortNovels: _RightOfShortNovels;
    reviewNovels: _ReviewNovels;
    topGoodNovels: _TopGoodNovels;
    newUpdateNovels: _NewUpdateNovels;
    trendNovelsInMonth: _TrendNovelsInMonth;
};
type SectionData = Sections<BasicNovelFormatArray, BasicNovelFormatArray, UpdatedNovelsFormatArray, BasicNovelFormatArray, ShortNovelFormat, ShortNovelFormatArray, ShortNovelFormatArray, NovelsListFormatArray, NovelsListFormatArray, string[]>;
type BasicNovelFormatArray = {
    image: string;
    before: string;
    name: string;
    after: string;
    note: string;
    chapter: string;
    time: string;
}[];
type UpdatedNovelsFormatArray = {
    before: string;
    name: string;
    after: string;
    chapter: string;
};
type ShortNovelFormat = {
    image: string;
    title: string;
};
type ShortNovelFormatArray = ShortNovelFormat[];
type NovelsListFormatArray = {
    title: string;
    view: string;
}[];
export type { Home, SectionsStringValue, SectionData, ShortNovelFormat };
//# sourceMappingURL=types.d.ts.map