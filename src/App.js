import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Albums from './pages/Albums';
import Artists from './pages/Artists';
import Songs from './pages/Songs';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Switch>
          <Route exact path={['/', '/artists']}>
            <Artists />
          </Route>

          <Route exact path="/albums">
            <Albums />
          </Route>

          <Route exact path="/songs">
            <Songs />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
