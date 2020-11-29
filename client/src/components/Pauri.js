import React from 'react';
import { Link, useParams } from 'react-router-dom';
import TukStyles from '../stylesheets/TukStyles.module.css';
const Pauri = (props) => {
  const { tuks } = props;
  return (
    <>
      {tuks.map((tuk) => {
        return (
          <div key={tuk.id}>
            <p className='faded-text'>{tuk.content_unicode}</p>
            <p className='gurakhar-black'>{tuk.content_gs}</p>
            {/* */}
            <p className={`${TukStyles.EnglishTranslit} extra-faded-text`}>
              {tuk.content_transliteration_english}
            </p>
          </div>
        );
      })}
      <Link to={`/pauris/${props.id}/edit`}>{props.signature_unicode}</Link>
    </>
  );
};

export default Pauri;
