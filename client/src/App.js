import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'font-awesome/css/font-awesome.min.css';

import './App.css';
import './updatedData.js';
import Header from './Components/Header';
import Main from './Components/Main';
import Aside from './Components/Aside';
import Footer from './Components/Footer';

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