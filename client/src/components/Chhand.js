import React from 'react';
import Pauri from './Pauri';

const Chhand = (props) => {
  const chhandType = props.chhand_type;
  const { pauris } = props;
  // const { id } = props;

  console.log(chhandType);
  return (
    <>
      <p>{chhandType.chhand_name_unicode}</p>
      {pauris.map((pauri) => {
        return <Pauri {...pauri} key={pauri.id} />;
      })}
    </>
  );
};

export default Chhand;
