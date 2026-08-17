import React from "react";

import type {ParagraphText, MarkerTitle} from './footerLogic';
import {trendNovelsInMonthData, text1, text2} from './footerLogic';
import {useUpdate} from '../shared/CommonLogic';
import dmca from './assets/images/dmca.png';
import ccBy from './assets/images/ccBy.png';

const Footer = () => {
    return <>
        <footer className="footer">
            <div className="max-width-main mx-auto">
                <div className="bg-dark p-top-novel-month">
                    <h2 className="text-white h2">Top truyện nổi bật của tháng</h2>
                    <div><TrendNovelsInMonth /></div>
                </div>
                <div className="d-flex flex-wrap pv-description">
                    <div className="max-860-w-full col-8">
                        <Paragraph texts={text1} />
                        <Paragraph texts={text2} />
                        <p className="text-white">Website hoạt động dưới <a className="text-link hover-t-decoration" href="/#">Giấy phép truy 
                            cập mở Creative Commons Attributio 4.0 International License.</a>
                        </p>
                        <div className="d-flex align-items-center">
                            <a className="pr-logo" title="DMCA.com Protection Program" href="/#"><img src={dmca} alt=""/></a>
                            <a title="Creative Commons License" href="#0"><img src={ccBy} alt=""/></a>
                        </div>
                    </div>
                    <div className="max-860-w-full col-4">
                        <p className="text-white text-center">Copy right 2021 <HighLigh title="https://dtruyen.com" marker="DTruyen.Com" /></p>
                    </div>
                </div>
            </div>
        </footer>
    </>
}

const TrendNovelsInMonth = () => {
    useUpdate("trendNovelsInMonth");

    return <>
        {trendNovelsInMonthData.map(novel => 
            <a key={novel} className="d-inline-block top-novel hover-t-decoration" href="#0">{novel}</a>
        )}
    </>
}

const Paragraph = ({texts}: {texts: ParagraphText}) => {
    return <p className="text-white">{
        texts.map((text, i) =>
            <React.Fragment key={i}>{(typeof text === "string") ? text : HighLigh(text)}</React.Fragment>
        )
    }</p>;
}

const HighLigh = ({title, marker}: MarkerTitle) => {
    return <a className="text-link hover-t-decoration" title={title} href="#0">{marker}</a>;
}

export default Footer;