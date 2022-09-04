import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { TableXCellContext } from '../../context/tableX.context';
import classes from './DateTime.module.css';

export function DateTime() {
  const value = useContextSelector(
    TableXCellContext,
    (context) => context.value
  );

  if (!(value instanceof Date)) return null;

  return (
    <div className={classes.container}>
      {Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
      }).format(value)}
    </div>
  );
}
