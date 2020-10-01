import React, { useState, useEffect, useContext } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { Context as AddPauriFormContext } from '../context/AddPauriFormContext';
import { Context as GranthContext } from '../context/GranthContext';
import { fetchPost } from '../helpers/fetchHelper';
import {
  isGurmukhi,
  hasSpaceBeforePeriod,
  isValidGurbaniAkhar,
} from '../helpers/validationHelper';
import Submit from '../components/Submit';
import { formattedTukFormObj } from '../helpers/remap';
import {
  SweetError,
  SweetSuccess,
  SweetInputWarning,
  SweetConfirm,
} from '../components/SweetAlert.js';
import * as Yup from 'yup';

const AddPauri = () => {
  const {
    state: formState,
    updateAddPauriTextFields,
    updateFormItem,
    updateUnicodeRaw,
    updateUnicode,
    addTukForm,
    removeLastTukForm,
  } = useContext(AddPauriFormContext);

  const tukForm = formState.tukForm;
  const { state: granthState, fetchSpgStatus } = useContext(GranthContext);

  useEffect(() => {
    fetchSpgStatus();
    updateUnicodeRaw(tukForm[0].unicodeRaw, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: Finish this properly when ready
  const submitForm = async (e) => {
    e.preventDefault();
    if (!(await isValidInput())) return SweetInputWarning();
    const res = await fetchPost('/pauris', {
      chhand_id: granthState.lastChhand.id,
      pauri: formattedTukFormObj(tukForm),
      last_pauri_id: granthState.lastPauri?.id,
    });
    handleCreatePauriInChhandResponse(res);
  };

  const handleCreatePauriInChhandResponse = (res) => {
    if (res.errors?.length > 0) {
      SweetError({ text: JSON.stringify(res.errors, null, 2) });
    } else {
      SweetSuccess({
        title: `Pauri Saved!`,
        text: JSON.stringify(res.pauri, null, 2),
      });
    }
  };

  const confirmRemoveTuk = (tuk) => {
    SweetConfirm({
      title: `Are you sure you want to delete Tuk #${tuk.tukNumber}`,
    }).then((result) => {
      if (result.isConfirmed) {
        removeLastTukForm();
        SweetSuccess({
          title: 'Deleted!',
          text: 'The Tuk has been removed.',
        });
      }
    });
  };

  const isValidInput = () => {
    const valid = AddPauriSchema.validate(tukForm, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        console.log(`⚠️ Error: ${err}`);
        return false;
      });
    return valid;
  };

  // TODO: Figure out a way to display the errors better
  const AddPauriSchema = Yup.array().of(
    Yup.object().shape({
      unicode: Yup.string()
        .min(2, 'Tuk is too short.')
        .required('Required')
        .test('isGurmukhi', 'Must be Gurmukhi Unicode', isGurmukhi)
        .test(
          'hasSpaceBeforePeriod',
          "There must be a single space before the '।'",
          hasSpaceBeforePeriod
        ),
      gurmukhiScript: Yup.string()
        .min(2, 'Gurmukhi Script is too short.')
        .required('Required')
        .test(
          'isValidGurbaniAkhar',
          "Can only container ASCII letters, spaces, and the following: '&<>@|~¡¤§®°`´µ¿ÅÆæÇÍÎÏÒœˆ˜†₈['",
          isValidGurbaniAkhar
        ),
      englishTranslit: Yup.string()
        .min(2, 'English transliteration is too short.')
        .required('Required'),
      tukNumber: Yup.number().required('Required'),
    })
  );

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
              {granthState.lastPauri?.number + 1 || 'Potentially New Pauri'}
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
                        placeholder={`#${tuk.tukNumber}`}
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
                          updateUnicode(e.target.value, tuk.tukNumber);
                        }}
                        spellCheck='false'
                        value={tuk.unicode}
                      />
                    </div>

                    {/*  
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
                    */}

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
                    {tuk.tukNumber > 1 && (
                      <button
                        onClick={() => confirmRemoveTuk(tuk)}
                        type='button'
                      >
                        Remove Tuk
                      </button>
                    )}
                  </form>
                </Grid>
              </Grid>
            </div>
          );
        })}
      <button
        onClick={() =>
          isValidInput().then((valid) => {
            return valid ? addTukForm() : SweetInputWarning();
          })
        }
      >
        Add Tuk
      </button>
      <br />
      <br />
      <button onClick={submitForm} type='submit'>
        Submit
      </button>
    </>
  );
};

export default AddPauri;
