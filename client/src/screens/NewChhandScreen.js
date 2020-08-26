import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import { Formik, Field, Form } from 'formik';
import { fetchGet } from '../helpers/fetchHelper';

const TextField = (props) => (
  <>
    <h1>Hi {props.name}</h1>
  </>
);

const NewChhandScreen = () => {
  const [newChhandOrderNumber, setNewChhandOrderNumber] = useState(0);

  useEffect(() => {
    const getLastChhand = async () => {
      try {
        const res = await fetchGet('/chhands/last');
        setNewChhandOrderNumber(res.chhand.order_number + 1);
      } catch (error) {
        console.log('⚠️ Error fetching the last Chhand.');
      }
    };
    getLastChhand();
  });

  const initialValues = {
    chhandType: '',
    orderNumber: '',
  };

  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={8} md={8} lg={8}>
          <p className='title'>New Chhand</p>
        </Grid>
      </Grid>

      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={8} md={8} lg={8}>
          <TextField name={'Dilraj'} />
        </Grid>
      </Grid>
    </>
  );
};

export default NewChhandScreen;
