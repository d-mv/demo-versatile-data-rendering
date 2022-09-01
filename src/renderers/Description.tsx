import { CSSProperties } from 'react';
import { useContextSelector } from 'use-context-selector';
import React from 'react'

import { ComplexContext } from '../context';

import classes from './Description.module.css';

export default function Description() {
  const { value, scenario, fieldId,lineId } = useContextSelector(
    ComplexContext,
    (context) => context
  );

  if (typeof value !== 'string') {
    // eslint-disable-next-line no-console
    console.log(
      `Description >> incompatible type for item/key ${lineId + '/' + fieldId}`
    );
    return <></>;
  }

  function makeStyle() {
    let def: CSSProperties = scenario.style ?? {};

    if (scenario.width) def = { ...def, width: `${scenario.width}rem` };
    return def;
  }

  return (
    <div className={classes.container} style={makeStyle()}>
      {value}
    </div>
  );
}
