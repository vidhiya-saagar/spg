import React from 'react';
import './stylesheets/App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import ChapterScreen from './screens/ChapterScreen';
import ChaptersIndexScreen from './screens/ChaptersIndexScreen';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Menu />
      </div>
      <Switch>
        <Route exact path='/'>
          <HomeScreen />
        </Route>
        <Route path='/chapters'>
          <ChaptersIndexScreen />
        </Route>
        <Route path='/chapters/:id'>
          <ChapterScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
