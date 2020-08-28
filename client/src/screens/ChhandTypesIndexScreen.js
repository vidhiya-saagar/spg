import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import { fetchGet } from '../helpers/fetchHelper';

const ChhandTypesIndexScreen = () => {
  const [chhandTypes, setChhandTypes] = useState([]);

  useEffect(() => {
    const fetchAllChhandTypes = async () => {
      const res = await fetchGet('/chhand-types');
      setChhandTypes(res.chhandTypes);
    };
    fetchAllChhandTypes();
  }, []);

  return (
    <>
      <Grid alignItems='flex-end' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <h1 className='title'>Chhand Types</h1>
        </Grid>
        <Grid column={true} sm={12} md={10} lg={8}>
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
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Grid>
      </Grid>
    </>
  );
};

export default ChhandTypesIndexScreen;
