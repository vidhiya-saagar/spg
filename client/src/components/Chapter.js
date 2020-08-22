import React from 'react';

const Chapter = (props) => {
  const { title_unicode, title_gs, title_transliteration_english } = props;

  return (
    <>
      <p>Chapter {props.number}</p>
      <h1>{props.title_unicode}</h1>
      <h3>{props.title_gs}</h3>
      <h4>{props.title_transliteration_english}</h4>
    </>
  );
};

export default Chapter;
