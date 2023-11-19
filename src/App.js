import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes, privateRoutes } from './routes';
import { Fragment } from 'react';

import HomeLayoutAdmin from './pages/System/HomeLayoutAdmin/HomeLayoutAdmin';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    // <HomeLayout>
                                    <Page />
                                    // </HomeLayout>
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
