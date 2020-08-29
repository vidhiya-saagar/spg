import React from 'react';
import AddChhandTypeStyles from '../stylesheets/components/AddChhandTypeStyles.module.css';

const Submit = ({ text }) => {
  return (
    <button
      type='submit'
      className={`mtop15 ${AddChhandTypeStyles.SubmitButton}`}
    >
      {text || 'Submit'}
    </button>
  );
};

export default Submit;
