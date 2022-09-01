import React from 'react';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import { Person } from './makeData';

export const COLUMNS: ColumnDef<Person, unknown>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: (d) => renderCell(d),
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
    cell: (d) => renderCell(d),
  },

  {
    header: 'Last Name',
    enableResizing: true,
    accessorKey: 'lastName',
    cell: (d) => renderCell(d),
  },
  {
    header: 'Age',
    accessorKey: 'age',
    cell: (d) => renderCell(d),
  },
  {
    header: 'Visits',
    accessorKey: 'visits',
    cell: (d) => renderCell(d),
  },
  {
    header: 'Progress',
    accessorKey: 'progress',
    cell: (d) => renderCell(d),
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (d) => renderCell(d),
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: (d) => renderCell(d),
  },
];

function renderCell(data: CellContext<Person, unknown>) {
  const d = data.cell.getValue();
  if (!d) return <div />;
  if (data.column.id === 'createdAt')
    return (
      <div style={{ display: 'flex', textOverflow: 'ellipsis' }}>
        {Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(new Date(d as string))}
      </div>
    );
  return (
    <div style={{ display: 'flex', textOverflow: 'ellipsis' }}>
      {d as string}
    </div>
  );
}
