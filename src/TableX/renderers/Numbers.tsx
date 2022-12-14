import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { TableXCellContext } from '../../context/tableX.context';
import classes from './Numbers.module.css';

export function Numbers() {
  const [value, script] = useContextSelector(TableXCellContext, (context) => [
    context.value,
    context.script,
  ]);

  if (typeof value !== 'number') return null;

  let val: string | number = value;

  if (script.type === 'percent') val = `${val}%`;

  return <div className={classes.container}>{val}</div>;
}
