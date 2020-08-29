import React, { useState } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import AddChhandTypeStyles from '../stylesheets/components/AddChhandTypeStyles.module.css';

const AddChhandType = () => {
  const [unicode, setUnicode] = useState('');
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [english, setEnglish] = useState('');

  return (
    <Grid alignItems='center' justify='center'>
      <Grid sm={12} md={8} lg={8} justify='center'>
        <form className='spg-form'>
          {/* Unicode */}
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

          {/* Unicode */}
          <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
          <input
            className='gurakhar'
            id='gurmukhiScript'
            name='gurmukhiScript'
            type='text'
            placeholder='isrKMfI CMd'
            value={gurmukhiScript}
          />

          {/* Unicode */}
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
          <button
            type='submit'
            className={`mtop15 ${AddChhandTypeStyles.SubmitButton}`}
          >
            Submit
          </button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddChhandType;
