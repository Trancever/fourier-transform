import * as math from "mathjs";

export const descreteFourierTransform = (data, numberOfSamples, callback) => {
  let result = {};
  const signalValues = Object.values(data);

  const step = Math.floor(numberOfSamples / 10);

  for (let m = 0; m < numberOfSamples; m++) {
    if (m % step === 0) {
      callback(m / numberOfSamples);
    }
    let sum = math.complex({ re: 0.0, im: 0.0 });
    for (let n = 0; n < numberOfSamples; n++) {
      const signalValue = signalValues[n];
      let wFactor = math.complex({
        re: calculateRealPartWFactor(m, n, numberOfSamples),
        im: calculateImaginaryPartWFactor(m, n, numberOfSamples)
      });
      let nextTerm = math.multiply(wFactor, signalValue);
      sum = math.add(sum, nextTerm);
    }
    let nextResult = sum;
    result[m] = nextResult;
  }
  callback(1);
  return result;
};

function calculateRealPartWFactor(m, n, numberOfSamples) {
  return Math.cos(calculateTransformKernel(m, n, numberOfSamples));
}

function calculateImaginaryPartWFactor(m, n, numberOfSamples) {
  return -Math.sin(calculateTransformKernel(m, n, numberOfSamples));
}

function calculateTransformKernel(m, n, numberOfSamples) {
  return (2 * Math.PI * m * n) / numberOfSamples;
}
