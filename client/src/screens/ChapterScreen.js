// chapters/:id
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../helpers/fetchHelper';

const ChapterScreen = () => {
  const { id } = useParams();

  const [chapter, setChapter] = useState(null);
  const [chhands, setChhands] = useState([]);

  // // !prettier-ignore
  useEffect(() => {
    const fetchCurrentChapter = async () => {
      const res = await fetchGet(`/chapters/${id}`);
      setChapter(res.chapter);
    };

    const fetchAllChhands = async () => {
      const res = await fetchGet(`/chapters/${id}/chhands`);
      setChhands(res.chhands);
    };

    fetchCurrentChapter();
    fetchAllChhands();
  }, [id]);

  return (
    <>
      <p>ChapterScreen {id}</p>
    </>
  );
};

export default ChapterScreen;
