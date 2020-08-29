import React, { useState, useEffect, useContext } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { Context as FormContext } from '../context/FormContext';
import { fetchPost } from '../helpers/fetchHelper';
import Submit from '../components/Submit';

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
    updateAddPauriTextFields(unicode);
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
            <form onSubmit={submitForm} className='spg-form'>
              <div className='form-element'>
                <label htmlFor='unicode_raw'>Gurmukhi Unicode (Raw)</label>

                <textarea
                  id='unicode_raw'
                  name='unicode_raw'
                  type='text'
                  rows='3'
                  onChange={(e) => {
                    updateUnicodeRaw(e.target.value);
                  }}
                  value={unicodeRaw}
                />
              </div>

              <div className='form-element'>
                <label htmlFor='unicode'>Gurmukhi Unicode</label>
                <textarea
                  id='unicode'
                  name='unicode'
                  type='text'
                  rows='3'
                  onChange={(e) => {
                    updateFormItem({ unicode: e.target.value });
                  }}
                  value={unicode}
                />
              </div>

              <div className='form-element'>
                <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
                <textarea
                  id='gurmukhiScript'
                  name='gurmukhiScript'
                  type='text'
                  rows='3'
                  onChange={(e) =>
                    updateFormItem({ gurmukhiScript: e.target.value })
                  }
                  value={gurmukhiScript} // state is imported from Context
                />
              </div>

              <div className='form-element'>
                <label className='disabled' htmlFor='englishTranslit'>
                  English Transliteration
                </label>
                <input
                  id='englishTranslit'
                  name='englishTranslit'
                  readOnly
                  disabled
                  type='text'
                  value={englishTranslit}
                />
              </div>

              <div className='form-element'>
                <label className='disabled' htmlFor='firstLetters'>
                  First Letters
                </label>
                <input
                  id='firstLetters'
                  name='firstLetters'
                  readOnly
                  disabled
                  type='text'
                  value={firstLetters}
                />
              </div>

              <div className='form-element'>
                <label className='disabled' htmlFor='thamki'>
                  Thamkis
                </label>
                <input
                  id='thamki'
                  name='thamki'
                  readOnly
                  disabled
                  type='text'
                  value={thamki}
                />
              </div>

              <div className='form-element'>
                <label className='disabled' htmlFor='vishraam'>
                  Vishraam
                </label>
                <input
                  id='vishraam'
                  name='vishraam'
                  readOnly
                  disabled
                  type='text'
                  value={vishraam}
                />
              </div>

              <div className='form-element'>
                <label className='disabled' htmlFor='number'>
                  Tuk Number
                </label>
                <input
                  id='tukNumber'
                  name='tukNumber'
                  readOnly
                  disabled
                  type='number'
                  value={tukNumber}
                />
              </div>
              <Submit />
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AddPauri;
