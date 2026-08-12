import typeNovelsListData from './asideLogic';
import {TitleSection, TableOfList, SimpleListOfNovels, More} from './../shared/CommonUI';
import {data, useUpdate} from './../shared/CommonLogic';

const Aside = () => {
    return <aside className="max-860-w-full col-4">
        <div className="m-content">
            <TypeNovelsList />
            <ReviewNovels />
            <NovelsList sectionName="TOP TRUYỆN HAY" novels={data.topGoodNovels} nameUpdateTime='topGoodNovels' />
            <NovelsList sectionName="TRUYỆN MỚI ĐĂNG" novels={data.newUpdateNovels} nameUpdateTime='newUpdateNovels' />
        </div>
    </aside>
}

const TypeNovelsList = () => {
    return <>
        <section className="bg-white type-novel">
            <TitleSection title="THỂ LOẠI TRUYỆN" />
            <TableOfList cssTable="table bg-white w-100" rows={typeNovelsListData} />
        </section>
    </>
}

const ReviewNovels = () => {
    const sectionName = "REVIEW TRUYỆN";

    return <>
        <section className="bg-white review-novel">
            <TitleSection title={sectionName} />
            <SimpleListOfNovels novels={data.reviewNovels} nameUpdateTime="reviewNovels" />
            <More title={sectionName} />
        </section>
    </>
}

const NovelsList = ({sectionName, novels, nameUpdateTime}) => {
    return <section className="bg-white">
        <TitleSection title={sectionName} />
        <table className="table top-list"><tbody><RankList novels={novels} nameUpdateTime={nameUpdateTime} /></tbody></table>
        <More title={sectionName} />
    </section>
}

const RankList = ({novels, nameUpdateTime}) => {
    useUpdate(nameUpdateTime);

    return novels.map(novel =>
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

export default Aside;