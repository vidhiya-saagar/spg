import React, { useState, useEffect } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import Grid from './Grid';

const AddPauri = () => {
  const [currentPauri, setCurrentPauri] = useState(2);
  const [currentChhandName, setCurrentChhandName] = useState('Kabitt');
  const [currentChhandNumber, setCurrentChhandNumber] = useState(2);

  return (
    <>
      <Grid alignItems='flex-end' justify='center'>
        <Grid column={true} sm={8} md={8} lg={8}>
          <div className={`${AddPauriStyles.TableData}`}>
            Current Pauri (Not created yet)
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
            {currentPauri}
          </div>
          <div
            className={`${AddPauriStyles.TableData} ${AddPauriStyles.TableDataRight}`}
          >
            {currentChhandName}
          </div>
          <div
            className={`${AddPauriStyles.TableData} ${AddPauriStyles.TableDataRight}`}
          >
            {currentChhandNumber}
          </div>
        </Grid>
      </Grid>

      <p className={`${AddPauriStyles.Warning} ${AddPauriStyles.Bold}`}>
        Do not skip tuks!
      </p>
    </>
  );
};

export default AddPauri;
