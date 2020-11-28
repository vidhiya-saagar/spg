import React from 'react';
import Pauri from './Pauri';
import TukStyles from '../stylesheets/TukStyles.module.css';

// TODO: Add state to affect the color of the text
// TODO: Add ALL the other languages too (gs, english_transliteration)
const Chhand = (props) => {
  const chhandType = props.chhand_type;
  const { pauris } = props;

  return (
    <>
      <p className='faded-text'>
        <span>{chhandType.chhand_name_unicode} </span>
        <span className='gurakhar-black'>{chhandType.chhand_name_gs} </span>
        <span className={TukStyles.EnglishTranslit}>
          {chhandType.chhand_name_english}
        </span>
      </p>
      {/* 
      {pauris.length > 2 && <span>....</span>}
      {pauris.slice(pauris.length - 2, pauris.length).map((pauri) => {
       */}
      {pauris.map((pauri) => {
        return <Pauri {...pauri} key={pauri.id} />;
      })}
    </>
  );
};

export default Chhand;
