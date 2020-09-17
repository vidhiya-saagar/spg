import React from 'react';
import SideCharsStyles from '../stylesheets/components/SideCharsStyles.module.css';

const CharBlock = ({ char, description, sound }) => {
  return (
    <div className={SideCharsStyles.CharItem}>
      <p className={SideCharsStyles.Char}>{char}</p>
      <p className={SideCharsStyles.Description}>
        {description} {sound && `- ${sound}`}
      </p>
    </div>
  );
};

export default CharBlock;
