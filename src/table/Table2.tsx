import React from 'react';
import { ListChildComponentProps, VariableSizeList } from 'react-window';
import { useTable, useBlockLayout, useResizeColumns } from 'react-table';
import { makeData2 } from '../tools';

import './Table.scss';

const scrollbarWidth = () => {
  // thanks too https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement('div');
  scrollDiv.setAttribute(
    'style',
    'width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;'
  );
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth;
};

function Table({ columns, data }: { columns: any[]; data: any[] }) {
  // Use the state and functions returned from useTable to build your UI

  const defaultColumn = React.useMemo(() => ({ width: 150 }), []);

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    // totalColumnsWidth,
    prepareRow,
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

  const renderRow = ({ index, style }: ListChildComponentProps<any>) => {
    const row = rows[index];

    prepareRow(row);

    const Cell = ({ index, style }: any) => {
      const cell = row.cells[index];

      return (
        <div {...cell.getCellProps()} style={style} className='td'>
          {cell.render('Cell')}
        </div>
      );
    };

    return (
		<div {...row.getRowProps({ style })} className='tr'>
			<div>hello</div>
        {/* <VariableSizeList
          height={400}
          itemCount={row.cells.length}
          itemSize={() => 35}
          width={400 + scrollBarSize}
          layout='horizontal'
        >
          {Cell}
        </VariableSizeList> */}
      </div>
    );
  };

  // Render the UI for your table
  return (
    <div {...getTableProps()} className='table'>
      <div>
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className='tr'>
            {headerGroup.headers.map((column) => (
              <div {...column.getHeaderProps()} className='th'>
                {column.render('Header')}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div {...getTableBodyProps()}>
        <VariableSizeList
          height={400}
          itemCount={rows.length}
          itemSize={() => 35}
          width={400 + scrollBarSize}
        >
          {(data) => renderRow(data)}
        </VariableSizeList>
      </div>
    </div>
  );
}

export function ReTable2() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
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
    []
  );

  const data = React.useMemo(() => makeData2(100), []);

  return (
    <div className='table-container'>
      <Table columns={columns} data={data} />
    </div>
  );
}
