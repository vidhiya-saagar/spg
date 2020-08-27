import React from 'react';
import './stylesheets/App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import HomeScreen from './screens/HomeScreen';
import ChaptersIndexScreen from './screens/ChaptersIndexScreen';
import ChapterScreen from './screens/ChapterScreen';
import NewChapterScreen from './screens/NewChapterScreen';
import NewChhandScreen from './screens/NewChhandScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider as FormContext } from './context/FormContext';

const App = () => {
  return (
    <Router>
      <FormContext>
        <div className='App'>
          <Header />
          <Menu />
        </div>
      </FormContext>
      <Switch>
        <Route exact path='/'>
          <HomeScreen />
        </Route>
        <Route exact path='/chapters'>
          <ChaptersIndexScreen />
        </Route>
        <Route exact path='/chapters/new'>
          <NewChapterScreen />
        </Route>
        <Route exact path='/chhands/new'>
          <NewChhandScreen />
        </Route>
        <Route path='/chapters/:id'>
          <ChapterScreen />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
