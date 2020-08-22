import React from 'react';
import ChapterStyles from '../stylesheets/components/ChapterStyles.module.css';
import Grid from './Grid';

const Chapter = (props) => {
  const { title_unicode, title_gs, title_transliteration_english } = props;

  return (
    <>
      <Grid row={true}>
        <Grid column={true} sm={12} md={4}>
          <h1 className={ChapterStyles.ChapterTitle}>
            Chapter {props.number}: {props.title_unicode}
          </h1>{' '}
        </Grid>
        <Grid column={true} sm={12} md={4}>
          <h3>{props.title_gs}</h3>
        </Grid>
        <Grid column={true} sm={12} md={4}>
          <h4>{props.title_transliteration_english}</h4>
        </Grid>
      </Grid>
    </>
  );
};

export default Chapter;
