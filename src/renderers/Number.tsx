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
}
export function Number({ value, as }: NumberProps) {
  if (typeof value!== 'number') return <></>
  return (
    <div className={classes.container}>{`${as}: ${renderNumber[as](
      value
    )}`}</div>
  );
}
