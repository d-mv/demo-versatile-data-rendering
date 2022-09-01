import classes from './NoData.module.css';
import React from 'react'

export function NoData({ data }: { data: string }) {
  return (
    <div className={classes.container}>
      {data}
    </div>
  );
}
