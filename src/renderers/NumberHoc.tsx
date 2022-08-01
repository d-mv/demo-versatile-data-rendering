import { CSSProperties } from 'react';
import { useContextSelector } from 'use-context-selector';
import { ComplexContext } from '../context';

import { Number } from './Number';

export default function NumberHoc() {
  const { value, scenario, fieldId, lineId } = useContextSelector(
    ComplexContext,
    (context) => context
  );

  if (typeof value !== 'number') {
    // eslint-disable-next-line no-console
    console.log(
      `NumberHoc >> incompatible type for item/key ${lineId + '/' + fieldId}`
    );
    return <></>;
  }

  function makeStyle() {
    let def: CSSProperties = scenario.style ?? {};

    if (scenario.width) def = { ...def, width: `${scenario.width}rem` };
    return def;
  }

  return (
    <Number value={value} style={makeStyle()} as={scenario.showAs} valueOnly />
  );
}
