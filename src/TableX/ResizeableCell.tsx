import { assoc } from 'ramda';
import React, {
  PropsWithChildren,
  useState,
  MouseEvent,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { useContextSelector } from 'use-context-selector';
import { TableColumnScenario, TableXContext } from '../context/tableX.context';

import classes from './ResizeableCell.module.css';

let COLLECTION: Record<string, number> = {};

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

  const RF = useRef<string>('');

  useEffect(() => {
    // if (script.width && !cachedWidth) setCachedWidth(`${script.width}rem`);
    if (!RF.current) RF.current = `${script.width}rem`;
  }, [script]);

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

        updateScenario(key, { width: width / 10 });
        RF.current = `${width / 10}rem`;
        const event = new CustomEvent('updated_width', {
          detail: [key, width / 10],
        });
        document.dispatchEvent(event);
      }
    };
  }
  function handleMouseUp() {
    // eslint-disable-next-line no-console
    console.log('mouse is up');
    document.removeEventListener('mousemove', handleMouseMove);
  }

  interface Mevent extends Event {
    screenX: number;
  }

  const resizable = document.getElementById('resizable');
  const thisRef = useRef<HTMLDivElement | null>(null);

  const getPre = () => {
    // eslint-disable-next-line no-console
    console.log(scX, id);

    return scX[id];
  };
  const handleMouseMove = (e: Mevent) => {
    const pre = COLLECTION[id];
    const current = e.screenX;

    if (pre === undefined) COLLECTION = assoc(id, current, COLLECTION);
    else if (pre === current) return;
    else {
      if (
        (current > pre && current - pre > 20) ||
        (current < pre && pre - current > 20)
      )
        return;
      COLLECTION = assoc(id, current, COLLECTION);
      let width = thisRef.current?.offsetWidth || 0;
      // eslint-disable-next-line no-console
      console.log(thisRef.current);

      console.log(width, current - pre);
      width = current > pre ? width + (current - pre) : width - (pre - current);

      // eslint-disable-next-line no-console
      console.log(width, pre, current);

      //        updateScenario(id, { width: width / 10 });
      // setCachedWidth(`${width / 10}rem`);
      //
      //
      RF.current = `${width / 10}rem`;
      const event = new CustomEvent('updated_width', {
        detail: [id, width / 10],
      });
      document.dispatchEvent(event);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log({ scX });
  }, [scX]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('re-render');
  });

  function handleMouseDown(e: MouseEvent<HTMLSpanElement>) {
    // eslint-disable-next-line no-console
    console.log('mouse is down');

    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mousemove', handleMouseMove);
    e.preventDefault();
  }
  return (
    <div
      ref={thisRef}
      className={classes.cell}
      style={{ ...script.style, width: RF.current }}
    >
      {children}
      <span
        className={classes.resizer}
        onMouseDown={handleMouseDown}
        //        draggable="true"
        // onDrag={handleResize(id)}
      />
    </div>
  );
}
