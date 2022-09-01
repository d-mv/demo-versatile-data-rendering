import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React from 'react';
import { COLUMNS } from './data';
import { makeData } from './makeData';
import { RenderBody } from './RenderBody';
import { RenderHeader } from './RenderHeader';

import './Table8.css';

export function Table8() {
  const data = React.useMemo(() => makeData(20), []);

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

  return (
    <div className='p-2 block max-w-full overflow-x-scroll overflow-y-hidden'>
      <div className='h-2' />
      <table className='w-full '>
        <RenderHeader headerGroups={table.getHeaderGroups()} />
        <RenderBody rows={table.getRowModel().rows} />
      </table>
      <div className='h-4' />
    </div>
  );
}
