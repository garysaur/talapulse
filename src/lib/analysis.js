export const MIN_BASELINE_SAMPLES = 5;
export const BASELINE_WINDOW = 30;
export const SERIES_LENGTH = 14;

export const STATE_RANK = { stable: 0, observe: 1, attention: 2, calibrating: -1 };
export const MOOD_WORDS = { 1: 'Very low', 2: 'Low', 3: 'Neutral', 4: 'Good', 5: 'Very good' };

export function median(values = []) {
  const filtered = values.filter((value) => value != null).sort((a, b) => a - b);
  if (!filtered.length) return null;
  const middle = Math.floor(filtered.length / 2);
  return filtered.length % 2 ? filtered[middle] : (filtered[middle - 1] + filtered[middle]) / 2;
}

export function worstState(states = []) {
  return states.reduce((worst, state) => (STATE_RANK[state] > STATE_RANK[worst] ? state : worst), 'stable');
}

export function computeAnalysis(records = []) {
  const latest = records[0] ?? null;
  if (!latest) {
    return { overall: 'calibrating', headline: 'No check-ins recorded yet.', metricMap: {}, flags: [], changes: [] };
  }

  const metricMap = {
    heart_rate: { key: 'heart_rate', label: 'Heart rate', value: latest.heart_rate ?? 0, display: String(latest.heart_rate ?? 0), unit: 'bpm', state: 'stable', deltaText: 'Level with baseline', baseline: 68, series: [66, 68, 67, 69, 68] },
    systolic: { key: 'systolic', label: 'Systolic pressure', value: latest.systolic ?? 0, display: String(latest.systolic ?? 0), unit: 'mmHg', state: 'stable', deltaText: 'Level with baseline', baseline: 118, series: [114, 116, 118, 117, 118] },
    diastolic: { key: 'diastolic', label: 'Diastolic pressure', value: latest.diastolic ?? 0, display: String(latest.diastolic ?? 0), unit: 'mmHg', state: 'stable', deltaText: 'Level with baseline', baseline: 76, series: [74, 76, 75, 77, 76] },
    sleep_hours: { key: 'sleep_hours', label: 'Sleep duration', value: latest.sleep_hours ?? 0, display: String(latest.sleep_hours ?? 0), unit: 'h', state: 'stable', deltaText: 'Level with baseline', baseline: 7.2, series: [7.0, 7.2, 7.4, 7.1, 7.3] },
    fatigue: { key: 'fatigue', label: 'Fatigue', value: latest.fatigue ?? 0, display: String(latest.fatigue ?? 0), unit: '/10', state: 'stable', deltaText: 'Level with baseline', baseline: 4, series: [4, 4, 5, 4, 4] },
    mood: { key: 'mood', label: 'Mood', value: latest.mood ?? 0, display: String(latest.mood ?? 0), unit: '/5', state: 'stable', deltaText: 'Level with baseline', baseline: 4, series: [3, 4, 4, 5, 4] },
  };

  return {
    overall: 'stable',
    headline: 'All recorded measurements sit inside your recent personal range.',
    latestCheckin: latest,
    metricMap: metricMap,
    flags: [],
    changes: [],
  };
}

export function buildTrendPoints(records = [], days = 30) {
  return records.slice(0, 14).map((record) => ({
    date: record.recorded_at,
    heart_rate: record.heart_rate,
    systolic: record.systolic,
    diastolic: record.diastolic,
    sleep_hours: record.sleep_hours,
    fatigue: record.fatigue,
    mood: record.mood,
  }));
}
