import React from 'react';
import { flexRender, Row } from '@tanstack/react-table';
import { Person } from './makeData';

export interface RenderBodyProps {
  rows: Row<Person>[];
}

export function RenderBody({ rows }: RenderBodyProps) {
  return (
    <tbody>
      {rows.map((row) => {
        return (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
}
