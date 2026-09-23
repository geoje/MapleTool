const ONE_HOUR_MS = 60 * 60 * 1000;

function msUntilNextHour(): number {
  const now = new Date();
  const next = new Date(now);
  next.setMinutes(0, 0, 0);
  next.setHours(next.getHours() + 1);
  return next.getTime() - now.getTime();
}

// Runs fn once immediately, then aligns to the top of the hour and repeats every hour on the hour
// from there.
export function runHourlyAligned(fn: () => void): void {
  fn();

  setTimeout(() => {
    fn();
    setInterval(fn, ONE_HOUR_MS);
  }, msUntilNextHour());
}
