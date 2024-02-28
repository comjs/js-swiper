export const TIMINGFUNC_MAP = {
  linear: (t: number) => t,
  'ease': (t: number) => t * t / (2 * (t * t - t) + 1),
  'ease-in': (t: number) => t * t,
  'ease-out': (t: number) => t * (2 - t),
  'ease-in-out': (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
}