const KEEPALIVE_TIMEOUT_EXPR = /timeout=(\d+)/;
const asd = new RegExp(/timeout=(\d+)/);

function parseKeepAliveTimeoutOriginal(val) {
  const m = val.toString().match(KEEPALIVE_TIMEOUT_EXPR);
  return m ? parseInt(m[1], 10) * 1000 : null;
}

function parseKeepAliveTimeoutOriginal2(val) {
  const m = val.match(asd);
  return m ? parseInt(m[1], 10) * 1000 : null;
}

function parseKeepAliveTimeoutPure(val) {
  const position = val.indexOf('=');
  return position != -1 ? parseInt(val.substring(position + 1), 10) * 1000 : null;
}

function parseKeepAliveTimeoutModified(val) {
  const m = val.match(KEEPALIVE_TIMEOUT_EXPR);
  return m ? parseInt(m[1], 10) * 1000 : null;
}

function parseKeepAliveTimeout2(val) {
  const str = val.toString(), start = str.indexOf('timeout=') + 8, end = str.slice(start).search(/\D/);
  return start === 7 ? null : parseInt(str.slice(start, start + (end === -1 ? str.length : end)), 10) * 1000;
}


function runBenchmark(fn, input, iterations) {
  const start = process.hrtime();
  for (let i = 0; i < iterations; i++) {
    fn(input);
  }
  const end = process.hrtime(start);
  const seconds = end[0] + end[1] / 1e9;
  console.log(`${fn.name} took ${seconds} seconds`);
}

const testInput = 'timeout=30';
const iterations = 1000000;

console.log(`Running benchmark with ${iterations} iterations`);

runBenchmark(parseKeepAliveTimeoutOriginal, testInput, iterations);

runBenchmark(parseKeepAliveTimeoutPure, testInput, iterations);

runBenchmark(parseKeepAliveTimeoutModified, testInput, iterations);

runBenchmark(parseKeepAliveTimeout2, testInput, iterations);

runBenchmark(parseKeepAliveTimeoutOriginal2, testInput, iterations);
