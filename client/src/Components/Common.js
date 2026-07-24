import { useUpdate } from './../updatedData';

const TableOfList = props => {
    return <table className={props.cssTable}>
        <tbody>
        {props.rows.map((row, i) =>
            <tr key={i}>
            {row.map(column => 
                <td key={column.type} className={column.cssTd} colSpan={column.colSpan} title={column.title}>
                    <a className={column.cssLink} href="#0">
                        <i className={column.cssIcon}></i>
                        <div><p className={column.cssType}>{column.type}</p></div>
                    </a>
                </td>
            )}
            </tr>
        )}
        </tbody>
    </table>
}

const TitleSection = ({title}) => {
    return <h2><span className="hover-t-decoration" title={title}>{title}</span> <i className="fa fa-angle-right"></i></h2>;
}

const More = props => {
    return <div className="d-flex">
        <a className="d-flex align-items-center justify-content-center text-white mx-auto pill" title={props.title} href="#0">
            <p className="d-inline-block hover-t-decoration">XEM THÊM</p>
            <i className="d-inline-block fa fa-angle-down"></i>
        </a>
    </div>
}

const SimpleListOfNovels = props => {
    useUpdate(props.nameUpdateTime);

    return (
        <div className="right-novel">
        {props.novels.map(novel =>
            <div key={novel.title} className={novel.cssContainer}>
                <img src={novel.image} alt="" title={novel.title} />
                <a className="text-dark hover-t-decoration" title={novel.title} href="#0">{novel.title}</a>
            </div>
        )}
        </div>
    );
}

export {TableOfList, TitleSection, More, SimpleListOfNovels};