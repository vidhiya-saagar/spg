import React from 'react';
import SideCharsStyles from '../stylesheets/components/SideCharsStyles.module.css';

const CharBlock = ({ char, english }) => {
  return (
    <div className={SideCharsStyles.CharItem}>
      ੍ਯ
      <br />
      <span>adhā jəjːɑ</span>
    </div>
  );
};

export default CharBlock;
