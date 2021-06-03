let wasmExports = null;

let wasmMemory = new WebAssembly.Memory({ initial: 256, maximum: 256 });

let wasmTable = new WebAssembly.Table({
  initial: 1,
  maximum: 1,
  element: "anyfunc",
});

let asmLibraryArg = {
  __handle_stack_overflow: () => {},
  emscripten_resize_heap: () => {},
  __lock: () => {},
  __unlock: () => {},
  memory: wasmMemory,
  memory: wasmTable,
};

var info = {
  env: asmLibraryArg,
  wasi_snapshot_preview1: asmLibraryArg,
};

async function loadWASM() {
  let response = await fetch("test.wasm");
  let bytes = await response.arrayBuffer();
  let wasmObj = await WebAssembly.instantiate(bytes, info);
  wasmExports = wasmObj.instance.exports;
}

loadWASM();

function isPrimeNum(n) {
  let isPrime = true;

  for (let i = 2; i <= n / 2; i++) {
    if (n % i == 0) {
      isPrime = false;
      break;
    }
  }
  return isPrime;
}
function addPrimes() {
  let sum = 0;
  let isPrime;
  for (let n = 2; n < 100000; n++) {
    isPrime = isPrimeNum(n);
    if (isPrime) {
      sum += n;
    }
  }
  return sum;
}

function wasm() {
  let start = Date.now();
  console.log(wasmExports.addPrimeNumbers());
  let end = Date.now();
  let durationSec = (end - start) / 1000;
  console.log("WASM -> Dauer in Sekunden: " + durationSec);
}

function js() {
  let start = Date.now();
  console.log(addPrimes());
  let end = Date.now();
  let durationSec = (end - start) / 1000;
  console.log("JS -> Dauer in Sekunden: " + durationSec);
}
