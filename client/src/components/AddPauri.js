import React, { useState, useEffect, useCallback } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
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
    if (!isGurmukhi(values.firstLetters)) {
      errors.firstLetters = 'Must be Gurmukhi';
    }
    if (values.unicode.slice(-1) === ' ') {
      errors.unicode = 'Cannot end in a space';
    }

    // If it ends in a ।, there needs to be a space before it
    if (values.unicode.slice(-1) === '।') {
      if (values.unicode.slice(-2) !== ' ।') {
        errors.unicode = "Space issues with the '।' ";
      }
    }
  }
  return errors;
};

const AddPauri = () => {
  const [currentPauri, setCurrentPauri] = useState(2);
  const [currentChhandName, setCurrentChhandName] = useState('Kabitt');
  const [currentChhandNumber, setCurrentChhandNumber] = useState(2);

  const [unicodeRaw, setUnicodeRaw] = useState('');
  const [unicode, setUnicode] = useState('');
  const [thamki, setThamki] = useState([]);
  const [vishraam, setVishraam] = useState([]);
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [englishTranslit, setEnglishTranslit] = useState('');
  const [firstLetters, setFirstLetters] = useState('');
  const [number, setNumber] = useState(currentChhandNumber);

  const updateTextFields = useCallback(() => {
    let _gurmukhiScript = anvaad.unicode(unicode, true);
    let _englishTranslit = anvaad.translit(_gurmukhiScript);
    let _firstLetters = anvaad.firstLetters(unicode);

    setGurmukhiScript(_gurmukhiScript);
    setEnglishTranslit(_englishTranslit);
    setFirstLetters(_firstLetters);
  });

  useEffect(() => {
    setUnicode(unicodeRaw.replace(/[,.']/g, ''));
    (() => {
      updateTextFields();
    })();
  }, [unicodeRaw, updateTextFields]);

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
            <form>
              <div className='form-input-container'>
                <label htmlFor='unicode_raw'>Gurmukhi Unicode (Raw)</label>

                <input
                  id='unicode_raw'
                  name='unicode_raw'
                  type='text'
                  onChange={(e) => {
                    setUnicodeRaw(e.target.value);
                  }}
                  value={unicodeRaw}
                />
                {/* <p className='form-error'>{formik.errors.unicode}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='unicode'>Gurmukhi Unicode</label>
                <input
                  id='unicode'
                  name='unicode'
                  type='text'
                  onChange={(e) => {
                    setUnicodeRaw(e.target.value);
                    updateTextFields();
                  }}
                  value={unicode}
                />
                {/* <p className='form-error'>{formik.errors.unicode}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
                <input
                  id='gurmukhiScript'
                  name='gurmukhiScript'
                  type='text'
                  onChange={(e) => setGurmukhiScript(e.target.value)}
                  value={gurmukhiScript}
                />
                {/* <p className='form-error'>{formik.errors.gurmukhiScript}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='englishTranslit'>English Transliteration</label>
                <input
                  id='englishTranslit'
                  name='englishTranslit'
                  type='text'
                  onChange={(e) => setEnglishTranslit(e.target.value)}
                  value={englishTranslit}
                />
                {/* <p className='form-error'>{formik.errors.englishTranslit}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='firstLetters'>First Letters</label>
                <input
                  id='firstLetters'
                  name='firstLetters'
                  type='text'
                  onChange={(e) => setFirstLetters(e.target.value)}
                  value={firstLetters}
                />
                {/* <p className='form-error'>{formik.errors.firstLetters}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='number'>Tuk Number</label>
                <input
                  disabled
                  id='number'
                  name='number'
                  type='number'
                  value={number}
                />
                {/* <p className='form-error'>{formik.errors.number}</p> */}
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
