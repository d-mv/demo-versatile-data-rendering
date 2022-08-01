import { defaultTheme, Grid, Provider } from '@adobe/react-spectrum';

import { Content } from './Content';
export function App() {
  return (
    <Provider theme={defaultTheme}>
      <Grid
        areas={['header', 'content', 'footer']}
        columns={['3fr']}
        rows={['size-900', 'auto', 'size-1000']}
        height='size-6000'
        gap='size-100'
      >
        <Content />
      </Grid>
    </Provider>
  );
}
