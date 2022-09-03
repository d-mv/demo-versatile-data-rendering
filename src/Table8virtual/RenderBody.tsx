import React from 'react';
import { Table } from '@tanstack/react-table';
import { Person } from './makeData';
import { VariableSizeGrid } from 'react-window';

import { COLUMNS } from './data';
import { last } from 'ramda';

export function RenderBody({ table }: { table: Table<Person> }) {
  function buildOffSets() {
    const offs: number[] = [];

    table
      .getAllColumns()
      .map((el) => el.getSize())
      .forEach((el: number, index: number) => {
        if (index === 0) offs.push(0);
        else {
          offs.push((last(offs) ?? 0) + el);
        }
      });
    return offs;
  }

  const Cell = ({ columnIndex, rowIndex, style }: Record<string, any>) => {
    const offs = buildOffSets();
    return (
      <div
        style={{
          ...style,
          width: table
            .getGroupedRowModel()
            .rows[rowIndex]?.getVisibleCells()
            [columnIndex].column.getSize(),
          left: offs[columnIndex],
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
      >
        {String(
          table
            .getGroupedRowModel()
            .rows[rowIndex]?.getVisibleCells()
            [columnIndex].renderValue()
        )}
      </div>
    );
  };

  return (
    <VariableSizeGrid
      columnCount={Object.keys(COLUMNS).length}
      columnWidth={(index) => {
        const m = table
          .getGroupedRowModel()
          .rows[0]?.getVisibleCells()
          [index].column.getSize();
        console.log(index, m);

        return 150;
      }}
      height={400}
      rowCount={table.getGroupedRowModel().rows.length}
      rowHeight={(index) => 35}
      width={table.getTotalSize()}
      outerElementType={'tbody'}
      innerElementType={'tr'}
    >
      {Cell}
    </VariableSizeGrid>
  );

  //   return (
  //     <tbody>
  //       {table.getGroupedRowModel().rows.map((row) => {
  //         return (
  //           <tr key={row.id}>
  //             {row.getVisibleCells().map((cell) => {
  //               return (
  //                 <td key={cell.id} style={{ width: cell.column.getSize() }}>
  //                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //                 </td>
  //               );
  //             })}
  //           </tr>
  //         );
  //       })}
  //     </tbody>
  //   );
}
