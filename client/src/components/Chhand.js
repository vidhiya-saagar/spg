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
      <p>{chhandType.chhand_name_unicode}</p>
      <p className={TukStyles.GurAkhar}>{chhandType.chhand_name_gs}</p>
      <p className={TukStyles.EnglishTranslit}>
        {chhandType.chhand_name_english}
      </p>
      {pauris.map((pauri) => {
        return <Pauri {...pauri} key={pauri.id} />;
      })}
    </>
  );
};

export default Chhand;
