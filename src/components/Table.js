import React from 'react';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';

import InfiniteScroll from 'react-infinite-scroll-component';

const Styles = styled.div`
  padding-right: 1rem;
  h3 {
    color: rgb(0, 119, 184);
  }
  table {
    border-spacing: 0;
    border: 2px solid grey;
    border-radius: 7px;

    th {
      background-color: rgb(169, 68, 194);
      color: white;
    }
    tr:last-child {
      td {
        border-bottom: 0;
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem 1rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: none;
      }
    }
    th:last-child {
      border-right: none;
    }
    td:last-child {
      border-right: none;
    }
  }
`;

function Table({ columns, data, update }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  React.useEffect(() => {
    console.log('sort');
  }, [sortBy]);

  return (
    <Styles>
      <h3>Products</h3>
      <InfiniteScroll
        dataLength={rows.length}
        next={update}
        hasMore={true}
        loader={<h4>Loading more 2 items...</h4>}
      >
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </InfiniteScroll>
    </Styles>
  );
}

export default Table;
