import { View, Flex, Button, TextField } from '@adobe/react-spectrum';
import React, { useState, useCallback, useEffect } from 'react';

import { Table8 } from '../Table8';
import { RenderList } from '../renderers/RenderList';
import { generateData, ifTrue } from '../tools';
import classes from './App.module.css';
import { Table8virtual } from '../Table8virtual';

let interval: NodeJS.Timer | undefined;

export function Content() {
  const [data, setData] = useState(generateData());
  const [selectedContent, setSelectedContent] = useState(2);
  const [width, setWidth] = useState('100');

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, [data]);

  function handleOnClick() {
    setData(generateData());
  }

  function selectTable8() {
    if (selectedContent !== 1) setSelectedContent(1);
  }

  function selectVariousRenders() {
    if (selectedContent !== 0) setSelectedContent(0);
  }
  function selectTable8virt() {
    if (selectedContent !== 2) setSelectedContent(2);
  }

  function handleChange(s: string) {
    setWidth(s);
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

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
    };
  }, [handleIntervalControl]);

  const renderList = () => (
    <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
      <div className={classes.line}>
        <RenderList data={data} />
      </div>
    </View>
  );

  const renderTable8 = () => (
    <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
      <TextField label='Window width' value={width} onChange={handleChange} />
      <div
        className={classes.line}
        style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          overflowX: 'scroll',
          overflowY: 'hidden',
          width: `${width}rem`,
        }}
      >
        <Table8 />
      </div>
    </View>
  );

  const renderTable8virt = () => (
    <View backgroundColor='gray-100' gridArea='content' padding='size-200'>
      <TextField label='Window width' value={width} onChange={handleChange} />
      <div
        className={classes.line}
        style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          overflowX: 'scroll',
          overflowY: 'hidden',
          width: `${width}rem`,
        }}
      >
        <Table8virtual />
      </div>
    </View>
  );
  interface ButtonsType {
    variant: 'cta' | 'overBackground' | 'primary' | 'secondary' | 'negative';
    label: string;
    onPress: () => void;
  }
  const BUTTONS: ButtonsType[] = [
    {
      label: 'Various renders',
      variant: selectedContent === 0 ? 'negative' : 'primary',
      onPress: selectVariousRenders,
    },
    {
      label: 'Table rt8+react-virtual',
      variant: selectedContent === 1 ? 'negative' : 'primary',
      onPress: selectTable8,
    },
    {
      label: 'Table rt8+window',
      variant: selectedContent === 2 ? 'negative' : 'primary',
      onPress: selectTable8virt,
    },
  ];
  return (
    <>
      <View backgroundColor='static-white' gridArea='header' padding='size-200'>
        <Flex direction='row' justifyContent='space-between'>
          <Flex direction='row' alignItems='start' justifyContent='center'>
            {BUTTONS.map((button) => (
              <Button
                variant={button.variant}
                onPress={button.onPress}
                marginEnd='1rem'
              >
                {button.label}
              </Button>
            ))}
          </Flex>
          <Flex direction='row' alignItems='end' justifyContent='center'>
            <Button
              variant='cta'
              isDisabled={selectedContent !== 0}
              onPress={handleOnClick}
            >
              Generate Data
            </Button>
          </Flex>
        </Flex>
      </View>
      {ifTrue(selectedContent === 0, renderList)}
      {ifTrue(selectedContent === 1, renderTable8)}
      {ifTrue(selectedContent === 2, renderTable8virt)}
    </>
  );
}
