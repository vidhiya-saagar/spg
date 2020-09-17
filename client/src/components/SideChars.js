import React from 'react';
import SideCharsStyles from '../stylesheets/components/SideCharsStyles.module.css';

const SideChars = () => {
  return (
    <div className={SideCharsStyles.Column}>
      <div className={SideCharsStyles.CharItem}>
        ੍ਯ
        <br />
        <span>adhā jəjːɑ</span>
      </div>
      <div className={SideCharsStyles.CharItem}>ਾ</div>
      <div className={SideCharsStyles.CharItem}>ਿ</div>
      <div className={SideCharsStyles.CharItem}>ੀ</div>
      <div className={SideCharsStyles.CharItem}>ੁੁੁੁ</div>
      <div className={SideCharsStyles.CharItem}>ੂ</div>
      <div className={SideCharsStyles.CharItem}>ੇ</div>
      <div className={SideCharsStyles.CharItem}></div>
    </div>
  );
};

export default SideChars;
