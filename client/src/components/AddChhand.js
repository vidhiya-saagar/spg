import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import { fetchGet } from '../helpers/fetchHelper';

const AddChhand = () => {
  const [chhandTypeOptions, setChhandTypeOptions] = useState(null);
  const [lastChapter, setLastChapter] = useState(null);

  const [unicode, setUnicode] = useState('');
  const [chhandType, setChhandType] = useState('');
  const [english, setEnglish] = useState('');

  useEffect(() => {
    const fetchAllChhandTypes = async () => {
      const res = await fetchGet('/chhand-types');
      console.log('fetchAllChhandTypes', res);
      setChhandTypeOptions(res.chhand_types);
    };

    const fetchLastChapter = async () => {
      const res = await fetchGet('/chapters?last=1');
      console.log('fetchLastChapter', res);
      setLastChapter(res.chhand_types);
    };
    // fetchAllChhandTypes();
    fetchLastChapter();
  }, []);

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
              setChhandType(anvaad.unicode(e.target.value, true));
            }}
            value={unicode}
          />

          {/* Unicode */}
          <label htmlFor='chhandType'>Gurmukhi Script</label>
          <input
            className='gurakhar'
            id='chhandType'
            name='chhandType'
            type='text'
            placeholder='isrKMfI CMd'
            value={chhandType}
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
          <button type='submit' className={`mtop15 `}>
            Submit
          </button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddChhand;
