import React from 'react';
import Grid from '../components/Grid';

const GranthScreen = () => {
  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <h1 className='title'>
            Ath 'Shree Gur Prataap Suraj' Database
            <p className='subtitle mtop15'>
              ਅਥ 'ਸ਼੍ਹੀ ਗੁਰ ਪ੍ਰਤਾਪ ਸੂਰਜ' ਡੇਟਾਬੇਸ
            </p>
          </h1>
        </Grid>

        <Grid column={true} sm={12} md={10} lg={10}></Grid>
        <table className='mtop15'>
          <thead>
            <tr>
              <td></td>
              <td>Book ID</td>
              <td>Order Number</td>
              <td>Name</td>
              <td>Chapter Name</td>
              <td># of Chhands</td>
            </tr>
          </thead>
          {/* 
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
           */}
        </table>
      </Grid>
    </>
  );
};

export default GranthScreen;
