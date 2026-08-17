import {tempData, propsFunction} from '../../../App/appLogic';
import type {TTableRowOfList} from '../shared/CommonLogic';
import {propsSimpleListOfNovels} from '../shared/CommonLogic';

interface INovelsList {
    sectionName: string,
    nameUpdateTime: TRankListName
}

type TRankListName = keyof IRankListData;

interface IRankListData {topGoodNovels: TNovels, newUpdateNovels: TNovels};

type TNovels = INovel[];

interface INovel {
    title: string, 
    view: string, 
    rank: string, 
    cssRank: string
};

class PropsTypeNovelList {
    constructor(type: string) {
        this.type = type;
        this.title = type;
    }

    type: string;
    title: string;
    cssTd = "";
    colSpan = 1;
    cssLink = "d-flex align-items-center text-dark";
    cssIcon = "fa fa-tags";
    cssType = "d-inline-block pl-item hover-t-decoration";
}

const typeNovelsListData = [
    ["Tiên Hiệp", "Kiếm Hiệp"], ["Truyện Teen", "Ngôn Tình"], ["Đoản Văn", "Đông Phương"], ["Gia Đấu", "Nữ Cường"], 
    ["Cung Đấu", "Truyện Sủng"], ["Truyện Ngược", "Linh Dị"], ["Thám Hiểm", "Bách Hợp"], ["Hài Hước", "Hiện Đại"], 
    ["Việt Nam", "Light Novel"], ["Nữ Phụ", "Phương Tây"], ["Mạt Thế", "Cổ Đại"], ["Điền Văn", "Đồng Nhân"], ["Trọng Sinh", "Dị Năng"], 
    ["Huyền Huyễn", "Dị Giới"], ["Võng Du", "Quân Sự"], ["Khoa Học", "Lịch Sử"], ["Truyện Khác", "Đô Thị"], ["Khoa Huyễn", "Xuyên Không"], 
    ["Truyện Ma", "Xuyên Nhanh"], ["Quan Trường", "Đam Mỹ"], ["Hệ Thống", "Tiểu Thuyết"], ["Truyện Cười", "Truyện Ngắn"], 
    ["Truyện Trinh Thám", "Truyện Sắc"]
] as unknown as TTableRowOfList;

{
    let length = typeNovelsListData.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < 2; j++) {
            typeNovelsListData[i][j] = new PropsTypeNovelList(typeNovelsListData[i][j] as unknown as string);
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            typeNovelsListData[i][j].cssLink = "d-flex align-items-center text-hot";
            typeNovelsListData[i][j].cssIcon = "fa fa-diamond";
        }
    }
}

const rankListData = {topGoodNovels: {}, newUpdateNovels: {}} as IRankListData;

const propsReviewNovels = (): void => {
    propsSimpleListOfNovels("reviewNovels", "d-flex p-short-novel");
}

const propsNovelsList = (name: TRankListName): void => {
    const novels: TNovels = tempData[name];
    const numberNovels = novels.length;
    const count = numberNovels.toString().length;
    let novel: INovel;

    for (let i = 0; i < numberNovels; i++) {
        novel = novels[i];
        novel.rank = (i + 1) + "";
        novel.rank = novel.rank.padStart(count, "0");
        novel.cssRank = "rank text-under-r-3";
    }

    novels[0].cssRank = "rank text-r-1";
    novels[1].cssRank = "rank text-r-2";
    novels[2].cssRank = "rank text-r-3";

    rankListData[name] = novels;
}

// propsFunction.reviewNovels = propsReviewNovels;
// propsFunction.topGoodNovels = propsNovelsList;
// propsFunction.newUpdateNovels = propsNovelsList;

export type {INovelsList, TRankListName};
export {rankListData, propsReviewNovels, propsNovelsList};
export default typeNovelsListData;