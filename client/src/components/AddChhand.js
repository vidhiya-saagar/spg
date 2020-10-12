import React, { useState, useEffect, useContext } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import { fetchGet } from '../helpers/fetchHelper';
import { CodeBlock, a11yLight } from 'react-code-blocks';
import Select from 'react-select';
import Submit from '../components/Submit';
import {
  SweetError,
  SweetSuccess,
  SweetInputWarning,
} from '../components/SweetAlert.js';
import { fetchPost } from '../helpers/fetchHelper';
import { Context as GranthContext } from '../context/GranthContext';

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

const AddChhand = () => {
  const [chhandTypeOptions, setChhandTypeOptions] = useState([]);
  const { state: granthState, fetchSpgStatus } = useContext(GranthContext);

  const [unicode, setUnicode] = useState('');
  const [selectedChhandType, setSelectedChhandType] = useState(null);

  const chapterCode = `{
    id: ${granthState.lastChapter?.id},
    number: ${granthState.lastChapter?.number},
    order_number: ${granthState.lastChapter?.order_number},
    title_unicode: "${granthState.lastChapter?.title_unicode}"
}`;

  const createChhand = async (e) => {
    e.preventDefault();
    if (!selectedChhandType) return SweetInputWarning();
    // const orderNumber = granthState.lastChhand ? granthState.lastChhand.order_number + 1;
    const res = await fetchPost('/chhands', {
      chhand_type_id: selectedChhandType.value,
      chapter_id: granthState.lastChapter?.id,
      order_number: granthState.lastChhand?.order_number + 1 || 1,
    });
    handleCreateChhandResponse(res);
  };

  const handleCreateChhandResponse = (res) => {
    if (res.errors?.length > 0) {
      SweetError({ text: JSON.stringify(res.errors, null, 2) });
    } else {
      SweetSuccess({
        title: `Chhand Saved!`,
        text: JSON.stringify(res.chhand, null, 2),
      });
    }
  };

  useEffect(() => {
    const fetchAllChhandTypes = async () => {
      const res = await fetchGet('/chhand-types');
      setChhandTypeOptions(
        res.chhand_types.map((chhandType) => {
          return {
            value: chhandType.id,
            label: `${chhandType.chhand_name_english} (${chhandType.chhand_name_unicode})`,
          };
        })
      );
    };

    fetchSpgStatus();
    fetchAllChhandTypes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid alignItems='center' justify='center'>
      <Grid column={true} sm={12} md={8} lg={6}>
        {/* Chapter */}
        <form className='spg-form' onSubmit={createChhand}>
          <div className='form-element'>
            <label htmlFor='chapterNumber'>Chapter</label>
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

          {/* chhandOrderNumber  */}
          <div className='form-element'>
            <label htmlFor='chhandOrderNumber'>Chhand Order</label>
            <input
              id='chhandOrderNumber'
              name='chhandOrderNumber'
              readOnly
              value={granthState?.lastChhand?.order_number + 1}
            />
          </div>

          {/* Selected Chhand  */}
          <div className='form-element'>
            <label htmlFor='chhandOrderNumber'>Chhand Type</label>
            <Select
              defaultValue={selectedChhandType}
              onChange={setSelectedChhandType}
              options={chhandTypeOptions}
              styles={selectStyles}
            />
          </div>
          <Submit />
        </form>
      </Grid>
    </Grid>
  );
};

export default AddChhand;
