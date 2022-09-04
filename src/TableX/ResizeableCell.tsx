import { assoc } from 'ramda';
import React, {
  PropsWithChildren,
  useState,
  MouseEvent,
  useEffect,
} from 'react';
import { useContextSelector } from 'use-context-selector';
import { TableColumnScenario, TableXContext } from '../context/tableX.context';

import classes from './ResizeableCell.module.css';

interface ResizableCellProps {
  script: TableColumnScenario;
  id: string;
}

export function ResizableCell({
  children,
  id,
  script,
}: PropsWithChildren<ResizableCellProps>) {
  const updateScenario = useContextSelector(
    TableXContext,
    (context) => context.updateScenario
  );
  const [scX, setScX] = useState<Record<string, number>>({});

  const [cachedWidth, setCachedWidth] = useState<string | number>('');

  useEffect(() => {
    if (script.width && !cachedWidth) setCachedWidth(`${script.width}rem`);
  }, [script, cachedWidth]);

  function handleResize(key: string) {
    return function resize(e: MouseEvent<HTMLSpanElement>) {
      const pre = scX[key];
      const current = e.screenX;
      if (pre === undefined) setScX(assoc(key, current, scX));
      else if (pre === current) return;
      else {
        if (
          (current > pre && current - pre > 20) ||
          (current < pre && pre - current > 20)
        )
          return;
        setScX(assoc(key, current, scX));
        let width = e.currentTarget.parentElement?.offsetWidth || 0;
        width =
          current > pre ? width + (current - pre) : width - (pre - current);

        // updateScenario(key, { width: width / 10 });
        setCachedWidth(`${width / 10}rem`);
        const event = new CustomEvent('updated_width', {
          detail: [key, width / 10],
        });
        document.dispatchEvent(event);
      }
    };
  }

  return (
    <div
      className={classes.cell}
      style={{ ...script.style, width: cachedWidth }}
    >
      {children}
      <span
        className={classes.resizer}
        draggable="true"
        onDrag={handleResize(id)}
      />
    </div>
  );
}
