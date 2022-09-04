import { MouseEvent, MutableRefObject, useState } from 'react';

let COLLECTION: Record<string, number | undefined> = {};

interface DispatchedMouseEvent extends Event {
  screenX: number;
}

interface UseResizingProps {
  resizableRef: MutableRefObject<HTMLElement | null>;
  columnId: string;
  throttle?: number;
}

export function useResizing({
  columnId,
  resizableRef,
  throttle = 10,
}: UseResizingProps) {
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseMove = (e: DispatchedMouseEvent) => {
    // define variables
    const previous = COLLECTION[columnId];
    const current = e.screenX;

    // if previous position is not set, we can't determine the movement direction
    if (!previous) COLLECTION[columnId] = current;
    // if position is the same - don't move
    else if (previous === current) return;
    else {
      const movingRight = current > previous;
      if (
        // ignore super fast movements
        (movingRight && current - previous > throttle) ||
        (!movingRight && previous - current > throttle)
      )
        return;

      // cache current > will be "previous" next time
      COLLECTION[columnId] = current;

      // calculate new width
      let newWidth = resizableRef.current?.offsetWidth || 0;

      newWidth = movingRight
        ? newWidth + (current - previous)
        : newWidth - (previous - current);

      // switch to "rem" sizes
      newWidth = newWidth / 10;

      // change this cell
      resizableRef.current?.setAttribute('style', `width: ${newWidth}rem`);

      // disptach an event for others
      const event = new CustomEvent('updated_width', {
        detail: [columnId, newWidth],
      });

      document.dispatchEvent(event);
    }
  };

  const handleMouseUp = () => {
    // when mouse is "up" clear event listeners
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
    // clear statuses and caches
    setIsResizing(false);
    COLLECTION[columnId] = undefined;
  };

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    // mouse has button pressed
    setIsResizing(true);
    // get ready to end the movement processing
    document.addEventListener('mouseup', handleMouseUp);
    // processing movement events
    document.addEventListener('mousemove', handleMouseMove);
    e.preventDefault();
  };
  return { handleMouseDown, isResizing };
}
