import React, { useContext } from 'react';
import Grid from './Grid';
import { Context as EditChapterKathaContext } from '../context/EditChapterKathaContext';

const KathaUploadForm = ({ key, title, publicUrl, giani }) => {
  const { state: kathaState } = useContext(EditChapterKathaContext);
  const kathaForm = kathaState.kathaForm;

  return (
    <>
      {/* <Grid alignItems='center' justify='center'> */}
      {/* <Grid column={true} sm={4} md={} lg={8}> */}
      {kathaForm.map((katha) => {
        return (
          <div className='form-element'>
            <p>Title: {katha.title}</p>
            <p>Giani: {katha.giani}</p>
            <p>Year: {katha.year}</p>
            <p>Public URL: {katha.publicUrl}</p>
          </div>
        );
      })}
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default KathaUploadForm;
