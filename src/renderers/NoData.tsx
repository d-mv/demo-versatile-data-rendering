import classes from './NoData.module.css';

export function NoData({ data }: { data: string }) {
  return (
    <div className={classes.container}>
      {data}
    </div>
  );
}
