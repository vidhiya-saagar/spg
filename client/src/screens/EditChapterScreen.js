import React, { useState, useEffect, useContext } from 'react';
import Grid from '../components/Grid';
import { useParams } from 'react-router-dom';
import '../stylesheets/screens/ChhandTypesIndexStyles.css';
import SideChars from '../components/SideChars';
import { fetchGet, fetchPost, fetchPut } from '../helpers/fetchHelper';
import ChapterStyles from '../stylesheets/components/ChapterStyles.module.css';
import Submit from '../components/Submit';
import * as anvaad from 'anvaad-js';
import { isGurmukhi } from '../helpers/validationHelper';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import KathaUploadForm from '../components/KathaUploadForm';
import { Context as EditChapterKathaContext } from '../context/EditChapterKathaContext';
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

  const {
    state: kathaState,
    addKathaForm,
    initializeKathaFormState,
  } = useContext(EditChapterKathaContext);

  const [chapter, setChapter] = useState(null);
  const [unicode, setUnicode] = useState('');
  const [gurmukhiScript, setGurmukhiScript] = useState('');
  const [englishTranslit, setEnglishTranslit] = useState('');
  const [translation, setTranslation] = useState('');
  const [englishSummary, setEnglishSummary] = useState('');
  const [kathaUploadProgress, setKathaUploadProgress] = useState(null);
  const [uploadedArtworkUrl, setUploadedArtworkUrl] = useState('');

  useEffect(() => {
    const fetchChapter = async () => {
      const res = await fetchGet(`/chapters/${id}`);
      setChapter(res.chapter);
      setUnicode(res.chapter.title_unicode);
      setTranslation(res.chapter.title_translation);
      setEnglishSummary(res.chapter.description_english);
      setUploadedArtworkUrl(res.chapter.artwork_url);
    };
    fetchChapter();
  }, []);

  // Get all Kathas
  useEffect(() => {
    const fetchChapterKathas = async (id) => {
      const res = await fetchGet(`/chapters/${id}/kathas`);
      initializeKathaFormState(res.kathas);
    };
    fetchChapterKathas(id);
  }, []);

  // When Unicode is updated
  useEffect(() => {
    setGurmukhiScript(anvaad.unicode(unicode, true));
    setEnglishTranslit(anvaad.translit(gurmukhiScript));
  }, [unicode, gurmukhiScript]);

  const updateChapter = async (e) => {
    e.preventDefault();
    if (!(await isValidInput())) return SweetInputWarning();
    const res = await fetchPut(`/chapters/${id}/edit`, {
      title_unicode: unicode,
      title_gs: gurmukhiScript,
      title_transliteration_english: englishTranslit,
      title_translation: translation,
      description_english: englishSummary,
    });
    handleUpdateChapterResponse(res);
  };

  const handleUpdateChapterResponse = (res) => {
    if (res.errors?.length > 0) {
      SweetError({ text: JSON.stringify(res.errors, null, 2) });
    } else {
      SweetSuccess({
        title: 'Chapter Saved!',
        text: JSON.stringify(res.chhand, null, 2),
      });
    }
  };

  const addArtwork = async (artworkUrl) => {
    fetchPut(`/chapters/${id}/artworks`, {
      artwork_url: artworkUrl,
    });
  };

  const addKatha = async (katha) => {
    const res = await fetchPost(`/chapters/${id}/kathas`, {
      ...katha,
      title: katha.file.name,
    });
    addKathaForm({
      id: res.katha.id,
      title: res.katha.title,
      gianiId: res.katha.giani_id || null,
      year: res.katha.year,
      publicUrl: res.katha.public_url,
    });
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

  const dropStyles = {
    width: '120px',
    height: '120px',
    border: '2px dashed #d1c4e9',
    'border-radius': '1em',
    cursor: 'pointer',
    overflow: 'hidden',
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

            {/* Translation */}
            <div className='form-element'>
              <label htmlFor='translation'>Translation</label>
              <input
                id='translation'
                name='translation'
                type='text'
                placeholder='The Battle of Chamkaur Begins'
                defaultValue={translation}
                spellCheck={true}
                onChange={(e) => {
                  setTranslation(e.target.value);
                }}
              />
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
              <Grid alignItems='center' justify='space-between'>
                <Grid column={true} sm={2} md={4} lg={4}>
                  <div className='form-element'>
                    <label>Upload Artwork to S3</label>
                    <DropzoneS3Uploader
                      s3Url='https://s3.console.aws.amazon.com/s3/buckets/shaheedi-spg'
                      upload={{
                        server: 'http://localhost:1469',
                        signingUrl: '/s3/sign',
                      }}
                      accept='image/*'
                      onError={(e) => console.log(`Error: ${e}`)}
                      onFinish={(file) => {
                        const publicUrl = file.signedUrl.split('?')[0];
                        console.log(publicUrl);
                        addArtwork(publicUrl);
                        setUploadedArtworkUrl(publicUrl);
                      }}
                      style={dropStyles}
                    />
                  </div>
                </Grid>
                <Grid column={true} sm={2} md={4} lg={4}>
                  <img
                    src={uploadedArtworkUrl}
                    style={{
                      objectFit: 'cover',
                      width: '120px',
                      height: '120px',
                      align: 'center',
                    }}
                  />
                </Grid>
              </Grid>
            </div>
            <Grid alignItems='center' justify='space-between'>
              <Grid column={true} sm={2} md={4} lg={4}>
                <div className='form-element'>
                  <label>Upload Katha to S3</label>
                  <DropzoneS3Uploader
                    s3Url='https://s3.console.aws.amazon.com/s3/buckets/shaheedi-spg'
                    upload={{
                      server: 'http://localhost:1469',
                      signingUrl: '/s3/sign',
                    }}
                    accept='.mp3'
                    onError={(e) => console.log(`Error: ${e}`)}
                    onProgress={(progressInPercent, uploadStatusText) => {
                      setKathaUploadProgress(progressInPercent);
                    }}
                    onFinish={addKatha}
                    style={dropStyles}
                  />
                </div>
              </Grid>
              <Grid column={true} sm={2} md={4} lg={4}>
                <Circle
                  percent={kathaUploadProgress}
                  strokeWidth='5'
                  strokeColor='#ff9cce'
                  trailColor='#ff9cce6b'
                  style={{ width: '60px' }}
                />
              </Grid>
            </Grid>

            <KathaUploadForm chapterId={id} />

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
