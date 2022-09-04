import React, { PropsWithChildren } from 'react';

import classes from './HeaderCell.module.css';

interface HeaderCellProps {}
export function HeaderCell({ children }: PropsWithChildren<HeaderCellProps>) {
  return <div className={classes.container}>{children}</div>;
}
