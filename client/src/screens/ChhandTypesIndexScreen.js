import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import { Link } from 'react-router-dom';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import { fetchGet } from '../helpers/fetchHelper';
import * as anvaad from 'anvaad-js';

const ChhandTypesIndexScreen = () => {
  const [chhandTypes, setChhandTypes] = useState([]);
  const [unicode, setUnicode] = useState('');
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [english, setEnglish] = useState('');

  useEffect(() => {
    const fetchAllChhandTypes = async () => {
      const res = await fetchGet('/chhand-types');
      setChhandTypes(res.chhandTypes);
    };
    fetchAllChhandTypes();
  }, []);

  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <h1 className='title'>Chhand Types</h1>
        </Grid>

        <Grid column={true} sm={12} md={10} lg={10}>
          <table className='mtop15'>
            <thead>
              <tr>
                <td>id</td>
                <td>Unicide</td>
                <td>Gurmukhi Script</td>
                <td>English</td>
                <td># of Chhands</td>
              </tr>
            </thead>
            <tbody>
              {chhandTypes &&
                chhandTypes.map((chhandType) => {
                  return (
                    <tr key={chhandType.id}>
                      <td>{chhandType.id}</td>
                      <td>{chhandType.chhand_name_unicode}</td>
                      <td className='gurakhar'>{chhandType.chhand_name_gs}</td>
                      <td>{chhandType.chhand_name_english}</td>
                      <td></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Grid>
      </Grid>

      <Grid alignItems='center' justify='center'>
        <Grid sm={12} md={12} lg={12}>
          <button class='spg-btn'>
            <Link to='/chhand-types/new'>New</Link>
          </button>
        </Grid>
      </Grid>

      <Grid alignItems='center' justify='center'>
        <Grid sm={12} md={8} lg={8}>
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

            <button type='submit' className='mtop15'>
              Submit
            </button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default ChhandTypesIndexScreen;
