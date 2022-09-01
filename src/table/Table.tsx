import React from 'react';

import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { makeData } from '../tools';

import './Table.scss';

function Table({ columns, data }: { columns: any[]; data: any[] }) {
  const defaultColumn = React.useMemo(
    () => ({
      minWidth: 30,
      width: 150,
      maxWidth: 400,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    // @ts-ignore
    // resetResizing,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useBlockLayout,
    useResizeColumns
  );

  return (
    <>
      {/* <button onClick={resetResizing}>Reset Resizing</button> */}
      <div>
        <div {...getTableProps()} className='table'>
          <div>
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className='tr'>
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className='th'>
                    {column.render('Header')}
                    {/* Use column.getResizerProps to hook up the events correctly */}
                    <div
                      /* @ts-ignore */
                      {...column.getResizerProps()}
                      className={`resizer ${
                        // @ts-ignore
                        column.isResizing ? 'isResizing' : ''
                      }`}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className='tr'>
                  {row.cells.map((cell) => {
                    return (
                      <div {...cell.getCellProps()} className='td'>
                        {cell.render('Cell')}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre> */}
    </>
  );
}

export function ReTable() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            width: 50,
          },
          {
            Header: 'Visits',
            accessor: 'visits',
            width: 60,
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  );

	const data = React.useMemo(() => makeData(1000), []);

  return (
    <div className='table-container'>
      <Table columns={columns} data={data} />
    </div>
  );
}
