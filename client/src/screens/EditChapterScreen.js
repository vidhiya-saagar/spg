import React, { useState, useEffect, useContext } from 'react';
import Grid from '../components/Grid';
import { Link, useParams } from 'react-router-dom';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import SideChars from '../components/SideChars';
import { fetchGet, fetchPost } from '../helpers/fetchHelper';
import ChapterStyles from '../stylesheets/components/ChapterStyles.module.css';
import Submit from '../components/Submit';
import * as anvaad from 'anvaad-js';
import { isGurmukhi } from '../helpers/validationHelper';

import {
  SweetError,
  SweetSuccess,
  SweetInputWarning,
  SweetConfirm,
} from '../components/SweetAlert.js';
import * as Yup from 'yup';

const EditChapterScreen = () => {
  const { id } = useParams();
  const [formErrors, setFormErrors] = useState(null);

  const [chapter, setChapter] = useState(null);
  const [unicode, setUnicode] = useState('');
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [englishTranslit, setEnglishTranslit] = useState('');

  useEffect(() => {
    const fetchChapter = async () => {
      const res = await fetchGet(`/chapters/${id}`);
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(res);
      setChapter(res.chapter);
      setUnicode(res.chapter.title_unicode);
    };
    fetchChapter();
  }, []);

  // When Unicode is udpated
  useEffect(() => {
    setGurmukhiScript(anvaad.unicode(unicode, true));
    setEnglishTranslit(anvaad.translit(gurmukhiScript));
  }, [unicode, gurmukhiScript]);

  const updateChapter = async (e) => {
    e.preventDefault();
    if (!(await isValidInput())) return SweetInputWarning();
    const res = await fetchPost(`/chapters/${id}`, {
      title_unicode: unicode,
      title_gs: gurmukhiScript,
      title_transliteration_english: englishTranslit,
    });
    handleUpdateChapterResponse(res);
  };

  const handleUpdateChapterResponse = (res) => {
    if (res.errors?.length > 0) {
      SweetError({ text: JSON.stringify(res.errors, null, 2) });
    } else {
      SweetSuccess({
        title: `Chhand Saved!`,
        text: JSON.stringify(res.chhand, null, 2),
      });
    }
  };

  const isValidInput = () => {
    const valid = EditChapterSchema.validate(
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

  // TODO: Make this more reusable
  const EditChapterSchema = Yup.object().shape({
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

  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <Grid sm={12} lg={6}>
            <h1 className={ChapterStyles.ChapterTitle}>
              Chapter {chapter?.number}: {chapter?.title_unicode}
            </h1>
          </Grid>
        </Grid>

        <Grid column={true} sm={12} md={8} lg={6}>
          <form className='spg-form' onSubmit={updateChapter}>
            {/* Unicode */}
            <div className='form-element'>
              <label htmlFor='unicode'>Title - Gurmukhi Unicode</label>
              <input
                id='unicode'
                name='unicode'
                type='text'
                placeholder='ਚਮਕੌਰ ਯੁੱਧ ਆਰੰਭ'
                value={unicode}
                onChange={(e) => {
                  setUnicode(e.target.value);
                }}
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
                placeholder='Chamkaur Yudh Aarambh'
                value={englishTranslit}
              />
              <p>{formErrors?.englishTranslit && formErrors.EnglishTranslit}</p>
            </div>

            <Submit />
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default EditChapterScreen;
