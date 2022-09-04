import { TableColumnScenario } from '../context/tableX.context';

export function calculateMaxWidth(
  scenario: Record<string, TableColumnScenario>
) {
  return Object.values(scenario)
    .map((script) => script.width)
    .reduce((acc, curr) => acc + curr, 0);
}
