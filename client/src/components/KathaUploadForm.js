import React, { useContext } from 'react';
import Grid from './Grid';
import ReactSelectStyles from '../stylesheets/components/ReactSelectStyles';
import Select from 'react-select';
import { Context as EditChapterKathaContext } from '../context/EditChapterKathaContext';

const KathaUploadForm = ({ key, title, publicUrl, giani }) => {
  const { state: kathaState, updateKathaFormItem } = useContext(
    EditChapterKathaContext
  );
  const kathaForm = kathaState.kathaForm;

  const gianiOptions = [
    {
      value: 1,
      label: 'Giani Harbhajan Singh Dhudikey',
    },
    {
      value: 2,
      label: 'Nihang Giani Sher Singh Ambala',
    },
    {
      value: 3,
      label: 'Sant Giani Inderjit Singh Raqbewale',
    },
    {
      value: 4,
      label: 'Bhai Sukha Singh UK',
    },
  ];

  const getGianiOption = (id) => {
    if (!id) return null;
    return gianiOptions.filter((giani) => giani.value === id)[0];
  };

  return (
    <>
      {/* <Grid alignItems='center' justify='center'> */}
      {/* <Grid column={true} sm={4} md={} lg={8}> */}
      {kathaForm?.map((katha) => {
        return (
          <>
            ID: {katha.id}
            <div className='form-element' key={katha.id}>
              {/* Katha Title: String */}
              <label htmlFor='title'>Title: </label>
              <input
                id='title'
                name='title'
                type='text'
                spellCheck='false'
                value={katha.title}
                onChange={(e) => {
                  updateKathaFormItem({
                    title: e.target.value,
                    id: katha.id,
                  });
                }}
              />
            </div>
            {/* Giani: FKID */}
            {/* Selected Chhand  */}
            <div className='form-element'>
              <label htmlFor='gianiId'>Giani: </label>
              <Select
                defaultValue={getGianiOption(katha.gianiId)}
                options={gianiOptions}
                styles={ReactSelectStyles}
                onChange={(option) => {
                  updateKathaFormItem({
                    gianiId: option.value,
                    id: katha.id,
                  });
                }}
              />
            </div>
            {/* Katha Year: Integer (OPTIONAL) */}
            <div className='form-element'>
              <label htmlFor='year'>Year: </label>
              <input
                id='year'
                name='year'
                type='number'
                value={katha.year}
                onChange={(e) => {
                  updateKathaFormItem({
                    year: e.target.value,
                    id: katha.id,
                  });
                }}
              />
            </div>
            {/* Katha S3 URL - READONLY*/}
            <div className='form-element'>
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
          </>
        );
      })}
      {/* </Grid> */}
      {/* </Grid> */}
    </>
  );
};

export default KathaUploadForm;
