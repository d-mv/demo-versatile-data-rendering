import { View } from '@adobe/react-spectrum';
import React, { PropsWithoutRef } from 'react';

import { ShowAs, TableColumnScenario } from '../context/tableX.context';
import { TableX } from '../TableX';
import { makeData } from '../TableX/makeData';
import classes from './App.module.css';

const SCENARIO: Record<string, TableColumnScenario> = {
  id: { order: 1, showAs: ShowAs.ID, width: 14 },
  firstName: { order: 2, showAs: ShowAs.STRING, width: 10 },
  lastName: { order: 3, showAs: ShowAs.STRING, width: 10 },
  age: { order: 4, showAs: ShowAs.NUMBER, width: 5 },
  visits: { order: 5, showAs: ShowAs.NUMBER, width: 8 },
  progress: { order: 6, showAs: ShowAs.NUMBER, width: 8, type: 'percent' },
  status: { order: 7, showAs: ShowAs.STRING, width: 15 },
  createdAt: { order: 8, showAs: ShowAs.DATE_TIME, width: 15 },
};

interface CallTableXProps {
  qtyOfElements: number;
  width: number;
  height: number;
}

export function CallTableX({
  qtyOfElements,
  width,
  height,
}: PropsWithoutRef<CallTableXProps>) {
  return (
    <View backgroundColor="gray-100" gridArea="content" padding="size-200">
      <div
        className={classes.line}
        style={{
          display: 'flex',
          position: 'relative',
          height: `${height}rem`,
          width: `${width}rem`,
        }}
      >
        <TableX data={makeData(qtyOfElements ?? 0)} scenario={SCENARIO} />
      </div>
    </View>
  );
}
