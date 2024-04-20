import React from 'react';
import styled from 'styled-components';
import Table from './Table';

import makeData from './makeData';
import Form from './Form';
import { useLocalStorage } from '@uidotdev/usehooks';

const Styles = styled.div`
  padding: 10rem;
  // display: flex;
  // justify-content: space-between;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2rem;
`;

function App() {
  const [items, setItems] = useLocalStorage('data', makeData(40));

  const columns = React.useMemo(
    () => [
      {
        Header: 'Products',
        columns: [
          {
            Header: 'Name',
            accessor: 'productName',
          },
          {
            Header: 'Payment',
            accessor: 'payment',
          },
          {
            Header: 'Market',
            accessor: 'market',
          },
        ],
      },
    ],
    [],
  );

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems(items.concat(makeData(2)));
    }, 1500);
  };

  const handleNewProduct = (e) => {
    setItems([e].concat(items));
  };

  const data = React.useMemo(() => items, [items]);

  return (
    <Styles>
      <Table columns={columns} data={data} update={fetchMoreData} />
      <Form sendformToParent={(e) => handleNewProduct(e)}></Form>
    </Styles>
  );
}

export default App;
