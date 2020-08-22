import React, { useState, useEffect } from 'react';
import { fetchGet } from '../helpers/fetchHelper';

const ChaptersScreen = () => {
  const [chapters, setChapters] = useState([]);

  const fetchChapters = async () => {
    const res = await fetchGet('/chapters');
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    console.log(res);
  };

  useEffect(() => {
    console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
    fetchChapters();
  }, []);

  return <h1>ChaptersScreen</h1>;
};

export default ChaptersScreen;
