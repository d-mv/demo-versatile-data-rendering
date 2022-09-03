import { path } from 'ramda';
import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import classes from './Cell.module.css';

interface CellProps {
  style: CSSProperties;
  id: string;
  width: number;
}
export function Cell({
  id,
  children,
  style,
  width,
}: PropsWithChildren<Partial<CellProps>>) {
  const [cachedWidth, setCachedWidth] = useState<string | number>('');

  useEffect(() => {
    if (width && !cachedWidth) setCachedWidth(`${width}rem`);
  }, [width, cachedWidth]);

  const handleUpdateWidth = useCallback(
    (e: Event) => {
      if ('detail' in e) {
        const newWidth = path(['detail'], e) as [string, number];

        if (newWidth[0] === id) setCachedWidth(`${newWidth[1]}rem`);
      }
    },
    [id]
  );

  useEffect(() => {
    document.addEventListener('updated_width', handleUpdateWidth);
    return () => {
      document.removeEventListener('updated_width', handleUpdateWidth);
    };
  }, [handleUpdateWidth]);

  return (
    <div
      key={id}
      className={classes.cell}
      style={{ ...style, width: cachedWidth }}
    >
      {children}
    </div>
  );
}
