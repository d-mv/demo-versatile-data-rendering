import { View } from '@adobe/react-spectrum';
import React, { PropsWithoutRef, useMemo } from 'react';

import { ShowAs, TableColumnScenario } from '../context/tableX.context';
import { TableX } from '../TableX';
import { makeData } from '../TableX/makeData';
import classes from './App.module.css';

const SCENARIO: Record<string, TableColumnScenario> = {
  id: { order: 1, title: 'ID', showAs: ShowAs.ID, width: 14 },
  firstName: {
    order: 2,
    title: 'First Name',
    showAs: ShowAs.STRING,
    width: 10,
  },
  lastName: { order: 3, title: 'Last Name', showAs: ShowAs.STRING, width: 10 },
  age: { order: 4, title: 'Age', showAs: ShowAs.NUMBER, width: 5 },
  visits: { order: 5, title: 'Visits', showAs: ShowAs.NUMBER, width: 8 },
  progress: {
    order: 6,
    title: 'Progress',
    showAs: ShowAs.NUMBER,
    width: 8,
    type: 'percent',
  },
  status: { order: 7, title: 'Status', showAs: ShowAs.STRING, width: 15 },
  createdAt: {
    order: 8,
    title: 'Created',
    showAs: ShowAs.DATE_TIME,
    width: 15,
  },
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
  const data = useMemo(() => makeData(qtyOfElements ?? 0), [qtyOfElements]);
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
        <TableX data={data} scenario={SCENARIO} />
      </div>
    </View>
  );
}
