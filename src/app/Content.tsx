import { View, Flex, Button } from '@adobe/react-spectrum';
import { useState, useCallback, useEffect } from 'react';

import { RenderList } from '../renderers/RenderList';
import { generateData } from '../tools';
import classes from './App.module.css';

let interval: NodeJS.Timer | undefined;

export function Content() {
  const [data, setData] = useState(generateData());

  function handleOnClick() {
    setData(generateData());
  }

  const handleIntervalControl = useCallback((onOff = true) => {
    if (onOff && !interval) {
      // eslint-disable-next-line no-console
      console.log('Auto-click is ON');
      interval = setInterval(() => handleOnClick(), 2000);
    } else if (!onOff && interval) {
      // eslint-disable-next-line no-console
      console.log('Auto-click is OFF');
      clearInterval(interval);
      interval = undefined;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('hello');
    // @ts-ignore
    globalThis.interval = handleIntervalControl;

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
    };
  }, [handleIntervalControl]);

  return (
    <>
      <View backgroundColor='static-white' gridArea='header' padding='size-200'>
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
    </>
  );
}
