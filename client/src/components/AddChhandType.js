import React, { useState } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import AddChhandTypeStyles from '../stylesheets/components/AddChhandTypeStyles.module.css';
import Submit from '../components/Submit';
import { fetchPost } from '../helpers/fetchHelper';

const AddChhandType = () => {
  const [unicode, setUnicode] = useState('');
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [english, setEnglish] = useState('');

  const createChhandType = async (e) => {
    e.preventDefault();
    const res = await fetchPost('/chhand-types', {
      chhand_name_unicode: unicode,
      chhand_name_english: english,
      chhand_name_gs: gurmukhiScript,
    });
    console.log(res);
    debugger;
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
