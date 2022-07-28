import faker from "faker";

import { NumberProps } from "../renderers/Number";
import { toType } from "../tools";

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

export function generateData() {
  return {
    chips: generateDataSet<string>(faker.name.firstName),
    numbers: generateNumbersData(),
    someData: 'Tempor non ex in pariatur quis ea dolore officia dolor.',
  };
}
