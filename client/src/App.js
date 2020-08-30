import React from 'react';
import './stylesheets/App.css';
import Header from './components/Header';
import Menu from './components/Menu';
import HomeScreen from './screens/HomeScreen';
import ChaptersIndexScreen from './screens/ChaptersIndexScreen';
import ChhandTypesIndexScreen from './screens/ChhandTypesIndexScreen';
import ChhandsIndexScreen from './screens/ChhandsIndexScreen';
import ChapterScreen from './screens/ChapterScreen';
import NewChapterScreen from './screens/NewChapterScreen';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider as FormContext } from './context/FormContext';

const App = () => {
  return (
    <FormContext>
      <Router>
        <div className='App'>
          <Header />
          <Menu />
        </div>
        <Switch>
          <Route exact path='/'>
            <HomeScreen />
          </Route>
          <Route exact path='/chapters'>
            <ChaptersIndexScreen />
          </Route>
          <Route exact path='/chhand-types'>
            <ChhandTypesIndexScreen />
          </Route>
          <Route exact path='/chhands'>
            <ChhandsIndexScreen />
          </Route>
          <Route exact path='/chapters/new'>
            <NewChapterScreen />
          </Route>
          <Route path='/chapters/:id'>
            <ChapterScreen />
          </Route>
        </Switch>
      </Router>
    </FormContext>
  );
};

export default App;
