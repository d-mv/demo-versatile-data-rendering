import classes from './Chip.module.css';
import React from 'react'

interface ChipProps {
  value: string;
}
export function Chip({ value }: ChipProps) {
  if (typeof value !== 'string') return <></>;

  return <div className={classes.container}>{value}</div>;
}
