import { Flex } from '@adobe/react-spectrum';
import { useContextSelector } from 'use-context-selector';
import React from 'react'

import { RenderContext } from '../context';
import { ifTrue, map } from '../tools';
import { Chip } from './Chip';
import { NoData } from './NoData';

export default function Chips() {
  const data = useContextSelector(RenderContext, (context) => context.chips);

  function render(value: string, index: number) {
    return <Chip key={index} value={value} />;
  }

  const renderMap = () => map(data, render);
  return (
    <Flex
      direction='row'
      alignContent='center'
      justifyContent='start'
      gap='size-100'
      height='size-400'
    >
      {ifTrue(
        !data || !data.length,
        () => (
          <NoData data='no chips' />
        ),
        renderMap
      )}
    </Flex>
  );
}
