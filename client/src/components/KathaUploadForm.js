import React, { useContext } from 'react';
import Grid from './Grid';
import ReactSelectStyles from '../stylesheets/components/ReactSelectStyles';
import Select from 'react-select';
import { onlyNumbers } from '../helpers/validationHelper';
import { Context as EditChapterKathaContext } from '../context/EditChapterKathaContext';
import { fetchPut, fetchPost } from '../helpers/fetchHelper';
import Styles from '../stylesheets/components/KathaUploadForm.module.css';

const saveKatha = async (katha) => {
  const res = await fetchPut(`/kathas/${katha.id}`, {
    ...katha,
  });
};

const KathaUploadForm = ({ chapterId }) => {
  const addKatha = async () => {
    const res = await fetchPost(`/chapters/${chapterId}/kathas`, {
      title: '',
      file: 'https://',
      publicUrl: 'https://',
    });
    if (res.errors === undefined) {
      window.location.reload();
    }
  };

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
      <div>
        {/* <Grid alignItems='center' justify='center'> */}
        {/* <Grid column={true} sm={4} md={} lg={8}> */}
        {kathaForm?.map((katha) => {
          return (
            <form key={katha.id}>
              <div className='form-element'>
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
                  type='text'
                  value={katha.year}
                  onChange={(e) => {
                    if (onlyNumbers(e.target.value) || e.target.value == '') {
                      updateKathaFormItem({
                        year: e.target.value,
                        id: katha.id,
                      });
                    }
                  }}
                />
              </div>
              {/* Katha File URL - READONLY*/}
              <div className='form-element'>
                {/* Katha Title: String */}
                <label htmlFor='title'>File URL: </label>
                <input
                  id='fileUrl'
                  name='fileUrl'
                  type='text'
                  value={katha.fileUrl}
                  onChange={(e) => {
                    updateKathaFormItem({
                      fileUrl: e.target.value,
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
                  value={katha.publicUrl}
                  onChange={(e) => {
                    updateKathaFormItem({
                      publicUrl: e.target.value,
                      id: katha.id,
                    });
                  }}
                />
              </div>
              <button
                type='submit'
                className={Styles.Submit}
                onClick={() => saveKatha(katha)}
              >
                Save Katha
              </button>
            </form>
          );
        })}
        {/* </Grid> */}
        {/* </Grid> */}
      </div>
      <button
        type='submit'
        className={Styles.Submit}
        onClick={() => addKatha()}
      >
        New Katha
      </button>
    </>
  );
};

export default KathaUploadForm;
