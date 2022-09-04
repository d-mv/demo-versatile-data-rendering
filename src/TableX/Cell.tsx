import { path } from 'ramda';
import React, {
  CSSProperties,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
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
        const newWidth = path(['detail'], e) as [string, number];

        if (newWidth[0] === id) {
          if (element)
            element.setAttribute('style', `width: ${newWidth[1]}rem`);
          //setCachedWidth(`${newWidth[1]}rem`);
        }
      }
    },
    [element, id]
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
      id={comboId}
      className={classes.cell}
      style={{ ...style, width: cachedWidth }}
    >
      {children}
    </div>
  );
}
