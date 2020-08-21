import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
  return (
    <ul class='menu'>
      <li>
        <Link to='/books'>Books</Link>
      </li>
      <li>
        <Link to='/chapters'>Chapters</Link>
      </li>
      <li>
        <Link to='/chhands-types'>Chhands Types</Link> Types
      </li>
      <li>
        <Link to='/chhands'>Chhands</Link>
      </li>
    </ul>
  );
};

export default Menu;
