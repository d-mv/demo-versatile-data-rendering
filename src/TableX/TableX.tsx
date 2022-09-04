import { assoc } from 'ramda';
import React, { useEffect, useRef, useState } from 'react';
import { debounce } from 'throttle-debounce';
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
  const [tableWidth, setTableWidth] = useState(
    calculateMaxWidth(updatedScenario)
  );

  useEffect(() => {
    const newTableWidth = calculateMaxWidth(scenario);
    // provide overscan
    setTableWidth(newTableWidth + 10);
  }, [scenario]);

  useEffect(() => {
    const newTableWidth = calculateMaxWidth(updatedScenario);
    setTableWidth(newTableWidth);
  }, [updatedScenario]);

  const debounced = debounce(500, setUpdatedScenario);
  function updateScenario(field: string, value: Partial<TableColumnScenario>) {
    debounced(
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
        <div id="tablex" className={classes.table}>
          <Header />
          <Body />
        </div>
      </div>
    </TableXContext.Provider>
  );
}
