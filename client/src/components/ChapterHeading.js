import React from 'react';
import ChapterStyles from '../stylesheets/components/ChapterStyles.module.css';
import Grid from './Grid';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import ChapterScreen from '../screens/ChapterScreen.js';

const ChapterHeading = (props) => {
  const {
    id,
    number,
    title_unicode,
    title_gs,
    title_transliteration_english,
  } = props;

  return (
    <>
      <Grid sm={12} lg={6}>
        <h1 className={ChapterStyles.ChapterTitle}>
          <Link to={`/chapters/${id}`}>Chapter {number}: </Link>
          {title_unicode}
        </h1>
      </Grid>
      <Grid sm={12} lg={6}>
        <h3 className='gurakhar'>{title_gs}</h3>
      </Grid>
      <Grid sm={12} lg={6}>
        <h4 className={ChapterStyles.EnglishTranslit}>
          {title_transliteration_english}
        </h4>
      </Grid>
    </>
  );
};

export default ChapterHeading;
