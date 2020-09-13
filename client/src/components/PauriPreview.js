import React, { useContext } from 'react';
import TukStyles from '../stylesheets/TukStyles.module.css';
import { Context as GranthContext } from '../context/GranthContext';
import { getFormattedSignatureObj } from '../helpers/remap';
const PauriPreview = (props) => {
  const { state: granthState } = useContext(GranthContext);

  const { pauri, nextPauriNum } = props;
  return (
    <div className={TukStyles.Bold}>
      {pauri.map((tuk) => {
        console.log(granthState);
        return (
          <div key={tuk.id}>
            {/* 
              <p>{tuk.content_unicode}</p>
             */}
            <p className={`gurakhar ${TukStyles.Large}`}>{tuk.content_gs}</p>
            {/*  
            <p className={TukStyles.EnglishTranslit}>
              {tuk.content_transliteration_english}
            </p>             
             */}
          </div>
        );
      })}
      <p>{getFormattedSignatureObj(nextPauriNum).signature_unicode}</p>
    </div>
  );
};

export default PauriPreview;
