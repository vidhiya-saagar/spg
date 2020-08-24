import React, { useState, useEffect } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { useFormik, Field } from 'formik';
// import * as anv from 'anvaad-js';
import * as anvaad from 'anvaad-js';
// const anvaad = require('anvaad-js');

console.log(anvaad);

const AddPauri = () => {
  const [currentPauri, setCurrentPauri] = useState(2);
  const [currentChhandName, setCurrentChhandName] = useState('Kabitt');
  const [currentChhandNumber, setCurrentChhandNumber] = useState(2);

  const validate = (values) => {
    const errors = {};

    for (let key in values) {
      if (values[key] === '') errors[key] = 'Required';
    }
    // TODO: Validate that unicode is the Gurmukhi
    // TODO: Validate that unicode is the Gurmukhi
    return errors;
  };

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
    const val = e.target.value;
    let x = { ...anvaad };
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
              <label htmlFor='unicode'>Gurmukhi Unicode</label>
              <input
                id='unicode'
                name='unicode'
                type='text'
                onChange={(e) => {
                  updateTextFields(e);
                }}
                onBlur={formik.handleBlur}
                value={formik.values.unicode}
              />
              {console.log('formikkkkzzz', formik)}
              {formik.touched.unicode && formik.errors.unicode ? (
                <div>{formik.errors.unicode}</div>
              ) : null}

              <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
              <input
                id='gurmukhiScript'
                name='gurmukhiScript'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gurmukhiScript}
              />
              {formik.touched.gurmukhiScript && formik.errors.gurmukhiScript ? (
                <div>{formik.errors.gurmukhiScript}</div>
              ) : null}

              <label htmlFor='englishTranslit'>English Transliteration</label>
              <input
                id='englishTranslit'
                name='englishTranslit'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.englishTranslit}
              />
              {formik.touched.englishTranslit &&
              formik.errors.englishTranslit ? (
                <div>{formik.errors.englishTranslit}</div>
              ) : null}

              <label htmlFor='firstLetters'>First Letters</label>
              <input
                id='firstLetters'
                name='firstLetters'
                type='text'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstLetters}
              />
              {formik.touched.firstLetters && formik.errors.firstLetters ? (
                <div>{formik.errors.firstLetters}</div>
              ) : null}

              <label htmlFor='number'>Tuk Number</label>
              <input
                disabled
                id='number'
                name='number'
                type='number'
                value={formik.values.number}
              />
              {formik.touched.number && formik.errors.number ? (
                <div>{formik.errors.number}</div>
              ) : null}

              <button type='submit'>Submit</button>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddPauri;
