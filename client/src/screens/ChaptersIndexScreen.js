import React, { useState, useEffect } from 'react';
import { fetchGet } from '../helpers/fetchHelper';
import Chapter from '../components/Chapter';

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
    <>
      {chapters.map((chapter) => {
        return <Chapter {...chapter} key={chapter.id} />;
      })}
    </>
  );
};

export default ChaptersIndexScreen;
