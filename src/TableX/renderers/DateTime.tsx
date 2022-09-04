import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { TableXCellContext } from '../../context/tableX.context';

export function DateTime() {
  const value = useContextSelector(
    TableXCellContext,
    (context) => context.value
  );

  if (!(value instanceof Date)) return null;

  return (
    <span>
      {Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
      }).format(value)}{' '}
    </span>
  );
}
