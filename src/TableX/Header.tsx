import React from 'react';
import { useContextSelector } from 'use-context-selector';

import { TableColumnScenario, TableXContext } from '../context/tableX.context';
import { map } from '../tools';
import classes from './Header.module.css';
import { HeaderCell } from './renderers';
import { ResizableCell } from './ResizeableCell';

export function Header() {
  const scenario = useContextSelector(
    TableXContext,
    (context) => context.scenario
  );

  type HeaderRowItem = [key: string, value: TableColumnScenario];

  function renderHeaderRow([key, value]: HeaderRowItem) {
    return (
      <ResizableCell id={key} key={key} script={value}>
        <HeaderCell>{scenario[key].title}</HeaderCell>
      </ResizableCell>
    );
  }

  return (
    <div className={classes.container}>
      {map(Object.entries(scenario), renderHeaderRow)}
    </div>
  );
}
