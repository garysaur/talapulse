import { useEffect, useState } from 'react';

export default function MissionClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000 * 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="chip" data-state="neutral">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}
    </div>
  );
}
