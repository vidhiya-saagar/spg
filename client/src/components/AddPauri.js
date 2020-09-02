import React, { useState, useEffect, useContext } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { Context as AddPauriFormContext } from '../context/AddPauriFormContext';
import { Context as GranthContext } from '../context/GranthContext';
import { fetchPost } from '../helpers/fetchHelper';
import Submit from '../components/Submit';

const regex = /[\u0A00-\u0A7F]/;
const isGurmukhi = (s) => regex.test(s);

const AddPauri = () => {
  const {
    state: formState,
    updateAddPauriTextFields,
    updateFormItem,
    updateUnicodeRaw,
  } = useContext(AddPauriFormContext);

  const { state: granthState, getSpgStatus } = useContext(GranthContext);

  const tukForm = formState.tukForm;

  useEffect(() => {
    getSpgStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   updateAddPauriTextFields(unicode);
  // }, [unicode])

  useEffect(() => {
    if (tukForm && tukForm.length > 0) {
      updateAddPauriTextFields(tukForm[0].unicode, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Finish this properly when ready
  const submitForm = async (e) => {
    e.preventDefault();
    console.log('Submitting!');
    // const res = await fetchPost(`/chhands/2/pauris`, {
    //   line_number: tukNumber,
    //   content_unicode: unicode,
    //   content_gs: gurmukhiScript,
    //   content_transliteration_english: englishTranslit,
    //   first_letters: firstLetters,
    //   thamkis: thamki,
    //   vishraams: vishraam,
    // });
  };

  return (
    <>
      <div className={AddPauriStyles.Info}>
        <Grid alignItems='flex-end' justify='center'>
          <Grid column={true} sm={8} md={8} lg={8}>
            <div className={`${AddPauriStyles.TableData}`}>
              Next Pauri # (Not created yet)
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
              {granthState.lastPauri?.number + 1 || 'N/A'}
            </div>
            <div
              className={`${AddPauriStyles.TableData} ${AddPauriStyles.TableDataRight}`}
            >
              {granthState.lastChhand?.chhand_name_english || 'N/A'}
            </div>
            <div
              className={`${AddPauriStyles.TableData} ${AddPauriStyles.TableDataRight}`}
            >
              {granthState.lastChhand?.order_number || 'N/A'}
            </div>
          </Grid>
          <p
            className={`${AddPauriStyles.Warning} ${AddPauriStyles.Bold} mtop15`}
          >
            Do not skip tuks!
          </p>
        </Grid>
      </div>

      {/* // ! THIS IS WHERE THE FORM BEGINS  */}
      {/* // TODO: REFACTOR LATER */}

      {tukForm &&
        tukForm.map((tuk) => {
          {
            console.log('tukForm', tukForm);
            console.log(
              'tuk.unicode',
              tuk.unicode,
              'tuk.tukNumber',
              tuk.tukNumber
            );
          }
          return (
            <div className={AddPauriStyles.Form} key={tuk.tukNumber.toString()}>
              <Grid alignItems='flex-end' justify='center'>
                <Grid column={true} sm={12} md={12} lg={12}>
                  <form onSubmit={submitForm} className='spg-form'>
                    <div className='form-element'>
                      <label htmlFor='unicode_raw'>
                        Gurmukhi Unicode (Raw)
                      </label>

                      <textarea
                        id='unicode_raw'
                        name='unicode_raw'
                        type='text'
                        rows='3'
                        onChange={(e) => {
                          updateUnicodeRaw(e.target.value, tuk.tukNumber);
                        }}
                        spellCheck='false'
                        value={tuk.unicodeRaw}
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
                          updateFormItem({
                            unicode: e.target.value,
                            tukNumber: tuk.tukNumber,
                          });
                        }}
                        spellCheck='false'
                        value={tuk.unicode}
                      />
                    </div>

                    <div className='form-element'>
                      <label htmlFor='unicodeVishraam'>
                        Gurmukhi (With Vishraams)
                      </label>
                      <textarea
                        id='unicodeVishraam'
                        name='unicodeVishraam'
                        type='text'
                        rows='3'
                        onChange={(e) => {
                          updateFormItem({
                            unicodeVishraam: e.target.value,
                            tukNumber: tuk.tukNumber,
                          });
                        }}
                        spellCheck='false'
                        value={tuk.unicodeVishraam}
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
                          updateFormItem({
                            gurmukhiScript: e.target.value,
                            tukNumber: tuk.tukNumber,
                          })
                        }
                        spellCheck='false'
                        value={tuk.gurmukhiScript} // state is imported from Context
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
                        spellCheck='false'
                        value={tuk.englishTranslit}
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
                        spellCheck='false'
                        value={tuk.firstLetters}
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
                        spellCheck='false'
                        value={tuk.thamki}
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
                        spellCheck='false'
                        value={tuk.vishraam}
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
                        spellCheck='false'
                        value={tuk.tukNumber}
                      />
                    </div>
                    <Submit />
                  </form>
                </Grid>
              </Grid>
            </div>
          );
        })}
    </>
  );
};

export default AddPauri;
