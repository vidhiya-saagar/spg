import React, { useState, useEffect, useContext } from 'react';
import Grid from '../components/Grid';
import { Link, useParams } from 'react-router-dom';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import AddPauriStyles from '../stylesheets/components/AddPauriStyles.module.css';
import EditPauri from '../components/EditPauri';
import SideChars from '../components/SideChars';
import { fetchGet } from '../helpers/fetchHelper';
import { CodeBlock, a11yLight } from 'react-code-blocks';
import Select from 'react-select';
import Submit from '../components/Submit';

import { Context as EditPauriFormContext } from '../context/EditPauriFormContext';
import { Context as GranthContext } from '../context/GranthContext';

const EditPauriScreen = () => {
  const { initializeFormState } = useContext(EditPauriFormContext);
  const { state: granthState, fetchSpgStatus } = useContext(GranthContext);
  const { id } = useParams();
  const [selectedChhand, setSelectedChhand] = useState(null);
  const [chhandOptions, setChhandOptions] = useState([]);
  useEffect(() => {
    const fetchPauri = async () => {
      const res = await fetchGet(`/pauris/${id}/full`);
      debugger;
      initializeFormState(res.pauri);
      setSelectedChhand(res.chhand);
      fetchAllChhandsForChapterId(res.chapter.id);
    };

    const fetchAllChhandsForChapterId = async (chapterId) => {
      const res = await fetchGet(`/chhands?chapter_id=${chapterId}`);
      setChhandOptions(
        res.chhands.map((chhand) => {
          return {
            value: chhand,
            label: `#${chhand.order_number} (${chhand.chhand_name_english})`,
          };
        })
      );
    };

    fetchPauri();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chapterCode = `
  {
    id: ${selectedChhand?.id},
    chhand_type: {
      chhand_name_english: "${selectedChhand?.chhand_name_english}"
    },
    order_number: ${selectedChhand?.order_number}
  }
  `;

  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log(selectedChhand);
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: 20,
      fontFamily: 'Josefin Sans',
      borderWidth: 1.4,
      borderColor: '#e1e1e1',
      letterSpacing: 1,
      color: '#242424',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: '0.75rem',
      paddingRight: '0.75rem',
    }),
  };

  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <h1 className='title'>Edit Pauri</h1>
        </Grid>

        <Grid column={true} sm={12} md={8} lg={8}>
          {/* Chapter */}
          <div className='spg-form'>
            <div className='form-element'>
              <label htmlFor='chapterNumber'>Chhand</label>
              <CodeBlock
                theme={a11yLight}
                text={chapterCode}
                language={'json'}
                showLineNumbers={false}
                wrapLines={false}
                codeBlock
                customStyle={{ borderRadius: 20, marginBottom: 15 }}
              />
            </div>

            {/* Selected Chhand  */}
            <div className='form-element'>
              <label htmlFor='chhand'>Chhand Type</label>
              <Select
                defaultValue={{
                  value: selectedChhand,
                  label: `#${selectedChhand?.order_number} (${selectedChhand?.chhand_name_english})`,
                }}
                onChange={(sel) => setSelectedChhand(sel.value)}
                options={chhandOptions}
                styles={selectStyles}
              />
            </div>
          </div>
        </Grid>

        <Grid column={true} sm={12} md={10} lg={10}>
          <EditPauri pauriId={id} />
        </Grid>

        <Grid column={true} sm={12} md={1} lg={1}>
          <SideChars />
        </Grid>
      </Grid>
    </>
  );
};

export default EditPauriScreen;
