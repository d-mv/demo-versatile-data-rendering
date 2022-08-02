import { Flex, Text } from '@adobe/react-spectrum';
import { Suspense } from 'react';

import { RenderContext, RenderContextType } from '../context';
import { Numbers, Chips, Table } from '.';
import { makeMatchObject, map } from '../tools';

export interface RenderListProps {
  data: RenderContextType;
}

const renderers = makeMatchObject(
  { chips: Chips, numbers: Numbers, complex: Table },
  () => <>Have data, but no render function</>
);

export function RenderList({ data }: RenderListProps) {
  function renderComponent(key: string) {
    const RenderComponent = renderers[key];

    return (
      <Suspense key={key} fallback={<Text>Loading...</Text>}>
        <RenderComponent />
      </Suspense>
    );
  }

  return (
    <RenderContext.Provider value={data}>
      <Flex
        direction='column'
        alignContent='start'
        height='single-line-height'
        justifyContent='start'
        gap='size-200'
      >
        {map(Object.keys(data), renderComponent)}
      </Flex>
    </RenderContext.Provider>
  );
}
