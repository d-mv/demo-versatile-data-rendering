import { CSSProperties } from 'react';
import { createContext } from 'use-context-selector';
import { Option } from '../types';

export enum ShowAs {
  INT = 'int',
  FLOAT = 'float',
  PCT = 'percent',
  PARA = 'paragraph',
  ID = 'id',
}

export interface Item extends Record<string, Option<string | number>> {
  id: string;
  description: string;
  quantity: number;
  tax?: number;
}

export interface ItemScenario {
  showAs: ShowAs;
  width?: number;
  style?: CSSProperties;
}

export type Scenario = Record<keyof Item, ItemScenario>;

export interface ComplexData {
  data: Item[];
  scenario: Scenario;
}

export interface RenderContextType extends Record<string, unknown> {
  chips: string[];
  numbers: { value: number; as: string }[];
  complex: ComplexData;
}

const RenderContext = createContext({} as RenderContextType);

RenderContext.displayName = 'RenderContext';

export { RenderContext };
