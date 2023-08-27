import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';
import { formStore } from './store';
import { IndexPage } from './pages';

class App extends React.Component<any, any> {
    render(): React.ReactNode {
        return (
            <Router>
                <Routes>
                    <Route path={'/'} element={<IndexPage formStore={formStore}/>} />
                </Routes>
            </Router>
        );
    }

}

export default App;
