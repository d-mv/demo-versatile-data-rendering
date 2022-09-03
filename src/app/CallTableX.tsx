import { View } from '@adobe/react-spectrum';
import React, { PropsWithoutRef } from 'react';

import { ShowAs, TableColumnScenario } from '../context/tableX.context';
import { TableX } from '../TableX';
import { makeData } from '../TableX/makeData';
import classes from './App.module.css';

const SCENARIO: Record<string, TableColumnScenario> = {
  id: { order: 1, showAs: ShowAs.ID, width: 14 },
  firstName: { order: 2, showAs: ShowAs.STRING, width: 5 },
  lastName: { order: 3, showAs: ShowAs.STRING, width: 5 },
  age: { order: 4, showAs: ShowAs.STRING, width: 5 },
  visits: { order: 5, showAs: ShowAs.STRING, width: 5 },
  progress: { order: 6, showAs: ShowAs.STRING, width: 5 },
  status: { order: 7, showAs: ShowAs.STRING, width: 5 },
  createdAt: { order: 8, showAs: ShowAs.STRING, width: 5 },
};

interface CallTableXProps {
  qtyOfElements: number;
  width: number;
}

export function CallTableX({
  qtyOfElements,
  width,
}: PropsWithoutRef<CallTableXProps>) {
  return (
    <View backgroundColor="gray-100" gridArea="content" padding="size-200">
      <div
        className={classes.line}
        style={{
          display: 'flex',
          position: 'relative',
          height: '100%',
          overflowX: 'scroll',
          overflowY: 'hidden',
          width: `${width}rem`,
        }}
      >
        <TableX data={makeData(qtyOfElements ?? 0)} scenario={SCENARIO} />
      </div>
    </View>
  );
}
