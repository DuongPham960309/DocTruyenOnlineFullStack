import type {TTableRowOfList, SimpleListName} from './CommonLogic';
import {simpleNovelsData, useUpdate} from './CommonLogic';

const TableOfList = ({cssTable, rows}: {cssTable: string, rows: TTableRowOfList}) => {
  return <>
    <table className={cssTable}>
      <tbody>
        {rows.map((row, i) =>
          <tr key={i}>
            {row.map(column => 
              <td key={column.type} className={column.cssTd} colSpan={column.colSpan} title={column.title}>
                <a className={column.cssLink} href="#0">
                  <i className={column.cssIcon}></i>
                  <div>
                    <p className={column.cssType}>{column.type}</p>
                  </div>
                </a>
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  </>
}

const TitleSection = ({title}: {title: string}) => {
  return <>
    <h2><span className="hover-t-decoration" title={title}>{title}</span> <i className="fa fa-angle-right"></i></h2>
  </>
}

const More = ({title}: {title: string}) => {
  return <>
    <div className="d-flex">
      <a className="d-flex align-items-center justify-content-center text-white mx-auto pill" title={title} href="#0">
        <p className="d-inline-block hover-t-decoration">XEM THÊM</p>
        <i className="d-inline-block fa fa-angle-down"></i>
      </a>
    </div>
  </>
}

const SimpleListOfNovels = ({nameUpdateTime, cssContainer}: {nameUpdateTime: SimpleListName, cssContainer: string}) => {
  useUpdate(nameUpdateTime);

  return <>
    <div className="right-novel">
      {simpleNovelsData[nameUpdateTime].map(novel =>
        <div key={novel.title} className={cssContainer}>
          <img src={novel.image} alt="" title={novel.title} />
          <a className="text-dark hover-t-decoration" title={novel.title} href="#0">{novel.title}</a>
        </div>
      )}
    </div>
  </>
}

export {TableOfList, TitleSection, More, SimpleListOfNovels};