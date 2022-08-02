import faker from 'faker';
import { omit } from 'ramda';

import { Item, Scenario, ShowAs } from '../context';
import { NumberProps } from '../renderers/Number';
import { toType } from '../tools';

function giveChance() {
  const chance = Math.random();
  if (chance < 0.15) return { isOK: true, value: [] };
  if (chance < 0.2) return { isOK: true, value: undefined };
  if (chance < 0.3) return { isOK: true, value: null };
  if (chance < 0.4)
    return {
      isOK: true,
      value: [1, 2, 'this is test array', () => 'render me'],
    };
  return { isOK: false };
}

function generateDataSet<T>(generateFn: () => T): T[] {
  const chance = giveChance();

  if (chance.isOK) return toType<T[]>(chance.value);

  const data = [];

  for (let index = 0; index < Math.round(Math.random() * 20); index++) {
    data.push(generateFn());
  }
  return data;
}

const RENDER_NUMBER_AS = ['percent', 'float', 'round', 'xxxx'];

function getRenderNumberAs() {
  const r = Math.random();
  if (r < 0.3) return RENDER_NUMBER_AS[0];
  if (r < 0.5) return RENDER_NUMBER_AS[1];
  if (r < 0.7) return RENDER_NUMBER_AS[2];
  return RENDER_NUMBER_AS[3];
}

function generateNumbersData(): NumberProps[] {
  const chance = giveChance();

  if (chance.isOK) return toType<NumberProps[]>(chance.value);

  const data = [];

  for (let index = 0; index < Math.round(Math.random() * 20); index++) {
    data.push({
      value: Math.round(Math.random() * 10000) / 10000,
      as: getRenderNumberAs(),
    });
  }
  return data;
}

function generateComplexData(): Item[] {
  const data: Item[] = [];

  let random = Math.round(Math.random() * 20);
  if (random > 10) random = 10;

  for (let index = 0; index < random; index++) {
    const description = faker.lorem.sentence();

    const quantity = Math.round(Math.random() * 100);

    const tax = Math.round(Math.random() * 10000) / 100;

    data.push({
      id: crypto.randomUUID().slice(-6),
      // @ts-ignore - intentional simulation of broken data
      description: description.length < 30 ? {} : description,
      // @ts-ignore - intentional simulation of broken data
      quantity: quantity < 30 ? [] : quantity,
      // @ts-ignore - intentional simulation of broken data
      tax: tax < 30 ? null : tax,
    });
  }
  return data;
}

function generateComplexDataClean(): Item[] {
  const data: Item[] = [];

  let random = Math.round(Math.random() * 20);
  if (random > 10) random = 10;

  for (let index = 0; index < random; index++) {
    const description = faker.lorem.sentence();

    const quantity = Math.round(Math.random() * 100);

    const tax = Math.round(Math.random() * 10000) / 100;

    data.push({
      id: crypto.randomUUID().slice(-6),
      description,
      quantity,
      tax,
    });
  }
  return data;
}

function randomReduceScenario(base: Scenario): Scenario {
  const chance = Math.random();

  if (chance < 0.15) return toType<Scenario>(omit(['id'], base));
  if (chance < 0.2) return toType<Scenario>(omit(['description'], base));
  if (chance < 0.3) return toType<Scenario>(omit(['quantity'], base));
  if (chance < 0.5) return toType<Scenario>({ ...base, someKey: 'Unknown' });
  return base;
}

function generateScenario(): Scenario {
  const base: Scenario = {
    id: {
      showAs: ShowAs.ID,
      width: 6,
      style: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginInlineEnd: '1rem',
      },
    },
    description: {
      showAs: ShowAs.PARA,
      style: { width: 'fit-content', maxWidth: '30rem' },
    },
    quantity: {
      showAs: ShowAs.FLOAT,
      width: 5,
      style: {
        color: 'red',
        backgroundColor: '#00000000',
        padding: '0 1rem',
        borderRadius: 0,
        textAlign: 'right',
        height: 'fit-content',
      },
    },
    tax: {
      showAs: ShowAs.PCT,
      width: 7,
      style: {
        color: 'blue',
        backgroundColor: '#00000000',
        padding: '0 1rem',
        borderRadius: 0,
        textAlign: 'center',
        height: 'fit-content',
        border: '.1rem solid yellow'
      },
    },
  };

  return randomReduceScenario(base);
}

export function generateData() {
  // eslint-disable-next-line no-console
  console.log(generateComplexDataClean())
  return {
    chips: generateDataSet<string>(faker.name.firstName),
    numbers: generateNumbersData(),
    someData: 'Tempor non ex in pariatur quis ea dolore officia dolor.',
    complex: {
      data: generateComplexData(),
      scenario: generateScenario(),
    },
  };
}
