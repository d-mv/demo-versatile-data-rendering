import { Flex, Text as SpectrumText } from '@adobe/react-spectrum';
import { Suspense } from 'react';
import { RenderContext, RenderContextType } from '../context';
import { Numbers, Chips } from '.';
import { makeMatchObject } from '../tools';

export interface RenderListProps {
  data: RenderContextType;
}

const renderers = makeMatchObject({ chips: Chips, numbers: Numbers }, () => (
  <>Have data, but no render function</>
));
export function RenderList({ data }: RenderListProps) {
  // eslint-disable-next-line no-console
  console.log(data);
  return (
    <RenderContext.Provider value={data}>
      <Flex direction='column' alignContent='start' height='single-line-height' justifyContent='start' gap='size-200'>
        {Object.keys(data).map((key) => {
          const RenderComponent = renderers[key];
          return (
            <Suspense fallback={<SpectrumText>Loading...</SpectrumText>}>
              <RenderComponent key={key} />
            </Suspense>
          );
        })}
      </Flex>
    </RenderContext.Provider>
  );
}

//   <Suspense fallback={<div>Loading...</div>}></Suspense>
