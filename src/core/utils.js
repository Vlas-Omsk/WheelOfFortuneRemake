export const easingFunctions = Object.freeze({
  // no easing, no acceleration
  linear: (t) => t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
});

export function animate(
  from,
  to,
  duration,
  easingFunction,
  nextTick = null,
  endAnimation = null,
  dx = 0.001
) {
  const length = to - from;
  let dxlen = 0;
  let dxtmp = dx;
  while (dxtmp < 1) {
    dxlen++;
    dxtmp *= 10;
  }
  const msfortick = duration / Math.pow(10, dxlen);

  for (let t = 0.0; t.toFixed(dxlen) <= 1.0; t += dx) {
    setTimeout(
      (t) => {
        const val = easingFunction(t) * length + from;
        if (nextTick) nextTick(val);

        if (t >= 1 && endAnimation) endAnimation(val);
      },
      msfortick * Math.pow(10, dxlen) * t,
      t
    );
  }
}

export function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
