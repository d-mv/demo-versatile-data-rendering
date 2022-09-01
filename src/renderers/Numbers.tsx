import { Flex } from '@adobe/react-spectrum';
import { useContextSelector } from 'use-context-selector';
import React from 'react'

import { RenderContext } from '../context';
import { ifTrue, map } from '../tools';
import { NoData } from './NoData';
import { Number, NumberProps } from './Number';

export default function Numbers() {
  const data = useContextSelector(RenderContext, (context) => context.numbers);

  function render(props: NumberProps, index:number) {
    return <Number key={index} {...props} />;
  }

  const renderMap = () => map(data, render);

  return (
    <Flex
      direction='row'
      alignContent='center'
      justifyContent='start'
      gap='size-100'
    >
      {ifTrue(
        !data || !data.length,
        () => (
          <NoData data='no numbers' />
        ),
        renderMap
      )}
    </Flex>
  );
}
