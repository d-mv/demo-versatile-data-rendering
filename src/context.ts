import { createContext } from 'use-context-selector';

export interface RenderContextType {
  chips: string[];
  numbers: { value: number; as: string }[];
}

const RenderContext = createContext({} as RenderContextType);

RenderContext.displayName = 'RenderContext';

export { RenderContext };
