import React, { useState, useEffect } from 'react';
import { fetchGet } from '../helpers/fetchHelper';
import { Link } from 'react-router-dom';
import Chapter from '../components/Chapter';
import Grid from '../components/Grid';

const ChaptersIndexScreen = () => {
  const [chapters, setChapters] = useState([]);

  const fetchChapters = async () => {
    const res = await fetchGet('/chapters');
    setChapters(res.chapters);
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <Grid alignItems='center' justify='center'>
      <Grid column={true} sm={12} md={8} lg={8}>
        {chapters.map((chapter) => {
          return <Chapter {...chapter} key={chapter.id} />;
        })}
      </Grid>

      <Grid column={true} sm={8} customClass='text-align-center'>
        <Link to='/chapters/new'>
          <button class='spg-btn'>New</button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default ChaptersIndexScreen;
