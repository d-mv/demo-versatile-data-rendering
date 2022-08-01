import { createContext } from 'use-context-selector';

export interface RenderContextType extends Record<string, unknown> {
  chips: string[];
  numbers: { value: number; as: string }[];
}

const RenderContext = createContext({} as RenderContextType);

RenderContext.displayName = 'RenderContext';

export { RenderContext };
