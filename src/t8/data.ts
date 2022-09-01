import { ColumnDef } from '@tanstack/react-table';
import { Person } from './makeData';

export const COLUMNS: ColumnDef<Person, unknown>[] = [
  {
    header: 'ID',
    accessorKey: 'id',
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },

  {
    header: 'Last Name',
    enableResizing: true,
    accessorKey: 'lastName',
  },
  {
    header: 'Age',
    accessorKey: 'age',
  },
  {
    header: 'Visits',
    accessorKey: 'visits',
  },
  {
    header: 'Progress',
    accessorKey: 'progress',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
  },
];
