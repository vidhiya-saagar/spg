import React, { useState, useEffect } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { useFormik } from 'formik';

const AddPauri = () => {
  const [currentPauri, setCurrentPauri] = useState(2);
  const [currentChhandName, setCurrentChhandName] = useState('Kabitt');
  const [currentChhandNumber, setCurrentChhandNumber] = useState(2);

  const formik = useFormik({
    initialValues: {
      unicode: '',
      gurmukhiScript: '',
      englishTranslit: '',
      firstLetters: '',
      number: currentChhandNumber,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <>
      <div className={AddPauriStyles.Info}>
        <Grid alignItems='flex-end' justify='center'>
          <Grid column={true} sm={8} md={8} lg={8}>
            <div className={`${AddPauriStyles.TableData}`}>
              Current Pauri (Not created yet)
            </div>
            <div className={`${AddPauriStyles.TableData}`}>Current Chhand</div>
            <div className={`${AddPauriStyles.TableData}`}>
              Current Chhand Order
            </div>
          </Grid>

          <Grid column={true} sm={4} md={4} lg={4}>
            <div
              className={`${AddPauriStyles.TableData} ${AddPauriStyles.TableDataRight}`}
            >
              {currentPauri}
            </div>
            <div
              className={`${AddPauriStyles.TableData} ${AddPauriStyles.TableDataRight}`}
            >
              {currentChhandName}
            </div>
            <div
              className={`${AddPauriStyles.TableData} ${AddPauriStyles.TableDataRight}`}
            >
              {currentChhandNumber}
            </div>
          </Grid>
          <p className={`${AddPauriStyles.Warning} ${AddPauriStyles.Bold}`}>
            Do not skip tuks!
          </p>
        </Grid>
      </div>

      {/* // ! THIS IS WHERE THE FORM BEGINS  */}
      {/* // TODO: REFACTOR LATER */}

      <div className={AddPauriStyles.Form}>
        <Grid alignItems='flex-end' justify='center'>
          <Grid column={true} sm={12} md={12} lg={12}>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor='unicode'>Gurmukhi Unicode</label>
              <input
                id='unicode'
                name='unicode'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.unicode}
              />

              <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
              <input
                id='gurmukhiScript'
                name='gurmukhiScript'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.gurmukhiScript}
              />

              <label htmlFor='englishTranslit'>English Transliteration</label>
              <input
                id='englishTranslit'
                name='englishTranslit'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.englishTranslit}
              />

              <label htmlFor='firstLetters'>First Letters</label>
              <input
                id='firstLetters'
                name='firstLetters'
                type='text'
                onChange={formik.handleChange}
                value={formik.values.firstLetters}
              />

              <label htmlFor='number'>Tuk Number</label>
              <input
                disabled
                id='number'
                name='number'
                type='number'
                value={formik.values.number}
              />

              <button type='submit'>Submit</button>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddPauri;
