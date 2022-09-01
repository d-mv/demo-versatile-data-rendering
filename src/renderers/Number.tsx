import { CSSProperties } from 'react';
import React from 'react'

import { ShowAs } from '../context';
import { makeMatchObject } from '../tools';
import classes from './Number.module.css';

const floatFormatter = Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
}).format;

const renderNumber = makeMatchObject(
  {
    [ShowAs.FLOAT]: (value: number) => floatFormatter(value),
    [ShowAs.INT]: (value: number) => Math.round(value).toString(),
    [ShowAs.PCT]: (value: number) => `${floatFormatter(value)}%`,
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
