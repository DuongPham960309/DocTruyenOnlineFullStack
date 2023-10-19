import { useUpdate } from './../updatedData';
import typeNovelsListData from '../DataNotUpdate/asideData.js';
import * as Common from './Common';

const Aside = () => {
    return <aside className="max-860-w-full col-4">
        <div className="m-content">
            <TypeNovelsList />
            <ReviewNovels />
            <NovelsList sectionName="TOP TRUYỆN HAY" novels={window.data.topGoodNovels} nameUpdateTime='topGoodNovels' />
            <NovelsList sectionName="TRUYỆN MỚI ĐĂNG" novels={window.data.newUpdateNovels} nameUpdateTime='newUpdateNovels' />
        </div>
    </aside>
}
export default Aside;

const TypeNovelsList = () => {
    return (
        <section className="bg-white type-novel">
            <Common.TitleSection title="THỂ LOẠI TRUYỆN" />
            <Common.TableOfList cssTable="table bg-white w-100" rows={typeNovelsListData} />
        </section>
    );
}

const ReviewNovels = () => {
    const sectionName = "REVIEW TRUYỆN";

    return (
        <section className="bg-white review-novel">
            <Common.TitleSection title={sectionName} />
            <Common.SimpleListOfNovels novels={window.data.reviewNovels} nameUpdateTime="reviewNovels" />
            <Common.More title={sectionName} />
        </section>
    );
}

const NovelsList = props => {
    return <section className="bg-white">
        <Common.TitleSection title={props.sectionName} />
        <table className="table top-list"><tbody><RankList novels={props.novels} nameUpdateTime={props.nameUpdateTime} /></tbody></table>
        <Common.More title={props.sectionName} />
    </section>
}

let RankListCount = 3;//create to check update data, it will be delete when app is deployed
const RankList = props => {console.log(`render RankList: ${Math.floor(++RankListCount/4)} times`);//create to check update data, it will be delete when app is deployed
    useUpdate(props.nameUpdateTime);

    return props.novels.map(novel =>
        <tr key={novel.title}>
            <td className={novel.cssRank}>{novel.rank}</td>
            <td>
                <a className="d-inline-block text-dark hover-t-decoration" title={novel.title} href="#0">{novel.title}</a>
                <div className="d-flex align-items-center view text-secondary">
                    <i className="fa fa-eye"></i>
                    <p>{novel.view}</p>
                </div>
            </td>
        </tr>
    );
}