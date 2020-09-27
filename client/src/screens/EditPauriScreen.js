import React, { useState, useEffect, useContext } from 'react';
import Grid from '../components/Grid';
import { Link, useParams } from 'react-router-dom';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import EditPauri from '../components/EditPauri';
import { fetchGet } from '../helpers/fetchHelper';
import { Context as EditPauriFormContext } from '../context/EditPauriFormContext';

const EditPauriScreen = () => {
  const { initializeFormState } = useContext(EditPauriFormContext);
  const { id } = useParams();

  useEffect(() => {
    const fetchPauri = async () => {
      const res = await fetchGet(`/pauris/${id}/full`);
      console.log(res);
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      initializeFormState(res.pauri);
    };
    fetchPauri();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <h1 className='title'>Edit Pauri</h1>
        </Grid>

        <Grid column={true} sm={12} md={10} lg={10}>
          <EditPauri pauriId={id} />
        </Grid>
      </Grid>
    </>
  );
};

export default EditPauriScreen;
