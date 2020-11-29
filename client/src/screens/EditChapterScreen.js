import React, { useState, useEffect, useContext } from 'react';
import Grid from '../components/Grid';
import { Link, useParams } from 'react-router-dom';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import SideChars from '../components/SideChars';
import { fetchGet, fetchPost, fetchPut } from '../helpers/fetchHelper';
import ChapterStyles from '../stylesheets/components/ChapterStyles.module.css';
import Submit from '../components/Submit';
import * as anvaad from 'anvaad-js';
import { isGurmukhi } from '../helpers/validationHelper';
import ImageUploader from 'react-images-upload';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import KathaUploadForm from '../components/KathaUploadForm';
import { Circle } from 'rc-progress';

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
  const [englishSummary, setEnglishSummary] = useState('');
  const [pictures, setPictures] = useState([]);
  const [kathaUploadProgress, setKathaUploadProgress] = useState(null);
  const [kathaFiles, setKathaFiles] = useState([]);

  useEffect(() => {
    const fetchChapter = async () => {
      const res = await fetchGet(`/chapters/${id}`);
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
    debugger;
    if (!(await isValidInput())) return SweetInputWarning();

    const res = await fetchPut(`/chapters/${id}/edit`, {
      title_unicode: unicode,
      title_gs: gurmukhiScript,
      title_transliteration_english: englishTranslit,
      english_summary: englishSummary,
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

  const addKatha = async (katha) => {
    debugger;
    const res = await fetchPost(`/chapters/${id}/kathas`, {
      ...katha,
      title: katha.file.name,
    });
    debugger;
    setKathaFiles([...kathaFiles, res]);
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

  const dropImage = (picture) => {
    setPictures([picture]);
  };

  return (
    <>
      <Grid alignItems='center' justify='center'>
        <Grid column={true} sm={12} md={8} lg={8}>
          <Grid sm={12} lg={6}>
            <h1 className={ChapterStyles.ChapterTitle}>
              Chapter {chapter?.number}:{' '}
              <span className='gurakhar'>{gurmukhiScript}</span>
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
                defaultValue={gurmukhiScript}
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
                defaultValue={englishTranslit}
              />
              <p>{formErrors?.englishTranslit && formErrors.EnglishTranslit}</p>
            </div>
            {/* English Summary */}
            <div className='form-element'>
              <label htmlFor='englishSummary'>English Summary</label>
              <textarea
                id='englishSummary'
                name='englishSummary'
                type='text'
                rows={15}
                spellCheck={true}
                onChange={(e) => {
                  setEnglishSummary(e.target.value);
                }}
                value={englishSummary}
              />

              <ImageUploader
                withIcon={true}
                withLabel={true}
                buttonText='Upload Artwork'
                onChange={dropImage}
                imgExtension={['.jpg', '.jpeg', '.png', '.gif']}
                maxFileSize={5242880}
                singleImage={true}
                withPreview={true}
              />
            </div>

            <Grid alignItems='center' justify='space-between'>
              <Grid column={true} sm={2} md={4} lg={4}>
                <div className='form-element'>
                  <label>S3 File Upload Test</label>
                  <DropzoneS3Uploader
                    s3Url='https://s3.console.aws.amazon.com/s3/buckets/shaheedi-spg'
                    upload={{
                      server: 'http://localhost:1469',
                      signingUrl: '/s3/sign',
                    }}
                    accept='.mp3,.m4a'
                    onError={(e) => console.log(`Error: ${e}`)}
                    onProgress={(progressInPercent, uploadStatusText) => {
                      setKathaUploadProgress(progressInPercent);
                    }}
                    onFinish={addKatha}
                  />
                </div>
              </Grid>
              <Grid column={true} sm={2} md={4} lg={4}>
                <Circle
                  percent={kathaUploadProgress}
                  strokeWidth='4'
                  strokeColor='#D3D3D3'
                />
              </Grid>
            </Grid>

            {kathaFiles?.map((katha) => (
              <KathaUploadForm
                publicUrl={katha.publicUrl}
                fileName={katha.filename}
                fileKey={katha.fileKey}
              />
            ))}

            <Submit />
          </form>
        </Grid>

        <Grid column={true} sm={12} md={1} lg={1}>
          <SideChars />
        </Grid>
      </Grid>
    </>
  );
};

export default EditChapterScreen;
