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
          <div className='form-element' key={katha.id}>
            {/* Katha Title: String */}
            <label htmlFor='title'>Title: </label>
            <input
              id='title'
              name='title'
              type='text'
              spellCheck='false'
              value={katha.title}
            />

            {/* Katha Year: Integer (OPTIONAL) */}
            <label htmlFor='year'>Year: </label>
            <input id='year' name='year' type='number' value={katha.year} />

            {/* Katha S3 URL - READONLY*/}
            <label htmlFor='publicUrl'>Public URL: </label>
            <input
              id='publicUrl'
              name='publicUrl'
              type='text'
              readOnly
              disabled
              value={katha.publicUrl}
            />
          </div>
        );
      })}
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default KathaUploadForm;
