import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { TableXCellContext } from '../../context/tableX.context';
import classes from './Id.module.css';

export function Id() {
  const value = useContextSelector(
    TableXCellContext,
    (context) => context.value
  );

  if (typeof value !== 'string') return null;

  return (
    <div className={classes.container}>
      {value.slice(0, 5) + '..' + value.slice(-5)}
    </div>
  );
}
