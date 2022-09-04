import { CSSProperties } from 'react';
import { createContext } from 'use-context-selector';

export enum ShowAs {
  STRING = 'string',
  ID = 'id',
  DATE_TIME = 'date_time',
  NUMBER = 'number',
}

export interface TableRowScenario {
  style: CSSProperties;
}

export interface TableColumnScenario {
  order: number;
  showAs: ShowAs;
  style?: CSSProperties;
  row?: Partial<TableRowScenario>;
  width: number;
  type?: string; // custom sub-types for renders
}

export interface TableXContextType {
  data: Record<string, unknown>[];
  scenario: Record<string, TableColumnScenario>;
  indexKey?: string;
  updateScenario: (field: string, value: Partial<TableColumnScenario>) => void;
}

const TableXContext = createContext({} as TableXContextType);

TableXContext.displayName = 'TableX';

export { TableXContext };

export interface TableXCellContextType {
  key: string;
  value: unknown;
  script: TableColumnScenario;
}

const TableXCellContext = createContext({} as TableXCellContextType);

TableXCellContext.displayName = 'TableXCell';

export { TableXCellContext };
