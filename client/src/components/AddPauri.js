import React, { useState, useEffect, useContext } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { Context as FormContext } from '../context/FormContext';
import { fetchPost } from '../helpers/fetchHelper';

const regex = /[\u0A00-\u0A7F]/;
const isGurmukhi = (s) => regex.test(s);

const AddPauri = () => {
  const {
    state,
    updateAddPauriTextFields,
    updateFormItem,
    updateUnicodeRaw,
  } = useContext(FormContext);
  const {
    unicodeRaw,
    unicode,
    thamki,
    vishraam,
    gurmukhiScript,
    englishTranslit,
    firstLetters,
  } = state;

  const [currentPauri, setCurrentPauri] = useState(2);
  const [tukNumber, setTukNumber] = useState(1);
  const [currentChhandName, setCurrentChhandName] = useState('Kabitt');
  const [currentChhandNumber, setCurrentChhandNumber] = useState(2);

  useEffect(() => {
    if (unicode) updateAddPauriTextFields(unicode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unicode]);

  const submitForm = async (e) => {
    e.preventDefault();
    console.log('Submitting!');
    const res = await fetchPost(`/chhands/2/pauris`, {
      line_number: tukNumber,
      content_unicode: unicode,
      content_gs: gurmukhiScript,
      content_transliteration_english: englishTranslit,
      first_letters: firstLetters,
      thamkis: thamki,
      vishraams: vishraam,
    });
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(res);
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
            <form onSubmit={submitForm}>
              <div className='form-input-container'>
                <label htmlFor='unicode_raw'>Gurmukhi Unicode (Raw)</label>

                <input
                  id='unicode_raw'
                  name='unicode_raw'
                  type='text'
                  onChange={(e) => {
                    updateUnicodeRaw(e.target.value);
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
                    updateFormItem({ unicode: e.target.value });
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
                  onChange={(e) =>
                    updateFormItem({ gurmukhiScript: e.target.value })
                  }
                  value={gurmukhiScript} // state is imported from Context
                />
                {/* <p className='form-error'>{formik.errors.gurmukhiScript}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='englishTranslit'>English Transliteration</label>
                <input
                  id='englishTranslit'
                  name='englishTranslit'
                  type='text'
                  onChange={(e) =>
                    updateFormItem({ englishTranslit: e.target.value })
                  }
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
                  onChange={(e) =>
                    updateFormItem({ firstLetters: e.target.value })
                  }
                  value={firstLetters}
                />
                {/* <p className='form-error'>{formik.errors.firstLetters}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='thamki'>Thamkis</label>
                <input
                  id='thamki'
                  readOnly
                  name='thamki'
                  type='text'
                  value={thamki}
                />

                {/* <p className='form-error'>{formik.errors.thamki}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='vishraam'>Vishraam</label>
                <input
                  id='vishraam'
                  readOnly
                  name='vishraam'
                  type='text'
                  value={vishraam}
                />
                {/* <p className='form-error'>{formik.errors.vishraam}</p> */}
              </div>

              <div className='form-input-container'>
                <label htmlFor='number'>Tuk Number</label>
                <input
                  disabled
                  readOnly
                  id='tukNumber'
                  name='tukNumber'
                  type='number'
                  value={tukNumber}
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
