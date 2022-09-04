import { TableColumnScenario } from '../context/tableX.context';

export function calculateMaxWidth(
  scenario: Record<string, TableColumnScenario>
) {
  return Object.values(scenario)
    .map((script) => script.width)
    .reduce((acc, curr) => acc + curr, 0);
}

export function sortedScenario(
  scenario: Record<string, TableColumnScenario>
): Record<string, TableColumnScenario> {
  let sorted: Record<string, TableColumnScenario> = {};
  Object.entries(scenario)
    .sort((scriptA, scriptB) => scriptA[1].order - scriptB[1].order)
    .forEach((entry) => (sorted[entry[0]] = entry[1]));
  return sorted;
}
