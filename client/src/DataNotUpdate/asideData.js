class PropsTypeNovelList {
    constructor(type) {
        this.type = type;
        this.title = type;
    }

    cssTd = "";
    colSpan = 1;
    cssLink = "d-flex align-items-center text-dark";
    cssIcon = "fa fa-tags";
    cssType = "d-inline-block pl-item hover-t-decoration";
}

export const typeNovelsListData = [
    ["Tiên Hiệp", "Kiếm Hiệp"], ["Truyện Teen", "Ngôn Tình"], ["Đoản Văn", "Đông Phương"], ["Gia Đấu", "Nữ Cường"], 
    ["Cung Đấu", "Truyện Sủng"], ["Truyện Ngược", "Linh Dị"], ["Thám Hiểm", "Bách Hợp"], ["Hài Hước", "Hiện Đại"], 
    ["Việt Nam", "Light Novel"], ["Nữ Phụ", "Phương Tây"], ["Mạt Thế", "Cổ Đại"], ["Điền Văn", "Đồng Nhân"], ["Trọng Sinh", "Dị Năng"], 
    ["Huyền Huyễn", "Dị Giới"], ["Võng Du", "Quân Sự"], ["Khoa Học", "Lịch Sử"], ["Truyện Khác", "Đô Thị"], ["Khoa Huyễn", "Xuyên Không"], 
    ["Truyện Ma", "Xuyên Nhanh"], ["Quan Trường", "Đam Mỹ"], ["Hệ Thống", "Tiểu Thuyết"], ["Truyện Cười", "Truyện Ngắn"], 
    ["Truyện Trinh Thám", "Truyện Sắc"]
];
export default typeNovelsListData;

{
    let length = typeNovelsListData.length;

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < 2; j++) {
            typeNovelsListData[i][j] = new PropsTypeNovelList(typeNovelsListData[i][j]);
        }
    }

    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 2; j++) {
            typeNovelsListData[i][j].cssLink = "d-flex align-items-center text-hot";
            typeNovelsListData[i][j].cssIcon = "fa fa-diamond";
        }
    }
}