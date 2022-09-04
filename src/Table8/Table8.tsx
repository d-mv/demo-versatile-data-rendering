import React, { PropsWithoutRef, useMemo, useRef, useState } from 'react';
import './Table8.css';

import {
  getCoreRowModel,
  flexRender,
  useReactTable,
} from '@tanstack/react-table';
import { makeData } from './makeData';
import { COLUMNS } from './data';
import { useVirtual } from 'react-virtual';

interface Table9Props {
  qty: number;
}
export function Table8({ qty }: PropsWithoutRef<Table9Props>) {
  const data = useMemo(() => makeData(qty), [qty]);

  const table = useReactTable({
    data,
    columns: COLUMNS,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const tableContainerRef = useRef<HTMLDivElement>(null);

  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtual({
    parentRef: tableContainerRef,
    size: rows.length,
    overscan: 10,
  });
  const { virtualItems: virtualRows, totalSize } = rowVirtualizer;

  const paddingTop = virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0;
  const paddingBottom =
    virtualRows.length > 0
      ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
      : 0;

  function getExpectedWidth() {
    return table
      .getHeaderGroups()
      .map((hg) => hg.headers.map((h) => h.getSize()))[0]
      .reduce((acc, curr) => acc + curr, 0);
  }

  const [st, setSt] = useState(getExpectedWidth());

  function setter() {
    setSt(getExpectedWidth());
  }

  return (
    <div id="container-id" className="xxx" style={{ width: `${st}px` }}>
      <div className="sub-cont p-2 block max-w-full overflow-x-scroll overflow-y-hidden">
        <div className="h-2" />
        <div ref={tableContainerRef} id="table-id" className="container">
          <table className="w-full ">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          position: 'relative',
                          width: header.getSize(),
                        }}
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
                            onTouchEnd={setter}
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
            <tbody>
              {paddingTop > 0 && (
                <tr>
                  <td style={{ height: `${paddingTop}px` }} />
                </tr>
              )}
              {virtualRows.map((r) => {
                const row = table.getGroupedRowModel().rows[r.index];
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {paddingBottom > 0 && (
                <tr>
                  <td style={{ height: `${paddingBottom}px` }} />
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="h-4" />
      </div>
    </div>
  );
}
