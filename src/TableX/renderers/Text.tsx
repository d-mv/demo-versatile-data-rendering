import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { TableXCellContext } from '../../context/tableX.context';
import classes from './Text.module.css';

export function Text() {
  const value = useContextSelector(
    TableXCellContext,
    (context) => context.value
  );

  if (typeof value !== 'string') return null;

  return <span className={classes.container}>{value}</span>;
}
