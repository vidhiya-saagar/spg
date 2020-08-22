// chapters/:id
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGet } from '../helpers/fetchHelper';

const ChapterScreen = () => {
  const { id } = useParams();

  const [chapter, setChapter] = useState(null);
  const [chhands, setChhands] = useState([]);

  const fetchCurrentChapter = async () => {
    const res = await fetchGet(`/chapter/${id}`);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(res);
    setChapter(res.chapters);
  };

  const fetchAllChhands = async () => {
    const res = await fetchGet(`/chapter/${id}/chhands`);
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(res);
    setChhands(res.chhands);
  };

  useEffect(() => {
    fetchCurrentChapter();
    fetchAllChhands();
  });

  return (
    <>
      <p>ChapterScreen {id}</p>
    </>
  );
};

export default ChapterScreen;
