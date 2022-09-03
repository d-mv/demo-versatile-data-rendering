import React from 'react';
import { Row } from '@tanstack/react-table';

import { Person } from './makeData';
import { VariableSizeGrid as Grid } from 'react-window';
import { COLUMNS } from './data';

export interface RenderBodyProps {
  rows: Row<Person>[];
}

export function RenderBody({ rows }: RenderBodyProps) {
  const Cell = ({ columnIndex, rowIndex, style }: Record<string, any>) => {
    return (
      <div
        style={{
          ...style,
          width: rows[rowIndex]
            ?.getVisibleCells()
            [columnIndex]?.column.getSize(),
        }}
      >
        {`${rowIndex} / ${columnIndex}`}
      </div>
    );
  };
  function getColumn(index: number) {
    return rows[0]?.getVisibleCells()[index]?.column.getSize();
  }

  return (
    <Grid
      itemData={rows}
      columnCount={Object.keys(COLUMNS).length}
      columnWidth={getColumn}
      height={150}
      rowCount={rows.length}
      rowHeight={() => 35}
      width={300}
    >
      {Cell}
    </Grid>
  );

  // return (
  //   <tbody>
  //     {rows.map((row) => {
  //       return (
  //         <tr key={row.id}>
  //           {row.getVisibleCells().map((cell) => {
  //             return (
  //               <td key={cell.id} style={{ width: cell.column.getSize() }}>
  //                 {flexRender(cell.column.columnDef.cell, cell.getContext())}
  //               </td>
  //             );
  //           })}
  //         </tr>
  //       );
  //     })}
  //   </tbody>
  // );
}
