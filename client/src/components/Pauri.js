import React from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
const Pauri = (props) => {
  const { tuks } = props;
  return (
    <>
      {tuks.map((tuk) => {
        return (
          <>
            <p key={tuk.id}>{tuk.content_unicode}</p>
            <p className={TukStyles.GurAkhar} key={tuk.id}>
              {tuk.content_gs}
            </p>
            <p className={TukStyles.EnglishTranslit} key={tuk.id}>
              {tuk.content_transliteration_english}
            </p>
          </>
        );
      })}
      <p>{props.signature_unicode}</p>
    </>
  );
};

export default Pauri;
