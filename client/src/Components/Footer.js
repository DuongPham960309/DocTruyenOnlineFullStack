import React from "react";

import { useUpdate } from './../updatedData';
import * as footerData from './../DataNotUpdate/footerData';
import dmca from "./../images/dmca.png";
import ccBy from "./../images/ccBy.png";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="max-width-main mx-auto">
                <div className="bg-dark p-top-novel-month">
                    <h2 className="text-white h2">Top truyện nổi bật của tháng</h2>
                    <div><TrendNovelsInMonth /></div>
                </div>
                <div className="d-flex flex-wrap pv-description">
                    <div className="max-860-w-full col-8">
                        <Paragraph text={footerData.text1} />
                        <Paragraph text={footerData.text2} />
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
    );
}
export default Footer;

let TrendNovelsInMonthCount = 1;//create to check update data, it will be delete when app is deployed
const TrendNovelsInMonth = props => {console.log(`render TrendNovelsInMonth: ${Math.floor(++TrendNovelsInMonthCount/2)} times`);//create to check update data, it will be delete when app is deployed
    useUpdate("trendNovelsInMonth");

    return window.data.trendNovelsInMonth.map(novel => 
        <a key={novel} className="d-inline-block top-novel hover-t-decoration" href="#0">{novel}</a>
    );
}

const Paragraph = props => {
    return <p className="text-white">{
        props.text.map((text, i) =>
            <React.Fragment key={i}>{(typeof text === "string") ? text : HighLigh(text)}</React.Fragment>
        )
    }</p>;
}

const HighLigh = data => {
    return <a className="text-link hover-t-decoration" title={data.title} href="#0">{data.marker}</a>;
}