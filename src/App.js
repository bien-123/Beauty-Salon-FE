import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { Fragment } from 'react';

import HomeLayoutUser from './layouts/HomeLayoutUser/HomeLayoutUser';
import HomeLayoutAdmin from './layouts/HomeLayoutAdmin/HomeLayoutAdmin';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = HomeLayoutUser; //set Layout = DefaultLayout

                        // nếu có layout thì đặt là layout
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            // nếu Layout bằng null thì Layout = Fragment(ko có Layout)
                            Layout = Fragment;
                        } // còn lại là LayoutDefault
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Fragment>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </Fragment>
                                }
                            />
                        );
                    })}

                    {privateRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Fragment>
                                        <HomeLayoutAdmin>
                                            <Page />
                                        </HomeLayoutAdmin>
                                    </Fragment>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
