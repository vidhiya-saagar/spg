// chapters/:id
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../helpers/fetchHelper';
import Grid from '../components/Grid';
import ChapterScreenStyles from '../stylesheets/screens/ChapterScreenStyles.module.css';
import Chapter from '../components/Chapter';

const ChapterScreen = () => {
  const { id } = useParams();

  const [chapter, setChapter] = useState(null);
  const [chhands, setChhands] = useState(null);

  // // !prettier-ignore
  useEffect(() => {
    const fetchAllChhands = async () => {
      const res = await fetchGet(`/chapters/${id}/tuks`);
      console.log('just did the fetch', res);
      setChapter(res.chapter);
      setChhands(res.chhands);
    };

    fetchAllChhands();
  }, [id]);

  if (chhands) {
    console.log(chhands);
    console.log(chhands[0].pauris);
    console.log(chhands[0].pauris[0]);
    console.log(chhands[0].pauris[0].tuks);
  }

  return (
    <>
      <Grid alignItems='flex-end'>
        <Grid column={true} sm={12} md={3} lg={4}>
          <div className={ChapterScreenStyles.ContentContainer}></div>
        </Grid>
        <Grid column={true} sm={12} md={5} lg={8}>
          <div className={ChapterScreenStyles.PauriContainer}>
            <Chapter {...chapter} />
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ChapterScreen;
