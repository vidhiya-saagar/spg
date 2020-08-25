import React from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
const Pauri = (props) => {
  const { tuks } = props;
  return (
    <>
      {tuks.map((tuk) => {
        return (
          <div key={tuk.id}>
            <p>{tuk.content_unicode}</p>
            <p className={TukStyles.GurAkhar}>{tuk.content_gs}</p>
            <p className={TukStyles.EnglishTranslit}>
              {tuk.content_transliteration_english}
            </p>
          </div>
        );
      })}
      <p>{props.signature_unicode}</p>
    </>
  );
};

export default Pauri;
