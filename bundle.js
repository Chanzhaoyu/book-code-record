var utils = {
  foo(fn) {
    callWithErrorHandling(fn);
  },
  bar(fn) {
    callWithErrorHandling(fn);
  },
};

function callWithErrorHandling(fn) {
  try {
    fn && fn();
  } catch (e) {
    console.log(e);
  }
}

utils().foo();

// npx rollup ./pages/learn-2/index.js -f esm -o bundle.js
