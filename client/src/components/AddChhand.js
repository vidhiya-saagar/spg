import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import { fetchGet } from '../helpers/fetchHelper';
import { CodeBlock, a11yLight } from 'react-code-blocks';
import Select from 'react-select';

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
  const [lastChapter, setLastChapter] = useState(null);

  const [unicode, setUnicode] = useState('');
  const [selectedChhandType, setSelectedChhandType] = useState(null);

  const chapterCode = `{
    id: ${lastChapter?.id},
    number: ${lastChapter?.number},
    order_number: ${lastChapter?.order_number},
    title_unicode: "${lastChapter?.title_unicode}"
}`;

  useEffect(() => {
    const fetchAllChhandTypes = async () => {
      const res = await fetchGet('/chhand-types');
      console.log('fetchAllChhandTypes', res);
      setChhandTypeOptions(
        res.chhand_types.map((chhandType) => {
          return {
            value: chhandType.id,
            label: chhandType.chhand_name_english,
          };
        })
      );
    };

    const fetchLastChapter = async () => {
      try {
        const res = await fetchGet('/chapters?last=1');
        setLastChapter(res.chapters[0]);
      } catch (error) {
        console.log(`⚠️ Error: ${error}`);
      }
    };
    fetchAllChhandTypes();
    fetchLastChapter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid alignItems='center' justify='center'>
      <Grid sm={12} md={8} lg={8} justify='center'>
        {/* Chapter */}
        <form className='spg-form'>
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
              value={2}
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

          <button type='submit' className={`mtop15 `}>
            Submit
          </button>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddChhand;
