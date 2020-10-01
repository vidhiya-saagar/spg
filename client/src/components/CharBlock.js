import React from 'react';
import SideCharsStyles from '../stylesheets/components/SideCharsStyles.module.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const CharBlock = ({ char, description, sound }) => {
  return (
    <CopyToClipboard text={char}>
      <div className={SideCharsStyles.CharItem}>
        <p className={SideCharsStyles.Char}>{char}</p>
        <p className={SideCharsStyles.Description}>
          {description} {sound && `- ${sound}`}
        </p>
      </div>
    </CopyToClipboard>
  );
};

export default CharBlock;
