import React, { useEffect, useContext, useState } from 'react';
import Select from 'react-select';
import ReactSelectStyles from '../stylesheets/components/ReactSelectStyles';
import { Context as GranthContext } from '../context/GranthContext';

const CurrentBookSelector = () => {
  // console.log(Select);
  // console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  // console.log(GranthContext);
  // // console.log(useContext(GranthContext));
  const {
    state: granthState,
    fetchSpgStatus,
    fetchAllBooks,
    updateCurrentBook,
  } = useContext(GranthContext);

  useEffect(() => {
    const getInitialBookState = async () => {
      await fetchSpgStatus();
      await fetchAllBooks();
      // debugger;
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
      console.log(granthState.currentBook);
      if (!granthState.currentBook) updateCurrentBook(granthState.lastBook);
    };
    getInitialBookState();
    console.log(granthState.currentBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <h1>hi</h1>
      <p>{JSON.stringify(granthState.lastBook)}</p>
    </div>
  );
};

export default CurrentBookSelector;
