import { View, Flex, Button } from '@adobe/react-spectrum';
import React,{ useState, useCallback, useEffect } from 'react';
import { ReTable2 } from '../table';
import { ReTable8 } from '../table/T.tsx';

// import { RenderList } from '../renderers/RenderList';
// import { ReTable } from '../table/Table';
import { generateData } from '../tools';
import classes from './App.module.css';

let interval: NodeJS.Timer | undefined;

export function Content() {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, [data]);

  function handleOnClick() {
    setData(generateData());
  }

  const handleIntervalControl = useCallback((onOff = true, int = 2000) => {
    if (onOff && !interval) {
      // eslint-disable-next-line no-console
      console.log(`Auto-click is ON, interval is ${int / 1000}s`);
      interval = setInterval(() => handleOnClick(), int);
    } else if (!onOff && interval) {
      // eslint-disable-next-line no-console
      console.log('Auto-click is OFF');
      clearInterval(interval);
      interval = undefined;
    }
  }, []);

  useEffect(() => {
    // @ts-ignore
    globalThis.interval = handleIntervalControl;
    // handleIntervalControl(true, 4000);

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
      {/* <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
        <div className={classes.line}>
          <RenderList data={data} />
        </div>
      </View> */}
      {/* <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
        <div
          className={classes.line}
          style={{ display: 'flex', position: 'relative' }}
        >
          <ReTable />
        </div>
      </View> */}
      {/* <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
        <div
          className={classes.line}
          style={{ display: 'flex', position: 'relative' }}
        >
          <ReTable2 />
        </div>
      </View> */}
      <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
        <div
          className={classes.line}
          style={{ display: 'flex', position: 'relative', height: '100%' }}
        >
          <ReTable8 />
        </div>
      </View>
    </>
  );
}
