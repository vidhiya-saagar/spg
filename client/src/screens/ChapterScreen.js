// chapters/:id
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../helpers/fetchHelper';
import Grid from '../components/Grid';
import ChapterScreenStyles from '../stylesheets/screens/ChapterScreenStyles.module.css';
import Chapter from '../components/Chapter';
import Chhand from '../components/Chhand';
import AddPauri from '../components/AddPauri';

const ChapterScreen = () => {
  const { id } = useParams();

  const [chapter, setChapter] = useState(null);
  const [chhands, setChhands] = useState(null);

  // // !prettier-ignore
  useEffect(() => {
    const fetchAllChhands = async () => {
      const res = await fetchGet(`/chapters/${id}/tuks`);
      setChapter(res.chapter);
      setChhands(res.chhands);
    };

    fetchAllChhands();
  }, [id]);

  return (
    <>
      <Grid alignItems='flex-end' justify='center'>
        <Grid column={true} sm={12} md={8} lg={4}>
          <div className={ChapterScreenStyles.ContentContainer}>
            <AddPauri />
          </div>
        </Grid>
        <Grid column={true} sm={12} md={8} lg={8}>
          <div className={ChapterScreenStyles.PauriContainer}>
            <Chapter {...chapter} />
            {chhands &&
              chhands.map((chhand) => {
                return <Chhand {...chhand} key={chhand.id} />;
              })}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ChapterScreen;
