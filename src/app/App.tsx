import React from 'react';
import { defaultTheme, Grid, Provider } from '@adobe/react-spectrum';

import { Content } from './Content';
import { Table8 } from '../t8/Table8';
export function App() {
  return (
    <Provider theme={defaultTheme}>
      <Table8 />
      {/* <Grid
        areas={['header', 'content', 'footer']}
        columns={['3fr']}
        rows={['size-900', 'auto']}
        height='74rem'
        gap='size-100'
      >
        <Content />
      </Grid> */}
    </Provider>
  );
}
