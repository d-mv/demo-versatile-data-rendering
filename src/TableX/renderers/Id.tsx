import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { TableXCellContext } from '../../context/tableX.context';

export function Id() {
  const value = useContextSelector(
    TableXCellContext,
    (context) => context.value
  );
  if (typeof value !== 'string') return null;
  return <span>{value.slice(0, 5) + '..' + value.slice(-5)}</span>;
}
