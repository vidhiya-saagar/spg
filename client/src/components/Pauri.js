import React from 'react';

const Pauri = (props) => {
  console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx');
  console.log(props);
  // const tuks = [{ id: 34, content_unicode: 'hey' }];
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
