import React from 'react';
import SideCharsStyles from '../stylesheets/components/SideCharsStyles.module.css';
import CharBlock from '../components/CharBlock';

const SideChars = () => {
  return (
    <div className={SideCharsStyles.Column}>
      <CharBlock char=' ੍ਯ' description='adhā jəjːɑ' />
      <CharBlock char='੍ਰ' description='adhā ɾɑɾɑ' />
      <CharBlock char='੍ਵ' description='adhā ʋɑʋːɑ' />
      <CharBlock char='ਸ਼੍ਰੀ' description='Śrī' />
      <CharBlock char='ੰ' description='tippi' sound='ŋ̽' />
      <CharBlock char='ਂ' description='bindi' sound='˜' />
      <CharBlock char='ੱ' description='addak' sound='˖' />
      <CharBlock char='੍' description='halant' sound='' />
      <CharBlock char='ਾ' description='kannā' sound='ā' />
      <CharBlock char='ਿ' description='sihārī' sound='ɪ' />
      <CharBlock char='ੀ' description='bihārī' sound='ī' />
      <CharBlock char='ੁ' description='onkaṛ' sound='ʊ' />
      <CharBlock char='ੂ' description='dulankaṛ' sound='ū' />
      <CharBlock char='ੇ' description='lāvā̃' sound='e' />
      <CharBlock char='ੈ' description='dulāvā̃' sound='ɛ' />
      <CharBlock char='ੋ' description='hōṛā' sound='o' />
      <CharBlock char='ੌ' description='kanōṛā' sound='ɔ' />
    </div>
  );
};

export default SideChars;
