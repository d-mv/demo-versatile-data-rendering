import React from 'react'
import { flexRender, HeaderGroup } from '@tanstack/react-table';
import { Person } from './makeData';

export interface RenderHeaderProps {
  headerGroups: HeaderGroup<Person>[];
}
export function RenderHeader({ headerGroups }: RenderHeaderProps) {
  return (
    <thead>
      {headerGroups.map((headerGroup) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ position: 'relative', width: header.getSize() }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                {header.column.getCanResize() && (
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`resizer ${
                      header.column.getIsResizing() ? 'isResizing' : ''
                    }`}
                  ></div>
                )}
              </th>
            );
          })}
        </tr>
      ))}
    </thead>
  );
}
