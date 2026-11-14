export const GUIDANCE_LIBRARY = [
  { id: 'sleep', tag: 'Sleep', title: 'Sleep and circadian load', summary: 'Sleep quality and recovery should be interpreted alongside stress, mood and fatigue.' },
  { id: 'heart', tag: 'Cardio', title: 'Autonomic response', summary: 'Heart-rate changes are often easier to read in context of exercise, sleep and stress.' },
  { id: 'pressure', tag: 'Pressure', title: 'Blood pressure trends', summary: 'A gradual drift should be compared with your own recent baseline, not a fixed population norm.' },
  { id: 'fatigue', tag: 'Fatigue', title: 'Adaptive fatigue', summary: 'Fatigue is highly individual and becomes more meaningful when evaluated over several days.' },
  { id: 'mood', tag: 'Mood', title: 'Psychological readiness', summary: 'Mood changes can reflect workload, sleep debt and environmental stress.' },
];

export const GUIDANCE_LAYERS = [
  { key: 'measurement', title: 'Measurement', description: 'Your current reading and values from the latest check-in.' },
  { key: 'trend', title: 'Trend', description: 'What changed from your personal baseline and recent history.' },
  { key: 'education', title: 'Education', description: 'Background context about the measurement and why it matters.' },
  { key: 'review', title: 'Review', description: 'What to pay attention to next and how to interpret the signal.' },
];

export const NASA_CONTENT_NOTE = 'This educational material is not a medical or flight operations recommendation. It is a synthetic overview created to demonstrate how health guidance and recorded values could be separated for clarity.';

export function guidanceForKeys(flags = []) {
  if (!flags.length) return [];
  return GUIDANCE_LIBRARY.filter((item) => {
    const map = {
      heart_rate: ['heart', 'sleep'],
      systolic: ['pressure'],
      diastolic: ['pressure'],
      sleep_hours: ['sleep'],
      fatigue: ['fatigue'],
      mood: ['mood'],
    };
    const matching = flags.flatMap((flag) => map[flag] ?? []);
    return matching.includes(item.id);
  });
}
