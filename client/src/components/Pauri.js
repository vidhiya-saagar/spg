import React from 'react';

const Pauri = (props) => {
  const { tuks } = props;
  return (
    <>
      {tuks.map((tuk) => {
        return <p key={tuk.id}>{tuk.content_unicode}</p>;
      })}
      <p>{props.signature_unicode}</p>
    </>
  );
};

export default Pauri;
