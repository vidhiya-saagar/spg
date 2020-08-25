import React from 'react';
import Grid from '../components/Grid';

const NewChhandScreen = () => {
  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={8} md={8} lg={8}>
          <p className='title'>New Chhand</p>
        </Grid>
      </Grid>
    </>
  );
};

export default NewChhandScreen;
