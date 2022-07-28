import {
  Button,
  defaultTheme,
  Flex,
  Grid,
  Provider,
  View,
} from '@adobe/react-spectrum';
import { useEffect, useState } from 'react';
import { RenderList } from '../renderers/RenderList';
import classes from './App.module.css';
import { generateData } from '../tools';

export function App() {
  const [data, setData] = useState(generateData());

  function handleOnClick() {
    setData(generateData());
  }

  useEffect(() => {
    const interval = setInterval(() => handleOnClick(), 2000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Provider theme={defaultTheme}>
      <Grid
        areas={['header', 'content', 'footer']}
        columns={['3fr']}
        rows={['size-900', 'auto', 'size-1000']}
        height='size-6000'
        gap='size-100'
      >
        <View
          backgroundColor='static-white'
          gridArea='header'
          padding='size-200'
        >
          <Flex direction='row' alignContent='end' justifyContent='end'>
            <Button variant='cta' onPress={handleOnClick}>
              Generate Data
            </Button>
          </Flex>
        </View>
        <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
          <div className={classes.line}>
            <RenderList data={data} />
          </div>
        </View>
        <View backgroundColor='gray-100' gridArea='footer' />
      </Grid>
    </Provider>
  );
}
