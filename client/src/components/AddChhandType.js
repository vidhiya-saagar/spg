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

  const createChhandType = async (e) => {
    e.preventDefault();
    const valid = await AddChhandTypeSchema.isValid({
      unicode,
      gurmukhiScript,
      english,
    });
    console.log(valid);
    debugger;
    if (!valid) return SweetInputWarning();
    const res = await fetchPost('/chhand-types', {
      chhand_name_unicode: unicode,
      chhand_name_gs: gurmukhiScript,
      chhand_name_english: english,
    });
    handleCreateChhandTypeResponse(res);
  };

  const AddChhandTypeSchema = Yup.object().shape({
    unicode: Yup.string()
      .min(2, 'Chhand name is too short.')
      .required('Required')
      .test('isGurmukhi', 'Must be Gurmukhi Unicode', isGurmukhi),

    gurmukhiScript: Yup.string()
      .min(2, 'Chhand name is too short.')
      .required('Required'),

    english: Yup.string()
      .min(2, 'Chhand name is too short.')
      .required('Required'),

    // email: Yup.string().email('Invalid email').required('Required'),
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
          </div>

          {/* Unicode */}
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
          </div>

          {/* Unicode */}
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
          </div>

          <Submit />
        </form>
      </Grid>
    </Grid>
  );
};

export default AddChhandType;
