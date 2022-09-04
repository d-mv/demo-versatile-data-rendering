import React, { PropsWithChildren, useRef } from 'react';

import { TableColumnScenario } from '../context/tableX.context';
import classes from './ResizeableCell.module.css';
import { useResizing } from './useResizing';

interface ResizableCellProps {
  script: TableColumnScenario;
  id: string;
}

export function ResizableCell({
  children,
  id,
  script,
}: PropsWithChildren<ResizableCellProps>) {
  const thisRef = useRef<HTMLDivElement | null>(null);

  const { handleMouseDown } = useResizing({
    columnId: id,
    resizableRef: thisRef,
  });

  return (
    <div
      ref={thisRef}
      className={classes.cell}
      style={{
        ...script.style,
        width: `${script.width}rem`,
      }}
    >
      {children}
      <span className={classes.resizer} onMouseDown={handleMouseDown} />
    </div>
  );
}
