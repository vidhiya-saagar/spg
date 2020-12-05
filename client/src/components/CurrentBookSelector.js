import React, { useEffect, useContext, useState } from 'react';
import Select from 'react-select';
import ReactSelectStyles from '../stylesheets/components/ReactSelectStyles';
import { Context as GranthContext } from '../context/GranthContext';

const CurrentBookSelector = () => {
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
      if (!granthState.currentBook) updateCurrentBook(granthState.lastBook);
    };
    getInitialBookState();
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
