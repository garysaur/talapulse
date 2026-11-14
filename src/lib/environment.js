export const ENV_SOURCE = 'Synthetic environment model';

export function buildEnvironment(timestamp) {
  const date = new Date(timestamp);
  return {
    updatedAt: timestamp,
    metrics: [
      { key: 'radiation', label: 'Radiation', value: '0.31', unit: 'mSv/day', state: 'stable' },
      { key: 'temperature', label: 'Cabin temp', value: '21.8', unit: '°C', state: 'stable' },
      { key: 'pressure', label: 'Cabin pressure', value: '101.3', unit: 'kPa', state: 'stable' },
      { key: 'humidity', label: 'Humidity', value: '53%', unit: '%', state: 'observe' },
    ],
    summary: `Environment snapshot at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
  };
}
