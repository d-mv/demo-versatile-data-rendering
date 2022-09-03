import React from 'react';
import { useContextSelector } from 'use-context-selector';
import { TableXCellContext } from '../../context/tableX.context';

export function Text() {
  const value = useContextSelector(
    TableXCellContext,
    (context) => context.value
  );

  if (typeof value !== 'string') return null;

  return <span>{value}</span>;
}
