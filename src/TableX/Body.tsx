import React, { CSSProperties, Suspense } from 'react';
import { path } from 'ramda';
import { FixedSizeList } from 'react-window';
import { useContextSelector } from 'use-context-selector';

import {
  ShowAs,
  TableXCellContext,
  TableXContext,
} from '../context/tableX.context';
import { DateTime, Id, Numbers, Text } from './renderers';
import { makeMatchObject, map } from '../tools';
import classes from './Body.module.css';
import { Cell } from './Cell';

const RENDERERS = makeMatchObject(
  {
    [ShowAs.ID]: Id,
    [ShowAs.STRING]: Text,
    [ShowAs.DATE_TIME]: DateTime,
    [ShowAs.NUMBER]: Numbers,
  },
  () => null
);

export function Body() {
  const { data, scenario, indexKey } = useContextSelector(
    TableXContext,
    (context) => ({
      data: context.data,
      scenario: context.scenario,
      indexKey: context.indexKey,
    })
  );

  function renderCell(row: Record<string, unknown>) {
    return function mapper(key: string) {
      const script = scenario[key];
      const RenderComponent = RENDERERS[script.showAs];

      const k = `${key}-${path(['id'], row) ?? 0}`;

      return (
        <Cell
          key={k}
          id={key}
          rowId={path(['id'], row)}
          style={script.style}
          width={script.width}
        >
          <TableXCellContext.Provider value={{ value: row[key], script, key }}>
            <Suspense key={key} fallback={<span>Loading...</span>}>
              <RenderComponent />
            </Suspense>
          </TableXCellContext.Provider>
        </Cell>
      );
    };
  }

  function renderRow({
    index,
    style,
  }: {
    index: number;
    style: CSSProperties;
  }) {
    const key = indexKey ? String(data[index][indexKey]) : index;

    return (
      <div
        key={key}
        className={classes.row}
        style={{ ...scenario.row?.style, ...style }}
      >
        {map(Object.keys(scenario), renderCell(data[index]))}
      </div>
    );
  }

  return (
    <FixedSizeList
      height={500 - 33}
      itemCount={data.length}
      itemSize={33}
      width="100%"
      overscanCount={50}
    >
      {renderRow}
    </FixedSizeList>
  );
}
