import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const HealthDataContext = createContext(null);

const MOCK_DATA = {
  profile: {
    full_name: 'Cmdr. Elena Vasquez',
    call_sign: 'VEGA',
    role: 'Flight Engineer · Mission Specialist',
    mission_name: 'Artemis Orbital Analogue III',
    agency: 'Fictional crew profile',
    notes: 'Synthetic astronaut profile created for the AstroHealth Monitor proof of concept.',
    mission_day: 27,
  },
  analysis: {
    overall: 'stable',
    headline: 'All recorded measurements sit inside your recent personal range.',
    latestCheckin: { recorded_at: new Date().toISOString() },
    metricMap: {
      heart_rate: { label: 'Heart rate', value: 68, display: '68', unit: 'bpm', state: 'stable', deltaText: '+2 bpm vs baseline', baseline: 66, series: [64, 66, 68, 67, 69, 68] },
      systolic: { label: 'Systolic pressure', value: 118, display: '118', unit: 'mmHg', state: 'stable', deltaText: '+2 / +1 mmHg vs baseline', baseline: 116, series: [112, 114, 115, 117, 118] },
      diastolic: { label: 'Diastolic pressure', value: 76, display: '76', unit: 'mmHg', state: 'stable', deltaText: '+1 vs baseline', baseline: 75, series: [74, 75, 76, 77, 76] },
      sleep_hours: { label: 'Sleep duration', value: 7.4, display: '7.4', unit: 'hours', state: 'stable', deltaText: '+0.2 h vs baseline', baseline: 7.2, series: [6.8, 7.0, 7.4, 7.3, 7.5] },
      fatigue: { label: 'Fatigue', value: 4, display: '4', unit: '/10', state: 'stable', deltaText: 'Level with baseline', baseline: 4, series: [4, 4, 5, 4, 4] },
      mood: { label: 'Mood', value: 4, display: '4', unit: '/5', state: 'stable', deltaText: '+1 vs baseline', baseline: 3, series: [3, 4, 4, 4, 4] },
    },
    flags: [],
    changes: [],
  },
  sensorLatest: { recorded_at: new Date().toISOString(), heart_rate: 69, oxygen_percent: 97.8, co2_mmhg: 38.5, respiration_rate: 15.2, airflow_lpm: 7.2, skin_temp_c: 36.4, gas_pressure_kpa: 101.2 },
  counts: { total: 14, manual: 11, sensor: 3 },
  serverTime: new Date().toISOString(),
};

export function HealthDataProvider({ children }) {
  const [data, setData] = useState(MOCK_DATA);
  const [pending, setPending] = useState([]);
  const [online, setOnline] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      setData(MOCK_DATA);
      setError(null);
      return MOCK_DATA;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const syncNow = useCallback(async () => ({ synced: 0, remaining: 0 }), []);

  const submitCheckin = useCallback(async (payload) => {
    const result = {
      queued: false,
      result: {
        overall: 'stable',
        headline: 'Check-in stored against your fictional profile.',
        analysis: {
          baselineCount: 5,
          metricMap: {
            heart_rate: { label: 'Heart rate', display: payload.heart_rate || 68, unit: 'bpm', state: 'stable', deltaText: 'Level with baseline' },
            systolic: { label: 'Systolic pressure', display: payload.systolic || 118, unit: 'mmHg', state: 'stable', deltaText: 'Level with baseline' },
            diastolic: { label: 'Diastolic pressure', display: payload.diastolic || 76, unit: 'mmHg', state: 'stable', deltaText: 'Level with baseline' },
            sleep_hours: { label: 'Sleep duration', display: payload.sleep_hours || 7.4, unit: 'h', state: 'stable', deltaText: 'Level with baseline' },
            fatigue: { label: 'Fatigue', display: payload.fatigue || 4, unit: '/10', state: 'stable', deltaText: 'Level with baseline' },
            mood: { label: 'Mood', display: payload.mood || 4, unit: '/5', state: 'stable', deltaText: 'Level with baseline' },
          },
          overall: 'stable',
        },
      },
    };
    return result;
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const value = useMemo(() => ({ data, loading, error, refresh, pending, online, syncing, syncNow, submitCheckin }), [data, loading, error, refresh, pending, online, syncing, syncNow, submitCheckin]);

  return <HealthDataContext.Provider value={value}>{children}</HealthDataContext.Provider>;
}

export function useHealthData() {
  const context = useContext(HealthDataContext);
  if (!context) throw new Error('useHealthData must be used inside HealthDataProvider');
  return context;
}
