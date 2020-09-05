import React, { useState } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import AddChhandTypeStyles from '../stylesheets/components/AddChhandTypeStyles.module.css';
import Submit from '../components/Submit';
import { fetchPost } from '../helpers/fetchHelper';
import * as Yup from 'yup';
import {
  SweetError,
  SweetSuccess,
  SweetInputWarning,
} from '../components/SweetAlert.js';
import { isGurmukhi } from '../helpers/validationHelper';

const AddChhandType = () => {
  const [unicode, setUnicode] = useState('');
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [english, setEnglish] = useState('');
  const [formErrors, setFormErrors] = useState(null);

  const createChhandType = async (e) => {
    e.preventDefault();

    if (!(await isValidInput())) return SweetInputWarning();
    const res = await fetchPost('/chhand-types', {
      chhand_name_unicode: unicode,
      chhand_name_gs: gurmukhiScript,
      chhand_name_english: english,
    });
    handleCreateChhandTypeResponse(res);
  };

  // TODO: The Yup library is... Not gonna say anything... But wtf is this
  const isValidInput = async () => {
    const valid = AddChhandTypeSchema.validate(
      {
        unicode,
        gurmukhiScript,
        english,
      },
      { abortEarly: false }
    )
      .then(() => true)
      .catch(handleFormErrors);
  };

  const handleFormErrors = (error) => {
    const errorObj = {};

    error.inner.map((e) => {
      if (errorObj[e.path]) {
        errorObj[e.path].push(e.message);
      } else {
        errorObj[e.path] = [e.message];
      }
    });
    setFormErrors(errorObj);

    return false;
  };

  const AddChhandTypeSchema = Yup.object().shape({
    unicode: Yup.string()
      .min(2, 'Chhand name is too short.')
      .required('Required')
      .test('isGurmukhi', 'Must be Gurmukhi Unicode', isGurmukhi),

    gurmukhiScript: Yup.string()
      .min(2, 'Gurmukhi Script is too short.')
      .required('Required'),

    english: Yup.string()
      .min(2, 'English transliteration is too short.')
      .required('Required'),
  });

  const handleCreateChhandTypeResponse = (res) => {
    if (res.errors?.length > 0) {
      SweetError({ text: JSON.stringify(res.errors, null, 2) });
    } else {
      SweetSuccess({
        title: `Chhand Type Saved!`,
        text: JSON.stringify(res.chhand_type, null, 2),
      });
    }
  };

  return (
    <Grid alignItems='center' justify='center'>
      <Grid column={true} sm={12} md={8} lg={6}>
        <form className='spg-form' onSubmit={createChhandType}>
          {/* Unicode */}
          <div className='form-element'>
            <label htmlFor='unicode'>Gurmukhi Unicode</label>
            <input
              id='unicode'
              name='unicode'
              type='text'
              placeholder='ਸਿਰਖੰਡੀ ਛੰਦ'
              onChange={(e) => {
                setUnicode(e.target.value);
                setGurmukhiScript(anvaad.unicode(e.target.value, true));
              }}
              value={unicode}
            />
            <p>{formErrors?.unicode && formErrors.unicode}</p>
          </div>

          {/* Gurmukhi Script */}
          <div className='form-element'>
            <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
            <input
              className='gurakhar'
              id='gurmukhiScript'
              name='gurmukhiScript'
              type='text'
              placeholder='isrKMfI CMd'
              value={gurmukhiScript}
            />
            <p>{formErrors?.gurmukhiScript && formErrors.gurmukhiScript}</p>
          </div>

          {/* English */}
          <div className='form-element'>
            <label htmlFor='english'>English</label>
            <input
              id='english'
              name='english'
              type='text'
              placeholder='Sirkhandi Chhand'
              onChange={(e) => {
                setEnglish(e.target.value);
              }}
              value={english}
            />
            <p>{formErrors?.english && formErrors.english}</p>
          </div>

          <Submit />
        </form>
      </Grid>
    </Grid>
  );
};

export default AddChhandType;
