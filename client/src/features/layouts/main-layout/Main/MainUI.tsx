import {useUpdate} from '../../../App/appLogic';
import './main.scss';
import type {TCarousels, IShowNovels, TNovels, INovel} from './mainLogic';
import {getCarousels, getDescriptionNovels, getUpdatedNovelsList, getLeftOfShortNovel} from './mainLogic';
import {TitleSection, More, SimpleListOfNovels} from '../shared/CommonUI';
import type {SimpleNovel} from '../shared/CommonLogic';

const Main = () => {
  return <>
    <main className="max-860-w-full col-8">
      <div className="m-content">
        <SuggestedNovels />
        <ShowNovels sectionName="TRUYỆN DỊCH CHỌN LỌC" haveNovelTypes={false} nameUpdateTime="selectedTranslationNovels" />
        <UpdatedNovels />
        <ShowNovels sectionName="TRUYỆN FULL" haveNovelTypes={true} nameUpdateTime="fullNovels" />
        <ShortNovels />
      </div>
    </main>
  </>
}

const SuggestedNovels = () => {
  return <>
    <section className="bg-white">
      <TitleSection title="TRUYỆN ĐỀ CỬ" />
      <RenderNovelTypes />
      <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          <Carousels />
        </div>
        <button 
          className="carousel-control-prev size-angle-icon" 
          type="button" 
          data-bs-target="#carouselExampleControls" 
          data-bs-slide="prev"
        >
          <i className="fa fa-angle-left size-icon"></i>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
          <i className="fa fa-angle-right size-icon"></i>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </section>
  </>
}

const Carousels = () => {
  const carouselsData: TCarousels = useUpdate("suggestedNovels", getCarousels);

  return <>
    {carouselsData.map((suggestedNovels, i) =>
      <div key={i} className={suggestedNovels.cssCarousel}>
        <div className="d-grid grid-novel">
          {suggestedNovels.novels.map(novel =>
            <div key={novel.name} className="position-relative">
              <img className="d-block" src={novel.image} alt="" title={novel.title} />
              <div className="position-absolute start-0 end-0 bottom-0 bg-black-opacity p-above">
                <a className="d-block text-white text-center hover-t-decoration" title={novel.title} href="#0">
                  <NovelName novel={novel} />
                </a>
                <p className="text-white text-center">{novel.chapter}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )}
  </>
}

const ShowNovels = ({sectionName, haveNovelTypes, nameUpdateTime}: IShowNovels) => {
  return <>
    <section className="bg-white">
      <TitleSection title={sectionName} />
      {(haveNovelTypes === true) && <RenderNovelTypes />}
      <div className="row cols-novel row-cols-4 m-0">
        <DescriptionNovels nameUpdateTime={nameUpdateTime} />
      </div>
      <More title={sectionName} />
    </section>
  </>
}

const DescriptionNovels = ({nameUpdateTime}: {nameUpdateTime: string}) => {
  const novels: TNovels = useUpdate(nameUpdateTime, getDescriptionNovels);

  return <>
    {novels.map(novel =>
      <div key={novel.name} className="container-novel">
        <div>
          <img src={novel.image} alt="" title={novel.title} />
        </div>
        <div className="container-infor-novel">
          <a className="d-block text-dark hover-t-decoration" title={novel.title} href="#0">
            <NovelName novel={novel} />
          </a>
          <p className="text-secondary">{novel.chapter}</p>
        </div>
      </div>
    )}
  </>
}

const UpdatedNovels = () => {
  const sectionName = "TRUYỆN MỚI CẬP NHẬT";

  return <>
    <section className="bg-white">
      <TitleSection title={sectionName} />
      <RenderNovelTypes />
      <table className="table table-hover table-update-novel align-middle">
        <tbody>
          <UpdatedNovelsList />
        </tbody>
      </table>
      <More title={sectionName} />
    </section>
  </>
}

const UpdatedNovelsList = () => {
  const novels: TNovels = useUpdate("updatedNovels", getUpdatedNovelsList);

  return <>
    {novels.map(novel => 
      <tr key={novel.name}>
        <td className="d-flex align-items-center">
          <a className="d-inline-block text-dark hover-t-decoration title-novel-update" title={novel.title} href="#0">
            <NovelName novel={novel} />
          </a>
          {(novel.note !== "") && <p className="note text-hot size-text-secondary">{novel.note}</p>}
        </td>
        <td className="text-secondary td-secondary size-text-secondary">{novel.chapter}</td>
        <td className="text-secondary td-secondary size-text-secondary">{novel.time}</td>
      </tr>
    )}
  </>
}

const NovelName = ({novel}: {novel: INovel}) => {
  return <>
    {(novel.before !== "") && (novel.before + " ")}<cite>{novel.name}</cite>{(novel.after !== "") && (" " + novel.after)}
  </>
}

const RenderNovelTypes = () => {
  const types = ["Ngôn Tình", "Truyện Teen", "Tiên Hiệp", "Kiếm Hiệp", "Xuyên Không"];

  return <>
    <div className="d-flex flex-wrap container-type-novel">
      {types.map(type =>
        <a key={type} className="d-block text-white hover-t-decoration" href="#0">{type}</a>
      )}
    </div>
  </>
}

const ShortNovels = () => {
  return <>
    <section className="bg-white">
      <TitleSection title="TRUYỆN NGẮN" />
      <div className="d-flex flex-wrap col-short-novel row-cols-2 pb-shorts-novel">
        <LeftOfShortNovels />
        <SimpleListOfNovels nameUpdateTime="rightOfShortNovels" cssContainer='d-flex pb-short-novel' />
      </div>
    </section>
  </>
}

const LeftOfShortNovels = () => {
  const novel: SimpleNovel = useUpdate("leftOfShortNovel", getLeftOfShortNovel);

  return <>
    <div className="position-relative">
      <img src={novel.image} alt="" title={novel.title} />
      <a 
        className="d-inline-block text-white hover-t-decoration position-absolute start-0 end-0 bottom-0 p-above" 
        title={novel.title} 
        href="#0"
      >{novel.title}</a>
    </div>
  </>
}

export default Main;