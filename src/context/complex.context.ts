
import { createContext } from 'use-context-selector';
import { Item, ItemScenario } from './render.context';

export interface ComplexContextType extends Record<string, unknown> {
  value: unknown;
  scenario: ItemScenario
  fieldId: keyof Item
  lineId: string;
}

const ComplexContext = createContext({} as ComplexContextType);

ComplexContext.displayName = 'ComplexContext';

export { ComplexContext };
