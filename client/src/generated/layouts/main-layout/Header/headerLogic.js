const listOfTypeNovels = [
    [{type: "Tiên Hiệp"}, {type: "Kiếm Hiệp"}], [{type: "Ngôn Tình"}, {type: "Truyện Teen"}], [{type: "Đô Thị"}, {type: "Quân Sự"}], 
    [{type: "Lịch Sử"}, {type: "Xuyên Không"}], [{type: "Truyện Ma"}, {type: "Trinh Thám"}], [{type: "Huyền Huyễn"}, {type: "Khoa Huyễn"}], 
    [{type: "Dị Giới"}, {type: "Võng Du"}], [{type: "Truyện Ngắn"}, {type: "Truyện Cười"}], [{type: "Tiểu Thuyết"}, {type: "Review"}]
];

const arrange = [
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

const propsNavList = {cssTd: "item-sub-hover", colSpan: 1, cssLink: "d-flex align-items-center item", cssType: "d-inline-block pl-item"};

for (let row of listOfTypeNovels) {
    for (let i = 0; i < row.length; i++) {
        row[i] = {...row[i], ...propsNavList, cssIcon: "d-block fa fa-tags"};
        row[i].title =  row[i].type.includes("Truyện") ? row[i].type : `Truyện ${row[i].type}`;
    }
}
listOfTypeNovels[8][1].title = "Review Truyện";

for (let i = 0; i < arrange.length; i++) {
    arrange[i] = arrange[i].map(item => {
        return {...item, ...propsNavList};
    });
}
arrange[0][0].cssLink = "d-flex align-items-center text-hot";
arrange[3][0].colSpan = 2;
arrange[3][0].cssLink = "d-flex align-items-center justify-content-center text-hot";

export {listOfTypeNovels, arrange};