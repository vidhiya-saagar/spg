import React, { useState, useEffect, useContext } from 'react';
import Grid from '../components/Grid';
import * as anvaad from 'anvaad-js';
import AddChhandTypeStyles from '../stylesheets/components/AddChhandTypeStyles.module.css';
import Submit from '../components/Submit';
import Select from 'react-select';
import ReactSelectStyles from '../stylesheets/components/ReactSelectStyles';
import { fetchPost } from '../helpers/fetchHelper';
import * as Yup from 'yup';
import { CodeBlock, a11yLight } from 'react-code-blocks';
import {
  SweetError,
  SweetSuccess,
  SweetInputWarning,
} from '../components/SweetAlert.js';
import { isGurmukhi } from '../helpers/validationHelper';
import { Context as GranthContext } from '../context/GranthContext';

const NewChapterScreen = () => {
  const [unicode, setUnicode] = useState('');
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [englishTranslit, setEnglishTranslit] = useState('');
  const [formErrors, setFormErrors] = useState(null);

  const { state: granthState, fetchSpgStatus, fetchAllBooks } = useContext(
    GranthContext
  );

  // prettier-ignore
  const chapterCode = `{
    number: ${granthState.lastChapter?.number + 1},
    order_number: ${granthState.lastChapter?.order_number + 1},
    book: {
      id: ${granthState.lastBook?.id},
      book_order: ${granthState.lastBook?.book_order}, 
      title_unicode: "${granthState.lastBook?.title_unicode}",
      title_gs: "${granthState.lastBook?.title_gs}",
      title_transliteration_english: "${granthState.lastBook?.title_transliteration_english}"
    }
}`;

  useEffect(() => {
    fetchSpgStatus();
    fetchAllBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const createChapter = async (e) => {
    e.preventDefault();
    if (!(await isValidInput())) return SweetInputWarning();
    const res = await fetchPost('/chapters', {
      title_unicode: unicode,
      title_gs: gurmukhiScript,
      title_transliteration_english: englishTranslit,
    });
    handleCreateChapterResponse(res);
  };

  const isValidInput = () => {
    const valid = NewChapterSchema.validate(
      {
        unicode,
        gurmukhiScript,
        englishTranslit,
      },
      { abortEarly: false }
    )
      .then(() => true)
      .catch(handleFormErrors);
    return valid;
  };

  const handleFormErrors = (error) => {
    const errorObj = {};

    error.inner.map((e) => {
      if (errorObj[e.path]) {
        errorObj[e.path].push(e.message);
      } else {
        errorObj[e.path] = [e.message];
      }
    });
    setFormErrors(errorObj);

    return false;
  };

  const NewChapterSchema = Yup.object().shape({
    unicode: Yup.string()
      .min(2, 'Chapter name is too short.')
      .required('Required')
      .test('isGurmukhi', 'Must be Gurmukhi Unicode', isGurmukhi),

    gurmukhiScript: Yup.string()
      .min(2, 'Gurmukhi Script is too short.')
      .required('Required'),

    englishTranslit: Yup.string()
      .min(2, 'English transliteration is too short.')
      .required('Required'),
  });

  const handleCreateChapterResponse = (res) => {
    if (res.errors?.length > 0) {
      SweetError({ text: JSON.stringify(res.errors, null, 2) });
    } else {
      SweetSuccess({
        title: `New Chapter Saved!`,
        text: JSON.stringify(res.chhand_type, null, 2),
      });
    }
  };

  return (
    <Grid alignItems='center' justify='center'>
      <Grid column={true} sm={8} md={8} lg={8}>
        <h1 className='title'>New Chapter</h1>
      </Grid>

      <Grid column={true} sm={12} md={8} lg={6}>
        <form className='spg-form' onSubmit={createChapter}>
          <CodeBlock
            theme={a11yLight}
            text={chapterCode}
            language={'json'}
            showLineNumbers={false}
            wrapLines={false}
            codeBlock
            customStyle={{ borderRadius: 20, marginBottom: 15 }}
          />

          {/* Unicode */}
          <div className='form-element'>
            <label htmlFor='unicode'>Title - Gurmukhi Unicode</label>
            <input
              id='unicode'
              name='unicode'
              type='text'
              placeholder='ਚਮਕੌਰ ਯੁੱਧ ਆਰੰਭ'
              onChange={(e) => {
                setUnicode(e.target.value);
                setGurmukhiScript(anvaad.unicode(e.target.value, true));
              }}
              value={unicode}
            />
            <p>{formErrors?.unicode && formErrors.unicode}</p>
          </div>

          {/* Gurmukhi Script */}
          <div className='form-element'>
            <label htmlFor='gurmukhiScript'>Gurmukhi Script</label>
            <input
              className='gurakhar'
              id='gurmukhiScript'
              name='gurmukhiScript'
              type='text'
              placeholder='cmkOr Xu`D AwrMB'
              value={gurmukhiScript}
            />
            <p>{formErrors?.gurmukhiScript && formErrors.gurmukhiScript}</p>
          </div>

          {/* English */}
          <div className='form-element'>
            <label htmlFor='englishTranslit'>English Transliteration</label>
            <input
              id='englishTranslit'
              name='englishTranslit'
              type='text'
              placeholder='chamakauar yudh aara(n)bh'
              onChange={(e) => {
                setEnglishTranslit(e.target.value);
              }}
              value={englishTranslit}
            />
            <p>{formErrors?.englishTranslit && formErrors.EnglishTranslit}</p>
          </div>

          <Submit />
        </form>
      </Grid>
    </Grid>
  );
};

export default NewChapterScreen;
