import React, { useState, useEffect, useContext } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import '../stylesheets/components/AddPauriStyles.css';
import Grid from './Grid';
import { Context as EditPauriFormContext } from '../context/EditPauriFormContext';
import { Context as GranthContext } from '../context/GranthContext';
import { fetchPost, fetchDelete } from '../helpers/fetchHelper';
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
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';

const EditPauri = ({ pauriId }) => {
  const {
    state: editFormState,
    updateAddPauriTextFields,
    updateFormItem,
    updateUnicodeRaw,
    updateUnicode,
    addTukForm,
    removeLastTukForm,
  } = useContext(EditPauriFormContext);

  const tukForm = editFormState.tukForm;
  const originalTukForm = editFormState.originalTukForm;

  const { state: granthState, fetchSpgStatus } = useContext(GranthContext);

  useEffect(() => {
    if (!granthState.lastPauri?.id) fetchSpgStatus();
  }, [fetchSpgStatus, granthState.lastPauri]);

  const submitForm = async (e) => {
    e.preventDefault();
    if (!(await isValidInput())) return SweetInputWarning();
    const res = await fetchPost(`/pauris/${pauriId}`, {
      pauri: formattedTukFormObj(tukForm),
      chhand_id: editFormState.selectedChhand?.id,
    });
    handleEditPauriResponse(res);
  };

  const deletePauri = async (e) => {
    e.preventDefault();
  };

  const handleEditPauriResponse = (res) => {
    if (res.errors?.length > 0) {
      SweetError({ text: JSON.stringify(res.errors, null, 2) });
    } else {
      SweetSuccess({
        title: `Pauri Updated!`,
        text: JSON.stringify(res.pauri, null, 2),
      });
    }
  };

  const confirmRemoveTuk = (tuk) => {
    SweetConfirm({
      title: `Are you sure you want to delete Tuk #${tuk.tukNumber}`,
      text: 'This will delete it from the database immediately!',
    }).then((result) => {
      if (result.isConfirmed) {
        removeLastTukForm();
        deleteTuk(tuk.id);
      }
    });
  };

  const deleteTuk = async (tukId) => {
    const res = await fetchDelete(`/tuks/${tukId}`);
    if (res._deleted) {
      SweetSuccess({
        title: 'Deleted!',
        text: `The Tuk ID ${res.id} has been removed.`,
      });
    }
  };

  const isValidInput = () => {
    const valid = EditPauriSchema.validate(tukForm, { abortEarly: false })
      .then(() => true)
      .catch((err) => {
        console.log(`⚠️ Error: ${err}`);
        return false;
      });
    return valid;
  };

  const EditPauriSchema = Yup.array().of(
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
      {tukForm &&
        tukForm.map((tuk) => {
          return (
            <Grid column={true} sm={12} md={12} lg={12}>
              <Grid>
                <Grid column={true} sm={12} md={6} lg={6}>
                  <div
                    className={AddPauriStyles.Form}
                    key={tuk.tukNumber.toString()}
                  >
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
                      {tuk.tukNumber > 1 && tuk.tukNumber === tukForm.length && (
                        <button
                          onClick={() => confirmRemoveTuk(tuk)}
                          type='button'
                        >
                          Remove Tuk
                        </button>
                      )}
                    </form>
                  </div>
                </Grid>

                <Grid column={true} sm={12} md={6} lg={6}>
                  <p className={`gurakhar ${TukStyles.Large}`}>
                    {tuk.gurmukhiScript}
                  </p>
                  <ReactDiffViewer
                    oldValue={JSON.stringify(
                      originalTukForm[tuk.tukNumber - 1],
                      null,
                      2
                    )}
                    newValue={JSON.stringify(tuk, null, 2)}
                    splitView={true}
                    showDiffOnly={true}
                    hideLineNumbers={true}
                    extraLinesSurroundingDiff={1}
                  />
                </Grid>
              </Grid>
            </Grid>
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
      {granthState.lastPauri?.id === pauriId && (
        <button onClick={deletePauri} type='button'>
          Delete
        </button>
      )}
    </>
  );
};

export default EditPauri;
