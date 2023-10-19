export const cssTable_ = "position-absolute top-100 start-0 table table-bordered bg-white w-table";

export const listOfTypeNovels = [
    [{type: "Tiên Hiệp"}, {type: "Kiếm Hiệp"}], [{type: "Ngôn Tình"}, {type: "Truyện Teen"}], [{type: "Đô Thị"}, {type: "Quân Sự"}], 
    [{type: "Lịch Sử"}, {type: "Xuyên Không"}], [{type: "Truyện Ma"}, {type: "Trinh Thám"}], [{type: "Huyền Huyễn"}, {type: "Khoa Huyễn"}], 
    [{type: "Dị Giới"}, {type: "Võng Du"}], [{type: "Truyện Ngắn"}, {type: "Truyện Cười"}], [{type: "Tiểu Thuyết"}, {type: "Review"}]
];

export const arrange = [
    [
        {cssIcon: "d-block fa fa-diamond", title: "Truyện Dịch", type: "Truyện Dịch"}, 
        {cssIcon: "d-block fa fa-refresh", title: "Truyện Mới Cập Nhật", type: "Mới Cập Nhật"}
    ],
    [
        {cssIcon: "d-block fa fa-cloud-upload", title: "Truyện Mới Đăng", type: "Mới Đăng"}, 
        {cssIcon: "d-block fa fa-eye", title: "Truyện Đọc Nhiều", type: "Xem Nhiều"}
    ],
    [
        {cssIcon: "d-block fa fa-thumbs-o-up", title: "Truyện Được Yêu Thích", type: "Yêu Thích"}, 
        {cssIcon: "d-block fa fa-signal", title: "Truyện Full", type: "Truyện Full"}
    ],
        [{cssIcon: "d-block fa fa-star", title: "Truyện Sáng Tác", type: "Thành Viên Sáng Tác"}]
];

const propsNavList_ = {cssTd: "item-sub-hover", colSpan: 1, cssLink: "d-flex align-items-center item", cssType: "d-inline-block pl-item"};

for (let i = 0; i < listOfTypeNovels.length; i++) {
    for (let j = 0; j < listOfTypeNovels[i].length; j++) {
        listOfTypeNovels[i][j] = {...listOfTypeNovels[i][j], ...propsNavList_, cssIcon: "d-block fa fa-tags"};
        listOfTypeNovels[i][j].title =  listOfTypeNovels[i][j].type.includes("Truyện") ?  
            listOfTypeNovels[i][j].type : ("Truyện " +  listOfTypeNovels[i][j].type);
    }
}
listOfTypeNovels[8][1].title = "Review Truyện";

for (let i = 0; i < arrange.length; i++) {
    arrange[i] = arrange[i].map(item => {
        return {...item, ...propsNavList_};
    });
}
arrange[0][0].cssLink = "d-flex align-items-center text-hot";
arrange[3][0].colSpan = 2;
arrange[3][0].cssLink = "d-flex align-items-center justify-content-center text-hot";