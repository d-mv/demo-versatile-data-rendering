import { Flex, Text } from '@adobe/react-spectrum';
import { useContextSelector } from 'use-context-selector';
import React from 'react'

import { Item, ItemScenario, RenderContext, ShowAs } from '../context';
import { makeMatchObject, map } from '../tools';
import { Description, Id, NumberHoc } from '.';
import { ComplexContext } from '../context';
import { Suspense } from 'react';
interface LineProps {
  line: Item;
}

const RENDERS = makeMatchObject(
  {
    [ShowAs.ID]: Id,
    [ShowAs.PARA]: Description,
    [ShowAs.FLOAT]: NumberHoc,
    [ShowAs.INT]: NumberHoc,
    [ShowAs.PCT]: NumberHoc,
  },
  () => (
    <div
      style={{
        height: 'fit-content',
        margin: '0 .5rem',
        color: 'white',
        backgroundColor: 'red',
        padding: '.3rem .8rem',
        borderRadius: '.3rem',
      }}
    >
      no render component
    </div>
  )
);

export default function Line({ line }: LineProps) {
  const { scenario } = useContextSelector(
    RenderContext,
    (context) => context.complex
  );

  function renderItem([fieldId, itemScenario]: [string, ItemScenario]) {
    const { showAs } = itemScenario;

    const Renderer = RENDERS[showAs];

    return (
      <ComplexContext.Provider
        key={fieldId}
        value={{
          value: line[fieldId],
          scenario: itemScenario,
          fieldId,
          lineId: line.id,
        }}
      >
        <Suspense key={fieldId} fallback={<Text>Loading...</Text>}>
          <Renderer />
        </Suspense>
      </ComplexContext.Provider>
    );
  }

  return (
    <Flex
      direction='row'
      alignContent='center'
      justifyContent='start'
      gap='size-100'
      height='size-600'
    >
      {map(Object.entries(scenario), renderItem)}
    </Flex>
  );
}
