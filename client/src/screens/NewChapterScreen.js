import React from 'react';
import Grid from '../components/Grid';

const NewChapterScreen = () => {
  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={8} md={8} lg={8}>
          <p className='title'>New Chapter</p>
        </Grid>
      </Grid>
    </>
  );
};

export default NewChapterScreen;
