import * as headerData from './../DataNotUpdate/headerData';
import * as Common from './Common';
import logo from "./../images/logo.png";

const Header = () => {
    return (
        <header className="header">
            <nav className="max-width-main mx-auto">
                <div className="d-flex flex-wrap mx-nav-negative">
                    <ReadNovelOnline />
                    <ItemsList 
                    cssIcon="d-block fa fa-tags color-main-list" item="Thể loại" cssTable={headerData.cssTable_} 
                    rows={headerData.listOfTypeNovels} 
                    />
                    <ItemsList 
                    cssIcon="d-block fa fa-list color-main-list" item="Sắp xếp" cssTable={headerData.cssTable_} 
                    rows={headerData.arrange} 
                    />
                    <UpLoad />
                    <Search />
                    <LogIn />
                </div>
            </nav>
        </header>
    );
}
export default Header;

const ReadNovelOnline = () => {
    return (
        <div className="d-flex align-items-center p-item-main title-main-hover" title="doc truyen online">
            <img className="d-block img" src={logo} alt="" />
            <h1><a className="d-inline-block color-main-list" href="#0">Doc Tryen Online</a></h1>
        </div>
    );
}

const ItemsList = props => {
    return (
        <div className="max-460-none d-flex-edit align-items-center p-item-main position-relative hover-show">
            <i className={props.cssIcon}></i>
            <ItemNav item={props.item} />
            <Common.TableOfList cssTable={props.cssTable} rows={props.rows} />
        </div>
    );
}

const UpLoad = () => {
    return (
        <div className="d-flex align-items-center p-item-main bg-upload" title="Đăng truyện">
            <i className="d-block fa fa-cloud-upload color-main-list"></i>
            <ItemNav item="Đăng truyện" />
        </div>
    );
}

const Search = () => {
    return (
        <form className="d-flex  p-item-main col" action="">
            <input className="d-block col" type="text" placeholder="Tìm truyện, tác giả..." />
            <button className="d-block ml-sub-item" type="button"><i className="d-block fa fa-search"></i></button>
        </form>
    );
}

const LogIn = () => {
    return (
        <div className="max-778-none d-flex-edit align-items-center p-item-main log-in-hover" title="Đăng nhập">
            <i className="d-block fa fa-user color-main-list"></i>
            <ItemNav item="Thành viên" />
        </div>
    );
}

const ItemNav = props => {
    return <div><p className="d-inline-block pl-item color-main-list item-main-hover">{props.item}</p></div>;
}