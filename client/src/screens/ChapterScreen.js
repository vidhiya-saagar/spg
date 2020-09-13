// chapters/:id
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../helpers/fetchHelper';
import Grid from '../components/Grid';
import ChapterScreenStyles from '../stylesheets/screens/ChapterScreenStyles.css';
import Chapter from '../components/Chapter';
import PauriPreview from '../components/PauriPreview';
import Chhand from '../components/Chhand';
import AddPauri from '../components/AddPauri';
import { Context as AddPauriFormContext } from '../context/AddPauriFormContext';
import { formattedTukFormObj } from '../helpers/remap';
import Sticky from 'react-stickynode';

const ChapterScreen = () => {
  const { id } = useParams();

  const [chapter, setChapter] = useState(null);
  const [chhands, setChhands] = useState(null);
  const [lastPauriNumInChapter, setLastPauriNumInChapter] = useState(0);

  const { state: formState } = useContext(AddPauriFormContext);
  const tukForm = formState.tukForm;

  useEffect(() => {
    const fetchAllChapterChhands = async () => {
      const res = await fetchGet(`/chapters/${id}/tuks`);
      setChapter(res.chapter);
      setChhands(
        res.chhands.splice(res.chhands.length - 2, res.chhands.length)
      );
    };

    const fetchLastPauriNumInChapter = async () => {
      const res = await fetchGet(`/chapters/${id}/last-pauri`);
      setLastPauriNumInChapter(res.last_pauri?.number);
    };

    fetchAllChapterChhands();
    fetchLastPauriNumInChapter();
  }, [id]);

  return (
    <>
      <Grid alignItems='flex-start' justify='center'>
        <Grid column={true} sm={12} md={5} lg={5}>
          <div className='content-container'>
            <AddPauri />
          </div>
        </Grid>
        <Grid column={true} sm={12} md={7} lg={7}>
          <div className='pauri-container'>
            <Chapter {...chapter} />
            {chhands &&
              chhands.map((chhand) => {
                return <Chhand {...chhand} key={chhand.id} />;
              })}
            <Sticky>
              <PauriPreview
                pauri={formattedTukFormObj(tukForm)}
                nextPauriNum={lastPauriNumInChapter + 1}
              />
            </Sticky>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default ChapterScreen;
