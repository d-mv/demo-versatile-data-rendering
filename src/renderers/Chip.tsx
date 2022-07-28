import classes from './Chip.module.css';

interface ChipProps {
  value: string;
}
export function Chip({ value }: ChipProps) {
  if (typeof value !== 'string') return <></>;

  return <div className={classes.container}>{value}</div>;
}
