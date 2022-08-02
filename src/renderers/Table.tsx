import { Flex, Text } from '@adobe/react-spectrum';
import { Suspense } from 'react';
import { useContextSelector } from 'use-context-selector';

import { Line } from '.';
import { Item, RenderContext } from '../context';
import { ifTrue, map } from '../tools';

export default function Table() {
  const { data } = useContextSelector(
    RenderContext,
    (context) => context.complex
  );

  function renderLines(line: Item, index: number) {
    return (
      <Suspense key={line.id} fallback={<Text>Loading...</Text>}>
        <Line key={line.id} line={data[index]} />
      </Suspense>
    );
  }

  return (
    <Flex
      direction='column'
      alignContent='center'
      justifyContent='start'
      gap='size-100'
      height='size-400'
    >
      {ifTrue(data.length, () => map(data, renderLines), <></>)}
    </Flex>
  );
}
