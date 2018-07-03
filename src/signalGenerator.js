const PHASE_OFFSET = Math.PI / 2;

export default function generate(probesLength, samplingFrequency) {
  let signal = {};
  const step = 1.0 / samplingFrequency;
  let current = 0;
  for (let i = 0; i < probesLength; i += step) {
    signal[current] = getValueFor(current);
    current += step;
  }
  return signal;
}

function getValueFor(t) {
  return getValueForFirst(t) + getValueForSecond(t);
}

function getValueForFirst(t) {
  const main = (2 * Math.PI * t) / 2;
  return 2 * Math.sin(main + PHASE_OFFSET);
}

function getValueForSecond(t) {
  const main = (2 * Math.PI * t) / 0.5;
  return 2 * Math.sin(main + PHASE_OFFSET);
}
