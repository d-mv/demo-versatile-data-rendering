import { assoc } from 'ramda';
import React, { useEffect, useState } from 'react';
import { useContextSelector } from 'use-context-selector';
import { TableColumnScenario, TableXContext } from '../context/tableX.context';
import { Body } from './Body';
import { Header } from './Header';
import classes from './TableX.module.css';
import { calculateMaxWidth } from './tools';

interface TableXProps {
  data: Record<string, unknown>[];
  scenario: Record<string, TableColumnScenario>;
}

export function TableX({ data, scenario }: TableXProps) {
  const [updatedScenario, setUpdatedScenario] = useState(scenario);

  function updateScenario(field: string, value: Partial<TableColumnScenario>) {
    setUpdatedScenario(
      assoc(field, { ...updatedScenario[field], ...value }, updatedScenario)
    );
  }

  return (
    <TableXContext.Provider
      value={{
        data,
        scenario: updatedScenario,
        updateScenario,
      }}
    >
      <div className={classes.container}>
        <div
          className={classes.table}
          style={{ width: `${calculateMaxWidth(scenario)}rem` }}
        >
          <Header />
          <Body />
        </div>
      </div>
    </TableXContext.Provider>
  );
}
