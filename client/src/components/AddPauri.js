import React, { useState, useEffect } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { useFormik, Field } from 'formik';
// import * as anv from 'anvaad-js';
import * as anvaad from 'anvaad-js';
// const anvaad = require('anvaad-js');

const regex = /[\u0A00-\u0A7F]/;
const isGurmukhi = (s) => regex.test(s);

const validate = (values) => {
  const errors = {};

  for (let key in values) {
    if (values[key] === '') errors[key] = 'Required';
    if (!isGurmukhi(values.unicode)) errors.unicode = 'Must be Gurmukhi';
    if (!isGurmukhi(values.firstLetters))
      errors.firstLetters = 'Must be Gurmukhi';
  }
  // TODO: Validate that unicode is the Gurmukhi
  // TODO: Validate that unicode is the Gurmukhi
  return errors;
};

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
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const updateTextFields = (e) => {
    formik.handleChange(e);
    const val = e.target.value.trim();
    let _gurmukhiScript = anvaad.unicode(val, true);
    let _englishTranslit = anvaad.translit(_gurmukhiScript);
    let _firstLetters = anvaad.firstLetters(val);

    formik.setFieldValue('gurmukhiScript', _gurmukhiScript);
    formik.setFieldValue('englishTranslit', _englishTranslit);
    formik.setFieldValue('firstLetters', _firstLetters);
  };

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
              <div className='form-input-container'>
                <label htmlFor='unicode'>Gurmukhi Unicode</label>
                <input
                  id='unicode'
                  name='unicode'
                  type='text'
                  onChange={(e) => {
                    updateTextFields(e);
                  }}
                  value={formik.values.unicode}
                />
                <p className='form-error'>{formik.errors.unicode}</p>
              </div>

              <div className='form-input-container'>
                <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
                <input
                  id='gurmukhiScript'
                  name='gurmukhiScript'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.gurmukhiScript}
                />
                <p className='form-error'>{formik.errors.gurmukhiScript}</p>
              </div>

              <div className='form-input-container'>
                <label htmlFor='englishTranslit'>English Transliteration</label>
                <input
                  id='englishTranslit'
                  name='englishTranslit'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.englishTranslit}
                />
                <p className='form-error'>{formik.errors.englishTranslit}</p>
              </div>

              <div className='form-input-container'>
                <label htmlFor='firstLetters'>First Letters</label>
                <input
                  id='firstLetters'
                  name='firstLetters'
                  type='text'
                  onChange={formik.handleChange}
                  value={formik.values.firstLetters}
                />
                <p className='form-error'>{formik.errors.firstLetters}</p>
              </div>

              <div className='form-input-container'>
                <label htmlFor='number'>Tuk Number</label>
                <input
                  disabled
                  id='number'
                  name='number'
                  type='number'
                  value={formik.values.number}
                />
                <p className='form-error'>{formik.errors.number}</p>
              </div>

              <button type='submit'>Submit</button>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddPauri;
