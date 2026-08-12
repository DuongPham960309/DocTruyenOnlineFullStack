import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'font-awesome/css/font-awesome.min.css';

import './../../App.css';
import './appLogic';
import Header from './../layouts/main-layout/Header/HeaderUI';
import Main from './../layouts/main-layout/Main/MainUI';
import Aside from './../layouts/main-layout/Aside/AsideUI';
import Footer from './../layouts/main-layout/Footer/FooterUI';

function App() {
    return <>
        <Header />
        <div className="content">
            <div className="max-width-main mx-auto">
                <div className="d-flex flex-wrap mh-content-negative">
                    <Main />
                    <Aside />
                </div>
            </div>
        </div>
        <Footer />
    </>;
}

export default App;