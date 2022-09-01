import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  HeaderContext,
  Header,
  useReactTable,
  HeaderGroup,
  Row,
} from '@tanstack/react-table';
import React from 'react';
// import { makeData } from '../tools';
import { Person, makeData } from '../tools/makeData';

import classes from './T.module.scss';
import './T.css';
import { map } from '../tools/misc.tools';
import {
  FixedSizeList,
  ListChildComponentProps,
  VariableSizeList,
} from 'react-window';

const d = makeData(100);
//  id: number;
// //  firstName: string;
// //  lastName: string;
//  age: number;
//  visits: number;
//  progress: number;
//  status: 'relationship' | 'complicated' | 'single';
// createdAt: Date;

const COLUMNS: ColumnDef<Person, unknown>[] = [
  // {
  //   header: '',
  //   accessorKey: 'expander',
  //   cell: (r: any) => {
  //     // eslint-disable-next-line no-console
  //     console.log('row', r);
  //     return <div>r</div>;
  //   },
  // },
  {
    header: 'ID',
    accessorKey: 'id',
    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },
  {
    header: 'First Name',
    accessorKey: 'firstName',

    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },

  {
    header: 'Last Name',
    enableResizing: true,
    accessorKey: 'lastName',
    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },
  {
    header: 'Age',
    accessorKey: 'age',
    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },
  {
    header: 'Visits',
    accessorKey: 'visits',
    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },
  {
    header: 'Progress',
    accessorKey: 'progress',
    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: (r: any) => {
      // eslint-disable-next-line no-console
      console.log('row', r);
      return <div>r</div>;
    },
  },
];

const renderHeaderCell = (header: Header<Person, unknown>) => {
  return (
    <th
      key={header.id}
      colSpan={header.colSpan}
      style={{ position: 'relative', width: header.getSize() }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={`resizer ${
            header.column.getIsResizing() ? 'isResizing' : ''
          }`}
        />
      )}
    </th>
  );
};

const renderHeader = (value: HeaderGroup<Person>) => (
  <tr key={value.id}>{map(value.headers, renderHeaderCell)}</tr>
);

// const renderRow = (row: Row<Person>) => {
//   return (
//     <tr>
//       <td>body</td>
//     </tr>
//   );
// };

function renderRow(rows: Row<Person>[]) {
  return function render(listRow: ListChildComponentProps<Person>) {
    return (
      <tr style={listRow.style}>
        <td>{rows[listRow.index].original.id}</td>
      </tr>
    );
  };
}
export function ReTable8() {
  const table = useReactTable<Person>({
    data: d,
    columns: COLUMNS,
    enableColumnResizing: true,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
  });

  const { rows } = table.getRowModel();
  const headers = table.getHeaderGroups();

  const Inner =
    React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
      function Inner({ children, ...rest }, ref) {
        // const { header, footer, top } = useContext(VirtualTableContext);
        return (
          <div {...rest} ref={ref}>
            <table style={{  position: 'absolute', width: '100%' }}>
              <thead>{map(headers, renderHeader)}</thead>
              <tbody>{children}</tbody>
              {/* {footer} */}
            </table>
          </div>
        );
      }
    );
  return (
    <div className={classes.container}>
      {/* <table> */}
        {/* <thead>{map(headers, renderHeader)}</thead> */}
        {/* <tbody>{map(rows, renderRow)}</tbody> */}
        <FixedSizeList<Person>
          height={400}
          itemCount={rows.length}
          itemSize={35}
          width={800}
          itemKey={(index) => rows[index].original.id}
          innerElementType={Inner}
          // outerElementType='tbody'
        >
          {renderRow(rows)}
        </FixedSizeList>
      {/* </table> */}
    </div>
  );
}
