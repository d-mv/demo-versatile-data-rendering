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
  rowId: string;
}
export function Cell({
  rowId,
  id,
  children,
  style,
  width,
}: PropsWithChildren<Partial<CellProps>>) {
  const [cachedWidth, setCachedWidth] = useState<string | number>('');

  const comboId = `${id}-${rowId}`;
  const element = document.getElementById(comboId);

  useEffect(() => {
    if (width && !cachedWidth) setCachedWidth(`${width}rem`);
  }, [width, cachedWidth]);

  const handleUpdateWidth = useCallback(
    (e: Event) => {
      if ('detail' in e) {
        const [columnId, width] = path(['detail'], e) as [string, number];

        if (columnId === id) {
          if (element) element.setAttribute('style', `width: ${width}rem`);
        }
      }
    },
    [element, id]
  );

  useEffect(() => {
    // subscribe to the width update events
    document.addEventListener('updated_width', handleUpdateWidth);
    return () => {
      document.removeEventListener('updated_width', handleUpdateWidth);
    };
  }, [handleUpdateWidth]);

  return (
    <div
      key={id}
      id={comboId}
      className={classes.cell}
      style={{ ...style, width: cachedWidth }}
    >
      {children}
    </div>
  );
}
