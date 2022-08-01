import { CSSProperties } from 'react';
import { makeMatchObject } from '../tools';
import classes from './Number.module.css';

const floatFormatter = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
}).format;

const renderNumber = makeMatchObject(
  {
    float: (value: number) => floatFormatter(value),
    round: (value: number) => Math.round(value).toString(),
    percent: (value: number) => `${floatFormatter(value)}%`,
  },
  () => 'unknown format'
);

export interface NumberProps {
  value: number;
  as: string;
  style?: CSSProperties
  valueOnly?: boolean
}

export function Number({ value, as, style, valueOnly }: NumberProps) {
  if (typeof value !== 'number') return <></>
  let message = renderNumber[as](value);
  if (!valueOnly) message = `${as}: ${message}`;
  return (
    <div className={classes.container} style={style}>{message}</div>
  );
}
