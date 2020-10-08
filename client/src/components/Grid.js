import React from 'react';
import * as styles from '../stylesheets/components/Grid.module.css';

const Grid = (props) => {
  const {
    alignItems,
    children,
    column,
    expanded,
    justify,
    lg,
    md,
    row,
    sm,
    customClass,
  } = props;

  const isRow = row || !column;

  const classes =
    (!isRow ? styles.column : styles.row) +
    // Row styling
    (isRow && expanded ? ` ${styles.expanded}` : '') +
    (isRow && justify ? ` ${styles[justify]}` : '') +
    (isRow && alignItems ? ` ${styles['align-' + alignItems]}` : '') +
    // Column styling
    (!isRow && sm ? ` ${styles['sm-' + sm]}` : '') +
    (!isRow && md ? ` ${styles['md-' + md]}` : '') +
    (!isRow && lg ? ` ${styles['lg-' + lg]}` : '') +
    // customClass stlying
    (customClass ? ` ${styles[customClass]}` : '');

  return <div className={classes}>{children}</div>;
};

export default Grid;
